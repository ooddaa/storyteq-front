<script setup lang="ts">
import { ref, computed } from "vue"

interface Book {
  title: string,
  author: string
}

const books: Book[] = [
  {
    title: 'Don Quixote',
    author: 'Miguel De Cervantes',
  },
  {
    title: 'Pilgrim\'s Progress',
    author: 'John Bunyan',
  },
  {
    title: 'Robinson Crusoe',
    author: 'Daniel Defoe',
  },
  {
    title: 'Gulliver\'s Travels',
    author: 'Jonathan Swift',
  },
  {
    title: 'Tom Jones',
    author: 'Henry Fielding',
  },
  {
    title: 'Clarissa',
    author: 'Samuel Richardson',
  },
  {
    title: 'Tristram Shandy',
    author: 'Laurence Sterne',
  },
]
let matchString = ""

let memoizedResults = ref(new Map())
let results = ref([])

const hightlightMatches = (matches: Book[]): Book[] => {
  const result = matches.map(highlightBook)
  return result
}

const highlightBook = (book: Book): Book => {
  const { title, author } = book
  const newTitle = title.replace(matchString, `<b>${matchString}</b>`)
  return { title: newTitle, author };
}

const matchBooks = () => {
  if (matchString.length < 3) {
    results.value = []
    return

  }
  if (memoizedResults.value.has(matchString)) {
    results.value = hightlightMatches(memoizedResults.value.get(matchString))
  }

  const matches = books.filter(({title}) => title.toLowerCase().includes(matchString.toLowerCase()))

  if (matches.length) memoizedResults.value.set(matchString, matches)
  results.value = hightlightMatches(matches)
}

const vFocus = {
  mounted: (el) => el.focus()
}

</script>


<template>
  <h1>Books</h1>
  <div>
    <input type="string" v-model="matchString" @keyup="matchBooks" v-focus placeholder="type at least 3 characters"></input>
  </div>

  <div>
    <h2>Book Results: </h2>
    <div v-if="!results.length">No results yet</div>
    <ul v-else>
      <li v-for="({title, author}, index) in results" :key="`title-${index}`"><span v-html="title"></span> by {{ author }}</li>
    </ul>
  </div>
</template>
