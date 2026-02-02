import { supabase } from "@/lib/superbase";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { ActivityIndicator, View, Alert } from "react-native";

export default function AuthCallback() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkSession = async () => {
      try {
        const { data, error } = await supabase.auth.getSession();

        if (error) {
          Alert.alert("Auth Error", error.message);
          router.replace("/login");
          return;
        }

        if (data.session) {
          // For email/password, check if email is confirmed
          const user = data.session.user;
          if (!user.email_confirmed_at) {
            Alert.alert(
              "Email Verification Required",
              "Please check your email and verify your account."
            );
            router.replace("/login");
            return;
          }

          // Logged in (Google users are already confirmed)
          router.replace("/");
        } else {
          router.replace("/login");
        }
      } catch (err: any) {
        console.error("Session check failed", err);
        router.replace("/login");
      } finally {
        setLoading(false);
      }
    };

    checkSession();
  }, []);

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <ActivityIndicator size="large" />
    </View>
  );
}
