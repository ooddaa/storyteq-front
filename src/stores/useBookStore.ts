import { defineStore } from "pinia"
import { getData } from "@/lib/utils"
import {type Book} from "@/features/Books/types"
import { useStorage } from "@vueuse/core"

export const useBookStore = defineStore('bookstore', {
  state: () => ({
    bookList: useStorage('bookList', [] as Book[])
  }),
  actions: {
    async fetchBooks () {
      const data = await getData('../../../data/books.json')
      this.bookList = data?.data
    }
  }
})

export default useBookStore
