<template>
  <header :class="['fixed top-0 left-0 right-0 z-50 transition-all duration-300', 
                   isScrolled ? 'bg-blue-900 bg-opacity-80 backdrop-blur-md' : 'bg-white']">
    <nav class="container mx-auto px-4 sm:px-6 py-4">
      <div class="flex justify-between items-center">
        <h1 class="logo" :class="isScrolled ? 'text-white' : 'text-blue-900'">thanhnn16</h1>
        
        <!-- Menu cho màn hình lớn -->
        <ul class="hidden md:flex space-x-8">
          <li v-for="(item, index) in navItems" :key="index">
            <a @click.prevent="navigateToPage(item.path)" 
               class="nav-link cursor-pointer" 
               :class="[isScrolled ? 'text-white' : 'text-blue-900', 
                        { 'active': $route.path === item.path }]">
              {{ $t(item.name) }}
            </a>
          </li>
        </ul>
        
        <!-- Nút ngôn ngữ -->
        <div class="hidden md:block relative">
          <button @click="toggleDropdown" class="flex items-center space-x-2 p-2 border rounded-md bg-gray-100 hover:bg-gray-200 transition duration-300">
            <Icon :name="getFlagIcon(currentLang)" class="w-6 h-4" />
            <span class="font-medium">{{ getLangLabel(currentLang) }}</span>
            <Icon name="heroicons:chevron-down" class="w-4 h-4 ml-1" />
          </button>
          <div v-if="isDropdownOpen" class="absolute right-0 mt-2 w-40 bg-white border rounded-md shadow-lg z-10">
            <button v-for="lang in availableLangs" :key="lang.code"
                    @click="changeLang(lang.code)" 
                    class="flex items-center space-x-2 w-full p-2 hover:bg-gray-100 transition duration-300">
              <Icon :name="getFlagIcon(lang.code)" class="w-6 h-4" />
              <span>{{ lang.label }}</span>
            </button>
          </div>
        </div>
        
        <!-- Nút menu cho màn hình nhỏ -->
        <button @click="toggleMobileMenu" class="md:hidden text-blue-900">
          <Icon name="heroicons:bars-3" class="w-6 h-6" />
        </button>
      </div>
      
      <!-- Menu di động -->
      <div v-if="isMobileMenuOpen" class="md:hidden mt-4">
        <ul class="flex flex-col space-y-4 items-center">
          <li v-for="(item, index) in navItems" :key="index" class="w-full text-center">
            <a @click.prevent="navigateToPage(item.path)" 
               class="nav-link block cursor-pointer" 
               :class="[isScrolled ? 'text-white' : 'text-blue-900', 
                        { 'active': $route.path === item.path }]"
               @click="closeMobileMenu">
              {{ $t(item.name) }}
            </a>
          </li>
        </ul>
        <div class="mt-4 flex justify-center">
          <button @click="toggleMobileLangDropdown" class="flex items-center justify-center space-x-2 p-2 border rounded-md bg-gray-100 hover:bg-gray-200 transition duration-300 w-full max-w-xs">
            <Icon :name="getFlagIcon(currentLang)" class="w-6 h-4" />
            <span class="font-medium">{{ getLangLabel(currentLang) }}</span>
            <Icon name="heroicons:chevron-down" class="w-4 h-4 ml-1" />
          </button>
        </div>
        <div v-if="isMobileLangDropdownOpen" class="mt-2 w-full flex justify-center">
          <div class="bg-white border rounded-md shadow-lg max-w-xs w-full">
            <button v-for="lang in availableLangs" :key="lang.code"
                    @click="changeLangMobile(lang.code)" 
                    class="flex items-center justify-center space-x-2 w-full p-2 hover:bg-gray-100 transition duration-300">
              <Icon :name="getFlagIcon(lang.code)" class="w-6 h-4" />
              <span>{{ lang.label }}</span>
            </button>
          </div>
        </div>
      </div>
    </nav>
    <ScrollToTop ref="scrollToTopRef" />
  </header>
</template>

<script setup>
import { ref, onMounted, onUnmounted, watch, nextTick } from 'vue'
import { useLangStore } from '~/stores/lang'
import { storeToRefs } from 'pinia'
import { useI18n } from 'vue-i18n'
import { useRouter } from 'vue-router'
import { useNuxtApp } from '#app'

const router = useRouter()
const { $scrollToTop } = useNuxtApp()

const langStore = useLangStore()
const { currentLang } = storeToRefs(langStore)
const { locale, t } = useI18n()

const isDropdownOpen = ref(false)
const isScrolled = ref(false)
const isMobileMenuOpen = ref(false)
const isMobileLangDropdownOpen = ref(false)

const toggleDropdown = () => {
  isDropdownOpen.value = !isDropdownOpen.value
}

const toggleMobileMenu = () => {
  isMobileMenuOpen.value = !isMobileMenuOpen.value
}

const toggleMobileLangDropdown = () => {
  isMobileLangDropdownOpen.value = !isMobileLangDropdownOpen.value
}

const closeMobileMenu = () => {
  isMobileMenuOpen.value = false
  scrollToTop()
}

const changeLang = (lang) => {
  console.log('Changing language to:', lang)
  langStore.setLang(lang)
  locale.value = lang
  console.log('Language changed. Current language:', langStore.currentLang)
  console.log('I18n locale after change:', locale.value)
  isDropdownOpen.value = false
}

const changeLangMobile = (lang) => {
  langStore.setLang(lang)
  locale.value = lang
  isMobileLangDropdownOpen.value = false
  isMobileMenuOpen.value = false
}

const getFlagIcon = (lang) => {
  const flags = {
    'en': 'flag:gb-4x3',
    'vi': 'flag:vn-4x3'
  }
  return flags[lang] || 'flag:un-4x3'
}

const navItems = [
  { name: 'home', path: '/' },
  { name: 'about', path: '/about' },
  { name: 'skills', path: '/skills' },
  { name: 'projects', path: '/projects' },
  { name: 'contact', path: '/contact' }
]

const handleScroll = () => {
  isScrolled.value = window.scrollY > 50
}

const availableLangs = [
  { code: 'vi', label: 'Tiếng Việt' },
  { code: 'en', label: 'English' }
]

const getLangLabel = (code) => {
  const lang = availableLangs.find(lang => lang.code === code)
  return lang ? lang.label : code.toUpperCase()
}

watch(currentLang, (newLang) => {
  console.log('Current language changed to:', newLang)
  locale.value = newLang
})

const scrollToTop = () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  })
}

// Thêm hàm này để xử lý việc chuyển trang
const handleRouteChange = (to, from) => {
  if (to.path !== from.path) {
    scrollToTop()
  }
}

// Lắng nghe sự kiện thay đổi route
router.afterEach((to, from) => {
  handleRouteChange(to, from)
})

const navigateToPage = (path) => {
  console.log('navigateToPage called with path:', path)
  router.push(path)
  closeMobileMenu()
  nextTick(() => {
    if (scrollToTopRef.value) {
      scrollToTopRef.value.scrollToTop()
    }
  })
}

const scrollToTopRef = ref(null)

onMounted(() => {
  window.addEventListener('scroll', handleScroll)
  langStore.initLang()
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})

// Thêm hook onBeforeRouteUpdate
router.beforeEach((to, from, next) => {
  if (to.path !== from.path) {
    window.scrollTo(0, 0)
  }
  next()
})
</script>

<style scoped>
.logo {
  font-family: 'Arial', sans-serif;
  font-size: 1.8rem;
  font-weight: 700;
  letter-spacing: -0.5px;
  transition: all 0.3s ease;
}

.logo:hover {
  color: #FF3B3B;
}

.nav-link {
  @apply opacity-80 hover:opacity-100 transition duration-300 relative py-2;
  font-size: 1.1rem;
}

.nav-link::after {
  content: '';
  position: absolute;
  width: 0;
  height: 2px;
  bottom: 0;
  left: 0;
  background-color: #FF3B3B;
  transition: width 0.3s ease;
}

.nav-link:hover::after,
.nav-link.active::after {
  width: 100%;
}

/* Thêm các styles mới cho mobile */
@media (max-width: 767px) {
  .nav-link::after {
    left: 50%;
    transform: translateX(-50%);
    max-width: 100px; /* Giới hạn chiều rộng tối đa của underline */
  }

  .nav-link:hover::after,
  .nav-link.active::after {
    width: 80%; /* Giảm chiều rộng của underline trên mobile */
  }
}

.nav-link.active {
  @apply opacity-100 font-semibold;
  color: #FF3B3B;
}
</style>
