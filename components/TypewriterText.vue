<template>
  <span class="typewriter">{{ displayText }}<span class="cursor" :class="{ 'typing': isTyping }">_</span></span>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue';

const props = defineProps({
  text: {
    type: String,
    required: true
  },
  delay: {
    type: Number,
    default: 0
  },
  speed: {
    type: Number,
    default: 30
  },
  eraseSpeed: {
    type: Number,
    default: 20
  },
  pauseTime: {
    type: Number,
    default: 2000
  },
  infinite: {
    type: Boolean,
    default: true
  }
})

const displayText = ref('')
const isTyping = ref(false)
let typingTimeout: NodeJS.Timeout | null = null;

const sleep = (ms: number) => new Promise(resolve => typingTimeout = setTimeout(resolve, ms));

const type = async () => {
  isTyping.value = true;
  for (let i = 0; i <= props.text.length; i++) {
    displayText.value = props.text.slice(0, i);
    await sleep(props.speed);
    if (!typingTimeout) return;
  }
  isTyping.value = false;
};

const erase = async () => {
  isTyping.value = true;
  for (let i = props.text.length; i >= 0; i--) {
    displayText.value = props.text.slice(0, i);
    await sleep(props.eraseSpeed);
    if (!typingTimeout) return;
  }
  isTyping.value = false;
}

const startTyping = async () => {
  while (true) {
    await type();
    await sleep(props.pauseTime);
    if (!typingTimeout) return;
    
    await erase();
    await sleep(props.pauseTime);
    if (!typingTimeout) return;
    
    if (!props.infinite) break;
  }
}

onMounted(() => {
  setTimeout(() => {
    startTyping()
  }, props.delay)
})

onUnmounted(() => {
  if (typingTimeout) {
    clearTimeout(typingTimeout);
    typingTimeout = null;
  }
});
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