import React, { useState } from 'react'
import {
    View,
    Text,
    FlatList,
    TouchableOpacity,
    StyleSheet,
} from 'react-native';
import { useRouter } from 'expo-router';
import { useProduct } from '@/context/useContext';
import { ThemedView } from '@/components/themed-view';
import { Flight } from '@/context/useContext';
import Toast from 'react-native-toast-message';

import { supabase } from "../../lib/superbase";

import { ActivityIndicator } from 'react-native'


export default function Overview() {
    const [loadingFlightId, setLoadingFlightId] = useState<string | null>(null);

    const {
        finalResults,
        user,
    } = useProduct()

    const router = useRouter();


    const handleBookFlight = async (flight: Flight) => {
        if (!user) {
            router.push('/login')
            return
        }

        try {
            setLoadingFlightId(flight.id)

            const { data, error } = await supabase
                .from('bookings')
                .insert({
                    user_id: user.id,
                    flight_id: flight.id,
                    airline: flight.airline,
                    from_airport: flight.from_airport,
                    to_airport: flight.to_airport,
                    departure_time: flight.departure_time,
                    arrival_time: flight.arrival_time,
                })
                .select()
                .single()

            console.log(data, 'data');


            if (error) {
                if (error.message.includes('unique_user_flight')) {
                    Toast.show({
                        type: 'info',
                        text1: 'Already booked',
                        text2: 'You already booked this flight ✈️',
                    })
                } else {
                    Toast.show({
                        type: 'error',
                        text1: 'Booking failed',
                        text2: error.message,
                    })
                }
                return
            }


            console.log(error, 'error');


            Toast.show({
                type: 'success',
                text1: 'Flight Booked ✈️',
            })
        } finally {
            setLoadingFlightId(null)
        }
    }


    if (!finalResults.length) {
        return (
            <View style={styles.center}>
                <Text style={styles.emptyText}>
                    No flights found. Try another search ✈️
                </Text>
            </View>
        )
    }

    return (
        <ThemedView style={styles.container}>
            <Text style={styles.title}>Available Flights</Text>

            <FlatList
                data={finalResults}
                keyExtractor={(item) => item.id}
                contentContainerStyle={{ paddingBottom: 24 }}
                renderItem={({ item }) => {
                    const from = JSON.parse(item.from_airport)
                    const to = JSON.parse(item.to_airport)

                    return (
                        <View style={styles.card}>
                            <View style={styles.row}>
                                <Text style={styles.airline}>{item.airline}</Text>
                                <Text style={styles.flightNo}>
                                    {item.airline_code} {item.flight_number}
                                </Text>
                            </View>

                            <View style={styles.route}>
                                <Text style={styles.airport}>
                                    {from.city} ({from.airportCode})
                                </Text>
                                <Text style={styles.arrow}>→</Text>
                                <Text style={styles.airport}>
                                    {to.city} ({to.airportCode})
                                </Text>
                            </View>

                            <View style={styles.meta}>
                                <Text>Departure: {item.departure_time}</Text>
                                <Text>Arrival: {item.arrival_time}</Text>
                                <Text>Duration: {item.duration}</Text>
                                <Text>Stops: {item.stops}</Text>
                            </View>

                            <TouchableOpacity
                                style={[
                                    styles.button,
                                    loadingFlightId === item.id && styles.buttonDisabled,
                                ]}
                                disabled={loadingFlightId === item.id}
                                onPress={() => handleBookFlight(item)}
                            >
                                {loadingFlightId === item.id ? (
                                    <ActivityIndicator color="#fff" />
                                ) : (
                                    <Text style={styles.buttonText}>Book Flight</Text>
                                )}
                            </TouchableOpacity>

                        </View>
                    )
                }}
            />
        </ThemedView>
    )
}



const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: '#fff',
    },
    center: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    emptyText: {
        fontSize: 16,
        color: '#666',
    },
    title: {
        fontSize: 22,
        fontWeight: '600',
        marginBottom: 12,
    },
    card: {
        backgroundColor: '#f9f9f9',
        borderRadius: 12,
        padding: 16,
        marginBottom: 16,
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    airline: {
        fontSize: 16,
        fontWeight: '600',
    },
    flightNo: {
        color: '#555',
    },
    route: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 8,
    },
    airport: {
        fontSize: 14,
        fontWeight: '500',
    },
    arrow: {
        marginHorizontal: 8,
        fontSize: 18,
    },
    meta: {
        marginTop: 8,
        gap: 2,
    },
    button: {
        marginTop: 12,
        backgroundColor: '#2563eb',
        paddingVertical: 12,
        borderRadius: 8,
        alignItems: 'center',
    },
    buttonText: {
        color: '#fff',
        fontWeight: '600',
    },
    buttonDisabled: {
        opacity: 0.7,
    },

})
