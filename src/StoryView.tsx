import React from 'react'
import {
  TouchableOpacity,
  View,
  Text,
  ScrollView,
  StyleSheet,
  ViewStyle,
  StyleProp,
} from 'react-native'
import { useItem } from './useItem'
import { CommentView } from './CommentView'
import { HeadlineView } from './HeadlineView'
import { rootStyles } from './styles'

export const StoryView = ({
  id,
  onPressBack: onPressBack,
  style,
}: {
  id: number
  onPressBack: (id?: number) => void
  style: StyleProp<ViewStyle>
}) => {
  const headlineQuery = useItem(id)

  if (!headlineQuery.isSuccess) {
    return null
  }

  const headline = headlineQuery.data

  return (
    <View style={[styles.rootView, style]}>
      <ScrollView>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => onPressBack(undefined)}>
          <Text style={styles.backButton}>{'< Back'}</Text>
        </TouchableOpacity>
        <HeadlineView
          id={id}
          style={styles.headline}
          onPressBehavior="open-url"
        />

        <View style={styles.commentContainer}>
          {headline?.kids?.map(id => (
            <CommentView id={id} />
          ))}
        </View>
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  rootView: {
    ...rootStyles.background,
    flex: 1,
  },
  backButtonText: {
    ...rootStyles.text,
  },
  backButton: { marginHorizontal: 2, marginVertical: 4 },
  headline: {
    marginHorizontal: 8,
  },
  commentContainer: { paddingHorizontal: 8 * 2, paddingVertical: 4 },
})
