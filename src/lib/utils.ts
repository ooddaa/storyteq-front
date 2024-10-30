import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

type Comparer = (a: any, b: any) => number
export const sortResults = <T>(values: T[], comparers: Comparer[]): T[] =>
  comparers.reduce((acc, fn) => acc.sort(fn), values)

export const capitalizeWord = (word: string): string =>
  `${word.charAt(0).toUpperCase()}${word.slice(1)}`

export const capitalizeEveryWord = (words: string): string =>
  words.split(' ').map(capitalizeWord).join(' ')

export const getData = async (url: any): Promise<any> => {
  try {
    const response = await fetch(url).then(data => data.json())
    return response?.data
  } catch (error) {
    console.error(`Error fetching url: ${url}`, error)
  }
}
