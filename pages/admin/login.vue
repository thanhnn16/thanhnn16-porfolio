<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8 transition-colors duration-300">
    <UCard class="max-w-md w-full">
      <div class="relative">
        <!-- Theme Toggle Button -->
        <div class="absolute right-0 top-0">
          <UColorModeButton />
        </div>
        
        <NuxtLink to="/" class="flex justify-center">
          <img class="h-12 w-auto dark:invert transition-[filter] duration-300" src="~/assets/images/thanhnn16-logo-300x128.svg" alt="Logo" />
        </NuxtLink>
        <h2 class="mt-6 text-center text-3xl font-extrabold">
          {{ t('admin.login.title') }}
        </h2>
      </div>

      <form class="mt-8 space-y-6" @submit.prevent="handleLogin">
        <div class="space-y-4">
          <UFormGroup :label="t('admin.login.email')" name="email">
            <UInput
              v-model="email"
              type="email"
              name="email"
              :placeholder="t('admin.login.email')"
              autocomplete="email"
              required
              icon="i-heroicons-envelope"
            />
          </UFormGroup>

          <UFormGroup :label="t('admin.login.password')" name="password">
            <UInput
              v-model="password"
              type="password"
              name="password"
              :placeholder="t('admin.login.password')"
              autocomplete="current-password"
              required
              icon="i-heroicons-lock-closed"
            />
          </UFormGroup>
        </div>

        <div>
          <UButton
            type="submit"
            :loading="loading"
            :disabled="loading"
            block
            color="primary"
            :icon="loading ? 'i-heroicons-arrow-path' : 'i-heroicons-arrow-right-on-rectangle'"
          >
            {{ loading ? t('admin.login.loading') : t('admin.login.submit') }}
          </UButton>
        </div>
      </form>
    </UCard>
  </div>
</template>

<script setup lang="ts">
const { t } = useI18n()
const toast = useToast()
const router = useRouter()
const { loggedIn, fetch: refreshSession } = useUserSession()

const email = ref('')
const password = ref('')
const loading = ref(false)

const handleLogin = async () => {
  loading.value = true

  try {
    const { error } = await useFetch('/api/auth/login', {
      method: 'POST',
      body: {
        email: email.value,
        password: password.value
      }
    })

    if (error.value) {
      toast.add({
        title: t('admin.login.error'),
        description: error.value.message,
        icon: 'i-heroicons-x-circle',
        color: 'red'
      })
    } else {
      await refreshSession()
      toast.add({
        title: t('admin.login.success'),
        description: t('admin.login.redirecting'),
        icon: 'i-heroicons-check-circle',
        color: 'green'
      })
      router.push('/admin')
    }
  } catch (error: any) {
    toast.add({
      title: t('admin.login.error'),
      description: error.message || t('admin.login.invalid_credentials'),
      icon: 'i-heroicons-x-circle',
      color: 'red'
    })
  } finally {
    loading.value = false
  }
}

// Meta tags
useHead({
  title: t('admin.login.title'),
  meta: [
    {
      name: 'robots',
      content: 'noindex, nofollow'
    }
  ]
})
</script> 