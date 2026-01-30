import 'react-native-reanimated'

import { Stack } from 'expo-router'
import { StatusBar } from 'expo-status-bar'
import Toast from 'react-native-toast-message'

import { DarkThemeApp, LightTheme } from '@/constants/navigation'
import { ProductProvider } from '@/context/useContext'
import { useColorScheme } from '@/hooks/use-color-scheme'

export default function RootLayout() {
  const scheme = useColorScheme()
  const isDark = scheme === 'dark'
  const theme = isDark ? DarkThemeApp : LightTheme

  return (
    <>
      <StatusBar
        style={isDark ? 'light' : 'dark'}
        backgroundColor={theme.colors.background}
      />

      <ProductProvider>
        <Stack
          screenOptions={{
            contentStyle: {
              backgroundColor: theme.colors.background,
            },
          }}
        >
          <Stack.Screen name="index" options={{ headerShown: false }} />
          <Stack.Screen name="(auth)" options={{ headerShown: false }} />
          <Stack.Screen name="(dashboard)" options={{ headerShown: false }} />
          <Stack.Screen name="auth/callback" options={{ headerShown: false }} />
        </Stack>
      </ProductProvider>

      <Toast />
    </>
  )
}
