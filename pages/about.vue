<template>
  <div class="container mx-auto py-20">
    <h1 class="text-4xl font-bold text-dark mb-12 text-center">{{ $t('about') }}</h1>

    <!-- Phần giới thiệu -->
    <section class="mb-16">
      <div class="flex flex-col md:flex-row items-center gap-12">
        <img src="https://placehold.co/300x300" :alt="$t('yourName')" class="rounded-full w-64 h-64 object-cover shadow-lg">
        <div>
          <h2 class="text-2xl font-semibold text-dark mb-4">{{ $t('aboutMe') }}</h2>
          <p class="text-lg text-muted mb-6">
            {{ $t('aboutDescription') }}
          </p>
        </div>
      </div>
    </section>

    <!-- Phần kinh nghiệm làm việc -->
    <section class="mb-16">
      <h2 class="text-2xl font-semibold text-dark mb-6">{{ $t('workExperience') }}</h2>
      <div class="space-y-8">
        <!-- Thêm các mục kinh nghiệm làm việc ở đây -->
      </div>
    </section>

    <!-- Phần kỹ năng -->
    <section class="mb-16">
      <h2 class="text-2xl font-semibold text-dark mb-6">{{ $t('skills') }}</h2>
      <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
        <!-- Sao chép phần kỹ năng từ trang index.vue -->
      </div>
    </section>

    <!-- Phần giáo dục -->
    <section class="mb-16">
      <h2 class="text-2xl font-semibold text-dark mb-6">{{ $t('education') }}</h2>
      <div class="space-y-6">
        <!-- Sao chép phần giáo dục từ trang index.vue -->
      </div>
    </section>

    <!-- Phần giải thưởng và chứng chỉ -->
    <section class="mb-16">
      <h2 class="text-2xl font-semibold text-dark mb-6">{{ $t('awardsAndCertifications') }}</h2>
      <div class="space-y-6">
        <!-- Sao chép phần giải thưởng từ trang index.vue -->
      </div>
    </section>

    <!-- Phần sở thích và hoạt động ngoại khóa -->
    <section class="mb-16">
      <h2 class="text-2xl font-semibold text-dark mb-6">{{ $t('hobbiesAndActivities') }}</h2>
      <ul class="list-disc list-inside text-muted">
        <!-- Thêm danh sách sở thích và hoạt động ngoại khóa ở đây -->
      </ul>
    </section>

    <!-- Phần mục tiêu nghề nghiệp -->
    <section class="mb-16">
      <h2 class="text-2xl font-semibold text-dark mb-6">{{ $t('careerGoals') }}</h2>
      <p class="text-muted">
        <!-- Thêm mô tả về mục tiêu nghề nghiệp ở đây -->
      </p>
    </section>

    <!-- Phần liên hệ -->
    <section>
      <h2 class="text-2xl font-semibold text-dark mb-6">{{ $t('contactInfo') }}</h2>
      <ul class="space-y-2 text-muted">
        <!-- Thêm thông tin liên hệ ở đây -->
      </ul>
    </section>
  </div>
</template>

<script setup>
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

// Thêm các biến và logic cần thiết ở đây
</script>

<style scoped>
/* Thêm các styles cụ thể cho trang About nếu cần */
</style>
