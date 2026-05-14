import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  Alert,
  Image,
} from "react-native";
import { useState } from "react";
import { useRouter } from "expo-router";
import { useAuth } from "../context/AuthContext";

export default function LoginScreen() {
  const router = useRouter();
  const { login } = useAuth();

  const [nom, setNom] = useState("");
  const [mdp, setMdp] = useState("");

  const handleLogin = async () => {
    if (!nom || !mdp) {
      Alert.alert("Erreur", "Veuillez entrer votre nom et mot de passe.");
      return;
    }

    const user = await login(nom, mdp);

    if (user) {
      if (user.admin === 1 || user.admin === true) {
        router.replace("/(main)/pagesAdmin/listeProduit");
      } else {
        router.replace("/(main)/pagesClients/produits");
      }
    } else {
      Alert.alert("Erreur", "Nom ou mot de passe incorrect.");
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Boutique Mario Kart</Text>
        <Image
          source={require("../../assets/Tire.png")}
          style={styles.logo}
          resizeMode="contain"
        />

        <TextInput
          style={styles.input}
          placeholder="Nom d'utilisateur"
          value={nom}
          onChangeText={setNom}
          autoCapitalize="none"
        />
        <TextInput
          style={styles.input}
          placeholder="Mot de passe"
          value={mdp}
          onChangeText={setMdp}
          secureTextEntry
        />
        <Button title="Se connecter" onPress={handleLogin} />
      </View>

      <Text style={styles.footer}>Développé par: [Ton Nom Ici]</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
    padding: 20,
    backgroundColor: "#fff",
  },
  content: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 20,
  },
  logo: {
    width: 200,
    height: 100,
    marginBottom: 40,
  },
  input: {
    width: "100%",
    height: 50,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 15,
    marginBottom: 15,
  },
  footer: {
    textAlign: "center",
    marginBottom: 20,
    color: "#666",
  },
});
