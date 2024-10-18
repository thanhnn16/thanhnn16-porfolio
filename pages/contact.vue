<template>
  <div class="container mx-auto py-20 px-4">
    <h1 class="text-4xl font-bold text-dark mt-12 mb-12 text-center gsap-fade-in">{{ $t('contact') }}</h1>

    <!-- Thông tin liên hệ -->
    <section class="gsap-slide-up mb-12">
      <h2 class="text-2xl font-semibold text-dark mb-6">{{ $t('contactInfo') }}</h2>
      <ul class="space-y-4">
        <li class="flex items-center">
          <Icon name="mdi:phone" size="24" class="mr-3 text-accent" />
          <a href="tel:+84879159499" class="text-muted hover:text-accent">+84 879 159 499 ({{ $t('zalo') }})</a>
        </li>
        <li class="flex items-center">
          <Icon name="mdi:email" size="24" class="mr-3 text-accent" />
          <a href="mailto:thanhnn16.work@gmail.com" class="text-muted hover:text-accent">thanhnn16.work@gmail.com</a>
        </li>
        <li class="flex items-center">
          <Icon name="mdi:github" size="24" class="mr-3 text-accent" />
          <a href="https://github.com/thanhnn16" target="_blank" rel="noopener noreferrer" class="text-muted hover:text-accent">github.com/thanhnn16</a>
        </li>
        <li class="flex items-center">
          <Icon name="mdi:youtube" size="24" class="mr-3 text-accent" />
          <a href="https://www.youtube.com/@thanhnn16" target="_blank" rel="noopener noreferrer" class="text-muted hover:text-accent">@thanhnn16</a>
        </li>
        <li class="flex items-center">
          <Icon name="mdi:map-marker" size="24" class="mr-3 text-accent" />
          <span class="text-muted">362/29/11 Thống Nhất, P16, Gò Vấp, HCM</span>
        </li>
      </ul>
    </section>

    <!-- Form liên hệ -->
    <section class="gsap-slide-up mb-12">
      <h2 class="text-2xl font-semibold text-dark mb-6">{{ $t('sendMessage') }}</h2>
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
    </section>

    <!-- Frequently Asked Questions -->
    <section class="mt-16 gsap-slide-up">
      <h2 class="text-2xl font-semibold text-dark mb-6">{{ $t('faq') }}</h2>
      <div class="space-y-6">
        <div v-for="(question, index) in faqQuestions" :key="index">
          <h3 class="text-xl font-semibold mb-2">{{ $t(question.questionKey) }}</h3>
          <p class="text-muted">{{ $t(question.answerKey) }}</p>
        </div>
      </div>
    </section>

    <!-- Bản đồ -->
    <section class="mt-16 gsap-slide-up">
      <h2 class="text-2xl font-semibold text-dark mb-6">{{ $t('findMe') }}</h2>
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
    </section>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useI18n } from 'vue-i18n'
import { gsap } from 'gsap'

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

const mapUrl = ref('https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3918.578968773864!2d106.66349611142522!3d10.843497389264803!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x317529aff19f1b67%3A0x8f055637bb507dea!2zMzYyLzI5LzExIMSQLiBUaOG7kW5nIE5o4bqldCwgUGjGsOG7nW5nIDE2LCBHw7IgVuG6pXAsIEjhu5MgQ2jDrSBNaW5oLCBWaeG7h3QgTmFt!5e0!3m2!1svi!2s!4v1729235066920!5m2!1svi!2s')

const faqQuestions = [
  { questionKey: 'faqQuestion1', answerKey: 'faqAnswer1' },
  { questionKey: 'faqQuestion2', answerKey: 'faqAnswer2' },
  { questionKey: 'faqQuestion3', answerKey: 'faqAnswer3' },
]

onMounted(() => {
  gsap.from('.gsap-fade-in', { 
    opacity: 0, 
    duration: 1.5, 
    ease: 'power2.out' 
  })

  gsap.from('.gsap-slide-up', { 
    y: 50, 
    opacity: 0, 
    duration: 1, 
    stagger: 0.2, 
    ease: 'power2.out' 
  })
})
</script>

<style scoped>
.container {
  max-width: 800px;
}

h1, h2, h3 {
  color: #2c3e50;
}

.text-muted {
  color: #6c757d;
}

section {
  background-color: #ffffff;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  padding: 2rem;
  transition: transform 0.3s ease;
}

section:hover {
  transform: translateY(-5px);
}

.form-label {
  @apply block text-dark mb-2 font-medium;
}

.form-input {
  @apply w-full px-4 py-3 border border-muted rounded-lg focus:outline-none focus:ring-2 focus:ring-accent transition duration-300;
  background-color: white;
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
}

.form-input:focus {
  background-color: white;
}

.btn-primary {
  @apply bg-accent hover:bg-accent-dark text-white font-bold py-3 px-8 rounded-full transition duration-300 inline-block;
}

@media (max-width: 768px) {
  .container {
    padding: 1rem;
  }
  
  section {
    padding: 1.5rem;
  }
}

/* Remove the grid styles if they're no longer needed */
</style>
