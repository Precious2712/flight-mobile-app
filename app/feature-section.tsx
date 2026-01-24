import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { IconSymbol } from '@/components/ui/icon-symbol'

export default function FeaturesSection() {
    const features = [
        {
            icon: 'bolt.fill',
            title: 'Fast Booking',
            description:
                'Complete your flight booking in under 2 minutes with our streamlined process',
        },
        {
            icon: 'shield.fill',
            title: 'Secure Payment',
            description:
                'Your data is protected with industry-leading encryption and security protocols',
        },
        {
            icon: 'mappin.and.ellipse',
            title: 'Global Destinations',
            description:
                'Access flights to over 2,000 destinations worldwide at competitive prices',
        },
        {
            icon: 'clock.fill',
            title: '24/7 Support',
            description:
                'Our dedicated support team is available round-the-clock to assist you',
        },
    ] as const

    return (
        <View style={styles.container}>
            {features.map((feature, index) => (
                <View key={index} style={styles.card}>
                    <View style={styles.iconWrapper}>
                        <IconSymbol
                            name={feature.icon}
                            size={22}
                            color="#2563EB"
                        />
                    </View>

                    <View style={styles.textWrap}>
                        <Text style={styles.title}>{feature.title}</Text>
                        <Text style={styles.description}>
                            {feature.description}
                        </Text>
                    </View>
                </View>
            ))}
        </View>
    )
}



const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 16,
        paddingVertical: 24,
    },

    card: {
        flexDirection: 'row',
        gap: 14,
        backgroundColor: '#F9FAFB',
        borderRadius: 16,
        padding: 16,
        marginBottom: 14,

        borderWidth: 1,
        borderColor: '#E5E7EB',

        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 6,
        elevation: 2,
    },

    iconWrapper: {
        width: 44,
        height: 44,
        borderRadius: 12,
        backgroundColor: '#2563EB15',
        alignItems: 'center',
        justifyContent: 'center',
    },

    textWrap: {
        flex: 1,
    },

    title: {
        fontSize: 16,
        fontWeight: '700',
        color: '#111827',
        marginBottom: 4,
    },

    description: {
        fontSize: 14,
        color: '#6B7280',
        lineHeight: 20,
    },
})