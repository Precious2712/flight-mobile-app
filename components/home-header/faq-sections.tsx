import React, { useState } from 'react'
import {
    View,
    Text,
    StyleSheet,
    Pressable,
    LayoutAnimation,
    Platform,
    UIManager,
} from 'react-native'
import { IconSymbol } from '@/components/ui/icon-symbol'
import { DarkThemeApp, LightTheme } from '@/constants/navigation'
import { useColorScheme } from '@/hooks/use-color-scheme'


if (Platform.OS === 'android' && UIManager.setLayoutAnimationEnabledExperimental) {
    UIManager.setLayoutAnimationEnabledExperimental(true)
}

const faqs = [
    {
        question: 'How do I cancel or modify my flight booking?',
        answer:
            'You can cancel or modify your booking through your account dashboard up to 24 hours before departure. A cancellation fee may apply depending on your ticket type.',
    },
    {
        question: 'What is your refund policy?',
        answer:
            'Refunds are issued within 7-10 business days of cancellation. Refund eligibility depends on the ticket type and airline policies.',
    },
    {
        question: 'Can I change my departure date after booking?',
        answer:
            'Yes, you can modify your departure date through your account or by contacting our support team.',
    },
    {
        question: 'Do you offer travel insurance?',
        answer:
            'Yes, we offer comprehensive travel insurance options during checkout.',
    },
    {
        question: 'What payment methods do you accept?',
        answer:
            'We accept credit cards, debit cards, digital wallets, and bank transfers.',
    },
    {
        question: 'How far in advance should I book my flight?',
        answer:
            'Booking 6–8 weeks in advance usually offers the best prices.',
    },
]

export default function FAQSection() {
    const [expandedIndex, setExpandedIndex] = useState<number | null>(null)

    const toggle = (index: number) => {
        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut)
        setExpandedIndex(expandedIndex === index ? null : index)
    }

    const scheme = useColorScheme()
    const theme = scheme === 'dark' ? DarkThemeApp : LightTheme
    const colors = theme.colors

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={[styles.title, {color: colors.text}]}>Frequently Asked Questions</Text>
                <Text style={styles.subtitle}>
                    Find answers to common questions about booking and traveling with SkyWings
                </Text>
            </View>

            {faqs.map((faq, index) => {
                const isOpen = expandedIndex === index

                return (
                    <View key={index} style={styles.card}>
                        <Pressable style={styles.questionRow} onPress={() => toggle(index)}>
                            <Text style={styles.question}>{faq.question}</Text>

                            <IconSymbol
                                name="chevron.down"
                                size={20}
                                color="#2563eb"
                                style={{
                                    transform: [{ rotate: isOpen ? '180deg' : '0deg' }],
                                }}
                            />
                        </Pressable>

                        {isOpen && (
                            <View style={styles.answerBox}>
                                <Text style={styles.answer}>{faq.answer}</Text>
                            </View>
                        )}
                    </View>
                )
            })}


        </View>
    )
}


const styles = StyleSheet.create({
    container: {
        paddingVertical: 20,
        paddingHorizontal: 6,
        backgroundColor: '#F9FAFB',
        width: "95%",
        alignSelf: 'center',
        marginTop: 20,
        flexDirection: 'column',
        borderRadius: 10
    },

    header: {
        alignItems: 'center',
        marginBottom: 28,
    },

    title: {
        fontSize: 23,
        fontWeight: '700',
        marginBottom: 8,
        // color: '#111827',
        textAlign: 'center',
    },

    subtitle: {
        fontSize: 15,
        color: '#6B7280',
        textAlign: 'center',
        maxWidth: 300,
    },

    card: {
        borderWidth: 1,
        borderColor: '#E5E7EB',
        borderRadius: 12,
        backgroundColor: '#FFFFFF',
        marginBottom: 12,
        overflow: 'hidden',
    },

    questionRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 16,
    },

    question: {
        fontSize: 15,
        fontWeight: '600',
        color: '#111827',
        flex: 1,
        paddingRight: 12,
    },

    answerBox: {
        padding: 16,
        borderTopWidth: 1,
        borderTopColor: '#E5E7EB',
        backgroundColor: '#F9FAFB',
    },

    answer: {
        fontSize: 14,
        color: '#4B5563',
        lineHeight: 20,
    },

    cta: {
        marginTop: 32,
        padding: 20,
        borderRadius: 14,
        backgroundColor: '#DBEAFE',
        borderWidth: 1,
        borderColor: '#93C5FD',
        alignItems: 'center',
    },

    ctaTitle: {
        fontSize: 18,
        fontWeight: '600',
        marginBottom: 6,
        color: '#111827',
    },

    ctaText: {
        fontSize: 14,
        color: '#374151',
        marginBottom: 14,
        textAlign: 'center',
    },

    ctaButton: {
        backgroundColor: '#2563eb',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 10,
    },

    ctaButtonText: {
        color: '#ffffff',
        fontWeight: '600',
    },
})
