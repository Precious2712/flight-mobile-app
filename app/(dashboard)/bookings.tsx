import React, { useEffect, useState } from 'react';
import {
    ActivityIndicator,
    FlatList,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import Toast from 'react-native-toast-message';

import { useProduct } from '@/context/useContext';
import { supabase } from '../../lib/superbase';



type Airport = {
    city: string;
    airportCode: string;
};

type Booking = {
    id: number;
    user_id: string;
    flight_id: string;
    airline: string;
    from_airport: string; 
    to_airport: string;   
    departure_time: string;
    arrival_time: string;
    created_at: string | null;
};


const parseAirport = (value: string): Airport => {
    try {
        return JSON.parse(value);
    } catch {
        return { city: 'Unknown', airportCode: '---' };
    }
};


export default function Bookings() {
    const { user } = useProduct();

    const [bookings, setBookings] = useState<Booking[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [deletingId, setDeletingId] = useState<number | null>(null);


    const fetchBookings = async () => {
        if (!user?.id) return;

        setLoading(true);
        setError(null);

        try {
            const { data, error } = await supabase
                .from('bookings')
                .select(`*`)
                .eq('user_id', user.id)
                .order('created_at', { ascending: false });

            if (error) throw error;

            setBookings(data ?? []);
        } catch (err) {
            console.log(err);
            setError('Failed to load bookings');
        } finally {
            setLoading(false);
        }
    };


    const handleDelete = async (bookingId: number) => {
        setDeletingId(bookingId);
        console.log(bookingId);

        try {
            const { error } = await supabase
                .from('bookings')
                .delete()
                .eq('id', bookingId);

            if (error) throw error;

            Toast.show({
                type: 'success',
                text1: 'Booking cancelled',
            });

            fetchBookings();
        } catch (err) {
            Toast.show({
                type: 'error',
                text1: 'Failed to cancel booking',
            });
        } finally {
            setDeletingId(null);
        }
    };

    

    useEffect(() => {
        fetchBookings();
    }, [user?.id]);


    if (loading) {
        return (
            <View style={styles.center}>
                <ActivityIndicator size="large" />
                <Text style={styles.infoText}>Loading bookings...</Text>
            </View>
        );
    }

    if (error) {
        return (
            <View style={styles.center}>
                <Text style={styles.errorText}>{error}</Text>
            </View>
        );
    }

    if (bookings.length === 0) {
        return (
            <View style={styles.center}>
                <Text style={styles.infoText}>No bookings found</Text>
            </View>
        );
    }


    return (
        <View style={styles.container}>
            <FlatList
                data={bookings}
                keyExtractor={(item) => item.id.toString()}
                contentContainerStyle={{ paddingBottom: 40 }}
                renderItem={({ item }) => {
                    const from = parseAirport(item.from_airport);
                    const to = parseAirport(item.to_airport);

                    return (
                        <View style={styles.card}>
                            <Text style={styles.airline}>{item.airline}</Text>

                            <Text style={styles.route}>
                                {from.city} ({from.airportCode}) → {to.city} ({to.airportCode})
                            </Text>

                            <Text style={styles.time}>
                                Departure: {item.departure_time}
                            </Text>

                            <Text style={styles.time}>
                                Arrival: {item.arrival_time}
                            </Text>

                            <Text style={styles.meta}>
                                Flight ID: {item.flight_id}
                            </Text>

                            <TouchableOpacity
                                style={styles.deleteBtn}
                                disabled={deletingId === item.id}
                                onPress={() => handleDelete(item.id)}
                            >
                                <Text style={styles.deleteText}>
                                    {deletingId === item.id ? 'Cancelling...' : 'Cancel Booking'}
                                </Text>
                            </TouchableOpacity>
                        </View>
                    );
                }}
            />
        </View>
    );
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
    },
    center: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    infoText: {
        marginTop: 10,
        fontSize: 16,
        color: '#666',
    },
    errorText: {
        fontSize: 16,
        color: 'red',
    },
    card: {
        backgroundColor: '#fff',
        padding: 16,
        borderRadius: 12,
        marginBottom: 12,
        elevation: 2,
    },
    airline: {
        fontSize: 18,
        fontWeight: '600',
    },
    route: {
        marginTop: 6,
        fontSize: 16,
    },
    time: {
        marginTop: 4,
        fontSize: 14,
        color: '#555',
    },
    meta: {
        marginTop: 6,
        fontSize: 12,
        color: '#888',
    },
    deleteBtn: {
        marginTop: 12,
        paddingVertical: 10,
        borderRadius: 8,
        backgroundColor: '#ff3b30',
        alignItems: 'center',
    },
    deleteText: {
        color: '#fff',
        fontWeight: '600',
    },
});
