<script setup lang="ts">
import { defineEmits } from 'vue'
import { Input } from '@/components/ui/input'
import { Search } from 'lucide-vue-next'
import { vFocus } from "@/lib/utils"

interface InputWithSearchIcon {
  placeholder?: string
  testId?: string
}

const model = defineModel({ type: String })
const emits = defineEmits<{
  'update:modelValue': [value: string]
  keyup: [event: KeyboardEvent]
}>()
defineProps<InputWithSearchIcon>()

const handleKeyup = () => {
  emits('keyup', model.value || '')
}
</script>

<template>
  <div class="space-y-1">
    <div class="relative w-full max-w-sm items-center">
      <Input
        id="current"
        type="string"
        v-model="model"
        @keyup="handleKeyup"
        :placeholder="placeholder || 'min 3 characters'"
        class="pl-10"
        :data-test-id="testId"
        v-focus
      />
      <span
        class="absolute start-0 inset-y-0 flex items-center justify-center px-2"
      >
        <Search class="size-6 text-muted-foreground" />
      </span>
    </div>
  </div>
</template>
