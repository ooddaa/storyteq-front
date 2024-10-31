<script setup lang="ts">
import Cities from '@/features/Cities/Cities.vue'
import Books from '@/features/Books/Books.vue'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Skeleton } from '@/components/ui/skeleton'
</script>

<template>
  <div class="dashboard flex h-full w-full justify-center">
    <Tabs
      default-value="books"
      class="max-w-[400px] md:min-h-[600px] flex flex-col flex-grow"
    >
      <TabsList class="_tabs-list grid w-full grid-cols-2">
        <TabsTrigger value="books" class="tabs-trigger books-test-id"> Books </TabsTrigger>
        <TabsTrigger value="cities" class="tabs-trigger cities-test-id"> Cities </TabsTrigger>
      </TabsList>
      <TabsContent value="books" class="flex-grow">
        <Suspense>
          <Books />
          <template #fallback>
            <Skeleton />
          </template>
        </Suspense>
      </TabsContent>
      <TabsContent value="cities" class="flex-grow">
        <Suspense>
          <Cities />
          <template #fallback>
            <Skeleton />
          </template>
        </Suspense>
      </TabsContent>
    </Tabs>
  </div>
</template>
