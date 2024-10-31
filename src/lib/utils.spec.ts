import { describe, it, expect } from 'vitest'
import { capitalizeWord, capitalizeEveryWord } from './utils'

describe('utils', () => {
  describe('capitalizeWord', () => {
    it('should capitalize the first letter of a word', () => {
      expect(capitalizeWord('tokyo')).toBe('Tokyo')
    })

    it('should return an empty string if given an empty string', () => {
      expect(capitalizeWord('')).toBe('')
    })
  })

  describe('capitalizeEveryWord', () => {
    it('should capitalize the first letter of every word in a sentence', () => {
      expect(capitalizeEveryWord('san francisco')).toBe('San Francisco')
    })

    it('should handle multiple spaces between words', () => {
      expect(capitalizeEveryWord('vue  is  awesome')).toBe('Vue  Is  Awesome')
    })
  })
})
