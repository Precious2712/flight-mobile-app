import React, { useEffect, useRef, useState } from 'react'
import {
    ScrollView,
    StyleSheet,
    Modal,
    View,
    Text,
    Pressable,
    Animated,
    PanResponder,
} from 'react-native'
import { ThemedView } from '@/components/themed-view'
import HomeHeader from '@/components/home-header/HomeHeader'
import HeroSection from '@/components/home-header/hero-section'
import SearchScreen from '@/components/home-header/SearchScreen'
import { useProduct } from '@/context/useContext'
import FeaturesSection from './feature-section'
import PopularDestinations from './popular-destination'
import Testimonials from './testimonials'

export default function Index() {
    const { finalResults } = useProduct()
    const [open, setOpen] = useState(false)


    useEffect(() => {
        if (finalResults.length > 0) {
            setOpen(true)
        }
    }, [finalResults])


    const translateY = useRef(new Animated.Value(0)).current

    const panResponder = useRef(
        PanResponder.create({
            onMoveShouldSetPanResponder: (_, gesture) => gesture.dy > 10,

            onPanResponderMove: (_, gesture) => {
                if (gesture.dy > 0) {
                    translateY.setValue(gesture.dy)
                }
            },

            onPanResponderRelease: (_, gesture) => {
                if (gesture.dy > 150) {
                    Animated.timing(translateY, {
                        toValue: 1000,
                        duration: 200,
                        useNativeDriver: true,
                    }).start(() => {
                        translateY.setValue(0)
                        setOpen(false)
                    })
                } else {
                    Animated.spring(translateY, {
                        toValue: 0,
                        useNativeDriver: true,
                    }).start()
                }
            },
        })
    ).current

    return (
        <ThemedView safe style={styles.container}>
            <HomeHeader />

            <ScrollView contentContainerStyle={styles.content}>
                <HeroSection />
                <SearchScreen />
                <FeaturesSection />
                <PopularDestinations />
                <Testimonials />
            </ScrollView>

            <Modal visible={open} animationType="slide" transparent>
                <Animated.View
                    style={[
                        styles.modal,
                        { transform: [{ translateY }] },
                    ]}
                    {...panResponder.panHandlers}
                >
                    <Text style={styles.title}>Available Flights</Text>

                    <ScrollView>
                        {finalResults.map((flight) => {
                            const from = JSON.parse(flight.from_airport)
                            const to = JSON.parse(flight.to_airport)

                            return (
                                <View key={flight.id} style={styles.flightCard}>
                                    <Text style={styles.airline}>
                                        {flight.airline} ({flight.airline_code})
                                    </Text>

                                    <Text style={styles.meta}>
                                        Flight ID: {flight.flight_id}
                                    </Text>
                                    <Text style={styles.meta}>
                                        Flight Number: {flight.flight_number}
                                    </Text>

                                    <Text style={styles.route}>
                                        {from.city} ({from.airportCode}) →{' '}
                                        {to.city} ({to.airportCode})
                                    </Text>

                                    <Text style={styles.meta}>
                                        Departure Date: {flight.departure_date}
                                    </Text>
                                    <Text style={styles.meta}>
                                        Departure Time: {flight.departure_time}
                                    </Text>
                                    <Text style={styles.meta}>
                                        Arrival Time: {flight.arrival_time}
                                    </Text>

                                    <Text style={styles.meta}>
                                        Duration: {flight.duration}
                                    </Text>

                                    <Text style={styles.meta}>
                                        Stops: {flight.stops}
                                    </Text>
                                    <Text style={styles.meta}>
                                        Status: {flight.status}
                                    </Text>
                                    <Text style={styles.meta}>
                                        Refundable: {flight.refundable ? 'Yes' : 'No'}
                                    </Text>

                                    <Text style={styles.section}>Baggage</Text>
                                    <Text style={styles.meta}>
                                        Cabin: {flight.baggage?.cabin}
                                    </Text>
                                    <Text style={styles.meta}>
                                        Checked: {flight.baggage?.checked}
                                    </Text>

                                    <Text style={styles.section}>Cabin Classes</Text>

                                    {Array.isArray(flight.cabin_classes) &&
                                        flight.cabin_classes.map((group, i) => {
                                            const classes = Array.isArray(group)
                                                ? group
                                                : [group]

                                            return (
                                                <View key={i} style={styles.classGroup}>
                                                    {classes.map((cls, j) => (
                                                        <Text key={j} style={styles.meta}>
                                                            • {cls?.type ?? 'N/A'} — ₦
                                                            {cls?.price ?? 'N/A'}
                                                        </Text>
                                                    ))}
                                                </View>
                                            )
                                        })}

                                    <Text style={styles.section}>Metadata</Text>
                                    <Text style={styles.meta}>
                                        DB ID: {flight.id}
                                    </Text>
                                    <Text style={styles.meta}>
                                        Created At: {flight.created_at}
                                    </Text>
                                </View>
                            )
                        })}
                    </ScrollView>

                    <Pressable
                        onPress={() => setOpen(false)}
                        style={styles.closeBtn}
                    >
                        <Text style={styles.closeText}>Close</Text>
                    </Pressable>
                </Animated.View>
            </Modal>
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

    modal: {
        flex: 1,
        padding: 20,
        backgroundColor: '#fff',
    },

    title: {
        fontSize: 20,
        fontWeight: '700',
        marginBottom: 16,
    },

    flightCard: {
        padding: 16,
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

    section: {
        marginTop: 10,
        fontSize: 15,
        fontWeight: '600',
    },

    meta: {
        fontSize: 14,
        color: '#6B7280',
        marginTop: 2,
    },

    classGroup: {
        marginLeft: 10,
    },

    closeBtn: {
        marginTop: 20,
        alignItems: 'center',
        paddingVertical: 12,
        borderRadius: 8,
        backgroundColor: '#2563EB',
    },

    closeText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: '600',
    },
})
