import { defineStore } from "pinia"
import { getData } from "@/lib/utils"
import {type Book} from "@/features/Books/types"
import { useStorage } from "@vueuse/core"


export const useCityStore = defineStore('citystore', {
  state: () => ({
    cityList: useStorage('cityList', [] as Book[])
  }),
  actions: {
    async fetchCities() {
      const data = await getData('../../../data/cities.json')
      this.cityList = data?.data
    }
  }
})

export default useCityStore
