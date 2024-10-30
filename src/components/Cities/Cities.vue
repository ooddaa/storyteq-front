<script setup lang="ts">
import { ref, computed } from 'vue'
import { Button } from '@/components/ui/button'
import { Search } from 'lucide-vue-next'
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
import { ScrollArea } from '@/components/ui/scroll-area'
import CardList from '@/components/CardList/CardList.vue'
import { sortResults, capitalizeEveryWord, getData } from '@/lib/utils.ts'

type City = string

const cities: City[] = await getData('../../../data/cities.json')
let matchString = ''

let memoizedResults = ref(new Map())
let results = ref([])

const defaultMatcher = (city: City): boolean =>
  city.match(new RegExp(matchString, 'i'))

const sortBooksByLocale = (a, b) => a.localeCompare(b)
const setResults = <T,>(values: T[]) => (results.value = values)

const matchCities = () => {
  if (matchString.length < 3) {
    setResults([])
    return
  }

  if (memoizedResults.value.has(matchString)) {
    setResults<City>(memoizedResults.value.get(matchString))
  }

  const matches = cities.filter(defaultMatcher)

  if (matches.length) memoizedResults.value.set(matchString, matches)

  const sortedResults = sortResults<City>(matches, [sortBooksByLocale])
  const cards = sortedResults.map(city => ({
    title: capitalizeEveryWord(city),
  }))
  setResults<City>(cards)
}

const vFocus = {
  mounted: el => el.focus(),
}
</script>

<template>
  <div class="_books h-full">
    <Card class="h-full flex flex-col">
      <CardHeader>
        <CardTitle>Cities</CardTitle>
        <CardDescription> Find yourself a city! </CardDescription>
      </CardHeader>
      <CardContent class="space-y-2">
        <div class="space-y-1">
          <div class="relative w-full max-w-sm items-center">
            <Input
              id="current"
              type="string"
              v-model="matchString"
              @keyup="matchCities"
              v-focus
              placeholder="type at least 3 characters"
              class="pl-10"
            />
            <span
              class="absolute start-0 inset-y-0 flex items-center justify-center px-2"
            >
              <Search class="size-6 text-muted-foreground" />
            </span>
          </div>
        </div>
      </CardContent>
      <CardFooter class="flex-grow justify-start items-start overflow:hidden">
        <div v-if="!results.length">No results yet</div>
        <CardList v-else :cardList="results" />
      </CardFooter>
    </Card>
  </div>
</template>
