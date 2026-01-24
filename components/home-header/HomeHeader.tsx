import {
    View,
    Text,
    StyleSheet,
    Pressable,
    Dimensions,
} from 'react-native'
import React, { useState } from 'react'
import { IconSymbol } from '../ui/icon-symbol'
import { useRouter } from 'expo-router'
import { useTheme } from '@react-navigation/native'
import { supabase } from '@/lib/superbase'
import { DarkThemeApp } from '@/constants/navigation'

const { height } = Dimensions.get('window')
export const HEADER_HEIGHT = 60

export default function HomeHeader() {
    const [showMenu, setShowMenu] = useState(false)
    const router = useRouter()
    const { colors } = useTheme()

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
            case 'Signup':
                router.push('/signup')
                break
            case 'Home':
                router.push('/')
                break
        }
    }

    const handleLogout = async () => {
        await supabase.auth.signOut()
        router.replace('/login')
    }

    return (
        <View style={styles.wrapper}>

            <View style={[styles.headerBar, { backgroundColor: '#2563EB' }]}>
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
                    {['Profile', 'Bookings', 'Sign in', 'Dashboard', 'Signup', 'Home'].map(item => (
                        <Pressable
                            key={item}
                            onPress={() => handleNavigate(item)}
                            style={styles.item}
                        >
                            <Text style={styles.itemText}>{item}</Text>
                        </Pressable>
                    ))}

                    <Pressable style={styles.logoutBtn} onPress={handleLogout}>
                        <Text style={styles.logoutText}>Logout</Text>
                    </Pressable>
                </View>
            )}
        </View>
    )
}

const styles = StyleSheet.create({
    wrapper: {
        position: 'relative',
        zIndex: 100,
    },

    headerBar: {
        height: HEADER_HEIGHT,
        paddingHorizontal: 16,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
    },

    title: {
        fontSize: 18,
        fontWeight: '600',
    },

    menuBtn: {
        padding: 2,
        borderWidth: 3,
        borderRadius: 10,
        borderColor: 'white'
    },

    overlay: {
        position: 'absolute',
        top: HEADER_HEIGHT,
        left: 0,
        right: 0,
        bottom: 0,
        height: height,
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

    itemText: {
        fontSize: 16,
        fontWeight: '500',
        color: '#111',
    },

    logoutBtn: {
        backgroundColor: 'gray',
        paddingVertical: 14,
        borderRadius: 10,
        alignItems: 'center',
        marginTop: 20,
    },

    logoutText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: '600',
    },
})
