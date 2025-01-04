  import { describe, it, expect, beforeEach, vi } from 'vitest'
  import { setActivePinia, createPinia } from 'pinia'
  import { useLangStore } from '../lang'

  describe('Language Store', () => {
    beforeEach(() => {
      setActivePinia(createPinia())
      // Clear localStorage before each test
      localStorage.clear()
    })

    it('initializes with default language', () => {
      const store = useLangStore()
      expect(store.currentLang).toBe('vi')
    })

    it('changes language correctly', () => {
      const store = useLangStore()
      store.setLang('en')
      expect(store.currentLang).toBe('en')
      expect(localStorage.getItem('selectedLang')).toBe('en')
    })

    it('loads language from localStorage on init', () => {
      localStorage.setItem('selectedLang', 'en')
      const store = useLangStore()
      store.initLang()
      expect(store.currentLang).toBe('en')
    })

    it('detects browser language if no stored preference', () => {
      // Mock navigator.language
      Object.defineProperty(window.navigator, 'language', {
        value: 'en-US',
        configurable: true
      })

      const store = useLangStore()
      store.initLang()
      expect(store.currentLang).toBe('en')
    })

    it('falls back to default language for unsupported languages', () => {
      Object.defineProperty(window.navigator, 'language', {
        value: 'fr-FR',
        configurable: true
      })

      const store = useLangStore()
      store.initLang()
      expect(store.currentLang).toBe('vi') // Default language
    })
  })