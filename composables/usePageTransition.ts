export const usePageTransition = () => {
  const { $gsap: gsap } = useNuxtApp()

  const pageEnter = (el: Element, done: () => void) => {
    // Reset scroll position
    window.scrollTo({
      top: 0,
      behavior: 'instant'
    })

    const timeline = gsap.timeline({
      onComplete: done
    })

    timeline
      .set(el, {
        opacity: 0,
        y: 50,
      })
      .to(el, {
        opacity: 1,
        y: 0,
        duration: 0.5,
        ease: 'power2.out',
      })
  }

  const pageLeave = (el: Element, done: () => void) => {
    const timeline = gsap.timeline({
      onComplete: done
    })

    timeline.to(el, {
      opacity: 0,
      y: -50,
      duration: 0.5,
      ease: 'power2.in',
    })
  }

  return {
    pageEnter,
    pageLeave,
  }
} 