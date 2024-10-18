<template>
  <div class="fixed bottom-4 right-4">
    <transition name="bounce">
      <button v-show="showButton" @click="scrollToTop" class="bg-accent hover:bg-white text-white hover:text-accent rounded-full p-3 shadow-lg transition-all duration-300 ease-in-out transform hover:scale-110 focus:outline-none focus:ring-2 focus:ring-accent focus:ring-opacity-50">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 transition-transform duration-300 ease-in-out transform group-hover:translate-y-[-2px]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 10l7-7m0 0l7 7m-7-7v18" />
        </svg>
      </button>
    </transition>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const showButton = ref(false)

const checkScroll = () => {
  const scrollContainer = document.querySelector('.overflow-y-auto')
  showButton.value = scrollContainer.scrollTop > 300
}

const scrollToTop = () => {
  const scrollContainer = document.querySelector('.overflow-y-auto')
  scrollContainer.scrollTo({ top: 0, behavior: 'smooth' })
}

onMounted(() => {
  const scrollContainer = document.querySelector('.overflow-y-auto')
  scrollContainer.addEventListener('scroll', checkScroll)
})

onUnmounted(() => {
  const scrollContainer = document.querySelector('.overflow-y-auto')
  scrollContainer.removeEventListener('scroll', checkScroll)
})

defineExpose({ scrollToTop })
</script>

<style scoped>
.bounce-enter-active {
  animation: bounce-in 0.5s;
}
.bounce-leave-active {
  animation: bounce-in 0.5s reverse;
}
@keyframes bounce-in {
  0% {
    transform: scale(0);
  }
  50% {
    transform: scale(1.25);
  }
  100% {
    transform: scale(1);
  }
}
</style>
