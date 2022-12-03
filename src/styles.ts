import { Platform, StyleSheet } from 'react-native'

export const rootStyles = StyleSheet.create({
  text: { color: 'white', fontSize: Platform.OS === 'macos' ? 12 : 14 },
  background: { backgroundColor: '#1C2430' },
})
