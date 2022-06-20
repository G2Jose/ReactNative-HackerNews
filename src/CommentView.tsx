import React, { useMemo, useState } from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import RenderHTML from 'react-native-render-html'
import { useItem } from './useItem'
import { rootStyles } from './styles'

const ignoredStyles = ['fontFamily' as const, 'font-family' as const]
export const CommentView = ({ id }: { id: number }) => {
  const query = useItem(id)

  const [isExpanded, setIsExpanded] = useState(false)

  const comment = query.data
  const source = useMemo(
    () => ({
      html: comment && 'text' in comment ? comment.text : null,
    }),
    [comment],
  )

  if (!query.isSuccess || !comment) {
    return null
  }

  return source.html ? (
    <TouchableOpacity
      style={[styles.commentContainer, isExpanded && styles.expandedContainer]}
      onPress={() => {
        setIsExpanded(!isExpanded)
      }}>
      <RenderHTML
        ignoredStyles={ignoredStyles}
        key={comment.id}
        contentWidth={50}
        source={source}
        baseStyle={styles.html}
      />
      {comment.kids?.length && (
        <Text style={styles.responsesText}>{`${!isExpanded ? '[+]' : '[-]'} ${
          comment.kids?.length || 0
        } ${
          (comment.kids?.length || 0) > 1 || !comment.kids?.length
            ? 'responses'
            : 'response'
        }  `}</Text>
      )}
      {isExpanded &&
        comment.kids &&
        comment.kids.map(id => (
          <View style={styles.childComment}>
            <CommentView id={id} key={id} />
          </View>
        ))}
    </TouchableOpacity>
  ) : null
}

const styles = StyleSheet.create({
  html: { ...rootStyles.text, fontSize: 14, color: '#CCCAC2' },
  commentContainer: {
    borderBottomColor: '#45484E' || '#181B24',
    borderBottomWidth: StyleSheet.hairlineWidth,
    paddingVertical: 8,
    paddingLeft: 6,
  },
  responsesText: {
    color: '#687686',
  },
  childComment: {
    marginLeft: 8,
  },
  expandedContainer: {
    borderLeftColor: '#323843',
    borderLeftWidth: StyleSheet.hairlineWidth,
  },
})
