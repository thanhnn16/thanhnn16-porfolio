<template>
  <div class="container mx-auto py-20 px-4">
    <h1 class="text-4xl font-bold text-dark mt-12 mb-12 text-center gsap-fade-in">{{ $t('about') }}</h1>

    <!-- Phần giới thiệu -->
    <section class="mb-16 gsap-slide-up">
      <div class="flex flex-col md:flex-row items-center gap-12">
        <img src="@/assets/images/avatar.png" :alt="$t('yourName')" class="rounded-full w-64 h-64 object-cover shadow-lg">
        <div>
          <h2 class="text-2xl font-semibold text-dark mb-4">{{ $t('aboutMe') }}</h2>
          <p class="text-lg text-muted mb-6">
            {{ $t('aboutMeDescription') }}
          </p>
        </div>
      </div>
    </section>

    <!-- Phần mục tiêu nghề nghiệp -->
    <section class="mb-16 gsap-slide-up">
      <h2 class="text-2xl font-semibold text-dark mb-6">{{ $t('careerObjective') }}</h2>
      <p class="text-muted">
        {{ $t('careerObjectiveDescription') }}
      </p>
    </section>

    <!-- Phần kinh nghiệm làm việc và dự án cá nhân -->
    <section class="mb-16 gsap-slide-up">
      <h2 class="text-2xl font-semibold text-dark mb-6">{{ $t('workExperienceAndProjects') }}</h2>
      <div class="space-y-8">
        <div class="experience-item">
          <h3 class="text-xl font-semibold mb-2">{{ $t('nt3techDeveloper') }}</h3>
          <p class="text-sm text-muted mb-2">03/2024 - Present</p>
          <p class="text-muted mb-2">{{ $t('nt3techDescription') }}</p>
          <ul class="list-disc list-inside text-muted">
            <li>{{ $t('luckyDrawProject') }}</li>
            <li>{{ $t('luckyDrawTechnologies') }}</li>
          </ul>
        </div>

        <div class="experience-item">
          <h3 class="text-xl font-semibold mb-2">{{ $t('bongTuyetTrangProject') }}</h3>
          <p class="text-sm text-muted mb-2">02/2024 - 05/2024</p>
          <p class="text-muted mb-2">{{ $t('bongTuyetTrangDescription') }}</p>
          <ul class="list-disc list-inside text-muted">
            <li>{{ $t('bongTuyetTrangMobileApp') }}</li>
            <li>{{ $t('bongTuyetTrangWebDashboard') }}</li>
            <li>{{ $t('bongTuyetTrangTechnologies') }}</li>
          </ul>
        </div>

        <div class="experience-item">
          <h3 class="text-xl font-semibold mb-2">{{ $t('allureSpaProject') }}</h3>
          <p class="text-sm text-muted mb-2">02/2024 - 05/2024</p>
          <p class="text-muted mb-2">{{ $t('allureSpaDescription') }}</p>
          <ul class="list-disc list-inside text-muted">
            <li>{{ $t('allureSpaMobileApp') }}</li>
            <li>{{ $t('allureSpaWebDashboard') }}</li>
            <li>{{ $t('allureSpaTechnologies') }}</li>
          </ul>
        </div>

        <div class="experience-item">
          <h3 class="text-xl font-semibold mb-2">{{ $t('studentResidenceTutor') }}</h3>
          <p class="text-sm text-muted mb-2">10/2022 - Present</p>
          <p class="text-muted">{{ $t('studentResidenceTutorDescription') }}</p>
        </div>
      </div>
    </section>

    <!-- Phần ngôn ngữ -->
    <section class="mb-16 gsap-slide-up">
      <h2 class="text-2xl font-semibold text-dark mb-6">{{ $t('languages') }}</h2>
      <ul class="space-y-4">
        <li>
          <h3 class="text-xl font-semibold">{{ $t('englishProficiency') }}</h3>
          <p class="text-muted">{{ $t('englishProficiencyDescription') }}</p>
        </li>
        <li>
          <h3 class="text-xl font-semibold">{{ $t('japaneseProficiency') }}</h3>
          <p class="text-muted">{{ $t('japaneseProficiencyDescription') }}</p>
        </li>
      </ul>
    </section>

    <!-- Phần sở thích -->
    <section class="mb-16 gsap-slide-up">
      <h2 class="text-2xl font-semibold text-dark mb-6">{{ $t('interests') }}</h2>
      <p class="text-muted">{{ $t('interestsList') }}</p>
    </section>

  </div>
</template>

<script setup>
import { useI18n } from 'vue-i18n'
import { onMounted } from 'vue'
import { gsap } from 'gsap'

const { t } = useI18n()

const skills = [
  'Mobile Development',
  'Web Development',
  'Laravel',
  'VPS',
  'GIT',
  'Self-learning',
  'Communication',
  'Teamwork',
  'Research',
  'AI utilization',
  'Problem solving',
  'REST APIs',
  'MySQL',
  'Node.js',
  'Agile'
]

const education = [
  {
    school: 'FPT Polytechnic',
    degree: 'Mobile App Development',
    period: 'August, 2022 - Present',
    gpa: '9.4'
  },
  {
    school: 'Ho Chi Minh Open University',
    degree: 'Japanese',
    period: 'October, 2017 - October, 2022',
    gpa: null
  }
]

const awards = [
  {
    title: 'Top 150 Outstanding Students',
    description: 'Received 5 awards in 6 semesters',
    date: '2023 & 2024'
  },
  {
    title: 'Top 50 Outstanding Leaders',
    description: 'Activities & Classroom Management',
    date: 'October, 2023'
  },
  {
    title: 'Mobile App Challenge',
    description: 'Ranked second',
    date: 'July, 2023'
  }
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

img {
  border: 4px solid #ffffff;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

@media (max-width: 768px) {
  .container {
    padding: 1rem;
  }
  
  section {
    padding: 1.5rem;
  }
}

.experience-item {
  background-color: #f8f9fa;
  border-left: 4px solid #007bff;
  padding: 1rem;
  border-radius: 4px;
  transition: all 0.3s ease;
}

.experience-item:hover {
  transform: translateX(5px);
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.experience-item h3 {
  color: #007bff;
}

.experience-item ul {
  margin-top: 0.5rem;
}

.experience-item li {
  margin-bottom: 0.25rem;
}
</style>
