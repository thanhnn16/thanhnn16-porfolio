<template>
  <Menu as="div" class="relative">
    <MenuButton class="flex items-center gap-2 p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800">
      <Icon :name="`twemoji:flag-${currentFlag}`" class="w-5 h-5" />
      <span class="sr-only">{{ t(`language.${langStore.currentLang}`) }}</span>
    </MenuButton>

    <transition
      enter-active-class="transition duration-100 ease-out"
      enter-from-class="transform scale-95 opacity-0"
      enter-to-class="transform scale-100 opacity-100"
      leave-active-class="transition duration-75 ease-in"
      leave-from-class="transform scale-100 opacity-100"
      leave-to-class="transform scale-95 opacity-0"
    >
      <MenuItems class="absolute right-0 md:right-0 left-0 md:left-auto mt-2 w-48 origin-top-right rounded-lg bg-white dark:bg-gray-800 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
        <div class="p-1">
          <MenuItem v-for="lang in languages" :key="lang.code">
            <button
              class="flex w-full items-center gap-2 rounded-md px-2 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-700"
              :class="{ 'bg-gray-100 dark:bg-gray-700': langStore.currentLang === lang.code }"
              @click="switchLanguage(lang.code)"
            >
              <Icon :name="`twemoji:flag-${lang.flag}`" class="w-5 h-5" />
              {{ t(`language.${lang.code}`) }}
            </button>
          </MenuItem>
        </div>
      </MenuItems>
    </transition>
  </Menu>
</template>

<script setup lang="ts">
import { Menu, MenuButton, MenuItems, MenuItem } from '@headlessui/vue'
import { useLangStore } from '~/stores/lang'

type Language = 'en' | 'vi';

const langStore = useLangStore()
const { locale, t } = useI18n()

const languages = [
  { code: 'en' as Language, flag: 'united-kingdom' },
  { code: 'vi' as Language, flag: 'vietnam' }
]

const currentFlag = computed(() => 
  languages.find(lang => lang.code === langStore.currentLang)?.flag
)

const switchLanguage = (code: Language) => {
  langStore.setLang(code)
  locale.value = code
}
</script>