<template>
  <div class="min-h-screen bg-light flex flex-col overflow-hidden">
    <div class="overflow-y-auto h-screen pt-16">
      <Header />
      <main class="container mx-auto px-6 py-8 flex-grow">
        <NuxtPage />
      </main>
      <Footer />
    </div>
    <ScrollToTop />
    <div class="fixed top-0 left-0 w-full h-full pointer-events-none z-0">
      <div class="absolute top-10 left-10 w-20 h-20 bg-accent opacity-10 rounded-full"></div>
      <div class="absolute bottom-20 right-20 w-40 h-40 bg-secondary opacity-20 rounded-full"></div>
      <div class="absolute top-1/2 left-1/4 w-60 h-2 bg-muted opacity-10 transform -rotate-45"></div>
    </div>
  </div>
</template>

<script setup>
import { onMounted } from 'vue'
import ScrollToTop from '~/components/ScrollToTop.vue'
import { useLangStore } from '~/stores/lang'

const langStore = useLangStore()

// Gọi initLang khi component được tạo
onMounted(() => {
  langStore.initLang()
  document.body.classList.add('hide-scrollbar')
})
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
  scrollbar-width: none;
  -ms-overflow-style: none;
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

/* Thêm hiệu ứng hover cho các nút */
.btn {
  transition: all 0.3s ease;
}

.btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}
</style>
