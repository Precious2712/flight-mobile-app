import { ThemeProvider } from '@react-navigation/native';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import 'react-native-reanimated';

import { useColorScheme } from '@/hooks/use-color-scheme';
import HomeHeader from '@/components/home-header/HomeHeader';

import { ProductProvider } from '@/context/useContext';
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

      <ProductProvider>
        <Stack>
          <Stack.Screen name="index" options={{ headerBackground: () => <HomeHeader />, headerShown: false }} />
          <Stack.Screen name='(auth)' options={{ headerShown: false }} />
        </Stack>
      </ProductProvider>
    </ThemeProvider>
  );
}