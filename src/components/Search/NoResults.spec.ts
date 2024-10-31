import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import NoResults from '@/components/Search/NoResults.vue'

describe('NoResults', () => {
  it('renders correctly', () => {
    const wrapper = mount(NoResults)
    expect(wrapper.find('p').text()).toBe('no results 🤔')
  })

  it('applies default classes', () => {
    const wrapper = mount(NoResults)
    expect(wrapper.find('div').classes()).toContain('h-full')
    expect(wrapper.find('div').classes()).toContain('w-full')
    expect(wrapper.find('div').classes()).toContain('bg-pink-100')
    expect(wrapper.find('div').classes()).toContain('flex')
    expect(wrapper.find('div').classes()).toContain('justify-center')
    expect(wrapper.find('div').classes()).toContain('items-center')
    expect(wrapper.find('div').classes()).toContain('rounded-md')
  })

  it('applies additional classes from props', () => {
    const additionalClass = 'test-class'
    const wrapper = mount(NoResults, {
      props: {
        class: additionalClass,
      },
    })
    expect(wrapper.find('div').classes()).toContain(additionalClass)
  })

  it('uses TransitionGroup component', () => {
    const wrapper = mount(NoResults)
    expect(wrapper.findComponent({ name: 'TransitionGroup' }).exists()).toBe(
      true,
    )
  })

  it('has correct transition attributes', () => {
    const wrapper = mount(NoResults)
    expect(wrapper.findComponent({ name: 'TransitionGroup' }).exists()).toBe(
      true,
    )
    expect(wrapper.find('div').exists()).toBe(true)
    expect(wrapper.find('p').exists()).toBe(true)
  })
})
