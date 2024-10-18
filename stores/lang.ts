import { defineStore } from 'pinia'
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'

export const useLangStore = defineStore('lang', () => {
  const currentLang = ref('vi')
  const { locale } = useI18n()

  function setLang(lang: string) {
    console.log('Changing language to:', lang)
    currentLang.value = lang
    locale.value = lang
    localStorage.setItem('selectedLang', lang)
  }

  function initLang() {
    const savedLang = localStorage.getItem('selectedLang') || 'vi'
    setLang(savedLang)
  }

  return { currentLang, setLang, initLang }
})
