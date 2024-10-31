import { vi } from 'vitest'
import '@testing-library/jest-dom'
import { config } from '@vue/test-utils'

config.global.stubs = {
  Suspense: {
    template: '<div><slot></slot></div>'
  }
}

vi.mock('@/features/Cities/Cities.vue', () => ({
  default: {
    template: '<div>Cities Component</div>'
  }
}))

//vi.mock('@/features/Books/Books.vue', () => ({
//  default: {
//    template: '<div class="books">Books Component</div>'
//  }
//}))

vi.mock(import("@/lib/utils"), async (importOriginal) => {
  const actual = await importOriginal()
  return {
    ...actual,
  }
})
