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
import { sortResults, getData } from '@/lib/utils.ts'

interface Book {
  title: string
  author: string
}

const books: Book[] = await getData('../../../data/books.json')

let matchString = ''

let memoizedResults = ref(new Map())
let results = ref([])

const defaultMatcher = (book: Book): boolean =>
  book?.title.match(new RegExp(matchString, 'i'))

const sortBooksByLocale = (a, b) => a.title.localeCompare(b.title)
const sortBooksByMatchedSubstringIndex = (a, b) => {
  const re = new RegExp(matchString, 'i')
  const matchA = a?.title.match(re)
  const matchB = b?.title.match(re)
  if (!matchA || !matchB) return -1
  return matchA?.index - matchB?.index
}

const matchBooks = () => {
  if (matchString.length < 3) {
    results.value = []
    return
  }

  if (memoizedResults.value.has(matchString)) {
    results.value = memoizedResults.value.get(matchString)
  }

  const matches = books.filter(defaultMatcher)

  if (matches.length) memoizedResults.value.set(matchString, matches)
  results.value = sortResults<Book>(matches, [
    sortBooksByLocale,
    sortBooksByMatchedSubstringIndex,
  ])
}

const vFocus = {
  mounted: el => el.focus(),
}
</script>

<template>
  <div class="_books h-full">
    <Card class="h-full flex flex-col">
      <CardHeader>
        <CardTitle>Books</CardTitle>
        <CardDescription> Find your next book </CardDescription>
      </CardHeader>
      <CardContent class="space-y-2">
        <div class="space-y-1">
          <div class="relative w-full max-w-sm items-center">
            <Input
              id="current"
              type="string"
              v-model="matchString"
              @keyup="matchBooks"
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
