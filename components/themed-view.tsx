import { View, type ViewProps, StyleSheet } from 'react-native'
import {
  useSafeAreaInsets,
  type Edge,
} from 'react-native-safe-area-context'
import { useThemeColor } from '@/hooks/use-theme-color'

export type ThemedViewProps = ViewProps & {
  lightColor?: string
  darkColor?: string
  safe?: boolean
  edges?: Edge[] 
}

export function ThemedView({
  safe = false,
  edges = ['top'], 
  style,
  lightColor,
  darkColor,
  ...otherProps
}: ThemedViewProps) {
  const backgroundColor = useThemeColor(
    { light: lightColor, dark: darkColor },
    'background'
  )

  const insets = useSafeAreaInsets()

  if (!safe) {
    return (
      <View style={[{ backgroundColor }, style]} {...otherProps} />
    )
  }

  const paddingStyle = {
    paddingTop: edges.includes('top') ? insets.top : 0,
    paddingBottom: edges.includes('bottom') ? insets.bottom : 0,
    paddingLeft: edges.includes('left') ? insets.left : 0,
    paddingRight: edges.includes('right') ? insets.right : 0,
  }

  return (
    <View
      style={[styles.safe, { backgroundColor }, paddingStyle, style]}
      {...otherProps}
    />
  )
}

const styles = StyleSheet.create({
  safe: {
    width: '100%',
  },
})
