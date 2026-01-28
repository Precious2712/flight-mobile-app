import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { IconSymbol } from '@/components/ui/icon-symbol'

const destinations = [
    { city: 'New York', country: 'USA', price: 'From $199', flights: '500+' },
    { city: 'London', country: 'UK', price: 'From $249', flights: '480+' },
    { city: 'Paris', country: 'France', price: 'From $279', flights: '450+' },
    { city: 'Tokyo', country: 'Japan', price: 'From $599', flights: '320+' },
    { city: 'Dubai', country: 'UAE', price: 'From $349', flights: '380+' },
    { city: 'Sydney', country: 'Australia', price: 'From $699', flights: '260+' },
]

export default function PopularDestinations() {
    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.title}>Popular Destinations</Text>
                <Text style={styles.subtitle}>
                    Explore our most booked flights and find your next adventure
                </Text>
            </View>

            {destinations.map((destination) => (
                <View key={destination.city} style={styles.card}>
                    
                    <View style={styles.topRow}>
                        <View>
                            <Text style={styles.city}>{destination.city}</Text>

                            <View style={styles.locationRow}>
                                <IconSymbol
                                    name="mappin.and.ellipse"
                                    size={14}
                                    color="#6B7280"
                                />
                                <Text style={styles.country}>{destination.country}</Text>
                            </View>
                        </View>

                        <IconSymbol
                            name="chart.line.uptrend.xyaxis"
                            size={20}
                            color="#2563EB"
                        />
                    </View>

                   
                    <View style={styles.infoRow}>
                        <View style={styles.infoItem}>
                            <Text style={styles.label}>Starting price</Text>
                            <Text style={styles.price}>{destination.price}</Text>
                        </View>

                        <View style={styles.infoItem}>
                            <Text style={styles.label}>Available flights</Text>
                            <Text style={styles.flights}>{destination.flights}</Text>
                        </View>
                    </View>
                </View>
            ))}
        </View>
    )
}


const styles = StyleSheet.create({
    container: {
        paddingVertical: 20,
        paddingHorizontal: 10,
    },
    header: {
        alignItems: 'center',
        marginBottom: 24,
    },
    title: {
        fontSize: 24,
        fontWeight: '700',
        marginBottom: 6,
        color: 'white'
    },
    subtitle: {
        fontSize: 15,
        color: '#6B7280',
        textAlign: 'center',
    },
    card: {
        padding: 16,
        borderRadius: 14,
        borderWidth: 1,
        borderColor: '#E5E7EB',
        backgroundColor: '#FFFFFF',
        marginBottom: 16,
    },
    topRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 14,
    },
    city: {
        fontSize: 18,
        fontWeight: '600',
        marginBottom: 4,
    },
    locationRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 4,
    },
    country: {
        fontSize: 13,
        color: '#6B7280',
    },
    infoRow: {
        gap: 10,
    },
    infoItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    label: {
        fontSize: 13,
        color: '#6B7280',
    },
    price: {
        fontSize: 14,
        fontWeight: '600',
        color: '#2563EB',
    },
    flights: {
        fontSize: 14,
        fontWeight: '600',
    },
})
