<script lang="ts">

import { defineComponent } from 'vue'
export default defineComponent({
  props: {
    title: String,
  },
  data() {
     return {
      // @remove
        //title: "Generic Title",
        cityList: ['London', 'Amsterdam', 'Karaganda', "london2"],
        matchString: "",
        results: []
     }
  },
  mounted() {
    this.title
    this.cityList
    this.matchString
    this.results
  },
  methods: {},
  computed: {
     matchCity() {
       this.results = this.matchString.length < 3 ? [] : this.cityList.filter(city => city.toLowerCase().includes(this.matchString.toLowerCase()))
     }
   },
  watch: {}
  })
</script>

<template>
  <h1>{{ title }}</h1>
  <div>
    <input type="string" v-model="matchString" @keyup="matchCity" placeholder="type at least 3 characters"></input>
  </div>
  <p>Matching: {{matchString}}</p>

  <div>
    <h2>Results: </h2>
    <div v-if="!results.length">No results yet</div>
    <ul v-else>
      <li v-for="(city, index) in results" :key="`city-${index}`">{{city}}</li>
    </ul>
  </div>
</template>
