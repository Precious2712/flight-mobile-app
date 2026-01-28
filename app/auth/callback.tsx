import { useEffect } from "react";
import { useRouter } from "expo-router";

export default function AuthCallback() {
  const router = useRouter();

  useEffect(() => {
    router.push("/");
  }, []);

  return null;
}
