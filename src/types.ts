export type Story = {
  by: string
  descendants: number
  id: number
  kids?: number[]
  score: number
  time: number
  title: string
  type: 'story'
  url: string
}

export type Comment = {
  by: string
  id: number
  kids?: number[]
  parent: number
  time: number
  text: string
  type: 'comment'
}

export type Headline = Pick<Story, 'kids' | 'score' | 'descendants'>

export type Item = Story | Comment
