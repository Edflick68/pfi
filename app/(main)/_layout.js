import { Slot, useRouter } from "expo-router";
import { View, Text, Button } from "react-native";
import { useAuth } from "../../context/AuthContext";
import { useEffect } from "react";

export default function MainLayout() {
  const { user, logout } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!user) {
      router.replace("/");
    }
  }, [user]);

  const handleLogout = () => {
    logout();
    router.replace("/");
  };

  if (!user) return null;

  return (
    <View style={{ flex: 1 }}>
      <View
        style={{
          height: 80,
          paddingTop: 40,
          backgroundColor: "#f8f8f8",
          flexDirection: "row",
          justifyContent: "space-around",
          alignItems: "center",
        }}
      >
        <Text>Utilisateur: {user?.nom}</Text>
        <Text>Langue: {user?.langue}</Text>
        <Button title="Déconnexion" onPress={handleLogout} />
      </View>

      <Slot />
    </View>
  );
}
