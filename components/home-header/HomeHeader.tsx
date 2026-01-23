import {
    View,
    Text,
    StyleSheet,
    Pressable,
    Dimensions,
    Button,
} from 'react-native'
import React, { useState } from 'react'
import { IconSymbol } from '../ui/icon-symbol'
import { useRouter } from 'expo-router'

import { useTheme } from '@react-navigation/native';

const { height } = Dimensions.get('window')
export const HEADER_HEIGHT = 60

import { supabase } from "../../lib/superbase";

export default function HomeHeader() {
    const [showMenu, setShowMenu] = useState(false)
    const router = useRouter()

    const { colors } = useTheme();

    const handleNavigate = (label: string) => {
        setShowMenu(false)

        switch (label) {
            case 'Profile':
                router.push('/profile')
                break
            case 'Bookings':
                router.push('/bookings')
                break
            case 'Dashboard':
                router.push('/over-view')
                break
            case 'Sign in':
                router.push('/login')
                break
            case 'Logout':
                break
            case 'Signup':
                router.push('/signup')
                break
        }
    }


    const handleLogout = async () => {
        await supabase.auth.signOut();
        router.replace("/login");
    };

    return (
        <>
            <View style={[styles.headerBar, { backgroundColor: colors.background }]}>
                <Text style={[styles.title, { color: colors.text }]}>Home</Text>

                <Pressable
                    onPress={() => setShowMenu(prev => !prev)}
                    style={styles.menuBtn}
                >
                    <IconSymbol
                        name="line.3.horizontal"
                        size={26}
                        color={colors.text}
                    />
                </Pressable>
            </View>

            {showMenu && (
                <View style={styles.overlay}>
                    {['Profile', 'Bookings', 'Sign in', 'Dashboard', 'Signup'].map(item => (
                        <Pressable
                            key={item}
                            onPress={() => handleNavigate(item)}
                            style={({ hovered, pressed }) => [
                                styles.item,
                                (hovered || pressed) && styles.itemHover,
                            ]}
                        >
                            <Text style={styles.itemText}>{item}</Text>
                        </Pressable>
                    ))}

                    <Pressable style={styles.logoutBtn} onPress={handleLogout}>
                        <Text style={styles.logoutText}>Logout</Text>
                    </Pressable>
                </View>
            )}

        </>
    )
}



const styles = StyleSheet.create({
    headerBar: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        height: HEADER_HEIGHT,
        paddingHorizontal: 16,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
        zIndex: 1000,
        elevation: 10,
    },

    title: {
        fontSize: 18,
        fontWeight: '600',
    },

    menuBtn: {
        padding: 6,
    },

    overlay: {
        position: 'absolute',
        top: HEADER_HEIGHT,
        left: 0,
        right: 0,
        height: height - HEADER_HEIGHT,
        backgroundColor: '#fff',
        paddingTop: 8,
        paddingHorizontal: 16,
        zIndex: 999,
        elevation: 9,
    },

    item: {
        paddingVertical: 16,
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
    },

    itemHover: {
        backgroundColor: '#f5f7fa', 
    },

    itemText: {
        fontSize: 16,
        fontWeight: '500',
        color: '#111',
    },

    logoutBtn: {
        backgroundColor: "#ef4444",
        paddingVertical: 14,
        borderRadius: 10,
        alignItems: "center",
        marginTop: 20,
    },
    logoutText: {
        color: "#fff",
        fontSize: 16,
        fontWeight: "600",
    },
})
