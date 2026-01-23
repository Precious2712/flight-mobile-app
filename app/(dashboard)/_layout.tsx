import { ThemeProvider } from '@react-navigation/native';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import 'react-native-reanimated';

import { useColorScheme } from '@/hooks/use-color-scheme';
import HomeHeader from '@/components/home-header/HomeHeader';

import { DarkThemeApp, LightTheme } from '@/constants/navigation';


export default function RootLayout() {
    const scheme = useColorScheme();
    const isDark = scheme === 'dark';

    return (
        <ThemeProvider value={isDark ? DarkThemeApp : LightTheme}>
            <StatusBar
                translucent={false}
                style={isDark ? 'light' : 'dark'}
                backgroundColor={isDark ? '#000000' : '#ffffff'}
            />

            <Stack>
                <Stack.Screen name="bookings" options={{ headerShown: true }} />
                <Stack.Screen name='over-view' options={{ headerShown: true }} />
                <Stack.Screen name='profile' options={{ headerShown: true }} />
            </Stack>
        </ThemeProvider>
    );
}