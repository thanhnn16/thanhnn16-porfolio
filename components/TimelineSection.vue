<template>
  <section class="relative">
    <!-- Timeline line with gradient and progress -->
    <div class="absolute left-[15%] top-0 bottom-0 w-px">
      <!-- Background line -->
      <div class="absolute inset-0 bg-gray-200 dark:bg-gray-700"></div>
      
      <!-- Progress line with gradient -->
      <div 
        ref="progressLine"
        class="absolute top-0 w-full bg-gradient-to-b from-primary-500 to-primary-400 origin-top transition-transform duration-300 ease-out"
        style="transform: scaleY(0)"
      ></div>
    </div>

    <!-- Timeline items -->
    <div>
      <div 
        v-for="(item, index) in items" 
        :key="item.id"
        class="relative min-h-[80vh] flex items-center"
        :ref="(el) => { if (el) timelineRefs[index] = el as HTMLElement }"
      >
        <div class="grid grid-cols-12 gap-8 w-full">
          <!-- Left side (Content) -->
          <div class="col-span-4 col-start-2">
            <div 
              class="opacity-0 pr-8"
              :ref="(el) => { if (el) contentRefs[index] = el as HTMLElement }"
            >
              <div class="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-lg transform transition-all duration-300 hover:shadow-2xl hover:-translate-y-1 relative overflow-hidden group">
                <!-- Year marker -->
                <div class="flex items-center gap-4 mb-6">
                  <span class="text-4xl font-bold bg-gradient-to-r from-primary-500 to-primary-600 dark:from-primary-400 dark:to-primary-500 bg-clip-text text-transparent">
                    {{ item.year }}
                  </span>
                </div>

                <h3 class="text-2xl font-bold mb-3">{{ item.title }}</h3>
                <p class="text-lg text-gray-600 dark:text-gray-400 mb-4">
                  {{ item.institution }}
                </p>
                <p class="text-gray-700 dark:text-gray-300 leading-relaxed">
                  {{ item.description }}
                </p>
              </div>
            </div>
          </div>

          <!-- Timeline dot -->
          <div class="col-span-1 relative">
            <div 
              class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
              :ref="(el) => { if (el) dotRefs[index] = el as HTMLElement }"
            >
              <div class="w-6 h-6 rounded-full bg-primary-500 dark:bg-primary-400 relative opacity-0 shadow-lg">
                <div class="absolute inset-0 rounded-full bg-primary-500/30 dark:bg-primary-400/30 animate-ping"></div>
              </div>
            </div>
          </div>

          <!-- Right side (Image) -->
          <div class="col-span-5">
            <div 
              class="h-[400px] rounded-2xl overflow-hidden opacity-0 shadow-xl"
              :ref="(el) => { if (el) imageRefs[index] = el as HTMLElement }"
            >
              <BaseImage
                :src="item.image || ''"
                :alt="item.title"
                class="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUpdate, onBeforeUnmount } from 'vue'
import type { TimelineItem } from '~/types/ui'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ScrollToPlugin } from 'gsap/ScrollToPlugin'

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin)

const props = defineProps<{
  items: TimelineItem[]
}>()

const timelineRefs = ref<(HTMLElement | null)[]>([])
const contentRefs = ref<(HTMLElement | null)[]>([])
const imageRefs = ref<(HTMLElement | null)[]>([])
const dotRefs = ref<(HTMLElement | null)[]>([])
const progressLine = ref<HTMLElement | null>(null)

// Reset refs before update
onBeforeUpdate(() => {
  timelineRefs.value = []
  contentRefs.value = []
  imageRefs.value = []
  dotRefs.value = []
})

// Optimized animation function with GSAP timeline
function animateSection(contentRef: HTMLElement, imageRef: HTMLElement, dotRef: HTMLElement, direction: 'enter' | 'leave') {
  const tl = gsap.timeline({
    defaults: {
      duration: 0.8,
      ease: "power3.out"
    }
  })

  if (direction === 'enter') {
    // Content animation
    tl.fromTo(contentRef, 
      { 
        opacity: 0,
        x: -100,
        scale: 0.8,
        rotateY: -15
      },
      {
        opacity: 1,
        x: 0,
        scale: 1,
        rotateY: 0,
        duration: 1,
        ease: "elastic.out(1, 0.8)"
      }
    )
    // Dot animation with bounce effect
    .fromTo(dotRef,
      {
        opacity: 0,
        scale: 0,
        transformOrigin: 'center'
      },
      {
        opacity: 1,
        scale: 1,
        duration: 0.6,
        ease: "bounce.out",
        immediateRender: false
      },
      "-=0.6"
    )
    // Image animation with 3D effect
    .fromTo(imageRef,
      {
        opacity: 0,
        x: 100,
        scale: 0.8,
        rotateY: 15,
        transformOrigin: 'center'
      },
      {
        opacity: 1,
        x: 0,
        scale: 1,
        rotateY: 0,
        duration: 1,
        ease: "elastic.out(1, 0.8)"
      },
      "-=0.8"
    )
  } else {
    // Leave animation with stagger and 3D effect
    tl.to([contentRef, dotRef, imageRef], {
      opacity: 0,
      y: 30,
      scale: 0.9,
      rotateX: -10,
      stagger: {
        each: 0.15,
        from: "start"
      },
      ease: "power2.in"
    })
  }

  return tl
}

onMounted(() => {
  // Enhanced progress line animation
  if (progressLine.value) {
    const progressTl = gsap.timeline({
      scrollTrigger: {
        trigger: progressLine.value.parentElement,
        start: "top center",
        end: "bottom center",
        scrub: true,
        onUpdate: (self) => {
          // Add pulsing effect based on scroll progress
          gsap.to(progressLine.value, {
            scaleX: 1 + Math.sin(self.progress * Math.PI) * 0.1,
            duration: 0.1,
            ease: "none"
          })
        }
      }
    })

    progressTl
      .fromTo(progressLine.value, 
        {
          scaleY: 0,
          transformOrigin: "top"
        },
        {
          scaleY: 1,
          ease: "none"
        }
      )
  }

  // Enhanced timeline item animations
  timelineRefs.value.forEach((timelineRef, index) => {
    const contentRef = contentRefs.value[index]
    const imageRef = imageRefs.value[index]
    const dotRef = dotRefs.value[index]

    if (!timelineRef || !contentRef || !imageRef || !dotRef) return

    // Add hover animations
    const hoverTl = gsap.timeline({ paused: true })
    hoverTl
      .to(contentRef.querySelector('.bg-white'), {
        scale: 1.02,
        boxShadow: "0 20px 40px rgba(0,0,0,0.1)",
        duration: 0.3
      })
      .to(dotRef.querySelector('.rounded-full'), {
        scale: 1.2,
        boxShadow: "0 0 20px rgba(var(--color-primary-500), 0.4)",
        duration: 0.3
      }, 0)
      .to(imageRef, {
        scale: 1.05,
        boxShadow: "0 20px 40px rgba(0,0,0,0.15)",
        duration: 0.3
      }, 0)

    timelineRef.addEventListener('mouseenter', () => hoverTl.play())
    timelineRef.addEventListener('mouseleave', () => hoverTl.reverse())

    // Scroll-based animations
    ScrollTrigger.create({
      trigger: timelineRef,
      start: "top center+=100",
      end: "bottom center",
      scrub: 1,
      markers: false,
      onEnter: () => animateSection(contentRef, imageRef, dotRef, 'enter'),
      onEnterBack: () => animateSection(contentRef, imageRef, dotRef, 'enter'),
      onLeave: () => animateSection(contentRef, imageRef, dotRef, 'leave'),
      onLeaveBack: () => animateSection(contentRef, imageRef, dotRef, 'leave'),
    })
  })

  // Cleanup
  onBeforeUnmount(() => {
    ScrollTrigger.getAll().forEach(trigger => trigger.kill())
    timelineRefs.value.forEach(ref => {
      if (ref) {
        ref.removeEventListener('mouseenter', () => {})
        ref.removeEventListener('mouseleave', () => {})
      }
    })
  })
})
</script>

<style scoped lang="postcss">
.bg-gradient-to-r {
  @apply bg-[length:200%_auto];
  animation: gradient 5s ease infinite;
}

@keyframes gradient {
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
}
</style> 