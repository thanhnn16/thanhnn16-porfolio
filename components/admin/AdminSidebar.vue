<template>
  <div>
    <!-- Mobile sidebar -->
    <TransitionRoot as="template" :show="sidebarOpen">
      <Dialog as="div" class="relative z-50 lg:hidden" @close="sidebarOpen = false">
        <TransitionChild
          as="template"
          enter="transition-opacity ease-linear duration-300"
          enter-from="opacity-0"
          enter-to="opacity-100"
          leave="transition-opacity ease-linear duration-300"
          leave-from="opacity-100"
          leave-to="opacity-0"
        >
          <div class="fixed inset-0 bg-gray-900/80" />
        </TransitionChild>

        <div class="fixed inset-0 flex">
          <TransitionChild
            as="template"
            enter="transition ease-in-out duration-300 transform"
            enter-from="-translate-x-full"
            enter-to="translate-x-0"
            leave="transition ease-in-out duration-300 transform"
            leave-from="translate-x-0"
            leave-to="-translate-x-full"
          >
            <DialogPanel class="relative mr-16 flex w-full max-w-xs flex-1">
              <div class="absolute left-full top-0 flex w-16 justify-center pt-5">
                <button type="button" class="-m-2.5 p-2.5" @click="sidebarOpen = false">
                  <span class="sr-only">Close sidebar</span>
                  <Icon name="heroicons:x-mark" class="h-6 w-6 text-white" aria-hidden="true" />
                </button>
              </div>
              <div class="flex grow flex-col gap-y-5 overflow-y-auto bg-white dark:bg-gray-900 px-6 pb-4 border-r border-gray-200 dark:border-gray-800">
                <div class="flex h-16 shrink-0 items-center">
                  <NuxtLink to="/" class="flex items-center gap-2">
                    <img class="h-8 w-auto" src="~/assets/images/thanhnn16-logo-300x128.svg" alt="Logo" />
                    <span class="text-lg font-semibold text-gray-900 dark:text-white">Admin</span>
                  </NuxtLink>
                </div>
                <nav class="flex flex-1 flex-col">
                  <ul role="list" class="flex flex-1 flex-col gap-y-7">
                    <li>
                      <ul role="list" class="-mx-2 space-y-1">
                        <li v-for="item in navigation" :key="item.name">
                          <NuxtLink
                            :to="item.href"
                            :class="[
                              route.path === item.href
                                ? 'bg-gray-50 dark:bg-gray-800 text-primary-600 dark:text-primary-400'
                                : 'text-gray-700 dark:text-gray-200 hover:text-primary-600 dark:hover:text-primary-400 hover:bg-gray-50 dark:hover:bg-gray-800',
                              'group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold'
                            ]"
                          >
                            <Icon
                              :name="item.icon"
                              :class="[
                                route.path === item.href ? 'text-primary-600 dark:text-primary-400' : 'text-gray-400 group-hover:text-primary-600 dark:group-hover:text-primary-400',
                                'h-6 w-6 shrink-0'
                              ]"
                              aria-hidden="true"
                            />
                            {{ t(item.name) }}
                          </NuxtLink>
                        </li>
                      </ul>
                    </li>
                    <li class="mt-auto">
                      <button
                        @click="logout"
                        class="group -mx-2 flex gap-x-3 rounded-md p-2 text-sm font-semibold leading-6 text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-800 hover:text-primary-600 dark:hover:text-primary-400 w-full"
                      >
                        <Icon
                          name="heroicons:arrow-left-on-rectangle"
                          class="h-6 w-6 shrink-0 text-gray-400 group-hover:text-primary-600 dark:group-hover:text-primary-400"
                          aria-hidden="true"
                        />
                        {{ t('admin.logout') }}
                      </button>
                    </li>
                  </ul>
                </nav>
              </div>
            </DialogPanel>
          </TransitionChild>
        </div>
      </Dialog>
    </TransitionRoot>

    <!-- Static sidebar for desktop -->
    <div class="hidden lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:w-72 lg:flex-col">
      <div class="flex grow flex-col gap-y-5 overflow-y-auto bg-white dark:bg-gray-900 px-6 pb-4 border-r border-gray-200 dark:border-gray-800">
        <div class="flex h-16 shrink-0 items-center">
          <NuxtLink to="/" class="flex items-center gap-2">
            <img class="h-8 w-auto" src="~/assets/images/thanhnn16-logo-300x128.svg" alt="Logo" />
            <span class="text-lg font-semibold text-gray-900 dark:text-white">Admin</span>
          </NuxtLink>
        </div>
        <nav class="flex flex-1 flex-col">
          <ul role="list" class="flex flex-1 flex-col gap-y-7">
            <li>
              <ul role="list" class="-mx-2 space-y-1">
                <li v-for="item in navigation" :key="item.name">
                  <NuxtLink
                    :to="item.href"
                    :class="[
                      route.path === item.href
                        ? 'bg-gray-50 dark:bg-gray-800 text-primary-600 dark:text-primary-400'
                        : 'text-gray-700 dark:text-gray-200 hover:text-primary-600 dark:hover:text-primary-400 hover:bg-gray-50 dark:hover:bg-gray-800',
                      'group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold'
                    ]"
                  >
                    <Icon
                      :name="item.icon"
                      :class="[
                        route.path === item.href ? 'text-primary-600 dark:text-primary-400' : 'text-gray-400 group-hover:text-primary-600 dark:group-hover:text-primary-400',
                        'h-6 w-6 shrink-0'
                      ]"
                      aria-hidden="true"
                    />
                    {{ t(item.name) }}
                  </NuxtLink>
                </li>
              </ul>
            </li>
            <li class="mt-auto">
              <button
                @click="logout"
                class="group -mx-2 flex gap-x-3 rounded-md p-2 text-sm font-semibold leading-6 text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-800 hover:text-primary-600 dark:hover:text-primary-400 w-full"
              >
                <Icon
                  name="heroicons:arrow-left-on-rectangle"
                  class="h-6 w-6 shrink-0 text-gray-400 group-hover:text-primary-600 dark:group-hover:text-primary-400"
                  aria-hidden="true"
                />
                {{ t('admin.logout') }}
              </button>
            </li>
          </ul>
        </nav>
      </div>
    </div>

    <!-- Mobile header -->
    <div class="sticky top-0 z-40 flex items-center gap-x-6 bg-white dark:bg-gray-900 px-4 py-4 shadow-sm sm:px-6 lg:hidden">
      <button type="button" class="-m-2.5 p-2.5 text-gray-700 dark:text-gray-200 lg:hidden" @click="sidebarOpen = true">
        <span class="sr-only">Open sidebar</span>
        <Icon name="heroicons:bars-3" class="h-6 w-6" aria-hidden="true" />
      </button>
      <div class="flex-1 text-sm font-semibold leading-6 text-gray-900 dark:text-white">
        {{ t('admin.dashboard') }}
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Dialog, DialogPanel, TransitionChild, TransitionRoot } from '@headlessui/vue'

const { t } = useI18n()
const route = useRoute()
const sidebarOpen = ref(false)

interface NavigationItem {
  name: string
  href: string
  icon: string
}

const navigation: NavigationItem[] = [
  { name: 'admin.dashboard', href: '/admin', icon: 'heroicons:home' },
  { name: 'admin.posts', href: '/admin/posts', icon: 'heroicons:document-text' },
  { name: 'admin.tags', href: '/admin/tags', icon: 'heroicons:tag' },
  { name: 'admin.settings', href: '/admin/settings', icon: 'heroicons:cog-6-tooth' }
]

const logout = async () => {
  try {
    await $fetch('/api/auth/logout', { method: 'POST' })
    navigateTo('/admin/login')
  } catch (error) {
    console.error('Error logging out:', error)
  }
}
</script> 