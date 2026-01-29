import { useEffect } from "react";
import { View, ActivityIndicator } from "react-native";
import { useRouter } from "expo-router";
import * as Linking from "expo-linking";
import { supabase } from "@/lib/superbase";

export default function AuthCallback() {
  const router = useRouter();

  useEffect(() => {
    const handleAuth = async () => {
      // ✅ Get the full redirect URL properly
      const url = await Linking.getInitialURL();

      console.log(url);
      

      if (!url) {
        router.replace("/login");
        return;
      }

      // ✅ Let Supabase parse the URL itself
      const { error } = await supabase.auth.exchangeCodeForSession(url);

      if (error) {
        console.log("OAuth error:", error.message);
        router.replace("/login");
        return;
      }

      // ✅ OAuth success → go home
      router.replace("/");
    };

    handleAuth();
  }, []);

  return (
    <View style={{ flex: 1, justifyContent: "center" }}>
      <ActivityIndicator size="large" />
    </View>
  );
}
