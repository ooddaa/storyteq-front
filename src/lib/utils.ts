import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

//eslint-disable-next-line @typescript-eslint/no-explicit-any
type Comparer = (a: any, b: any) => number
export const sortResults = <T>(values: T[], comparers: Comparer[]): T[] =>
  comparers.reduce((acc, fn) => acc.sort(fn), values)

export const capitalizeWord = (word: string): string =>
  `${word.charAt(0).toUpperCase()}${word.slice(1)}`

export const capitalizeEveryWord = (words: string): string =>
  words.split(' ').map(capitalizeWord).join(' ')

//eslint-disable-next-line @typescript-eslint/no-explicit-any
export const getData = async (url: string): Promise<any[]> => {
  try {
    const response = await fetch(url).then(data => data.json())
    return response?.data
  } catch (error) {
    console.error(`Error fetching url: ${url}`, error)
    return []
  }
}

export const identity = <T>(x: T): T => x

export const vFocus = {
  mounted: (el: HTMLElement) => el.focus(),
}
