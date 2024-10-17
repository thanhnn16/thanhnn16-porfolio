import { defineStore } from 'pinia'
import type { Ref } from 'vue'

interface I18n {
  locale: Ref<string>
}

export const useLangStore = defineStore('lang', {
  state: () => ({
    currentLang: 'vi'
  }),
  actions: {
    setLang(lang: string) {
      console.log('Changing language to:', lang)
      this.currentLang = lang
      localStorage.setItem('selectedLang', lang)
      const { $i18n } = useNuxtApp()
      if ($i18n && typeof $i18n === 'object' && 'locale' in $i18n) {
        ($i18n as I18n).locale.value = lang
        console.log('Language changed to:', ($i18n as I18n).locale.value)
      }
    },
    initLang() {
      const savedLang = localStorage.getItem('selectedLang') || 'vi'
      this.setLang(savedLang)
    }
  }
})
