import { ref } from 'vue'

export function useChat() {
  const chatHistory = ref([])
  const isLoading = ref(false)
  const error = ref(null)

  const sendMessage = async (message: string) => {
    if (!message.trim()) return

    chatHistory.value.push({ text: message, isUser: true })
    isLoading.value = true
    error.value = null

    try {
      console.log('Sending message to server:', message)
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message }),
      })

      console.log('Server response status:', response.status)
      const responseText = await response.text()
      console.log('Server response text:', responseText)

      if (!response.ok) {
        throw new Error(`Network response was not ok: ${response.status} ${response.statusText}`)
      }

      let data
      try {
        data = JSON.parse(responseText)
      } catch (parseError) {
        console.error('Error parsing JSON:', parseError)
        throw new Error('Invalid JSON response from server')
      }

      console.log('Parsed server response:', data)
      
      if (data.response) {
        chatHistory.value.push({ text: data.response, isUser: false })
      } else if (data.error) {
        throw new Error(data.error)
      } else {
        throw new Error('Invalid response structure from server')
      }
    } catch (err) {
      console.error('Error sending message:', err)
      error.value = `Xin lỗi, có lỗi xảy ra: ${err.message}`
      chatHistory.value.push({ text: error.value, isUser: false })
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
