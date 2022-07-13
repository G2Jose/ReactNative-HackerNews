import React, { useEffect } from 'react'
import {
  FlatList,
  RefreshControl,
  StyleProp,
  StyleSheet,
  ViewStyle,
} from 'react-native'
import { useQuery, useQueryClient } from 'react-query'
import { rootStyles } from './styles'
import { HeadlineView } from './HeadlineView'
import { take } from 'lodash'
import { DATA_INVALIDATION_TIMEOUT } from './constants'

export const TopHeadlines = ({
  onViewComments,
  style,
}: {
  onViewComments: (id: number) => void
  style: StyleProp<ViewStyle>
}) => {
  const queryClient = useQueryClient()

  useEffect(() => {
    const interval = setInterval(
      () => queryClient.invalidateQueries('top'),
      DATA_INVALIDATION_TIMEOUT,
    )
    return () => clearInterval(interval)
  }, [queryClient])

  const query = useQuery<number[]>(['top'], async () => {
    const response = await fetch(
      'https://hacker-news.firebaseio.com/v0/topstories.json?print=pretty',
    )
    if (!response.ok) {
      throw new Error('Network response was not ok')
    }
    return response.json()
  })

  if (!query.isSuccess) {
    return null
  }

  const topIds = take(query.data, 100)

  return (
    <FlatList
      contentInsetAdjustmentBehavior="automatic"
      style={[styles.headLinesView, style]}
      data={topIds}
      renderItem={x => {
        return (
          <HeadlineView
            id={x.item}
            onSetStoryId={onViewComments}
            style={styles.headline}
            onPressBehavior="open-comments"
          />
        )
      }}
      keyExtractor={item => `${item}`}
      windowSize={50}
    />
  )
}

const styles = StyleSheet.create({
  headLinesView: {
    ...rootStyles.background,
  },
  headline: {
    marginHorizontal: 12,
    marginVertical: 8,
  },
})
