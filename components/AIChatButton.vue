<template>
  <div class="fixed bottom-20 right-4 flex flex-col items-end z-49">
    <Transition name="slide-fade">
      <div v-if="showChat" class="mb-4 w-full max-w-md">
        <div
          class="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl overflow-hidden border border-gray-200/50 dark:border-gray-700/50 backdrop-blur-lg flex flex-col"
          style="max-height: 70vh; max-width: 85vw;">
          <!-- Chat header -->
          <div
            class="flex justify-between items-center p-4 bg-gradient-to-r from-primary/90 to-primary-600/90 backdrop-blur supports-[backdrop-filter]:bg-primary/60">
            <div class="flex items-center gap-3">
              <div class="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center">
                <Icon name="heroicons:chat-bubble-left-right" class="h-5 w-5 text-white" />
              </div>
              <h2 class="text-lg font-semibold text-white">{{ $t('aiChat') }}</h2>
            </div>
            <button @click="toggleChat"
              class="text-white/80 hover:text-white transition-colors duration-300 w-8 h-8 rounded-lg hover:bg-white/10 flex items-center justify-center">
              <Icon name="heroicons:x-mark" class="h-5 w-5" />
            </button>
          </div>
          <!-- Chat messages -->
          <div class="flex-grow overflow-y-auto p-4 space-y-4 bg-gray-50/50 dark:bg-gray-800/50" ref="chatContainer">
            <div v-for="(msg, index) in chatHistory" :key="index">
              <div :class="msg.isUser ? 'text-right' : 'text-left'">
                <div v-if="msg.text.trim()" :class="[
                  msg.isUser 
                    ? 'bg-primary text-white ml-auto' 
                    : 'bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 mr-auto border border-gray-100 dark:border-gray-600',
                  'inline-block px-4 py-2.5 rounded-2xl shadow-sm max-w-[85%]'
                ]">
                  <VueMarkdown :source="msg.text" class="prose dark:prose-invert prose-sm max-w-none break-words"
                    :options="{
                      html: false,
                      breaks: true,
                      linkify: true
                    }" />
                </div>
              </div>
            </div>
            <div v-if="isLoading" class="flex justify-center">
              <span
                class="inline-flex items-center gap-2 px-4 py-2 bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-full shadow-sm border border-gray-200 dark:border-gray-600">
                <Icon name="heroicons:arrow-path" class="h-4 w-4 animate-spin" />
                {{ $t('thinking') }}
              </span>
            </div>
            <div v-if="error" class="flex justify-center">
              <span class="inline-flex items-center gap-2 px-4 py-2 bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 rounded-full border border-red-200 dark:border-red-800">
                <Icon name="heroicons:exclamation-circle" class="h-4 w-4" />
                {{ error }}
              </span>
            </div>
          </div>
          <!-- Chat input -->
          <div class="p-4 bg-white dark:bg-gray-800 border-t border-gray-200/50 dark:border-gray-700/50">
            <div v-if="chatHistory.length === 0" class="mb-4">
              <p class="text-center text-gray-500 dark:text-gray-400 mb-3 text-sm">{{ $t('startChatPrompt') }}</p>
              <div class="flex justify-center gap-2">
                <button @click="sendPresetMessage('vi')"
                  class="px-4 py-2 bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-xl border border-gray-200 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors duration-300 shadow-sm"
                  :disabled="isLoading">
                  {{ $t('presetMessageVi') }}
                </button>
                <button @click="sendPresetMessage('en')"
                  class="px-4 py-2 bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-xl border border-gray-200 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors duration-300 shadow-sm"
                  :disabled="isLoading">
                  {{ $t('presetMessageEn') }}
                </button>
              </div>
            </div>
            <div class="flex gap-2">
              <div class="flex-grow relative">
                <input v-model="userInput" @keyup.enter="handleSendMessage" type="text" :placeholder="$t('enterMessage')"
                  :disabled="isLoading"
                  class="w-full bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-xl px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary/30 text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500"
                  ref="inputRef" />
                <div v-if="isLoading" class="absolute right-3 top-1/2 -translate-y-1/2">
                  <Icon name="heroicons:arrow-path" class="h-5 w-5 text-gray-400 animate-spin" />
                </div>
              </div>
              <button @click="handleSendMessage" :disabled="isLoading"
                class="bg-gradient-to-r from-primary to-primary-600 text-primary-contrast p-2.5 rounded-xl hover:opacity-90 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-primary/50 disabled:opacity-50 shadow-sm flex items-center justify-center w-11 h-11">
                <Icon name="heroicons:paper-airplane" class="h-5 w-5" />
              </button>
            </div>
            <div class="flex justify-center mt-4">
              <button @click="restartChat"
                class="text-primary hover:text-primary-600 transition-colors duration-300 focus:outline-none hover:bg-primary-50 dark:hover:bg-primary-900/20 px-3 py-1.5 rounded-lg flex items-center gap-2 text-sm">
                <Icon name="heroicons:arrow-path" class="h-4 w-4" />
                {{ $t('restartChat') }}
              </button>
            </div>
          </div>
        </div>
      </div>
    </Transition>
    <!-- Chat button -->
    <button @click="toggleChat"
      class="bg-gradient-to-r from-primary to-primary-600 text-primary-contrast w-12 h-12 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 relative focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 dark:focus:ring-offset-gray-900 flex items-center justify-center"
      :class="{ 'animate-pulse': !showChat }">
      <span class="sr-only">{{ $t('aiChat') }}</span>
      <Icon name="heroicons:chat-bubble-left-right" class="h-6 w-6" />
      <span class="absolute -top-1 -right-1 flex h-3 w-3">
        <span
          class="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary-contrast opacity-75"></span>
        <span class="relative inline-flex rounded-full h-3 w-3 bg-primary-contrast"></span>
      </span>
    </button>
    <div v-if="showBalloon"
      class="absolute bottom-full right-0 mb-2 p-3 bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 animate-bounce">
      <p class="text-sm font-medium text-gray-900 dark:text-gray-100">{{ $t('askAboutMe') }}</p>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, nextTick, watch } from 'vue'
import { useChat } from '~/composables/useChat'
import VueMarkdown from 'vue-markdown-render'

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
      inputRef.value?.focus()
    })
  }
}

const handleSendMessage = async () => {
  if (userInput.value.trim() === '' || isLoading.value) return

  const userMessage = userInput.value
  userInput.value = ''

  try {
    await sendMessage(userMessage)
    nextTick(() => {
      inputRef.value?.focus()
    })
  } catch (error) {
    console.error('Error sending message:', error)
  }
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

<style lang="postcss">
.prose {
  @apply text-sm leading-relaxed;
}

.prose p {
  @apply my-2;
}

.prose ul {
  @apply list-disc list-inside my-2;
}

.prose ol {
  @apply list-decimal list-inside my-2;
}

.prose a {
  @apply text-primary hover:text-primary-600 hover:underline;
}

.prose code {
  @apply bg-gray-100 dark:bg-gray-800 px-1 py-0.5 rounded text-sm;
}

.prose pre {
  @apply bg-gray-100 dark:bg-gray-800 p-2 rounded overflow-x-auto my-2;
}

.prose blockquote {
  @apply border-l-4 border-gray-300 dark:border-gray-600 pl-4 my-2 italic;
}

.slide-fade-enter-active,
.slide-fade-leave-active {
  @apply transition-all duration-300 ease-in-out;
}

.slide-fade-enter-from,
.slide-fade-leave-to {
  @apply transform translate-y-5 opacity-0;
}

.bg-gradient-to-r {
  @apply bg-[length:200%_auto];
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
