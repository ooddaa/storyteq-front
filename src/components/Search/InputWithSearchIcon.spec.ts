import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import InputWithSearchIcon from '@/components/Search/InputWithSearchIcon.vue'
import { Input } from '@/components/ui/input'
import { Search } from 'lucide-vue-next'

describe('InputWithSearchIcon', () => {
  it('renders correctly with default props', () => {
    const wrapper = mount(InputWithSearchIcon)
    expect(wrapper.findComponent(Input).exists()).toBe(true)
    expect(wrapper.findComponent(Search).exists()).toBe(true)
    expect(wrapper.findComponent(Input).attributes('placeholder')).toBe(
      'min 3 characters',
    )
  })

  it('renders with custom placeholder', () => {
    const customPlaceholder = 'Search here...'
    const wrapper = mount(InputWithSearchIcon, {
      props: {
        placeholder: customPlaceholder,
      },
    })
    expect(wrapper.findComponent(Input).attributes('placeholder')).toBe(
      customPlaceholder,
    )
  })

  it('applies custom test ID when provided', () => {
    const testId = 'search-input'
    const wrapper = mount(InputWithSearchIcon, {
      props: {
        testId,
      },
    })
    expect(wrapper.findComponent(Input).attributes('data-test-id')).toBe(testId)
  })

  it('emits update:modelValue event when input value changes', async () => {
    const wrapper = mount(InputWithSearchIcon)
    const input = wrapper.findComponent(Input)

    await input.setValue('test')

    expect(wrapper.emitted('update:modelValue')).toBeTruthy()
    expect(wrapper.emitted('update:modelValue')?.[0]).toEqual(['test'])
  })

  it('emits keyup event with current value', async () => {
    const wrapper = mount(InputWithSearchIcon, {
      props: {
        modelValue: 'test',
      },
    })

    await wrapper.findComponent(Input).trigger('keyup')

    expect(wrapper.emitted('keyup')).toBeTruthy()
    expect(wrapper.emitted('keyup')?.[0]).toEqual(['test'])
  })

  it('renders search icon with correct classes', () => {
    const wrapper = mount(InputWithSearchIcon)
    const searchIcon = wrapper.findComponent(Search)
    expect(searchIcon.exists()).toBe(true)
    expect(searchIcon.classes()).toContain('size-6')
    expect(searchIcon.classes()).toContain('text-muted-foreground')
  })

  it('supports v-model binding', async () => {
    const wrapper = mount(InputWithSearchIcon, {
      props: {
        modelValue: 'initial',
        'onUpdate:modelValue': (e: string) =>
          wrapper.setProps({ modelValue: e }),
      },
    })

    const input = wrapper.findComponent(Input)
    await input.setValue('new value')

    expect(wrapper.emitted('update:modelValue')).toBeTruthy()
    expect(wrapper.emitted('update:modelValue')?.[0]).toEqual(['new value'])
  })
})
