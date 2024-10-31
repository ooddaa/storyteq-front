import { describe, it, expect } from 'vitest'
import useMatcher from '@/composables/useMatcher'

describe('useMatcher', () => {
  const books = [
    { title: 'Don Quixote', author: 'Miguel De Cervantes' },
    { title: "Pilgrim's Progress", author: 'John Bunyan' },
    { title: 'Robinson Crusoe', author: 'Daniel Defoe' },
    { title: "Gulliver's Travels", author: 'Jonathan Swift' },
    { title: 'Tom Jones', author: 'Henry Fielding' },
    { title: 'Clarissa', author: 'Samuel Richardson' },
    { title: 'Tristram Shandy', author: 'Laurence Sterne' },
    { title: 'One Shandy', author: 'Laurence Sterne' },
    {
      title: 'One Hundred Years of Solitude',
      author: 'Gabriel García Márquez',
    },
  ]

  const byTitle = (book: { title: string }) => book.title

  it('should not match patterns < 3 character long', () => {
    const { pattern, match, results } = useMatcher(books, byTitle)
    pattern.value = 'on'
    match()
    expect(results.value).toEqual([])
  })

  it('should match "one"', () => {
    const { pattern, match, results } = useMatcher(books, byTitle)
    pattern.value = 'one'
    match()
    expect(results.value).toEqual([
      { title: 'Tom Jones', author: 'Henry Fielding' },
      { title: 'One Shandy', author: 'Laurence Sterne' },
      {
        title: 'One Hundred Years of Solitude',
        author: 'Gabriel García Márquez',
      },
    ])
  })

  it('should match "tom"', () => {
    const { pattern, match, results } = useMatcher(books, byTitle)
    pattern.value = 'tom'
    match()
    expect(results.value).toEqual([
      { title: 'Tom Jones', author: 'Henry Fielding' },
    ])
  })

  it('should use memoized results for repeated searches', () => {
    const { pattern, match, results } = useMatcher(books, byTitle)
    pattern.value = 'one'
    match()
    const firstResult = results.value

    results.value = []
    match()

    expect(results.value).toEqual(firstResult)
  })
})
