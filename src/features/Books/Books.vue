<script setup lang="ts">
import InputWithSearchIcon from '@/components/Search/InputWithSearchIcon.vue'
import NoResults from '@/components/Search/NoResults.vue'
import CardList from '@/components/CardList/CardList.vue'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { sortResults, getData } from '@/lib/utils.ts'
import useMatcher from '@/composables/useMatcher.ts'
import useBookStore from '@/stores/useBookStore.ts'
import { type Book } from "@/features/Books/types"

const bookstore = useBookStore()
await bookstore.fetchBooks()

const getBookByTitle = (book: Book): string => book?.title
const { results, match, pattern } = useMatcher<Book>(bookstore.bookList, getBookByTitle)

const handleMatch = () => {
  const newResults = match()
  if (!newResults?.length) return

  const sorted = sortResults<Book>(newResults, [
    sortBooksByLocale,
    sortBooksByMatchedSubstringIndex,
  ])

  const cards = sorted.map(({ title, author }) => ({
    title,
    description: `by ${author}`,
  }))
  results.value = cards
}

const sortBooksByLocale = (a, b) => a.title.localeCompare(b.title)
const sortBooksByMatchedSubstringIndex = (a, b) => {
  const re = new RegExp(pattern, 'i')
  const matchA = a?.title.match(re)
  const matchB = b?.title.match(re)
  if (!matchA || !matchB) return -1
  return matchA?.index - matchB?.index
}

const BooksTestIds = {
  input: 'books-input-test-id',
}
</script>

<template>
  <div class="books h-full">
    <Card class="h-full flex flex-col">
      <CardHeader>
        <CardTitle>Books</CardTitle>
        <CardDescription> Find a blind date with a book:</CardDescription>
      </CardHeader>
      <CardContent class="space-y-2">
        <InputWithSearchIcon
          v-model="pattern"
          @keyup="handleMatch"
          :test-id="BooksTestIds.input"
        />
      </CardContent>
      <CardFooter class="flex-grow justify-start items-start overflow:hidden">
        <NoResults v-if="!results.length" />
        <CardList v-else :cardList="results" />
      </CardFooter>
    </Card>
  </div>
</template>
