<template>
  <section ref="timelineSection" class="relative">
    <!-- Navigation Controls -->
    <div 
      class="fixed right-8 top-1/2 -translate-y-1/2 z-50 flex flex-col items-center gap-4 transition-opacity duration-300"
      :class="{ 'opacity-0 pointer-events-none': !isTimelineVisible }"
    >
      <!-- Prev button -->
      <button 
        @click="prevSection"
        :disabled="currentIndex === 0"
        class="p-2 rounded-full bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm shadow-lg disabled:opacity-50 transition-all hover:bg-primary-500 hover:text-white"
        :class="{'opacity-0 pointer-events-none': currentIndex === 0}"
      >
        <Icon name="heroicons:chevron-up" class="w-5 h-5" />
      </button>

      <!-- Timeline dots -->
      <div class="space-y-3 py-4">
        <button 
          v-for="(item, index) in items" 
          :key="item.id"
          @click="scrollToSection(index)"
          class="w-2 h-2 rounded-full transition-all duration-300 relative group"
          :class="currentIndex === index ? 'bg-primary-500 scale-150' : 'bg-gray-300 hover:bg-primary-400'"
        >
          <span class="absolute right-full mr-4 py-1 px-2 text-sm bg-white/80 dark:bg-gray-800/80 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
            {{ item.year }}
          </span>
        </button>
      </div>

      <!-- Next button -->
      <button 
        @click="nextSection"
        :disabled="currentIndex === items.length - 1"
        class="p-2 rounded-full bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm shadow-lg disabled:opacity-50 transition-all hover:bg-primary-500 hover:text-white"
        :class="{'opacity-0 pointer-events-none': currentIndex === items.length - 1}"
      >
        <Icon name="heroicons:chevron-down" class="w-5 h-5" />
      </button>
    </div>

    <!-- Main Timeline Container -->
    <div 
      ref="pinContainer" 
      class="h-screen overflow-hidden"
    >
      <!-- Progress Line -->
      <div class="absolute left-[15%] top-[10%] bottom-[10%] w-px">
        <div class="absolute inset-0 bg-gray-200/50 dark:bg-gray-700/50"></div>
        <div 
          ref="progressLine"
          class="absolute top-0 w-full bg-gradient-to-b from-primary-600 via-primary-500 to-primary-400"
          :style="{ height: `${progress}%` }"
        ></div>
      </div>

      <!-- Sections Container -->
      <div 
        ref="sectionsContainer"
        class="h-full transition-transform duration-700 ease-inOut"
        :style="{ transform: `translateY(-${currentIndex * 100}%)` }"
      >
        <div 
          v-for="(item, index) in items" 
          :key="item.id"
          class="h-full flex items-center section-container"
        >
          <div class="grid grid-cols-12 gap-8 w-full px-4">
            <!-- Content -->
            <div class="col-span-4 col-start-2">
              <div 
                class="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm p-8 rounded-2xl shadow-lg transition-all duration-700"
                :class="currentIndex === index ? 'translate-x-0 opacity-100' : 'translate-x-[-50px] opacity-0'"
              >
                <div class="flex items-center gap-4 mb-6">
                  <span class="text-4xl font-bold text-primary-500">{{ item.year }}</span>
                </div>
                <h3 class="text-2xl font-bold mb-3">{{ item.title }}</h3>
                <p class="text-lg text-gray-600 dark:text-gray-400 mb-4">{{ item.institution }}</p>
                <p class="text-gray-700 dark:text-gray-300">{{ item.description }}</p>
              </div>
            </div>

            <!-- Timeline Dot -->
            <div class="col-span-1 relative">
              <div 
                class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 transition-all duration-500"
                :class="currentIndex === index ? 'scale-100 opacity-100' : 'scale-0 opacity-0'"
              >
                <div class="w-6 h-6 rounded-full bg-primary-500 relative">
                  <div class="absolute inset-[-4px] rounded-full border-2 border-primary-500/50 animate-ping"></div>
                </div>
              </div>
            </div>

            <!-- Image -->
            <div class="col-span-5">
              <div 
                class="h-[400px] rounded-2xl overflow-hidden transition-all duration-700"
                :class="currentIndex === index ? 'translate-x-0 opacity-100 scale-100' : 'translate-x-[50px] opacity-0 scale-95'"
              >
                <BaseImage
                  :src="item.image || ''"
                  :alt="item.title"
                  class="w-full h-full object-cover transition duration-700 hover:scale-105"
                  loading="lazy"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue'
import type { TimelineItem } from '~/types/ui'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ScrollToPlugin } from 'gsap/ScrollToPlugin'

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin)

const props = defineProps<{
  items: TimelineItem[]
}>()

const timelineSection = ref<HTMLElement | null>(null)
const pinContainer = ref<HTMLElement | null>(null)
const sectionsContainer = ref<HTMLElement | null>(null)
const progressLine = ref<HTMLElement | null>(null)
const currentIndex = ref(0)
const progress = ref(0)
const isTimelineVisible = ref(false)
let scrollTrigger: ScrollTrigger | null = null
let timelineVisibilityTrigger: ScrollTrigger | null = null

// Scroll to specific section
const scrollToSection = (index: number) => {
  currentIndex.value = index
  progress.value = (index / (props.items.length - 1)) * 100
}

// Navigation methods
const prevSection = () => {
  if (currentIndex.value > 0) {
    scrollToSection(currentIndex.value - 1)
  }
}

const nextSection = () => {
  if (currentIndex.value < props.items.length - 1) {
    scrollToSection(currentIndex.value + 1)
  }
}

onMounted(() => {
  if (!pinContainer.value || !sectionsContainer.value || !timelineSection.value) return

  // Timeline visibility trigger
  timelineVisibilityTrigger = ScrollTrigger.create({
    trigger: timelineSection.value,
    start: "top top",
    end: () => `+=${props.items.length * 100}vh`,
    onToggle: (self) => {
      isTimelineVisible.value = self.isActive
    }
  })

  // Pin the container
  scrollTrigger = ScrollTrigger.create({
    trigger: pinContainer.value,
    start: "top top",
    end: () => `+=${props.items.length * 100}vh`,
    pin: true,
    pinSpacing: true,
    snap: {
      snapTo: 1 / (props.items.length - 1),
      duration: { min: 0.2, max: 0.3 },
      delay: 0,
      ease: "power1.inOut"
    },
    onUpdate: (self) => {
      const newIndex = Math.round(self.progress * (props.items.length - 1))
      if (newIndex !== currentIndex.value) {
        currentIndex.value = newIndex
        progress.value = (newIndex / (props.items.length - 1)) * 100
      }
    }
  })

  // Setup keyboard navigation
  const handleKeydown = (e: KeyboardEvent) => {
    if (e.key === 'ArrowUp') {
      prevSection()
    } else if (e.key === 'ArrowDown') {
      nextSection()
    }
  }
  window.addEventListener('keydown', handleKeydown)

  // Cleanup
  onBeforeUnmount(() => {
    window.removeEventListener('keydown', handleKeydown)
    if (scrollTrigger) {
      scrollTrigger.kill()
    }
    if (timelineVisibilityTrigger) {
      timelineVisibilityTrigger.kill()
    }
  })
})
</script>

<style scoped>
.section-container {
  height: 100vh;
  width: 100%;
}

/* Optimize animations */
.section-container > * {
  will-change: transform, opacity;
}

/* Prevent layout shifts */
.section-container {
  contain: content;
}

/* Custom easing */
.ease-inOut {
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
}

/* Smooth transition for navigation controls */
.opacity-0 {
  opacity: 0;
  visibility: hidden;
}

.pointer-events-none {
  pointer-events: none;
}
</style> 