import { defineStore } from 'pinia'
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'

export const useLangStore = defineStore('lang', () => {
  const currentLang = ref<'vi' | 'en'>('vi')
  const { locale } = useI18n()

  function setLang(lang: 'vi' | 'en') {
    currentLang.value = lang
    locale.value = lang
    localStorage.setItem('selectedLang', lang)
  }

  function initLang() {
    const savedLang = localStorage.getItem('selectedLang')
    const browserLang = navigator.language.split('-')[0]
    const defaultLang = savedLang || (browserLang === 'vi' ? 'vi' : 'en')
    setLang(defaultLang as 'vi' | 'en')
  }

  return { currentLang, setLang, initLang }
})
