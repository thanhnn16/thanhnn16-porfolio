<template>
  <div class="min-h-screen bg-light flex flex-col">
    <div class="flex-grow overflow-y-auto">
      <Header />
      <main class="container mx-auto px-6 py-8">
        <NuxtPage />
      </main>
      <Footer />
    </div>
    <ScrollToTop ref="scrollToTopRef" />
    <AIChatButton />
    <!-- <div class="fixed top-0 left-0 w-full h-full pointer-events-none z-0">
      <div class="absolute top-10 left-10 w-20 h-20 bg-accent opacity-5 rounded-full"></div>
      <div class="absolute bottom-20 right-20 w-24 h-24 bg-muted opacity-5 rounded-full"></div>
      <div class="absolute top-1/2 left-1/4 w-32 h-2 bg-primary opacity-5 transform -rotate-45"></div>
    </div> -->
  </div>
</template>

<script setup>
import { onMounted, watch, ref } from 'vue'
import ScrollToTop from '~/components/ScrollToTop.vue'
import AIChatButton from '~/components/AIChatButton.vue'
import { useLangStore } from '~/stores/lang'
import { useI18n } from 'vue-i18n'
import { useRoute, useRouter } from 'vue-router'

const langStore = useLangStore()
const { locale } = useI18n()
const route = useRoute()
const router = useRouter()
const scrollToTopRef = ref(null)

onMounted(() => {
  console.log('App mounted. Current language:', langStore.currentLang)
  console.log('I18n locale:', locale.value)
  langStore.initLang()
  console.log('Language initialized. Current language:', langStore.currentLang)
  console.log('I18n locale after init:', locale.value)
})

// Thêm watcher cho route
watch(
  () => route.path,
  () => {
    nextTick(() => {
      if (scrollToTopRef.value) {
        scrollToTopRef.value.scrollToTop()
      }
    })
  }
)
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;600;700&display=swap');

body {
  font-family: 'Roboto', 'Noto Sans', sans-serif;
}

html, body {
  overflow: hidden;
  scrollbar-width: none; /* Cho Firefox */
  -ms-overflow-style: none; /* Cho Internet Explorer và Edge */
}

body::-webkit-scrollbar {
  display: none; /* Cho Chrome, Safari, và Opera */
}

.hide-scrollbar {
  scrollbar-width: none;
  -ms-overflow-style: none;
}

.hide-scrollbar::-webkit-scrollbar {
  display: none;
}

.overflow-y-auto {
  overflow-y: auto;
  height: calc(100vh - 64px); /* Điều chỉnh chiều cao nếu cần */
}

.overflow-y-auto::-webkit-scrollbar {
  display: none;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
}

.fade-in {
  animation: fadeIn 0.5s ease-in;
}

@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

/* Thêm hiệu ứng mượt mà cho cuộn trang */
html {
  scroll-behavior: smooth;
}

/* Hiệu ứng hover cho các nút */
.btn {
  transition: all 0.3s ease;
}

.btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

/* Hiệu ứng loading */
.loading-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(255, 255, 255, 0.8);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999;
}

.loading-spinner {
  width: 50px;
  height: 50px;
  border: 3px solid #f3f3f3;
  border-top: 3px solid #3498db;
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

.fade-in-section {
  opacity: 0;
  transform: translateY(20vh);
  visibility: hidden;
  transition: opacity 1200ms ease-out, transform 600ms ease-out,
    visibility 1200ms ease-out;
  will-change: opacity, transform, visibility;
}

.fade-in-section.is-visible {
  opacity: 1;
  transform: none;
  visibility: visible;
}
</style>
