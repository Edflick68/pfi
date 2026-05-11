import { Slot } from "expo-router";
import { View, Text, Button } from "react-native";
import { useAuth } from "../../context/AuthContext";

export default function MainLayout() {
  const { user, logout } = useAuth();

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
        <Button title="Déconnexion" onPress={logout} />
      </View>

      <Slot />
    </View>
  );
}
