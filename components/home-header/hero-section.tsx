import React, { useEffect, useRef } from 'react'
import {
    View,
    Text,
    StyleSheet,
    ImageBackground,
    Animated,
    Dimensions,
} from 'react-native'

const { width } = Dimensions.get('window')
const HERO_HEIGHT = 300

export default function HeroSection() {
    const fadeAnim = useRef(new Animated.Value(0)).current
    const slideAnim = useRef(new Animated.Value(30)).current

    useEffect(() => {
        Animated.parallel([
            Animated.timing(fadeAnim, {
                toValue: 1,
                duration: 800,
                useNativeDriver: true,
            }),
            Animated.timing(slideAnim, {
                toValue: 0,
                duration: 800,
                useNativeDriver: true,
            }),
        ]).start()
    }, [])

    return (
        <ImageBackground
            source={{uri: 'https://images.unsplash.com/photo-1551907053-251bc075d47c?auto=format&fit=crop&w=2000&q=80'}}
            style={styles.image}
            resizeMode="cover"
        >
            <View style={styles.overlay} />

            <Animated.View
                style={[
                    styles.textWrapper,
                    {
                        opacity: fadeAnim,
                        transform: [{ translateY: slideAnim }],
                    },
                ]}
            >
                <Text style={styles.title}>Book Your Next Trip</Text>
                <Text style={styles.subtitle}>
                    Discover amazing destinations and book instantly
                </Text>
            </Animated.View>
        </ImageBackground>
    )
}



const styles = StyleSheet.create({
    image: {
        width,
        height: HERO_HEIGHT,
        justifyContent: 'flex-end',
    },

    overlay: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: 'rgba(0,0,0,0.45)',
    },

    textWrapper: {
        padding: 24,
    },

    title: {
        fontSize: 30,
        fontWeight: '800',
        color: '#fff',
        marginBottom: 8,
    },

    subtitle: {
        fontSize: 16,
        color: '#E5E7EB',
        lineHeight: 22,
        maxWidth: '90%',
    },
})
