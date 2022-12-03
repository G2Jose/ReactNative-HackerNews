import React, { useState } from 'react'

import { QueryClient, QueryClientProvider } from 'react-query'
import { TopHeadlines } from './src/TopHeadlines'
import { StoryView } from './src/StoryView'
import { StyleSheet, useWindowDimensions, View } from 'react-native'

const queryClient = new QueryClient()

const SIDEBAR_LAYOUT_MIN_WIDTH = 800
const App = () => {
  const [currentStoryId, setCurrentStoryId] = useState<number>()
  const { width } = useWindowDimensions()
  return (
    <QueryClientProvider client={queryClient}>
      <View style={styles.container}>
        {(!currentStoryId || width > SIDEBAR_LAYOUT_MIN_WIDTH) && (
          <TopHeadlines
            onViewComments={setCurrentStoryId}
            style={styles.headlines}
          />
        )}
        {currentStoryId && (
          <StoryView
            style={styles.story}
            id={currentStoryId}
            onPressBack={() => setCurrentStoryId(undefined)}
          />
        )}
      </View>
    </QueryClientProvider>
  )
}

const styles = StyleSheet.create({
  container: { flexDirection: 'row', flex: 1 },
  headlines: { flex: 1 },
  story: { flex: 2 },
})

export default App
