<script setup lang="ts">
import { ref, defineEmits } from "vue"
import { Input } from '@/components/ui/input'
import { Search } from 'lucide-vue-next'

interface InputWithSearchIcon {
  placeholder?: string
}
const model = defineModel({ type: String })
const emits = defineEmits<{
  'update:modelValue': [value: string]
  keyup: [event: KeyboardEvent]
}>()
const props = defineProps<InputWithSearchIcon>();
</script>

<template>
        <div class="space-y-1">
          <div class="relative w-full max-w-sm items-center">
            <Input
              id="current"
              type="string"
              v-model="model"
              @keyup="$emit('keyup', model.value)"
              :placeholder="placeholder || 'min 3 characters'"
              class="pl-10"
            />
            <span
              class="absolute start-0 inset-y-0 flex items-center justify-center px-2"
            >
              <Search class="size-6 text-muted-foreground" />
            </span>
          </div>
        </div>
</template>

