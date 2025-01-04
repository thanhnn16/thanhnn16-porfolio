<template>
  <div class="fixed bottom-4 right-4">
    <transition name="bounce">
      <button v-show="showButton" @click="scrollToTop" class="bg-accent hover:bg-white text-accent-contrast hover:text-accent rounded-full p-3 shadow-lg transition-all duration-300 ease-in-out transform hover:scale-110 focus:outline-none focus:ring-2 focus:ring-accent focus:ring-opacity-50">
        <Icon name="heroicons:arrow-up" class="w-6 h-6" />
      </button>
    </transition>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const showButton = ref(false)

const checkScroll = () => {
  const scrollContainer = document.querySelector('.overflow-y-auto') || window
  showButton.value = (scrollContainer === window ? window.pageYOffset : scrollContainer.scrollTop) > 300
}

const scrollToTop = () => {
  const scrollContainer = document.querySelector('.overflow-y-auto')
  if (scrollContainer) {
    scrollContainer.scrollTo({ top: 0, behavior: 'smooth' })
  } else {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }
}

onMounted(() => {
  const scrollContainer = document.querySelector('.overflow-y-auto')
  if (scrollContainer) {
    scrollContainer.addEventListener('scroll', checkScroll)
  } else {
    window.addEventListener('scroll', checkScroll)
  }
})

onUnmounted(() => {
  const scrollContainer = document.querySelector('.overflow-y-auto')
  if (scrollContainer) {
    scrollContainer.removeEventListener('scroll', checkScroll)
  } else {
    window.removeEventListener('scroll', checkScroll)
  }
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
