import React, { useState } from 'react'

import { QueryClient, QueryClientProvider } from 'react-query'
import { TopHeadlines } from './src/TopHeadlines'
import { StoryView } from './src/StoryView'

const queryClient = new QueryClient()

const App = () => {
  const [currentStoryId, setCurrentStoryId] = useState<number>()
  return (
    <QueryClientProvider client={queryClient}>
      {!currentStoryId && <TopHeadlines onViewComments={setCurrentStoryId} />}
      {currentStoryId && (
        <StoryView
          id={currentStoryId}
          onPressBack={() => setCurrentStoryId(undefined)}
        />
      )}
    </QueryClientProvider>
  )
}

export default App
