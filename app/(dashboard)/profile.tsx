import { StyleSheet, Text, View, Image } from 'react-native'
import React from 'react'
import { useProduct } from '@/context/useContext'

export default function Profile() {
    const { user, authLoading } = useProduct()

    if (authLoading) {
        return (
            <View style={styles.center}>
                <Text>Loading profile...</Text>
            </View>
        )
    }

    if (!user) {
        return (
            <View style={styles.center}>
                <Text>No user logged in</Text>
            </View>
        )
    }

    return (
        <View style={styles.container}>
            {user.user_metadata?.avatar_url && (
                <Image
                    source={{ uri: user.user_metadata.avatar_url }}
                    style={styles.avatar}
                />
            )}

            <Text style={styles.name}>
                {user.user_metadata?.full_name || 'Anonymous User'}
            </Text>

            <Text style={styles.text}>📧 {user.email}</Text>

            <Text style={styles.text}>
                🔐 Provider: {user.app_metadata?.provider}
            </Text>

            <Text style={styles.text}>
                ID: {user.id}
            </Text>

            <Text style={styles.text}>
                📅 Joined: {new Date(user.created_at).toDateString()}
            </Text>

           
        </View>
    )
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        alignItems: 'center',
        backgroundColor: '#fff',
    },
    center: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    avatar: {
        width: 90,
        height: 90,
        borderRadius: 45,
        marginBottom: 15,
    },
    name: {
        fontSize: 20,
        fontWeight: '600',
        marginBottom: 10,
    },
    text: {
        fontSize: 14,
        marginBottom: 6,
        color: '#444',
    },

})
