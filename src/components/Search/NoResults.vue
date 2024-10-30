<script setup lang="ts">
import { cn } from '@/lib/utils'

interface NoResultsProps {
  class?: HTMLAttributes['class']
}
const props = defineProps<NoResultsProps>();
</script>
<template>
  <TransitionGroup
    name="list">
  <div :class="cn('h-full w-full bg-pink-100 flex justify-center items-center rounded-md', props.class)" :key="`no-results`">
        <p class="font-bold">No results yet</p>
  </div>
  </TransitionGroup>
</template>

<style scoped>
.list-move,
.list-enter-active,
.list-leave-active {
  transition: all 0.5s ease;
}

.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: translateY(15px);
}

.list-leave-active {
  position: absolute;
}
</style>
