import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    Alert,
} from "react-native";
import { useState } from "react";
import { useRouter } from "expo-router";

import * as WebBrowser from "expo-web-browser";
import * as Linking from "expo-linking";

import { supabase } from "../../lib/superbase";

import Toast from 'react-native-toast-message';

export default function SignupScreen() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);

    const router = useRouter();

    // useEffect(() => {
    //     const { data: authListener } = supabase.auth.onAuthStateChange(
    //         (_event, session) => {
    //             if (session) {
    //                 router.push("/");
    //             }
    //         }
    //     );

    //     return () => {
    //         authListener.subscription.unsubscribe();
    //     };
    // }, []);


    const handleSignup = async () => {
        if (!email || !password) {
            Toast.show({
                type: 'info',
                text1: 'Email and password are required',
            })
            return
        }

        setLoading(true)

        try {
            const { data, error } = await supabase.auth.signUp({
                email,
                password,
                options: {
                    emailRedirectTo: 'exp://192.168.1.64:8081/--/login',
                },
            })

            if (error) {
                Toast.show({
                    type: 'error',
                    text1: 'Signup failed',
                    text2: error.message,
                })
                return
            }


            if (data?.user) {
                Toast.show({
                    type: 'success',
                    text1: 'Account created 🎉',
                    text2: 'Check your email to verify your account',
                })
            }
        } finally {
            setLoading(false)
        }
    }


    const handleGoogleLogin = async () => {
        const redirectTo = Linking.createURL("auth/callback");

        const { data, error } = await supabase.auth.signInWithOAuth({
            provider: "google",
            options: { redirectTo },
        });

        if (error) {
            Alert.alert("Google Sign-in failed", error.message);
            return;
        }

        if (data?.url) {
            await WebBrowser.openAuthSessionAsync(
                data.url,
                redirectTo
            );
        }
    };



    return (
        <View style={styles.container}>
            <Text style={styles.title}>Create Account</Text>

            <TextInput
                placeholder="Email"
                value={email}
                onChangeText={setEmail}
                autoCapitalize="none"
                keyboardType="email-address"
                style={styles.input}
            />

            <TextInput
                placeholder="Password"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
                style={styles.input}
            />

            <TouchableOpacity
                onPress={handleSignup}
                style={styles.primaryButton}
                disabled={loading}
            >
                <Text style={styles.primaryButtonText}>
                    {loading ? "Signing up..." : "Sign Up"}
                </Text>
            </TouchableOpacity>

            <TouchableOpacity
                onPress={handleGoogleLogin}
                style={styles.googleButton}
            >
                <Text style={styles.googleButtonText}>Continue with Google</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => router.push("/login")}>
                <Text style={styles.link}>Already have an account? Login</Text>
            </TouchableOpacity>
        </View>
    );
}



const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#ffffff",
        paddingHorizontal: 24,
        justifyContent: "center",
    },

    title: {
        fontSize: 28,
        fontWeight: "700",
        textAlign: "center",
        marginBottom: 24,
        color: "#111827",
    },

    input: {
        borderWidth: 1,
        borderColor: "#d1d5db",
        borderRadius: 10,
        padding: 14,
        fontSize: 16,
        marginBottom: 14,
        backgroundColor: "#f9fafb",
    },

    primaryButton: {
        backgroundColor: "#2563eb",
        paddingVertical: 16,
        borderRadius: 10,
        marginTop: 10,
    },

    primaryButtonText: {
        color: "#ffffff",
        fontSize: 16,
        fontWeight: "600",
        textAlign: "center",
    },

    googleButton: {
        backgroundColor: "#000000",
        paddingVertical: 16,
        borderRadius: 10,
        marginTop: 14,
    },

    googleButtonText: {
        color: "#ffffff",
        fontSize: 16,
        fontWeight: "600",
        textAlign: "center",
    },

    link: {
        marginTop: 20,
        textAlign: "center",
        fontSize: 14,
        color: "#2563eb",
        fontWeight: "500",
    },
});