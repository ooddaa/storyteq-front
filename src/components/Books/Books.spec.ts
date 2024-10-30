import { describe, it, expect } from 'vitest'

import { mount } from '@vue/test-utils'
import Books from '@/components/Books/Books.vue'

describe('Books', () => {
  it('renders properly', () => {
    const wrapper = mount(Books)
    expect(wrapper.text()).toContain('Books')
  })
})
