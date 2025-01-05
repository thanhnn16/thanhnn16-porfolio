<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
    <div class="max-w-md w-full space-y-8">
      <div>
        <NuxtLink to="/" class="flex justify-center">
          <img class="h-12 w-auto" src="~/assets/images/thanhnn16-logo-300x128.svg" alt="Logo" />
        </NuxtLink>
        <h2 class="mt-6 text-center text-3xl font-extrabold text-gray-900 dark:text-white">
          {{ t('admin.login.title') }}
        </h2>
      </div>
      <form class="mt-8 space-y-6" @submit.prevent="handleLogin">
        <div class="rounded-md shadow-sm -space-y-px">
          <div>
            <label for="email" class="sr-only">{{ t('admin.login.email') }}</label>
            <input
              id="email"
              v-model="email"
              name="email"
              type="email"
              autocomplete="email"
              required
              class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 dark:border-gray-700 placeholder-gray-500 dark:placeholder-gray-400 text-gray-900 dark:text-white rounded-t-md focus:outline-none focus:ring-primary-500 focus:border-primary-500 focus:z-10 sm:text-sm bg-white dark:bg-gray-800"
              :placeholder="t('admin.login.email')"
            />
          </div>
          <div>
            <label for="password" class="sr-only">{{ t('admin.login.password') }}</label>
            <input
              id="password"
              v-model="password"
              name="password"
              type="password"
              autocomplete="current-password"
              required
              class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 dark:border-gray-700 placeholder-gray-500 dark:placeholder-gray-400 text-gray-900 dark:text-white rounded-b-md focus:outline-none focus:ring-primary-500 focus:border-primary-500 focus:z-10 sm:text-sm bg-white dark:bg-gray-800"
              :placeholder="t('admin.login.password')"
            />
          </div>
        </div>

        <div>
          <button
            type="submit"
            :disabled="loading"
            class="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <span class="absolute left-0 inset-y-0 flex items-center pl-3">
              <Icon
                :name="loading ? 'heroicons:arrow-path' : 'heroicons:lock-closed'"
                :class="['h-5 w-5 text-primary-500 group-hover:text-primary-400', { 'animate-spin': loading }]"
                aria-hidden="true"
              />
            </span>
            {{ loading ? t('admin.login.loading') : t('admin.login.submit') }}
          </button>
        </div>
      </form>
    </div>
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