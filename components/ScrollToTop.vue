<template>
  <button
    v-show="showButton"
    @click="scrollToTop"
    class="fixed bottom-6 right-4 z-50 w-12 h-12 rounded-xl transition-all duration-300 hover:scale-105 bg-gradient-to-r from-primary to-primary-600 text-primary-contrast shadow-lg hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 dark:focus:ring-offset-gray-900 flex items-center justify-center"
    :aria-label="t('scroll_to_top')"
  >
    <Icon name="heroicons:arrow-up" class="w-6 h-6" />
  </button>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { gsap } from 'gsap'
import { useI18n } from 'vue-i18n'
import ScrollToPlugin from 'gsap/ScrollToPlugin'

gsap.registerPlugin(ScrollToPlugin)

const { t } = useI18n()

const showButton = ref(false)
const scrollThreshold = 200

const handleScroll = () => {
  showButton.value = window.scrollY > scrollThreshold
}

const scrollToTop = () => {
  gsap.to(window, {
    duration: 1,
    scrollTo: { y: 0 },
    ease: 'power2.inOut'
  })
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll)
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})
</script>

<style scoped lang="postcss">
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
