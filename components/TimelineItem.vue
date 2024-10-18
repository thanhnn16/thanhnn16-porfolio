<template>
  <div class="timeline-item group relative py-8">
    <div class="timeline-line"></div>
    <div class="timeline-content flex items-center">
      <div class="w-1/2 pr-8 text-right">
        <p class="text-sm text-accent font-medium">{{ item.date }}</p>
      </div>
      <div class="timeline-dot" :class="{ 'award-dot': item.isAward }"></div>
      <div class="w-1/2 pl-8">
        <div class="flex items-center mb-1">
          <h4 class="text-lg font-bold" :class="item.isAward ? 'text-yellow-600' : 'text-dark'">
            {{ item.title }}
          </h4>
          <span v-if="item.isAward" class="ml-2 px-2 py-1 text-xs font-semibold text-yellow-800 bg-yellow-200 rounded-full">
            {{ $t('awardHighlight') }}
          </span>
          <span v-else class="ml-2 px-2 py-1 text-xs font-semibold text-blue-800 bg-blue-200 rounded-full">
            {{ $t('educationHighlight') }}
          </span>
        </div>
        <p v-if="item.organization" class="text-sm text-secondary mt-1">{{ item.organization }}</p>
        <div class="mt-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <p class="text-sm text-muted">{{ item.description }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  item: {
    type: Object,
    required: true
  }
})
</script>

<style scoped>
.timeline-line {
  @apply absolute left-1/2 top-0 bottom-0 w-px bg-accent -translate-x-1/2;
}

.timeline-dot {
  @apply absolute left-1/2 top-1/2 w-4 h-4 bg-accent rounded-full -translate-x-1/2 -translate-y-1/2;
  @apply group-hover:scale-125 transition-transform duration-300;
}

.award-dot {
  @apply bg-yellow-500;
}

.timeline-content {
  @apply relative z-10;
}
</style>
