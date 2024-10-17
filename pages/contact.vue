<template>
  <div class="container mx-auto py-12">
    <h1 class="text-4xl font-bold text-center mb-8">{{ $t('contactMe') }}</h1>

    <div class="grid grid-cols-1 md:grid-cols-2 gap-12">
      <!-- Thông tin liên hệ -->
      <div class="bg-white p-6 rounded-lg shadow-soft">
        <h2 class="text-2xl font-semibold mb-4">{{ $t('contactInfo') }}</h2>
        <ul class="space-y-4">
          <li class="flex items-center">
            <i class="fas fa-envelope mr-3 text-accent"></i>
            <a href="mailto:your.email@example.com" class="text-muted hover:text-accent">your.email@example.com</a>
          </li>
          <li class="flex items-center">
            <i class="fas fa-phone mr-3 text-accent"></i>
            <a href="tel:+1234567890" class="text-muted hover:text-accent">+1 (234) 567-890</a>
          </li>
          <li class="flex items-center">
            <i class="fas fa-map-marker-alt mr-3 text-accent"></i>
            <span class="text-muted">{{ $t('location') }}</span>
          </li>
        </ul>

        <!-- Mạng xã hội -->
        <h3 class="text-xl font-semibold mt-8 mb-4">{{ $t('followMe') }}</h3>
        <div class="flex space-x-4">
          <a href="#" class="text-accent hover:text-accent-dark">
            <Icon name="mdi:facebook" size="24" />
          </a>
          <a href="#" class="text-accent hover:text-accent-dark">
            <Icon name="mdi:instagram" size="24" />
          </a>
          <a href="#" class="text-accent hover:text-accent-dark">
            <Icon name="mdi:youtube" size="24" />
          </a>
          <a href="#" class="text-accent hover:text-accent-dark">
            <Icon name="mdi:telegram" size="24" />
          </a>
        </div>
      </div>

      <!-- Form liên hệ -->
      <div class="bg-white p-6 rounded-lg shadow-soft">
        <h2 class="text-2xl font-semibold mb-4">{{ $t('sendMessage') }}</h2>
        <form @submit.prevent="submitForm" class="space-y-4">
          <div>
            <label for="name" class="form-label">{{ $t('fullName') }}</label>
            <input type="text" id="name" v-model="name" class="form-input" required>
          </div>
          <div>
            <label for="email" class="form-label">{{ $t('email') }}</label>
            <input type="email" id="email" v-model="email" class="form-input" required>
          </div>
          <div>
            <label for="subject" class="form-label">{{ $t('subject') }}</label>
            <input type="text" id="subject" v-model="subject" class="form-input" required>
          </div>
          <div>
            <label for="message" class="form-label">{{ $t('message') }}</label>
            <textarea id="message" v-model="message" rows="4" class="form-input" required></textarea>
          </div>
          <button type="submit" class="btn-primary w-full">{{ $t('send') }}</button>
        </form>
      </div>
    </div>

    <!-- Bản đồ -->
    <div class="mt-12">
      <h2 class="text-2xl font-semibold mb-4">{{ $t('findMe') }}</h2>
      <div class="h-96 rounded-lg overflow-hidden">
        <iframe
          width="100%"
          height="100%"
          frameborder="0"
          style="border:0"
          :src="mapUrl"
          allowfullscreen
        ></iframe>
      </div>
    </div>

    <!-- FAQ -->
    <div class="mt-12">
      <h2 class="text-2xl font-semibold mb-4">{{ $t('faq') }}</h2>
      <div class="space-y-4">
        <div v-for="(item, index) in faqItems" :key="index" class="bg-white p-4 rounded-lg shadow-soft">
          <h3 class="text-lg font-medium text-dark mb-2">{{ item.question }}</h3>
          <p class="text-muted">{{ item.answer }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

const name = ref('')
const email = ref('')
const subject = ref('')
const message = ref('')

const submitForm = () => {
  // Xử lý gửi form ở đây
  console.log('Form submitted:', { name: name.value, email: email.value, subject: subject.value, message: message.value })
  // Reset form
  name.value = ''
  email.value = ''
  subject.value = ''
  message.value = ''
}

const faqItems = ref([
  {
    question: t('faqQuestion1'),
    answer: t('faqAnswer1')
  },
  {
    question: t('faqQuestion2'),
    answer: t('faqAnswer2')
  },
  {
    question: t('faqQuestion3'),
    answer: t('faqAnswer3')
  },
  // Thêm các câu hỏi và câu trả lời khác ở đây
])

const mapUrl = ref('https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3919.4241674797!2d106.69839661533457!3d10.778764192321388!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31752f38f9ed887b%3A0x14aded5703768989!2zSOG7kyBDaMOtIE1pbmgsIFRow6BuaCBwaOG7kSBI4buTIENow60gTWluaCwgVmnhu4d0IE5hbQ!5e0!3m2!1svi!2s!4v1619684665400!5m2!1svi!2s')
</script>

<style scoped>
.form-label {
  @apply block text-dark mb-2 font-medium;
}

.form-input {
  @apply w-full px-4 py-3 border border-muted rounded-lg focus:outline-none focus:ring-2 focus:ring-accent transition duration-300;
  background-color: white; /* Thêm dòng này */
  -webkit-appearance: none; /* Thêm dòng này */
  -moz-appearance: none; /* Thêm dòng này */
  appearance: none; /* Thêm dòng này */
}

.form-input:focus {
  background-color: white; /* Thêm dòng này */
}

.btn-primary {
  @apply bg-accent hover:bg-accent-dark text-white font-bold py-3 px-8 rounded-full transition duration-300 inline-block;
}

.shadow-soft {
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
}
</style>
