import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { IconSymbol } from '@/components/ui/icon-symbol'

const testimonials = [
    {
        name: 'Sarah Johnson',
        role: 'Business Traveler',
        text: 'SkyWings made booking my flights incredibly easy. The interface is intuitive and I saved over $150 on my last trip!',
        rating: 5,
        image: '👩‍💼',
    },
    {
        name: 'Michael Chen',
        role: 'Leisure Traveler',
        text: "Best flight booking experience I've had. Great deals, excellent customer support, and transparent pricing. Highly recommended!",
        rating: 5,
        image: '👨‍💼',
    },
    {
        name: 'Emma Williams',
        role: 'Frequent Flyer',
        text: "I've been using SkyWings for over a year now. The loyalty rewards program is fantastic and the prices are unbeatable.",
        rating: 5,
        image: '👩‍🔬',
    },
    {
        name: 'David Rodriguez',
        role: 'Family Vacation Planner',
        text: 'Booked flights for our entire family and got amazing prices. The customer service team was super helpful with all our questions.',
        rating: 5,
        image: '👨‍👩‍👧‍👦',
    },
]

export default function Testimonials() {
    return (
        <View style={styles.container}>

            <View style={styles.header}>
                <Text style={styles.title}>What Our Customers Say</Text>
                <Text style={styles.subtitle}>
                    Join thousands of happy travelers who trust Airswift
                </Text>
            </View>


            {testimonials.map((testimonial) => (
                <View key={testimonial.name} style={styles.card}>

                    <View style={styles.userRow}>
                        <Text style={styles.avatar}>{testimonial.image}</Text>
                        <View>
                            <Text style={styles.name}>{testimonial.name}</Text>
                            <Text style={styles.role}>{testimonial.role}</Text>
                        </View>
                    </View>


                    <View style={styles.ratingRow}>
                        {Array.from({ length: testimonial.rating }).map((_, i) => (
                            <IconSymbol
                                key={i}
                                name="star.fill"
                                size={16}
                                color="#F59E0B"
                            />
                        ))}
                    </View>


                    <Text style={styles.text}>
                        “{testimonial.text}”
                    </Text>
                </View>
            ))}
        </View>
    )
}


const styles = StyleSheet.create({
    container: {
        paddingVertical: 24,
        paddingHorizontal: 16,
        backgroundColor: '#F9FAFB',
        borderRadius: 10,
        width: '95%',
        flexDirection: 'column',
        alignSelf: 'center',
    },
    header: {
        alignItems: 'center',
        marginBottom: 24,
    },
    title: {
        fontSize: 24,
        fontWeight: '700',
        marginBottom: 6,
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
    userRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
        marginBottom: 12,
    },
    avatar: {
        fontSize: 36,
    },
    name: {
        fontSize: 16,
        fontWeight: '600',
    },
    role: {
        fontSize: 13,
        color: '#6B7280',
    },
    ratingRow: {
        flexDirection: 'row',
        gap: 4,
        marginBottom: 10,
    },
    text: {
        fontSize: 14,
        color: '#4B5563',
        lineHeight: 20,
    },
})
