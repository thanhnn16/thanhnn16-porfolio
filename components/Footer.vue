<template>
  <footer class="bg-blue-900 text-white py-4">
    <div class="container mx-auto px-6 text-center">
      <p>&copy; {{ new Date().getFullYear() }} {{ $t('yourName') }}. {{ $t('allRightsReserved') }}</p>
    </div>
  </footer>
</template>

<script setup>
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
</script>
