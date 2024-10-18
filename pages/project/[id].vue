<template>
  <div v-if="project" class="container mx-auto py-20 px-4">
    <h1 class="text-4xl font-bold text-dark mb-8 text-center gsap-fade-in">{{ project.name }}</h1>
    
    <div class="mb-12 gsap-slide-up">
      <Carousel :items-to-show="1" :wrap-around="true">
        <Slide v-for="(media, index) in project.media" :key="index">
          <div class="carousel__item">
            <img v-if="media.type === 'image'" :src="media.url" :alt="project.name" class="w-full h-96 object-cover rounded-lg shadow-md">
            <video v-else-if="media.type === 'video'" controls class="w-full h-96 object-cover rounded-lg shadow-md">
              <source :src="media.url" type="video/mp4">
              Your browser does not support the video tag.
            </video>
          </div>
        </Slide>

        <template #addons>
          <Navigation />
          <Pagination />
        </template>
      </Carousel>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12 gsap-slide-up">
      <div>
        <h2 class="text-2xl font-semibold text-dark mb-4">{{ t('projectDescription') }}</h2>
        <p class="text-muted mb-4">{{ project.description }}</p>
      </div>
      <div>
        <h2 class="text-2xl font-semibold text-dark mb-4">{{ t('projectDetails') }}</h2>
        <ul class="list-disc list-inside text-muted">
          <li>{{ t('projectType') }}: {{ project.type }}</li>
          <li>{{ t('projectDuration') }}: {{ project.duration }}</li>
          <li>{{ t('projectTechnologies') }}: {{ project.technologies.join(', ') }}</li>
        </ul>
      </div>
    </div>

    <div class="mb-12 gsap-slide-up">
      <h2 class="text-2xl font-semibold text-dark mb-4">{{ t('projectFeatures') }}</h2>
      <ul class="list-disc list-inside text-muted">
        <li v-for="feature in project.features" :key="feature">{{ feature }}</li>
      </ul>
    </div>

    <div class="mb-12 gsap-slide-up">
      <h2 class="text-2xl font-semibold text-dark mb-4">{{ t('projectChallenges') }}</h2>
      <p class="text-muted">{{ project.challenges }}</p>
    </div>

    <div class="gsap-slide-up">
      <h2 class="text-2xl font-semibold text-dark mb-4">{{ t('projectOutcome') }}</h2>
      <p class="text-muted">{{ project.outcome }}</p>
    </div>
  </div>
  <div v-else class="container mx-auto py-20 px-4 text-center">
    <p class="text-xl text-muted">{{ t('projectNotFound') }}</p>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { gsap } from 'gsap'

const route = useRoute()
const { t } = useI18n()
const project = ref(null)

onMounted(() => {
  // Giả lập việc lấy dữ liệu dự án từ API hoặc store
  const projects = [
    {
      id: 1,
      name: 'Ứng dụng di động 1',
      description: 'Mô tả chi tiết về ứng dụng di động 1.',
      media: [
        { type: 'image', url: 'https://placehold.co/600x400' },
        { type: 'image', url: 'https://placehold.co/600x400' },
        { type: 'image', url: 'https://placehold.co/600x400' },
        { type: 'video', url: 'https://example.com/video1.mp4' },
      ],
      type: 'Mobile',
      duration: '3 tháng',
      technologies: ['React Native', 'Firebase', 'Redux'],
      features: [
        'Đăng nhập và xác thực người dùng',
        'Tìm kiếm và lọc sản phẩm',
        'Giỏ hàng và thanh toán',
      ],
      challenges: 'Một trong những thách thức lớn nhất là tối ưu hóa hiệu suất ứng dụng trên các thiết bị có cấu hình thấp.',
      outcome: 'Ứng dụng đã được phát hành trên cả App Store và Google Play, nhận được phản hồi tích cực từ người dùng với điểm đánh giá trung bình 4.5 sao.',
    },
  ]
  
  project.value = projects.find(p => p.id === parseInt(route.params.id))

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
  max-width: 1200px;
}

h1, h2 {
  color: #2c3e50;
}

.text-muted {
  color: #6c757d;
}

.carousel__item {
  min-height: 200px;
  width: 100%;
  background-color: #f1f1f1;
  color: #fff;
  font-size: 20px;
  border-radius: 8px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.carousel__slide {
  padding: 10px;
}

.carousel__prev,
.carousel__next {
  box-sizing: content-box;
  border: 5px solid white;
}
</style>
