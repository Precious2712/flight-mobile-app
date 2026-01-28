import { ThemeProvider } from '@react-navigation/native'
import { Stack } from 'expo-router'
import { StatusBar } from 'expo-status-bar'
import 'react-native-reanimated'

import { useColorScheme } from '@/hooks/use-color-scheme'
import { DarkThemeApp, LightTheme } from '@/constants/navigation'

export default function RootLayout() {
    const scheme = useColorScheme()
    const isDark = scheme === 'dark'

    const theme = isDark ? DarkThemeApp : LightTheme

    return (
        <ThemeProvider value={theme}>
            <StatusBar
                translucent={false}
                style={isDark ? 'light' : 'dark'}
                backgroundColor={theme.colors.background}
            />

            <Stack
                screenOptions={{
                    headerStyle: {
                        backgroundColor: theme.colors.background,
                    },
                    headerTintColor: isDark ? '#fff' : '#000',
                }}
            >
                <Stack.Screen
                    name="bookings"
                    options={{ title: 'Bookings' }}
                />

                <Stack.Screen
                    name="over-view"
                    options={{ title: 'Overview' }}
                />

                <Stack.Screen
                    name="profile"
                    options={{ title: 'Profile' }}
                />
            </Stack>
        </ThemeProvider>
    )
}
