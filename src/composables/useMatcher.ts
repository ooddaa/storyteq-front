import { ref } from 'vue'
import { identity } from '@/lib/utils'

//eslint-disable-next-line @typescript-eslint/no-explicit-any
type GetterType = (x: any) => string

const useMatcher = <T>(values: T[], getter: GetterType = identity) => {
  const pattern = ref('')
  const results = ref<T[]>([])
  const memoizedResults = ref(new Map())

  const matcher = (value: T): boolean => {
    const valueToMatch = getter(value)
    if (typeof valueToMatch !== 'string') return false
    return !!valueToMatch.match(new RegExp(pattern.value, 'i'))
  }

  const match = (): T[] => {
    if (pattern?.value.length < 3) {
      results.value = []
      return []
    }

    if (memoizedResults.value.has(pattern.value)) {
      results.value = memoizedResults.value.get(pattern.value)
    }

    const matches = values.filter(matcher)
    if (matches.length) memoizedResults.value.set(pattern.value, matches)

    results.value = matches
    return matches
  }

  return {
    results,
    pattern,
    match,
  }
}

export default useMatcher
