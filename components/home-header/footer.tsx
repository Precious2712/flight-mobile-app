import React from 'react'
import { View, Text, StyleSheet, Pressable } from 'react-native'

export default function Footer() {
    return (
        <View style={styles.container}>
           
            <Text style={styles.logo}>Airswift</Text>

            <Text style={styles.description}>
                Book flights with confidence. Fast, secure, and reliable travel
                solutions tailored for you.
            </Text>

            
            {/* <View style={styles.linksRow}>
                <Pressable>
                    <Text style={styles.link}>About</Text>
                </Pressable>
                <Pressable>
                    <Text style={styles.link}>Support</Text>
                </Pressable>
                <Pressable>
                    <Text style={styles.link}>Terms</Text>
                </Pressable>
                <Pressable>
                    <Text style={styles.link}>Privacy</Text>
                </Pressable>
            </View> */}

            
            <View style={styles.divider} />

            
            <Text style={styles.copy}>
                © {new Date().getFullYear()} Airswift. All rights reserved.
            </Text>
        </View>
    )
}


const styles = StyleSheet.create({
    container: {
        paddingVertical: 32,
        paddingHorizontal: 10,
        backgroundColor: '#0F172A',
        alignItems: 'center',
        marginTop: 20,
        width: "95%",
        flexDirection: "column",
        alignSelf: "center"
    },

    logo: {
        fontSize: 20,
        fontWeight: '700',
        color: '#ffffff',
        marginBottom: 8,
    },

    description: {
        fontSize: 14,
        color: '#CBD5E1',
        textAlign: 'center',
        marginBottom: 20,
        maxWidth: 320,
        lineHeight: 20,
    },

    linksRow: {
        flexDirection: 'row',
        gap: 16,
        marginBottom: 20,
    },

    link: {
        fontSize: 14,
        color: '#93C5FD',
        fontWeight: '500',
    },

    divider: {
        height: 1,
        width: '100%',
        backgroundColor: '#1E293B',
        marginBottom: 12,
    },

    copy: {
        fontSize: 12,
        color: '#94A3B8',
    },
})
