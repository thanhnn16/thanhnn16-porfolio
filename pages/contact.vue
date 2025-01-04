<template>
  <div class="pt-24 pb-20">
    <div class="container mx-auto px-4">
      <!-- Header -->
      <div class="max-w-3xl mx-auto text-center mb-16">
        <h1 
          class="text-4xl font-bold mb-6"
          v-motion
          :initial="{ opacity: 0, y: 100 }"
          :enter="{ opacity: 1, y: 0 }"
        >
          {{ t('contact.title') }}
        </h1>
        <p 
          class="text-xl text-gray-600 dark:text-gray-400"
          v-motion
          :initial="{ opacity: 0 }"
          :enter="{ opacity: 1, transition: { delay: 200 } }"
        >
          {{ t('contact.description') }}
        </p>
      </div>

      <div class="max-w-4xl mx-auto grid md:grid-cols-2 gap-12">
        <!-- Contact Info -->
        <div 
          class="space-y-8"
          v-motion
          :initial="{ opacity: 0, x: -100 }"
          :enter="{ opacity: 1, x: 0 }"
        >
          <div class="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg">
            <h2 class="text-2xl font-bold mb-6">{{ t('contact.info.title') }}</h2>
            <div class="space-y-4">
              <div class="flex items-center gap-4">
                <div class="w-12 h-12 bg-primary-500/10 rounded-lg flex items-center justify-center">
                  <Icon name="heroicons:envelope" class="w-6 h-6 text-primary-500" />
                </div>
                <div>
                  <p class="text-sm text-gray-600 dark:text-gray-400">{{ t('contact.info.email') }}</p>
                  <a :href="`mailto:${contactInfo.email}`" class="font-medium hover:text-primary-500">
                    {{ contactInfo.email }}
                  </a>
                </div>
              </div>

              <div class="flex items-center gap-4">
                <div class="w-12 h-12 bg-primary-500/10 rounded-lg flex items-center justify-center">
                  <Icon name="heroicons:phone" class="w-6 h-6 text-primary-500" />
                </div>
                <div>
                  <p class="text-sm text-gray-600 dark:text-gray-400">{{ t('contact.info.phone') }}</p>
                  <a :href="`tel:${contactInfo.phone}`" class="font-medium hover:text-primary-500">
                    {{ contactInfo.phone }}
                  </a>
                </div>
              </div>

              <div class="flex items-center gap-4">
                <div class="w-12 h-12 bg-primary-500/10 rounded-lg flex items-center justify-center">
                  <Icon name="heroicons:map-pin" class="w-6 h-6 text-primary-500" />
                </div>
                <div>
                  <p class="text-sm text-gray-600 dark:text-gray-400">{{ t('contact.info.location.label') }}</p>
                  <p class="font-medium">{{ contactInfo.location }}</p>
                </div>
              </div>
            </div>

            <!-- Social Links -->
            <div class="mt-8 pt-8 border-t border-gray-200 dark:border-gray-700">
              <h3 class="font-bold mb-4">{{ t('contact.followMe') }}</h3>
              <div class="flex flex-wrap gap-4">
                <a 
                  v-for="social in socialLinks" 
                  :key="social.name"
                  :href="social.url"
                  target="_blank"
                  class="flex items-center gap-2 px-4 py-2 bg-gray-100 dark:bg-gray-700 rounded-lg hover:bg-primary-500 hover:text-white transition-colors"
                >
                  <Icon :name="social.icon" class="w-5 h-5" />
                  <span class="text-sm">{{ social.name }}</span>
                </a>
              </div>
            </div>
          </div>
        </div>

        <!-- Contact Form -->
        <div 
          v-motion
          :initial="{ opacity: 0, x: 100 }"
          :enter="{ opacity: 1, x: 0, transition: { delay: 200 } }"
        >
          <form @submit.prevent="handleSubmit" class="space-y-6">
            <div>
              <label class="block text-sm font-medium mb-2">{{ t('contact.form.name.label') }}</label>
              <input
                v-model="form.name"
                type="text"
                :class="[
                  'w-full px-4 py-3 rounded-lg border focus:ring-2 focus:ring-primary-500 outline-none transition-all',
                  errors.name ? 'border-red-500' : 'border-gray-300 dark:border-gray-700'
                ]"
                :placeholder="t('contact.form.name.placeholder')"
              />
              <p v-if="errors.name" class="mt-1 text-sm text-red-500">{{ t('contact.form.name.required') }}</p>
            </div>

            <div>
              <label class="block text-sm font-medium mb-2">{{ t('contact.form.email.label') }}</label>
              <input
                v-model="form.email"
                type="email"
                :class="[
                  'w-full px-4 py-3 rounded-lg border focus:ring-2 focus:ring-primary-500 outline-none transition-all',
                  errors.email ? 'border-red-500' : 'border-gray-300 dark:border-gray-700'
                ]"
                :placeholder="t('contact.form.email.placeholder')"
              />
              <p v-if="errors.email" class="mt-1 text-sm text-red-500">{{ errors.email }}</p>
            </div>

            <div>
              <label class="block text-sm font-medium mb-2">{{ t('contact.form.message.label') }}</label>
              <textarea
                v-model="form.message"
                :class="[
                  'w-full px-4 py-3 rounded-lg border focus:ring-2 focus:ring-primary-500 outline-none transition-all',
                  errors.message ? 'border-red-500' : 'border-gray-300 dark:border-gray-700'
                ]"
                rows="6"
                :placeholder="t('contact.form.message.placeholder')"
              ></textarea>
              <p v-if="errors.message" class="mt-1 text-sm text-red-500">{{ t('contact.form.message.required') }}</p>
            </div>

            <button 
              type="submit"
              class="w-full px-6 py-3 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition-colors disabled:opacity-50"
              :disabled="isSubmitting"
            >
              <span v-if="isSubmitting">{{ t('contact.form.sending') }}</span>
              <span v-else>{{ t('contact.form.send') }}</span>
            </button>
          </form>
        </div>
      </div>
    </div>

    <!-- Success Modal -->
    <TransitionRoot appear :show="showSuccessModal" as="template">
      <Dialog as="div" @close="showSuccessModal = false" class="relative z-50">
        <TransitionChild
          enter="duration-300 ease-out"
          enter-from="opacity-0"
          enter-to="opacity-100"
          leave="duration-200 ease-in"
          leave-from="opacity-100"
          leave-to="opacity-0"
        >
          <div class="fixed inset-0 bg-black/25" />
        </TransitionChild>

        <div class="fixed inset-0 overflow-y-auto">
          <div class="flex min-h-full items-center justify-center p-4">
            <TransitionChild
              enter="duration-300 ease-out"
              enter-from="opacity-0 scale-95"
              enter-to="opacity-100 scale-100"
              leave="duration-200 ease-in"
              leave-from="opacity-100 scale-100"
              leave-to="opacity-0 scale-95"
            >
              <DialogPanel class="w-full max-w-md bg-white dark:bg-gray-800 rounded-2xl p-6">
                <div class="text-center">
                  <Icon name="heroicons:check-circle" class="w-16 h-16 text-green-500 mx-auto mb-4" />
                  <DialogTitle class="text-2xl font-bold mb-2">{{ t('contact.success.title') }}</DialogTitle>
                  <p class="text-gray-600 dark:text-gray-400">
                    {{ t('contact.success.message') }}
                  </p>
                  <button
                    @click="showSuccessModal = false"
                    class="mt-6 px-4 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition-colors"
                  >
                    {{ t('contact.success.close') }}
                  </button>
                </div>
              </DialogPanel>
            </TransitionChild>
          </div>
        </div>
      </Dialog>
    </TransitionRoot>
  </div>
</template>

<script setup lang="ts">
import { Dialog, DialogPanel, DialogTitle, TransitionRoot, TransitionChild } from '@headlessui/vue'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

const form = reactive({
  name: '',
  email: '',
  message: ''
})

const errors = reactive({
  name: '',
  email: '',
  message: ''
})

const isSubmitting = ref(false)
const showSuccessModal = ref(false)

const socialLinks = [
  {
    name: 'GitHub',
    url: 'https://github.com/thanhnn16',
    icon: 'mdi:github'
  },
  {
    name: 'LinkedIn',
    url: 'https://www.linkedin.com/in/thanhnn16/',
    icon: 'mdi:linkedin'
  },
  {
    name: 'Facebook',
    url: 'https://www.facebook.com/thanhnn16',
    icon: 'mdi:facebook'
  },
  {
    name: 'Instagram',
    url: 'https://www.instagram.com/thanhnn16',
    icon: 'mdi:instagram'
  },
  {
    name: 'YouTube',
    url: 'https://www.youtube.com/@thanhnn16',
    icon: 'mdi:youtube'
  }
]

const contactInfo = {
  email: 'thanhnn16.work@gmail.com',
  phone: '+84 879 159 499',
  location: 'Gò Vấp, TP.HCM'
}

const validateForm = () => {
  let isValid = true
  errors.name = ''
  errors.email = ''
  errors.message = ''

  if (!form.name.trim()) {
    errors.name = t('contact.form.name.required')
    isValid = false
  }

  if (!form.email.trim()) {
    errors.email = t('contact.form.email.required')
    isValid = false
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
    errors.email = t('contact.form.email.invalid')
    isValid = false
  }

  if (!form.message.trim()) {
    errors.message = t('contact.form.message.required')
    isValid = false
  }

  return isValid
}

const handleSubmit = async () => {
  if (!validateForm()) return

  isSubmitting.value = true

  try {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500))
    showSuccessModal.value = true
    form.name = ''
    form.email = ''
    form.message = ''
  } catch (error) {
    console.error('Failed to send message:', error)
  } finally {
    isSubmitting.value = false
  }
}
</script>
