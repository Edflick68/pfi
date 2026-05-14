import { View, FlatList, Text, Pressable, StyleSheet } from "react-native";
import { useEffect, useState } from "react";
import { useSQLiteContext, SQLiteProvider } from "expo-sqlite";
import { formatPrice } from "../../../../utils/formatPrice";
import i18n from "../../../../i18n";

export default function ListeProduit() {
  return <Content />;
}

function Content() {
  const db = useSQLiteContext();
  const [produits, setProduits] = useState([]);

  async function chargerProduit() {
    const result = await db.getAllAsync(
      "SELECT * FROM produit ORDER BY id DESC",
    );
    setProduits(result);
  }

  useEffect(() => {
    chargerProduit();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.titre}>{i18n("appName")}</Text>
      {afficherFormulaire && (
        <Formulaire note={note} setNote={setNote} ajouterNote={ajouterNote} />
      )}
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    paddingTop: 30,
    flex: 1,
    backgroundColor: "#fff",
  },
  titre: {
    fontSize: 20,
    fontWeight: "bold",
  },
  notePressable: {
    backgroundColor: "lightsalmon",
    paddingBottom: 5,
    marginBottom: 5,
    borderWidth: 5,
  },
  produitContent: {
    backgroundColor: "lightgrey",
    paddingBottom: 5,
    marginBottom: 5,
    fontSize: 16,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    marginVertical: 5,
    borderRadius: 5,
  },
});
