<script setup lang="ts">
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { ScrollArea } from '@/components/ui/scroll-area'

type Card = {
  title: string
  description?: string
}

interface CardListProps {
  cardList: Card[]
}

const props = defineProps<CardListProps>()
</script>

<template>
  <ScrollArea class="h-[410px] md:h-[475px] w-full">
    <TransitionGroup
      name="list"
      tag="ul"
      class="flex flex-col flex-1 gap-2 justify-start divide-y-2"
      appear
    >
      <li
        v-for="({ title, description }, index) in props.cardList"
        :key="`card-${index}`"
      >
        <Card class=".card-list-item w-100 border-none shadow-none">
          <CardHeader>
            <CardTitle>{{ title }}</CardTitle>
            <CardDescription>
              {{ description }}
            </CardDescription>
          </CardHeader>
        </Card>
      </li>
    </TransitionGroup>
  </ScrollArea>
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
