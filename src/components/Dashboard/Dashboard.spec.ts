import { describe, it, expect, vi, beforeEach } from 'vitest'
import { mount } from '@vue/test-utils'
import Dashboard from '@/components/Dashboard/Dashboard.vue'
import { setActivePinia, createPinia } from 'pinia'

vi.mock(import("@/lib/utils"), async (importOriginal) => {
  const actual = await importOriginal()
  return {
    ...actual,
  getData: vi.fn(),
  }
})

describe('Dashboard', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })
  it('renders both tabs and defaults to books tab', async () => {
    const wrapper = mount(Dashboard)

    // Check if both tabs exist
    const tabTriggers = wrapper.findAll('.tabs-trigger')
    expect(tabTriggers).toHaveLength(2)

    const booksTab = wrapper.find('.books-test-id')
    const citiesTab = wrapper.find('.cities-test-id')
    expect(booksTab.text()).toContain('Books')
    expect(citiesTab.text()).toContain('Cities')

    // Check if Books tab is active by default
    expect(booksTab.attributes('data-active')).toBe('true')
  })
})
