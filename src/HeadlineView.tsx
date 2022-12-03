import React, { useCallback } from 'react'
import {
  TouchableOpacity,
  View,
  Text,
  StyleSheet,
  StyleProp,
  ViewStyle,
  Linking,
} from 'react-native'
import { rootStyles } from './styles'
import { useItem } from './useItem'
import urlParse from 'url-parse'
export const HeadlineView = ({
  id,
  onSetStoryId,
  bold,
  style,
  onPressBehavior,
}: {
  id: number
  onSetStoryId?: (id: number) => void
  bold?: boolean
  style?: StyleProp<ViewStyle>
  onPressBehavior: 'open-url' | 'open-comments'
}) => {
  const query = useItem(id)

  const onPress = useCallback(() => {
    if (onPressBehavior === 'open-comments' && onSetStoryId) {
      onSetStoryId(id)
    } else if (
      onPressBehavior === 'open-url' &&
      query.data &&
      'url' in query.data
    ) {
      Linking.openURL(query.data.url)
    }
  }, [id, onPressBehavior, onSetStoryId, query.data])

  if (query.isSuccess && 'title' in query.data) {
    const story = query.data
    return (
      <TouchableOpacity style={style} onPress={onPress}>
        <View>
          <View style={styles.row}>
            <Text style={[styles.title, bold && styles.titleBold]}>
              {story.title}
            </Text>
            <Text style={styles.domain}>{`(${
              urlParse(story.url).hostname
            })`}</Text>
          </View>
        </View>

        <View style={styles.row}>
          <Text style={styles.numComments}>{story.descendants} comments</Text>
          <Text style={styles.divider}>{' | '}</Text>
          <Text style={styles.numPoints}>{story.score} pts</Text>
        </View>
      </TouchableOpacity>
    )
  }

  return null
}

const styles = StyleSheet.create({
  title: {
    ...rootStyles.text,
    fontSize: 17,
    color: '#F1C56D',
  },
  titleBold: {
    fontWeight: 'bold',
  },
  numComments: {
    ...rootStyles.text,
    fontSize: 12,
    color: '#CDF67D',
  },
  numPoints: {
    ...rootStyles.text,
    fontSize: 12,
    color: '#5DCFE6',
  },
  divider: {
    ...rootStyles.text,
    fontSize: 12,
    color: '#CCCAC2',
  },
  row: {
    flexDirection: 'row',
    flex: 1,
    flexWrap: 'wrap',
    alignItems: 'center',
  },
  domain: { marginLeft: 4 },
})
