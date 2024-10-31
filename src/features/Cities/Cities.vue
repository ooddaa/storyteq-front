<script setup lang="ts">
import InputWithSearchIcon from '@/components/Search/InputWithSearchIcon.vue'
import NoResults from '@/components/Search/NoResults.vue'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import CardList from '@/components/CardList/CardList.vue'
import { sortResults, capitalizeEveryWord, getData } from '@/lib/utils.ts'
import useMatcher from '@/composables/useMatcher.ts'
import useCityStore from '@/stores/useCityStore.ts'
import { type City } from "@/features/Cities/types"

const citystore = useCityStore()
await citystore.fetchCities()

const { results, match, pattern } = useMatcher<City>(citystore.cityList)

const handleMatch = () => {
  const newResults = match()
  if (!newResults?.length) return

  const sorted = sortResults<City>(newResults, [sortCitiesByLocale])

  const cards = sorted.map(city => ({ title: capitalizeEveryWord(city) }))
  results.value = cards
}

const sortCitiesByLocale = (a, b) => a.localeCompare(b)
</script>

<template>
  <div class="_books h-full">
    <Card class="h-full flex flex-col">
      <CardHeader>
        <CardTitle>Cities</CardTitle>
        <CardDescription> Find yourself a city! </CardDescription>
      </CardHeader>
      <CardContent class="space-y-2">
        <InputWithSearchIcon v-model="pattern" @keyup="handleMatch" />
      </CardContent>
      <CardFooter class="flex-grow justify-start items-start overflow:hidden">
        <NoResults v-if="!results.length" class="bg-green-100" />
        <CardList v-else :cardList="results" />
      </CardFooter>
    </Card>
  </div>
</template>
