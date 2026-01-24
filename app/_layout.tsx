import { Stack } from 'expo-router'
import { StatusBar } from 'expo-status-bar'
import 'react-native-reanimated'

import { useColorScheme } from '@/hooks/use-color-scheme'
import { ProductProvider } from '@/context/useContext'

export default function RootLayout() {
  const scheme = useColorScheme()
  const isDark = scheme === 'dark'

  return (
    <>
      <StatusBar
        translucent={false}
        style={isDark ? 'light' : 'dark'}
        backgroundColor={isDark ? '#000000' : '#ffffff'}
      />

      <ProductProvider>
        <Stack>
          <Stack.Screen name="index" options={{ headerShown: false }} />
          <Stack.Screen name="(auth)" options={{ headerShown: false }} />
          {/* <Stack.Screen name="feature-section" options={{ headerShown: false }} /> */}
          <Stack.Screen name="callback" options={{ headerShown: false }} />
        </Stack>
      </ProductProvider>
    </>
  )
}
