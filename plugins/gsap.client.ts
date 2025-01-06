import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ScrollToPlugin } from 'gsap/ScrollToPlugin'
import { Draggable } from 'gsap/Draggable'
import { MotionPathPlugin } from 'gsap/MotionPathPlugin'

export default defineNuxtPlugin(() => {
  if (import.meta.client) {
    gsap.registerPlugin(ScrollTrigger, ScrollToPlugin, Draggable, MotionPathPlugin)

    // Custom GSAP effects
    gsap.registerEffect({
      name: "fadeInScale",
      effect: (targets: any, config: any) => {
        return gsap.fromTo(targets,
          {
            opacity: 0,
            scale: config.startScale || 0.5,
            y: config.startY || 30
          },
          {
            opacity: 1,
            scale: 1,
            y: 0,
            duration: config.duration || 1,
            ease: config.ease || "elastic.out(1, 0.5)"
          }
        )
      },
      defaults: { duration: 1 },
      extendTimeline: true
    })

    gsap.registerEffect({
      name: "timelineProgress",
      effect: (targets: any, config: any) => {
        const tl = gsap.timeline()
        tl.fromTo(targets,
          {
            scaleY: 0,
            transformOrigin: "top"
          },
          {
            scaleY: 1,
            duration: config.duration || 1,
            ease: "none"
          }
        )
        return tl
      },
      defaults: { duration: 1 },
      extendTimeline: true
    })

    gsap.registerEffect({
      name: "timelineItemEnter",
      effect: (targets: any, config: any) => {
        const tl = gsap.timeline()
        const [content, dot, image] = targets

        // Content animation
        tl.fromTo(content,
          {
            opacity: 0,
            x: -100,
            rotateY: -15,
            transformOrigin: "center"
          },
          {
            opacity: 1,
            x: 0,
            rotateY: 0,
            duration: 1.2,
            ease: "power3.out"
          }
        )

          // Dot animation
          .fromTo(dot,
            {
              opacity: 0,
              scale: 0,
              transformOrigin: "center"
            },
            {
              opacity: 1,
              scale: 1,
              duration: 0.6,
              ease: "back.out(2)",
            },
            "-=0.8"
          )

          // Image animation
          .fromTo(image,
            {
              opacity: 0,
              x: 100,
              rotateY: 15,
              transformOrigin: "center"
            },
            {
              opacity: 1,
              x: 0,
              rotateY: 0,
              duration: 1.2,
              ease: "power3.out"
            },
            "-=1"
          )

        return tl
      },
      defaults: { duration: 2 },
      extendTimeline: true
    })

    // Custom eases
    gsap.config({
      force3D: true
    })
  }

  return {
    provide: {
      gsap,
      ScrollTrigger
    }
  }
}) 