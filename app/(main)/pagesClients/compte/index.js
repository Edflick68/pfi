import { useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Pressable,
  Alert,
  ScrollView,
} from "react-native";
import { useAuth } from "../../../../context/AuthContext";
import { useSQLiteContext } from "expo-sqlite";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

const RadioOption = ({ label, value, selectedValue, onSelect }) => (
  <Pressable style={styles.radioContainer} onPress={() => onSelect(value)}>
    <View style={styles.radioOuter}>
      {selectedValue === value && <View style={styles.radioInner} />}
    </View>
    <Text style={styles.radioLabel}>{label}</Text>
  </Pressable>
);

export default function CompteScreen() {
  const { user } = useAuth();
  const db = useSQLiteContext();
  const router = useRouter();

  const [mdp, setMdp] = useState(user?.mdp || "");
  const [adresse, setAdresse] = useState(user?.adresse || "");
  const [langue, setLangue] = useState(user?.langue || "auto");

  const handleSave = async () => {
    try {
      await db.runAsync(
        "UPDATE client SET mdp = ?, adresse = ?, langue = ? WHERE nom = ?",
        [mdp, adresse, langue, user.nom],
      );
      Alert.alert("Succès", "Vos modifications ont été enregistrées.");
    } catch (error) {
      console.error("Erreur DB:", error);
      Alert.alert("Erreur", "Impossible de sauvegarder les modifications.");
    }
  };

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={{ paddingBottom: 40 }}
    >
      <Text style={styles.headerTitle}>Mon Compte</Text>

      <View style={styles.inputGroup}>
        <Text style={styles.label}>Nom d'usager (Non modifiable)</Text>
        <TextInput
          style={[styles.input, styles.inputDisabled]}
          value={user?.nom}
          editable={false}
        />
      </View>

      <View style={styles.inputGroup}>
        <Text style={styles.label}>Mot de passe</Text>
        <TextInput
          style={styles.input}
          value={mdp}
          onChangeText={setMdp}
          secureTextEntry={true}
        />
      </View>

      <View style={styles.inputGroup}>
        <Text style={styles.label}>Adresse</Text>
        <TextInput
          style={styles.input}
          value={adresse}
          onChangeText={setAdresse}
        />
      </View>

      <View style={styles.inputGroup}>
        <Text style={styles.label}>Langue de l'application</Text>
        <View style={styles.radioRow}>
          <RadioOption
            label="Fr"
            value="fr"
            selectedValue={langue}
            onSelect={setLangue}
          />
          <RadioOption
            label="En"
            value="en"
            selectedValue={langue}
            onSelect={setLangue}
          />
          <RadioOption
            label="Auto"
            value="auto"
            selectedValue={langue}
            onSelect={setLangue}
          />
        </View>
      </View>

      <Pressable style={styles.saveBtn} onPress={handleSave}>
        <Text style={styles.saveBtnText}>Sauvegarder les modifications</Text>
      </Pressable>

      <Pressable
        style={styles.mapBtn}
        onPress={() => router.push("/pagesClients/compte/entrepots")}
      >
        <Ionicons name="map-outline" size={24} color="#fff" />
        <Text style={styles.mapBtnText}>Voir nos entrepôts</Text>
        <Ionicons
          name="chevron-forward"
          size={24}
          color="#fff"
          style={{ marginLeft: "auto" }}
        />
      </Pressable>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f4f4f4", padding: 20 },
  headerTitle: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#333",
  },
  inputGroup: { marginBottom: 20 },
  label: { fontSize: 16, fontWeight: "600", color: "#555", marginBottom: 8 },
  input: {
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#ddd",
    fontSize: 16,
  },
  inputDisabled: { backgroundColor: "#eaeaea", color: "#888" },

  radioRow: { flexDirection: "row", gap: 20, marginTop: 5 },
  radioContainer: { flexDirection: "row", alignItems: "center" },
  radioOuter: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: "#27ae60",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 8,
  },
  radioInner: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: "#27ae60",
  },
  radioLabel: { fontSize: 16, color: "#333" },

  saveBtn: {
    backgroundColor: "#2980b9",
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
    marginBottom: 30,
  },
  saveBtnText: { color: "#fff", fontSize: 16, fontWeight: "bold" },

  mapBtn: {
    flexDirection: "row",
    backgroundColor: "#27ae60",
    padding: 18,
    borderRadius: 12,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  mapBtnText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
    marginLeft: 10,
  },
});
