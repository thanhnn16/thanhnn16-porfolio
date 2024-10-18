import { defineStore } from 'pinia'
import { ref, watch } from 'vue'
import { useI18n } from 'vue-i18n'

export const useLangStore = defineStore('lang', () => {
  const currentLang = ref('vi')
  const { locale, t } = useI18n()

  function setLang(lang: string) {
    console.log('Setting language to:', lang)
    currentLang.value = lang
    locale.value = lang
    localStorage.setItem('selectedLang', lang)
    console.log('Language set. Current language:', currentLang.value)
    console.log('I18n locale after set:', locale.value)
  }

  function initLang() {
    const savedLang = localStorage.getItem('selectedLang') || 'vi'
    console.log('Initializing language. Saved language:', savedLang)
    setLang(savedLang)
  }

  watch(locale, (newLocale) => {
    console.log('I18n locale changed to:', newLocale)
    if (newLocale !== currentLang.value) {
      console.log('Syncing store language with I18n locale')
      currentLang.value = newLocale
    }
  })

  const changeLang = (lang: string) => {
    setLang(lang)
    locale.value = lang
  }

  return { currentLang, setLang, initLang, changeLang }
})
