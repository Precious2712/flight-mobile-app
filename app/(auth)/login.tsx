import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import {
    Alert,
    Keyboard,
    Platform,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    TouchableWithoutFeedback,
    View,
} from "react-native";
import Toast from "react-native-toast-message";

import * as Linking from "expo-linking";
import * as WebBrowser from "expo-web-browser";

import { supabase } from "../../lib/superbase";

WebBrowser.maybeCompleteAuthSession();

const redirectTo = Platform.OS === "web" ? "http://localhost:3000/auth/callback" : Linking.createURL("auth/callback");


export default function LoginScreen() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [focused, setFocused] = useState<"email" | "password" | null>(null);

    const router = useRouter();


    useEffect(() => {
        const { data: listener } = supabase.auth.onAuthStateChange(
            (_event, session) => {
                if (session) {
                    router.replace("/");
                }
            }
        );

        return () => {
            listener.subscription.unsubscribe();
        };
    }, []);


    const handleLogin = async () => {
        if (!email || !password) {
            Toast.show({
                type: "info",
                text1: "Email and password are required",
            });
            return;
        }

        setLoading(true);

        try {
            const { data, error } = await supabase.auth.signInWithPassword({
                email,
                password,
            });

            if (error) {
                Toast.show({
                    type: "error",
                    text1: "Login failed",
                    text2: error.message,
                });
                return;
            }

            if (data?.session) {
                Toast.show({
                    type: "success",
                    text1: "Login successful 🎉",
                });

                router.replace("/");
            }
        } finally {
            setLoading(false);
        }
    };


    const handleGoogleLogin = async () => {
        const { data, error } = await supabase.auth.signInWithOAuth({
            provider: "google",
            options: { redirectTo },
        });

        if (error) {
            Toast.show({
                type: "error",
                text1: `Google Sign-in failed", ${error.message}`,
            });
            return;
        }

        if (data?.url) {
            await WebBrowser.openAuthSessionAsync(data.url, redirectTo);
        }
    };

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
            <View style={styles.container}>
                <Text style={styles.title}>Welcome Back</Text>

                <TextInput
                    placeholder="Email"
                    value={email}
                    onChangeText={setEmail}
                    autoCapitalize="none"
                    keyboardType="email-address"
                    onFocus={() => setFocused("email")}
                    onBlur={() => setFocused(null)}
                    style={[
                        styles.input,
                        focused === "email" && styles.focusRing,
                    ]}
                />

                <TextInput
                    placeholder="Password"
                    value={password}
                    onChangeText={setPassword}
                    secureTextEntry
                    onFocus={() => setFocused("password")}
                    onBlur={() => setFocused(null)}
                    style={[
                        styles.input,
                        focused === "password" && styles.focusRing,
                    ]}
                />

                <TouchableOpacity
                    onPress={handleLogin}
                    style={styles.primaryButton}
                    disabled={loading}
                >
                    <Text style={styles.primaryButtonText}>
                        {loading ? "Logging in..." : "Login"}
                    </Text>
                </TouchableOpacity>

                <TouchableOpacity
                    onPress={handleGoogleLogin}
                    style={styles.googleButton}
                >
                    <Text style={styles.googleButtonText}>
                        Continue with Google
                    </Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => router.push("/signup")}>
                    <Text style={styles.link}>
                        Don’t have an account? Sign up
                    </Text>
                </TouchableOpacity>
            </View>
        </TouchableWithoutFeedback>
    );
}

// ---------------- STYLES ----------------
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#ffffff",
        paddingHorizontal: 20,
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
        borderRadius: 10,
        padding: 14,
        fontSize: 16,
        marginBottom: 14,
        backgroundColor: "#ffffff",
        borderColor: "#d1d5db",
    },
    focusRing: {
        borderColor: "#2563eb",
        borderWidth: 2,
        shadowColor: "#2563eb",
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.35,
        shadowRadius: 6,
        elevation: 4,
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
