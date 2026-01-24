import React, { useState } from 'react'
import { View, Text, StyleSheet, Alert } from 'react-native'
import SearchFields from './search-field'
import { TripType } from './search-field'

export default function SearchScreen() {
    const [tripType, setTripType] = useState<TripType>('roundTrip')

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Search Flights</Text>

            <View style={styles.tripTypeWrapper}>
                <Text
                    style={[
                        styles.tripType,
                        tripType === 'roundTrip' && styles.activeTrip,
                    ]}
                    onPress={() => setTripType('roundTrip')}
                >
                    Round Trip
                </Text>

                <Text
                    style={[
                        styles.tripType,
                        tripType === 'oneWay' && styles.activeTrip,
                    ]}
                    onPress={() => setTripType('oneWay')}
                >
                    One Way
                </Text>
            </View>

            <SearchFields tripType={tripType} />
        </View>
    )
}


const styles = StyleSheet.create({
    container: {
        paddingTop: 20,
        paddingHorizontal: 12,

        borderWidth: 1,
        borderColor: 'transparent',
        borderRadius: 16,
    },
    title: {
        fontSize: 20,
        fontWeight: '700',
        marginBottom: 20,
        color: 'white',
    },

    tripTypeWrapper: {
        flexDirection: 'row',
        gap: 16,
        marginBottom: 20,
    },

    tripType: {
        paddingVertical: 8,
        paddingHorizontal: 14,
        borderRadius: 20,
        borderWidth: 1,
        borderColor: '#E5E7EB',
        color: '#374151',
    },

    activeTrip: {
        backgroundColor: '#2563EB',
        color: '#FFFFFF',
        borderColor: '#2563EB',
    },
})
