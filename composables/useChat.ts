import type { Message, ChatState, ChatResponse } from '~/types/chat'

export function useChat() {
  const chatHistory = ref<Message[]>([])
  const isLoading = ref(false)
  const error = ref<string | null>(null)

  const sendMessage = async (message: string) => {
    if (!message.trim()) return

    chatHistory.value.push({ text: message, isUser: true })
    isLoading.value = true
    error.value = null

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message, chatHistory: chatHistory.value }),
      })

      const responseText = await response.text()

      if (!response.ok) {
        throw new Error(`Network response was not ok: ${response.status} ${response.statusText}`)
      }

      let data: ChatResponse
      try {
        data = JSON.parse(responseText)
      } catch (parseError) {
        console.error('Error parsing JSON:', parseError)
        throw new Error('Invalid JSON response from server')
      }

      if (data.response && data.response.trim() !== '') {
        chatHistory.value.push({ text: data.response, isUser: false })
        return data.response
      } else if (data.error) {
        throw new Error(data.error)
      } else {
        throw new Error('Invalid response structure from server')
      }
    } catch (err: unknown) {
      console.error('Error sending message:', err)
      if (err instanceof Error) {
        if (err.message.includes('Hệ thống đang quá tải')) {
          error.value = 'Hệ thống đang quá tải. Vui lòng thử lại sau ít phút.'
        } else {
          error.value = `Xin lỗi, có lỗi xảy ra: ${err.message}`
        }
      } else {
        error.value = 'Đã xảy ra lỗi không xác định'
      }
      chatHistory.value.push({ text: error.value!, isUser: false })
      throw err
    } finally {
      isLoading.value = false
    }
  }

  return {
    chatHistory,
    isLoading,
    error,
    sendMessage
  }
}
