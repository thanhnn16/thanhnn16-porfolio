<template>
  <form @submit.prevent="handleSubmit">
    <input
      v-model="email"
      type="email"
      required
      pattern="[^@\s]+@[^@\s]+\.[^@\s]+"
      :class="{ 'border-red-500': !isValidEmail }"
    />
    <!-- ... other fields ... -->
  </form>
</template>

<script setup lang="ts">
import { useSecurity } from '~/composables/useSecurity'

const { validateEmail, sanitizeInput } = useSecurity()
const email = ref('')
const message = ref('')

const isValidEmail = computed(() => validateEmail(email.value))

const handleSubmit = async () => {
  if (!isValidEmail.value) return

  const sanitizedMessage = sanitizeInput(message.value)
  // Process form...
}
</script> 