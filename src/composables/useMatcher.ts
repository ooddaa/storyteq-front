import { ref } from "vue"
import { identity } from '@/lib/utils'

type GetterType = (x: any) => string
const useMatcher = <T>(values: T[], getter: GetterType = identity) => {
  let pattern  = ref('')
  let results = ref<T[]>([])
  let memoizedResults = ref(new Map())

  const matcher = (value: T): boolean => {
    const valueToMatch = getter(value)
    if (typeof valueToMatch !== "string") return false
    return !!valueToMatch.match(new RegExp(pattern.value, 'i'))
  }

  const match = (): T[] => {
    if (pattern?.value.length < 3) {
      results.value = []
      return []
    }

    if (memoizedResults.value.has(pattern)) {
      results.value = memoizedResults.value.get(pattern)
    }

    const matches = values.filter(matcher)
    if (matches.length) memoizedResults.value.set(pattern, matches)

    results.value = matches
    return matches
  }

return {
    results,
    pattern,
    match
  }
}

export default useMatcher
