import en from './locales/en'
import vi from './locales/vi'

export default defineI18nConfig(() => ({
    legacy: false,
    locale: 'vi',
    fallbackLocale: 'vi',
    messages: {
        en,
        vi
    },
    sync: true,
    silentTranslationWarn: true,
    missingWarn: false,
    fallbackWarn: false
}))
