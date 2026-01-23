import React, { useEffect } from 'react'
import { ScrollView, View, StyleSheet } from 'react-native'
import { ThemedView } from '@/components/themed-view'
import HomeHeader, { HEADER_HEIGHT } from '@/components/home-header/HomeHeader'
import HeroSection from '@/components/home-header/hero-section'
import SearchScreen from '@/components/home-header/SearchScreen'

import { seedFlights } from '@/data/home/seedFlights'

export default function Index() {
    // useEffect(() => {
    //     seedFlights();
    // }, []);

    return (
        <ThemedView style={styles.container}>

            <HomeHeader />

            {/* <View style={{ height: HEADER_HEIGHT }} /> */}

            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.content}
            >

                <HeroSection />
                <SearchScreen />
            </ScrollView>
        </ThemedView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },

    content: {
        paddingBottom: 40,
    },
})
