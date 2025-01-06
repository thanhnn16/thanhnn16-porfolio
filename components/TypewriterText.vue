<template>
  <span class="typewriter">{{ displayText }}<span class="cursor" :class="{ 'typing': isTyping }">_</span></span>
</template>

<script setup lang="ts">
const props = defineProps<{
  text: string
  delay?: number
  speed?: number
}>()

const displayText = ref('')
const currentIndex = ref(0)
const isTyping = ref(false)

onMounted(() => {
  setTimeout(() => {
    isTyping.value = true
    const type = async () => {
      for (let i = 0; i <= props.text.length; i++) {
        displayText.value = props.text.slice(0, i)
        await new Promise(resolve => setTimeout(resolve, props.speed || 30))
      }
      isTyping.value = false
    }
    type()
  }, props.delay || 0)
})
</script>

<style scoped>
.typewriter {
  display: inline-block;
}

.cursor {
  display: inline-block;
  margin-left: 1px;
  font-weight: bold;
  opacity: 1;
  animation: blink 1.2s infinite;
}

.cursor.typing {
  animation: none;
  opacity: 1;
}

@keyframes blink {
  0%, 100% { opacity: 1; }
  50% { opacity: 0; }
}
</style> 