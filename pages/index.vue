<template>
  <div class="space-y-24">
    <div class="parallax-container h-screen">
      <div class="parallax-bg"></div>
      <section class="relative h-full flex items-center justify-center overflow-hidden">
        <div class="container mx-auto text-center relative z-5">
          <h1 class="text-6xl font-bold mb-6 text-dark">
            <span class="typing-effect"></span>
          </h1>
          <p class="text-2xl mb-10 text-dark">{{ $t('profession') }}</p>
          <a href="#contact" @click.prevent="scrollToContact"
            class="btn-primary hover:scale-105 transform transition duration-300">
            {{ $t('contactMe') }}
          </a>
        </div>
      </section>
    </div>

    <section class="fade-in-section min-h-screen py-20">
      <h2 class="section-title">{{ $t('about') }}</h2>
      <div class="flex flex-col md:flex-row items-center gap-12">
        <img src="@/assets/images/avatar.png" :alt="$t('yourName')"
          class="rounded-full w-64 h-64 object-cover shadow-lg">
        <div>
          <p class="text-lg text-muted mb-6">
            {{ $t('indexAboutDescription') }}
          </p>
          <a href="/about" class="btn-secondary">{{ $t('readMoreAboutMe') }}</a>
        </div>
      </div>
    </section>

    <section class="fade-in-section min-h-screen py-20 bg-light">
      <h2 class="section-title">{{ $t('featuredProjects') }}</h2>
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <ProjectCard v-for="project in featuredProjects" :key="project.id" :project="project" />
      </div>
      <div class="text-center mt-12">
        <a href="/projects" class="btn-secondary">{{ $t('viewAllProjects') }}</a>
      </div>
    </section>

    <section id="skills" class="fade-in-section min-h-screen py-20">
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

    <section class="fade-in-section min-h-screen py-20 bg-light">
      <h2 class="section-title">{{ $t('educationAndAwards') }}</h2>
      <p class="text-center text-muted mb-8">{{ $t('hoverToViewDetails') }}</p>
      <div class="max-w-4xl mx-auto">
        <div class="timeline">
          <TimelineItem 
            v-for="item in timelineItems" 
            :key="item.id"  
            :item="item"
          />
        </div>
      </div>
    </section>

    <section id="contact" class="fade-in-section min-h-screen py-20">
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


  </div>
</template>

<script setup>
import { ref, onMounted, nextTick, computed, watch } from 'vue'
import { useLangStore } from '@/stores/lang'

const { $gsap: gsap, $ScrollTrigger: ScrollTrigger, $TextPlugin: TextPlugin } = useNuxtApp()

const { t } = useI18n()
const langStore = useLangStore()

const featuredProjects = computed(() => [
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

const skillCategories = computed(() => [
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
])

const education = computed(() => [
  {
    title: t('fptPolytechnic'),
    date: t('fptPolytechnicPeriod'),
    description: `${t('mobileAppDevelopment')} - ${t('gpa')}: 9.4`,
  },
  {
    title: t('hoChiMinhOpenUniversity'),
    date: t('hoChiMinhOpenUniversityPeriod'),
    description: `${t('japanese')} - ${t('academicResultsReserved')}`,
  }
])

const awards = computed(() => [
  {
    id: 1,
    title: t('top150ExcellentStudents'),
    organization: t('fptPolytechnic'),
    date: '2023 & 2024',
    description: t('top150ExcellentStudentsDescription'),
  },
  {
    id: 2,
    title: t('fiveAwardsInSixSemesters'),
    organization: t('fptPolytechnic'),
    date: '2023 & 2024',
    description: t('fiveAwardsInSixSemestersDescription'),
  },
  {
    id: 3,
    title: t('top50ExcellentLeaders'),
    organization: t('fptPolytechnic'),
    date: t('july2023'),
    description: t('top50ExcellentLeadersDescription'),
  },
  {
    id: 4,
    title: t('secondPrizeMobileAppChallenge'),
    organization: t('fptPolytechnic'),
    date: t('july2023'),
    description: t('secondPrizeMobileAppChallengeDescription'),
  },
  {
    id: 5,
    title: t('mostOutstandingActiveStudent'),
    organization: t('fptPolytechnic'),
    date: t('october2024'),
    description: t('mostOutstandingActiveStudentDescription'),
  }
])

const timelineItems = computed(() => {
  const items = [
    ...education.value.map((item, index) => ({ ...item, id: `edu_${index}`, isAward: false })),
    ...awards.value.map(item => ({ ...item, isAward: true }))
  ].sort((a, b) => new Date(b.date) - new Date(a.date))
  return items
})

const checkScroll = () => {
  sections.value.forEach((section) => {
    const sectionTop = section.getBoundingClientRect().top
    const sectionBottom = section.getBoundingClientRect().bottom

    if (sectionTop < window.innerHeight && sectionBottom >= 0) {
      section.classList.add('is-visible')
    } else {
      section.classList.remove('is-visible')
    }
  })
}

const typingText = computed(() => `${t('greeting', { name: t('yourName') })}`)

const typingAnimation = ref(null)

function updateTypingEffect() {
  if (typingAnimation.value) {
    typingAnimation.value.kill()
  }
  
  gsap.set('.typing-effect', { text: '' })
  typingAnimation.value = gsap.to('.typing-effect', {
    duration: 2,
    text: typingText.value,
    ease: "none",
  })
}

onMounted(async () => {
  if (process.client) {
    await nextTick()
    initGSAPAnimations()
    initIntersectionObserver()
    updateTypingEffect()
  }
})

watch(() => langStore.currentLang, () => {
  nextTick(() => {
    updateTypingEffect()
  })
})

function initGSAPAnimations() {
  if (!gsap) return;
}

function initIntersectionObserver() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible')
      } else {
        entry.target.classList.remove('is-visible')
      }
    })
  }, {
    threshold: 0.1
  })

  const sections = document.querySelectorAll('.fade-in-section')
  sections.forEach(section => observer.observe(section))
}
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
  background-color: white;
  /* Đặt màu nền mặc định */
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
  transform: translateY(50px);
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
  transform: translateY(-5px) scale(1.03);
  box-shadow: 0 15px 30px rgba(0, 0, 0, 0.1);
}

.typing-effect::after {
  content: '|';
  animation: blink 0.7s infinite;
}

@keyframes blink {

  0%,
  100% {
    opacity: 1;
  }

  50% {
    opacity: 0;
  }
}

.parallax-container {
  position: relative;
  overflow: hidden;
  height: 100vh;
}

.parallax-bg {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-image: url('https://picsum.photos/2560/1440');
  background-size: cover;
  background-position: center;
  transform: translateY(0);
  z-index: -1;
  will-change: transform;
}

.content-sections {
  position: relative;
  z-index: 1;
  background-color: white;
}

/* Thêm một số hiệu ứng CSS bổ sung */
.project-card {
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.project-card:hover {
  transform: translateY(-5px) scale(1.03);
  box-shadow: 0 15px 30px rgba(0, 0, 0, 0.1);
}

.skill-category {
  transition: transform 0.3s ease;
}

.skill-category:hover {
  transform: translateY(-5px);
}

.btn-primary,
.btn-secondary {
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.btn-primary:hover,
.btn-secondary:hover {
  transform: translateY(-3px) scale(1.05);
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
}

/* Thêm hiệu ứng loading spinner */
.loading-spinner {
  width: 50px;
  height: 50px;
  border: 3px solid #f3f3f3;
  border-top: 3px solid #3498db;
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }

  100% {
    transform: rotate(360deg);
  }
}

/* Thêm class cho animation */
.fade-in-section {
  opacity: 0;
  transform: translateY(50px);
  transition: opacity 0.6s ease-out, transform 0.6s ease-out;
}

.fade-in-section.active {
  opacity: 1;
  transform: translateY(0);
}

.timeline {
  @apply relative;
}

.award-item .timeline-dot {
  @apply bg-yellow-500;
}

.award-item h4 {
  @apply text-yellow-600 font-bold;
}

.award-item .timeline-content {
  @apply bg-yellow-50 rounded-lg p-4 shadow-md;
}
</style>




