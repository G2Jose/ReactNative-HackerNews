import { useEffect } from 'react'
import { useQuery, useQueryClient } from 'react-query'
import { DATA_INVALIDATION_TIMEOUT } from './constants'
import { Item } from './types'

export function useItem(id: number) {
  const queryClient = useQueryClient()

  useEffect(() => {
    const interval = setInterval(
      () => queryClient.invalidateQueries(['item', id]),
      DATA_INVALIDATION_TIMEOUT,
    )
    return () => clearInterval(interval)
  }, [queryClient, id])

  return useQuery<Item>(['item', id], async () => {
    const response = await fetch(
      `https://hacker-news.firebaseio.com/v0/item/${id}.json?print=pretty`,
    )
    if (!response.ok) {
      throw new Error('Network response was not ok')
    }
    return response.json()
  })
}
