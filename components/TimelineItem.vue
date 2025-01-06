<template>
  <div 
    class="relative"
    ref="timelineRef"
  >
    <!-- Content -->
    <div 
      :class="[
        'w-5/12 relative',
        position === 'left' ? 'ml-auto' : 'mr-auto'
      ]"
    >
      <div 
        class="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg opacity-0"
        ref="contentRef"
      >
        <!-- Year -->
        <span class="text-primary-500 font-bold">{{ item.year }}</span>
        
        <!-- Title and Institution -->
        <div class="mt-2">
          <h3 class="text-xl font-bold">{{ item.title }}</h3>
          <p class="text-gray-600 dark:text-gray-400 mt-1">{{ item.institution }}</p>
        </div>

        <!-- Image if available -->
        <div v-if="item.image" class="mt-4 rounded-lg overflow-hidden">
          <BaseImage 
            :src="item.image" 
            :alt="item.title"
            class="w-full h-48 object-cover transform hover:scale-105 transition-transform duration-300"
          />
        </div>

        <!-- Description -->
        <p class="mt-4">{{ item.description }}</p>
      </div>

      <!-- Dot -->
      <div 
        class="absolute top-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-primary-500 border-4 border-white dark:border-gray-900 opacity-0"
        :class="position === 'left' ? '-right-[42px]' : '-left-[42px]'"
        ref="dotRef"
      ></div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue'
import type { TimelineItem } from '~/types/ui'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const props = defineProps<{
  item: TimelineItem
  position: 'left' | 'right'
}>()

const timelineRef = ref<HTMLElement | null>(null)
const contentRef = ref<HTMLElement | null>(null)
const dotRef = ref<HTMLElement | null>(null)

onMounted(() => {
  if (!timelineRef.value || !contentRef.value || !dotRef.value) return

  // Create timeline for this item
  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: timelineRef.value,
      start: "top center+=100",
      end: "bottom center",
      toggleActions: "play none none reverse"
    }
  })

  // Animate content
  tl.fromTo(contentRef.value,
    {
      opacity: 0,
      x: props.position === 'left' ? 100 : -100
    },
    {
      opacity: 1,
      x: 0,
      duration: 0.6,
      ease: "power2.out"
    }
  )

  // Animate dot
  tl.fromTo(dotRef.value,
    {
      opacity: 0,
      scale: 0
    },
    {
      opacity: 1,
      scale: 1,
      duration: 0.4,
      ease: "back.out(1.7)"
    },
    "-=0.3"
  )

  // Cleanup
  onBeforeUnmount(() => {
    if (tl.scrollTrigger) {
      tl.scrollTrigger.kill()
    }
    tl.kill()
  })
})
</script>
