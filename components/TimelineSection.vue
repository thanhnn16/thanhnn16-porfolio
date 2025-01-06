<template>
  <section ref="timelineSection" class="relative py-20">
    <!-- Timeline line with gradient and progress -->
    <div class="absolute left-[15%] top-0 bottom-0 w-px z-0">
      <!-- Background line -->
      <div class="absolute inset-0 bg-gray-200/50 dark:bg-gray-700/50 backdrop-blur-sm"></div>
      
      <!-- Progress line with gradient -->
      <div 
        ref="progressLine"
        class="absolute top-0 w-full h-full origin-top timeline-progress"
        :style="{
          transform: 'scaleY(0)',
          background: 'linear-gradient(to bottom, rgb(var(--color-primary-600)), rgb(var(--color-primary-500)), rgb(var(--color-primary-400)))',
          boxShadow: '0 0 10px rgb(var(--color-primary-500))'
        }"
      >
        <!-- Glow effect -->
        <div class="absolute inset-0 blur-sm bg-inherit opacity-50"></div>
        <!-- Moving light effect -->
        <div class="absolute w-full h-20 moving-light"></div>
      </div>
    </div>

    <!-- Timeline items -->
    <div class="relative z-10">
      <div 
        v-for="(item, index) in items" 
        :key="item.id"
        class="relative min-h-[85vh] flex items-center timeline-item"
      >
        <div class="grid grid-cols-12 gap-8 w-full">
          <!-- Left side (Content) -->
          <div class="col-span-4 col-start-2">
            <div class="opacity-0 perspective-1000 timeline-content">
              <div class="bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg p-8 rounded-2xl shadow-lg transform transition-all duration-300 relative overflow-hidden group hover:shadow-2xl">
                <!-- Year marker with glowing effect -->
                <div class="flex items-center gap-4 mb-6">
                  <span class="text-4xl font-bold bg-gradient-to-r from-primary-500 to-primary-600 dark:from-primary-400 dark:to-primary-500 bg-clip-text text-transparent relative year-text">
                    {{ item.year }}
                    <div class="absolute inset-0 bg-primary-500/20 dark:bg-primary-400/20 blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  </span>
                </div>

                <h3 class="text-2xl font-bold mb-3 transform group-hover:translate-x-2 transition-transform duration-300">{{ item.title }}</h3>
                <p class="text-lg text-gray-600 dark:text-gray-400 mb-4 transform group-hover:translate-x-1 transition-transform duration-300 delay-75">
                  {{ item.institution }}
                </p>
                <p class="text-gray-700 dark:text-gray-300 leading-relaxed transform group-hover:translate-x-1 transition-transform duration-300 delay-100">
                  {{ item.description }}
                </p>
              </div>
            </div>
          </div>

          <!-- Timeline dot -->
          <div class="col-span-1 relative">
            <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 timeline-dot">
              <div class="w-6 h-6 rounded-full bg-primary-500 dark:bg-primary-400 relative opacity-0 shadow-lg">
                <div class="absolute inset-0 rounded-full bg-primary-500/30 dark:bg-primary-400/30 animate-ping"></div>
                <div class="absolute inset-[-4px] rounded-full border-2 border-primary-500/50 dark:border-primary-400/50"></div>
              </div>
            </div>
          </div>

          <!-- Right side (Image) -->
          <div class="col-span-5">
            <div class="h-[400px] rounded-2xl overflow-hidden opacity-0 perspective-1000 timeline-image">
              <BaseImage
                :src="item.image || ''"
                :alt="item.title"
                class="w-full h-full object-cover transform transition-transform duration-500 hover:scale-110"
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
import { ref, onMounted, onBeforeUnmount } from 'vue'
import type { TimelineItem } from '~/types/ui'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ScrollToPlugin } from 'gsap/ScrollToPlugin'

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin)

const props = defineProps<{
  items: TimelineItem[]
}>()

const progressLine = ref<HTMLElement | null>(null)
const timelineSection = ref<HTMLElement | null>(null)

onMounted(() => {
  // Get all timeline elements
  const timelineItems = gsap.utils.toArray<HTMLElement>('.timeline-item')
  const timelineContents = gsap.utils.toArray<HTMLElement>('.timeline-content')
  const timelineDots = gsap.utils.toArray<HTMLElement>('.timeline-dot')
  const timelineImages = gsap.utils.toArray<HTMLElement>('.timeline-image')

  // Set up ScrollTrigger defaults for smoother animations
  ScrollTrigger.defaults({
    toggleActions: 'play resume none reverse',
    markers: false
  })

  // Calculate viewport height and total scroll height
  const viewportHeight = window.innerHeight
  const totalHeight = timelineItems.reduce((acc, item) => acc + item.offsetHeight, 0)

  // Create individual progress animations for each timeline item
  timelineItems.forEach((item, index) => {
    const nextItem = timelineItems[index + 1]
    const endPosition = nextItem ? 'center center-=200' : 'bottom center'

    gsap.to(progressLine.value, {
      ease: 'none',
      scrollTrigger: {
        trigger: item,
        start: 'top center+=200',
        end: endPosition,
        scrub: 0.5,
        invalidateOnRefresh: true,
        onUpdate: (self) => {
          if (progressLine.value) {
            // Calculate the overall progress including the gap to next item
            const progress = Math.min(1, (index + self.progress) / timelineItems.length)
            const intensity = 5 + progress * 20

            gsap.to(progressLine.value, {
              scaleY: progress,
              boxShadow: `0 0 ${intensity}px rgb(var(--color-primary-500))`,
              background: `linear-gradient(to bottom, 
                rgb(var(--color-primary-600)), 
                rgb(var(--color-primary-500)), 
                rgb(var(--color-primary-400))
              )`,
              duration: 0.1
            })
          }
        }
      }
    })
  })

  // Animate each timeline item with faster animations
  timelineItems.forEach((item, index) => {
    const content = timelineContents[index]
    const dot = timelineDots[index]
    const image = timelineImages[index]

    if (!content || !dot || !image) return

    // Create timeline for each item with optimized trigger points
    const itemTl = gsap.timeline({
      scrollTrigger: {
        trigger: item,
        start: index === 0 ? 'top 65%' : 'top center+=150', // Adjusted trigger points
        end: 'center center',
        toggleActions: 'play reverse play reverse',
      }
    })

    // Faster and smoother animations
    itemTl
      // Content animation
      .fromTo(content,
        {
          opacity: 0,
          x: -30,
          rotateY: -10
        },
        {
          opacity: 1,
          x: 0,
          rotateY: 0,
          duration: 0.4, // Faster animation
          ease: 'power2.out'
        }
      )
      // Dot animation
      .fromTo(dot,
        {
          opacity: 0,
          scale: 0
        },
        {
          opacity: 1,
          scale: 1,
          duration: 0.2, // Faster animation
          ease: 'back.out(2)'
        },
        '-=0.2'
      )
      // Image animation
      .fromTo(image,
        {
          opacity: 0,
          x: 30,
          rotateY: 10
        },
        {
          opacity: 1,
          x: 0,
          rotateY: 0,
          duration: 0.4, // Faster animation
          ease: 'power2.out'
        },
        '-=0.3'
      )

    // Smoother parallax with optimized movement
    gsap.to(content, {
      y: 15, // Reduced movement
      ease: 'none',
      scrollTrigger: {
        trigger: item,
        start: 'top bottom',
        end: 'bottom top',
        scrub: 0.05 // Much faster scrub
      }
    })

    gsap.to(image, {
      y: -15, // Reduced movement
      ease: 'none',
      scrollTrigger: {
        trigger: item,
        start: 'top bottom',
        end: 'bottom top',
        scrub: 0.05 // Much faster scrub
      }
    })

    // Add hover animations
    const hoverTl = gsap.timeline({ paused: true })
    
    hoverTl
      .to(content, {
        scale: 1.01,
        duration: 0.2,
        ease: 'power2.out'
      })
      .to(dot, {
        scale: 1.2,
        duration: 0.2,
        ease: 'power2.out'
      }, 0)
      .to(image, {
        scale: 1.03,
        duration: 0.2,
        ease: 'power2.out'
      }, 0)

    item.addEventListener('mouseenter', () => hoverTl.play())
    item.addEventListener('mouseleave', () => hoverTl.reverse())
  })

  // Cleanup
  onBeforeUnmount(() => {
    ScrollTrigger.getAll().forEach(trigger => trigger.kill())
    gsap.killTweensOf('*')
  })
})
</script>

<style scoped lang="postcss">
.perspective-1000 {
  perspective: 1000px;
  transform-style: preserve-3d;
}

.timeline-progress {
  @apply transition-all duration-200; /* Faster transition */
  filter: drop-shadow(0 0 3px rgb(var(--color-primary-500)));
  will-change: transform, box-shadow, background;
  border-radius: 4px;
  overflow: hidden;
}

.timeline-progress::before {
  content: '';
  @apply absolute inset-0;
  background: linear-gradient(
    to bottom,
    transparent,
    rgb(var(--color-primary-500)) 50%,
    transparent
  );
  opacity: 0.5;
  animation: pulse 2s ease-in-out infinite;
}

.moving-light {
  background: linear-gradient(
    to bottom,
    transparent,
    rgba(255, 255, 255, 0.3) 50%,
    transparent
  );
  animation: moveLight 3s linear infinite;
  transform: translateY(-100%);
}

@keyframes moveLight {
  0% {
    transform: translateY(-100%);
  }
  100% {
    transform: translateY(100%);
  }
}

@keyframes pulse {
  0%, 100% { opacity: 0.3; }
  50% { opacity: 0.7; }
}

/* Enhanced hover effects */
.timeline-item {
  will-change: transform;
}

.timeline-item:hover .timeline-content {
  transform: translateZ(30px) scale(1.02);
}

.timeline-item:hover .timeline-dot {
  transform: scale(1.3);
}

.timeline-item:hover .timeline-image {
  transform: translateZ(-30px) scale(0.98);
}

.year-text {
  position: relative;
  background-size: 200% auto;
  animation: shine 4s linear infinite;
}

@keyframes shine {
  to {
    background-position: 200% center;
  }
}

/* Smooth transitions */
.timeline-content,
.timeline-dot,
.timeline-image {
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  will-change: transform, opacity;
}
</style> 