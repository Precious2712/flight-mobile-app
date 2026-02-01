import React, { useEffect, useState } from 'react'
import {
    ScrollView,
    StyleSheet,
    Modal,
    View,
    Text,
    Pressable
} from 'react-native'
import { ThemedView } from '@/components/themed-view'
import HomeHeader from '@/components/home-header/HomeHeader'
import HeroSection from '@/components/home-header/hero-section'
import SearchScreen from '@/components/home-header/SearchScreen'
import { useProduct } from '@/context/useContext'
import FeaturesSection from '../components/home-header/feature-section'
import PopularDestinations from '../components/home-header/popular-destination'
import Testimonials from '../components/home-header/testimonials'
import FAQSection from '../components/home-header/faq-sections'
import Footer from '../components/home-header/footer'
import { useRouter } from 'expo-router'

export default function Index() {
    const { finalResults, setFinalResults } = useProduct()
    const [open, setOpen] = useState(false)

    const router = useRouter()

    const handleBook = () => {
        setOpen(false)
        router.push('/over-view')
    }

    useEffect(() => {
        if (finalResults && finalResults.length > 0) {
            setOpen(true)
        }
    }, [finalResults])

    const handleClose = () => {
        setOpen(false);
        setFinalResults([]);
    };


    return (
        <ThemedView safe style={styles.container}>
            <HomeHeader />

            <View style={{ flex: 1, backgroundColor: '#E5E7EB' }}>
                <ScrollView
                    contentContainerStyle={{ paddingBottom: 20 }}
                    showsVerticalScrollIndicator={false}
                >
                    <HeroSection />
                    <SearchScreen />
                    <FeaturesSection />
                    <PopularDestinations />
                    <Testimonials />
                    <FAQSection />
                    <Footer />
                </ScrollView>
            </View>

            
            <Modal visible={open} transparent animationType="fade">
                <View style={styles.overlay}>
                    <View style={styles.modal}>
                        <Text style={styles.title}>Available Flights</Text>

                        
                        <View style={{ flex: 1 }}>
                            <ScrollView
                                showsVerticalScrollIndicator={false}
                                contentContainerStyle={{ paddingBottom: 16 }}
                            >
                                {finalResults.map((flight) => {
                                    const from = JSON.parse(flight.from_airport)
                                    const to = JSON.parse(flight.to_airport)

                                    return (
                                        <View key={flight.id} style={styles.flightCard}>
                                            <Text style={styles.airline}>
                                                {flight.airline} ({flight.airline_code})
                                            </Text>

                                            <Text style={styles.route}>
                                                {from.city} ({from.airportCode}) →{' '}
                                                {to.city} ({to.airportCode})
                                            </Text>

                                            <Text style={styles.meta}>
                                                Departure: {flight.departure_date} •{' '}
                                                {flight.departure_time}
                                            </Text>

                                            <Text style={styles.meta}>
                                                Arrival: {flight.arrival_time}
                                            </Text>

                                            <Text style={styles.meta}>
                                                Duration: {flight.duration}
                                            </Text>

                                            <Text style={styles.meta}>
                                                Stops: {flight.stops}
                                            </Text>

                                            <Text style={styles.meta}>
                                                Refundable: {flight.refundable ? 'Yes' : 'No'}
                                            </Text>

                                            <Pressable
                                                onPress={handleBook}
                                                style={styles.searchButton}
                                            >
                                                <Text style={{ color: '#fff', fontWeight: '600' }}>
                                                    Book Flight
                                                </Text>
                                            </Pressable>
                                        </View>
                                    )
                                })}
                            </ScrollView>
                        </View>

                        <Pressable onPress={handleClose} style={styles.closeBtn}>
                            <Text style={styles.closeText}>Close</Text>
                        </Pressable>
                    </View>
                </View>
            </Modal>
        </ThemedView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },

    overlay: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.35)',
        justifyContent: 'center',
        alignItems: 'center',
    },


    modal: {
        width: '90%',
        height: '80%', 
        backgroundColor: '#fff',
        borderRadius: 20,
        padding: 16,
    },

    title: {
        fontSize: 20,
        fontWeight: '700',
        textAlign: 'center',
        marginBottom: 12,
    },

    flightCard: {
        padding: 14,
        borderRadius: 12,
        backgroundColor: '#F9FAFB',
        marginBottom: 12,
        borderWidth: 1,
        borderColor: '#E5E7EB',
    },

    airline: {
        fontSize: 16,
        fontWeight: '700',
    },

    route: {
        fontSize: 15,
        fontWeight: '500',
        marginVertical: 6,
    },

    meta: {
        fontSize: 14,
        color: '#6B7280',
    },

    searchButton: {
        marginTop: 10,
        backgroundColor: '#2563EB',
        paddingVertical: 12,
        borderRadius: 12,
        alignItems: 'center',
    },

    closeBtn: {
        marginTop: 10,
        paddingVertical: 12,
        borderRadius: 10,
        backgroundColor: '#E5E7EB',
        alignItems: 'center',
    },

    closeText: {
        fontSize: 16,
        fontWeight: '600',
        color: '#111827',
    },
})
