<template>
  <div class="space-y-24">
    <div class="parallax-container h-screen">
      <div class="parallax-bg"></div>
      <section class="relative h-full flex items-center justify-center overflow-hidden">
        <div class="container mx-auto text-center relative z-10">
          <h1 class="text-6xl font-bold mb-6 text-dark">
            <span class="typing-effect">{{ typedText }}</span>
          </h1>
          <p class="text-2xl mb-10 text-dark">{{ $t('profession') }}</p>
          <a href="#contact" @click.prevent="scrollToContact" class="btn-primary hover:scale-105 transform transition duration-300">
            {{ $t('contactMe') }}
          </a>
        </div>
      </section>
    </div>

    <!-- About Me Section -->
    <section class="container mx-auto">
      <h2 class="section-title">{{ $t('about') }}</h2>
      <div class="flex flex-col md:flex-row items-center gap-12">
        <img src="https://placehold.co/300x300" :alt="$t('yourName')" class="rounded-full w-64 h-64 object-cover shadow-lg">
        <div>
          <p class="text-lg text-muted mb-6">
            {{ $t('aboutDescription') }}
          </p>
          <a href="/about" class="btn-secondary">{{ $t('readMoreAboutMe') }}</a>
        </div>
      </div>
    </section>

    <!-- Featured Projects Section -->
    <section class="bg-light py-20">
      <div class="container mx-auto">
        <h2 class="section-title">{{ $t('featuredProjects') }}</h2>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <ProjectCard v-for="project in featuredProjects" :key="project.id" :project="project" />
        </div>
        <div class="text-center mt-12">
          <a href="/projects" class="btn-secondary">{{ $t('viewAllProjects') }}</a>
        </div>
      </div>
    </section>

    <!-- Skills Section -->
    <section id="skills" class="py-16">
      <h2 class="section-title">{{ $t('skills') }}</h2>
      <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div v-for="category in skillCategories" :key="category.title" class="skill-category">
          <h3 class="text-2xl font-semibold mb-4 text-dark">{{ category.title }}</h3>
          <ul class="space-y-3">
            <li v-for="skill in category.skills" :key="skill.name" class="skill-item">
              <div class="flex items-center mb-1">
                <span class="skill-tag mr-2">{{ skill.name }}</span>
                <div class="flex-grow h-2 bg-gray-200 rounded-full">
                  <div class="h-2 bg-accent rounded-full" :style="{ width: `${skill.level}%` }"></div>
                </div>
              </div>
              <p class="text-muted text-sm">{{ skill.description }}</p>
            </li>
          </ul>
        </div>
      </div>
    </section>

    <!-- Education and Certifications Section -->
    <section class="bg-light py-20">
      <div class="container mx-auto">
        <h2 class="section-title">{{ $t('educationAndAwards') }}</h2>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div class="bg-white p-8 rounded-lg shadow-soft">
            <h3 class="text-xl font-semibold text-dark mb-4">{{ $t('education') }}</h3>
            <div v-for="edu in education" :key="edu.school" class="mb-4">
              <h4 class="text-lg font-medium text-dark">{{ edu.school }}</h4>
              <p class="text-muted">{{ edu.major }}</p>
              <p class="text-sm text-accent">{{ edu.period }}</p>
              <p v-if="edu.gpa" class="text-sm text-secondary">{{ $t('gpa') }}: {{ edu.gpa }}</p>
            </div>
          </div>
          <div class="bg-white p-8 rounded-lg shadow-soft">
            <h3 class="text-xl font-semibold text-dark mb-4">{{ $t('awards') }}</h3>
            <ul class="space-y-4">
              <li v-for="award in awards" :key="award.title" class="border-b border-muted pb-4 last:border-b-0 last:pb-0">
                <h4 class="font-medium text-dark">{{ award.title }}</h4>
                <p class="text-sm text-muted">{{ award.organization }}</p>
                <p class="text-sm text-accent">{{ award.date }}</p>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>

    <!-- Contact Form Section -->
    <section id="contact" class="container mx-auto">
      <h2 class="section-title">{{ $t('contactMe') }}</h2>
      <form @submit.prevent="submitForm" class="max-w-lg mx-auto space-y-6">
        <div>
          <label for="name" class="form-label">{{ $t('fullName') }}</label>
          <input type="text" id="name" v-model="name" class="form-input" required>
        </div>
        <div>
          <label for="email" class="form-label">{{ $t('email') }}</label>
          <input type="email" id="email" v-model="email" class="form-input" required>
        </div>
        <div>
          <label for="message" class="form-label">{{ $t('message') }}</label>
          <textarea id="message" v-model="message" rows="4" class="form-input" required></textarea>
        </div>
        <button type="submit" class="btn-primary w-full">{{ $t('send') }}</button>
      </form>
    </section>

    <section v-for="(section, index) in sections" :key="index" class="fade-in-section" :class="{ 'is-visible': section.isVisible }">
      <!-- Nội dung của từng section -->
    </section>
  </div>
</template>
<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const { t } = useI18n()

const featuredProjects = ref([
  {
    id: 1,
    name: t('project1Name'),
    description: t('project1Description'),
    image: 'https://placehold.co/600x400',
    type: t('mobileApp'),
  },
  {
    id: 2,
    name: t('project2Name'),
    description: t('project2Description'),
    image: 'https://placehold.co/600x400',
    type: t('website'),
  },
  {
    id: 3,
    name: t('project3Name'),
    description: t('project3Description'),
    image: 'https://placehold.co/600x400',
    type: t('webApp'),
  },
])

const name = ref('')
const email = ref('')
const message = ref('')

const submitForm = () => {
  // Xử lý gửi form ở đây
  console.log('Form submitted:', { name: name.value, email: email.value, message: message.value })
  // Reset form
  name.value = ''
  email.value = ''
  message.value = ''
}

const scrollToContact = () => {
  const contactSection = document.getElementById('contact')
  if (contactSection) {
    contactSection.scrollIntoView({ behavior: 'smooth' })
  }
}

const skillCategories = [
  {
    title: t('webDevelopment'),
    skills: [
      { name: 'HTML5', description: t('html5Description'), level: 90 },
      { name: 'CSS', description: t('cssDescription'), level: 85 },
      { name: 'JavaScript', description: t('javascriptDescription'), level: 80 },
      { name: 'Nuxt.js', description: t('nuxtjsDescription'), level: 75 },
      { name: 'Laravel', description: t('laravelDescription'), level: 70 },
    ]
  },
  {
    title: t('mobileDevelopment'),
    skills: [
      { name: 'React Native', description: t('reactNativeDescription'), level: 80 },
      { name: 'Expo', description: t('expoDescription'), level: 75 },
      { name: 'Kotlin', description: t('kotlinDescription'), level: 65 },
      { name: 'Flutter', description: t('flutterDescription'), level: 60 },
    ]
  },
  {
    title: t('uiUxDesign'),
    skills: [
      { name: 'Figma', description: t('figmaDescription'), level: 85 },
      { name: t('uiMobile'), description: t('uiMobileDescription'), level: 80 },
      { name: t('prototype'), description: t('prototypeDescription'), level: 75 },
    ]
  }
]

const education = ref([
  {
    school: t('fptPolytechnic'),
    major: t('mobileAppDevelopment'),
    period: t('fptPolytechnicPeriod'),
    gpa: '9.4'
  },
  {
    school: t('hoChiMinhOpenUniversity'),
    major: t('japanese'),
    period: t('hoChiMinhOpenUniversityPeriod'),
    gpa: t('academicResultsReserved')
  }
])

const awards = ref([
  {
    title: t('top150ExcellentStudents'),
    organization: t('fptPolytechnic'),
    date: '2023 & 2024'
  },
  {
    title: t('fiveAwardsInSixSemesters'),
    organization: t('fptPolytechnic'),
    date: '2023 & 2024'
  },
  {
    title: t('top50ExcellentLeaders'),
    organization: t('fptPolytechnic'),
    date: t('july2023')
  },
  {
    title: t('secondPrizeMobileAppChallenge'),
    organization: t('fptPolytechnic'),
    date: t('july2023')
  },
  {
    title: t('mostOutstandingActiveStudent'),
    organization: t('fptPolytechnic'),
    date: t('october2024')
  }
])

const sections = ref([
  { isVisible: false },
  { isVisible: false },
  { isVisible: false },
  { isVisible: false },
  { isVisible: false },
])

const checkScroll = () => {
  sections.value.forEach((section, index) => {
    const sectionElement = document.querySelectorAll('.fade-in-section')[index]
    if (sectionElement) {
      const rect = sectionElement.getBoundingClientRect()
      const isVisible = rect.top <= window.innerHeight * 0.75 && rect.bottom >= 0
      section.isVisible = isVisible
    }
  })
}
const handleParallax = () => {
  const parallaxBg = document.querySelector('.parallax-bg')
  if (parallaxBg) {
    const scrollPosition = window.scrollY
    parallaxBg.style.transform = `translateY(${scrollPosition * 0.5}px)`
  }
}

onMounted(() => {
  window.addEventListener('scroll', handleParallax)
  window.addEventListener('scroll', checkScroll)
  checkScroll()
  typeText()
})

const typedText = ref('')
const fullText = t('greeting', { name: t('yourName') })

const typeText = async () => {
  for (let i = 0; i <= fullText.length; i++) {
    typedText.value = fullText.slice(0, i)
    await new Promise(resolve => setTimeout(resolve, 100))
  }
}

onUnmounted(() => {
  window.removeEventListener('scroll', handleParallax)
  window.removeEventListener('scroll', checkScroll)
})
</script>

<style scoped>
.section-title {
  @apply text-4xl font-bold text-dark mb-12 text-center;
}

.btn-primary {
  @apply bg-accent hover:bg-accent-dark text-white font-bold py-3 px-8 rounded-full transition duration-300 inline-block;
}

.btn-secondary {
  @apply bg-white hover:bg-gray-100 text-accent font-bold py-3 px-8 rounded-full transition duration-300 inline-block border border-accent;
}

.skill-tag {
  @apply bg-accent bg-opacity-10 px-3 py-1 rounded-full text-accent font-medium text-sm whitespace-nowrap mb-1 inline-block;
}

.form-label {
  @apply block text-dark mb-2 font-medium;
}

.form-input {
  @apply w-full px-4 py-3 border border-muted rounded-lg focus:outline-none focus:ring-2 focus:ring-accent transition duration-300;
  background-color: white; /* Đặt màu nền mặc định */
}

/* Loại bỏ màu nền vàng khi tự động điền */
.form-input:-webkit-autofill,
.form-input:-webkit-autofill:hover,
.form-input:-webkit-autofill:focus,
.form-input:-webkit-autofill:active {
  -webkit-box-shadow: 0 0 0 30px white inset !important;
  -webkit-text-fill-color: #1A202C !important;
}

/* Đảm bảo màu chữ khi focus vẫn là màu dark */
.form-input:focus {
  color: #1A202C;
}

.shadow-soft {
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
}

/* Thêm các lớp mới để tăng độ tương phản */
.text-dark {
  @apply text-gray-800;
}

.text-muted {
  @apply text-gray-600;
}

.skill-category {
  @apply bg-white p-6 rounded-lg shadow-soft transition duration-300 hover:shadow-hover;
}

.skill-item {
  @apply mb-4 last:mb-0;
}

.fade-in-section {
  opacity: 0;
  transform: translateY(20px);
  transition: opacity 0.6s ease-out, transform 0.6s ease-out;
}

.fade-in-section.is-visible {
  opacity: 1;
  transform: translateY(0);
}


.project-card {
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.project-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
}

.typing-effect::after {
  content: '|';
  animation: blink 0.7s infinite;
}

@keyframes blink {
  0%, 100% { opacity: 1; }
  50% { opacity: 0; }
}

.parallax-container {
  position: relative;
  overflow: hidden;
}

.parallax-bg {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-image: url('https://picsum.photos/2560/1440'); /* Sử dụng hình mẫu từ Lorem Picsum */
  background-size: cover;
  background-position: center;
  transform: translateY(0);
  z-index: -1;
  will-change: transform;
}


</style>
