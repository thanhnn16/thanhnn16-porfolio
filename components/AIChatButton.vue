<template>
  <div class="fixed bottom-20 right-4 flex flex-col items-end">
    <Transition name="slide-fade">
      <div v-if="showChat" class="mb-4 w-full max-w-md z-99999">
        <div class="bg-white rounded-xl shadow-2xl overflow-hidden border border-gray-200 flex flex-col" style="max-height: 60vh; max-width: 80vw; border-radius: 20px;">
          <!-- Chat header -->
          <div class="flex justify-between items-center p-4 bg-gradient-to-r from-primary to-accent text-white">
            <h2 class="text-xl font-bold">{{ $t('aiChat') }}</h2>
            <button @click="toggleChat" class="text-white hover:text-gray-200 transition-colors duration-300">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          <!-- Chat messages -->
          <div class="flex-grow overflow-y-auto p-4 bg-white" ref="chatContainer">
            <div v-for="(msg, index) in chatHistory" :key="index" class="mb-3">
              <div :class="msg.isUser ? 'text-right' : 'text-left'">
                <span v-if="msg.text.trim()" :class="msg.isUser ? 'bg-accent text-white' : 'bg-gray-100 text-gray-800'" 
                      class="inline-block px-4 py-2 rounded-2xl shadow-sm max-w-[80%]">
                  {{ msg.text }}
                </span>
              </div>
            </div>
            <div v-if="isLoading" class="text-center">
              <span class="inline-block px-4 py-2 bg-gray-200 text-gray-700 rounded-full animate-pulse">
                {{ $t('thinking') }}
              </span>
            </div>
            <div v-if="error" class="text-center text-red-500 mb-3">
              {{ error }}
            </div>
          </div>
          <!-- Chat input -->
          <div class="p-4 bg-white border-t border-gray-200">
            <div v-if="chatHistory.length === 0" class="mb-4">
              <p class="text-center text-gray-500 mb-2">{{ $t('startChatPrompt') }}</p>
              <div class="flex justify-center space-x-2">
                <button
                  @click="sendPresetMessage('vi')"
                  class="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors duration-300"
                  :disabled="isLoading"
                >
                  {{ $t('presetMessageVi') }}
                </button>
                <button
                  @click="sendPresetMessage('en')"
                  class="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors duration-300"
                  :disabled="isLoading"
                >
                  {{ $t('presetMessageEn') }}
                </button>
              </div>
            </div>
            <div class="flex">
              <input
                v-model="userInput"
                @keyup.enter="handleSendMessage"
                type="text"
                :placeholder="$t('enterMessage')"
                :disabled="isLoading"
                class="flex-grow border border-gray-300 rounded-l-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent bg-white"
                ref="inputRef"
              />
              <button
                @click="handleSendMessage"
                :disabled="isLoading"
                class="bg-gradient-to-r from-primary to-accent text-white px-6 py-2 rounded-r-lg hover:opacity-90 transition-opacity duration-300 focus:outline-none focus:ring-2 focus:ring-primary disabled:opacity-50"
              >
                {{ $t('send') }}
              </button>
            </div>
            <div class="flex justify-center mt-4">
              <button
                @click="restartChat"
                class="text-primary hover:text-accent transition-colors duration-300 focus:outline-none focus:underline flex items-center"
              >
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
                {{ $t('restartChat') }}
              </button>
            </div>
          </div>
        </div>
      </div>
    </Transition>
    <!-- Chat button -->
    <button
      @click="toggleChat"
      class="bg-gradient-to-r from-ai-button to-ai-button-dark text-white rounded-full p-4 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-110 relative focus:outline-none focus:ring-2 focus:ring-ai-button"
      :class="{ 'animate-pulse': !showChat }"
    >
      <span class="sr-only">{{ $t('aiChat') }}</span>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        class="w-6 h-6"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
        />
      </svg>
      <span class="absolute -top-1 -right-1 flex h-3 w-3">
        <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-ai-button opacity-75"></span>
        <span class="relative inline-flex rounded-full h-3 w-3 bg-ai-button"></span>
      </span>
    </button>
    <div
      v-if="showBalloon"
      class="absolute bottom-full right-0 mb-2 p-2 bg-white rounded-lg shadow-md animate-bounce"
    >
      <p class="text-sm font-semibold">{{ $t('askAboutMe') }}</p>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, nextTick, watch } from 'vue'
import { useChat } from '~/composables/useChat'
import { useI18n } from 'vue-i18n'

const showChat = ref(false)
const showBalloon = ref(true)
const userInput = ref('')
const chatContainer = ref(null)
const inputRef = ref(null)

const { chatHistory, isLoading, error, sendMessage } = useChat()
const { t } = useI18n()

const toggleChat = () => {
  showChat.value = !showChat.value
  showBalloon.value = false
  if (showChat.value) {
    nextTick(() => {
      scrollToBottom()
    })
  }
}

const handleSendMessage = async () => {
  if (userInput.value.trim() === '' || isLoading.value) return

  const userMessage = userInput.value
  userInput.value = ''
  isLoading.value = true

  try {
    const response = await sendMessage(userMessage)
    if (response && response.trim() !== '') {
      console.log('AI response:', response)
      nextTick(() => {
        inputRef.value.focus()
      })
    }
  } catch (error) {
    console.error('Error sending message:', error)
  } finally {
    isLoading.value = false
  }

  console.log('Chat history:', chatHistory.value)
}

const scrollToBottom = () => {
  if (chatContainer.value) {
    chatContainer.value.scrollTop = chatContainer.value.scrollHeight
  }
}

watch(chatHistory, () => {
  nextTick(() => {
    scrollToBottom()
  })
}, { deep: true })

onMounted(() => {
  setTimeout(() => {
    showBalloon.value = true
  }, 2000)

  setTimeout(() => {
    showBalloon.value = false
  }, 12000)
})

const restartChat = () => {
  chatHistory.value = []
  userInput.value = ''
}

const sendPresetMessage = async (lang) => {
  let message = ''
  if (lang === 'vi') {
    message = 'Xin chào, tôi muốn biết thêm về Thành.'
  } else {
    message = 'Hello, I want to know more about Thanh.'
  }
  
  userInput.value = message
  await handleSendMessage()
}
</script>

<style scoped>
@keyframes heartbeat {
  0% {
    transform: scale(1);
  }
  14% {
    transform: scale(1.3);
  }
  28% {
    transform: scale(1);
  }
  42% {
    transform: scale(1.3);
  }
  70% {
    transform: scale(1);
  }
}

.animate-heartbeat {
  animation: heartbeat 1.5s infinite;
}

.slide-fade-enter-active,
.slide-fade-leave-active {
  transition: all 0.3s ease;
}

.slide-fade-enter-from,
.slide-fade-leave-to {
  transform: translateY(20px);
  opacity: 0;
}

.bg-gradient-to-r {
  background-size: 200% auto;
  animation: gradient 5s ease infinite;
}

@keyframes gradient {
  0% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
}
</style>
