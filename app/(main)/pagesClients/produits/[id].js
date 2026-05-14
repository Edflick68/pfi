import {
  View,
  Text,
  Image,
  StyleSheet,
  Button,
  ScrollView,
  Alert,
} from "react-native";
import { useLocalSearchParams } from "expo-router";
import { useSQLiteContext } from "expo-sqlite";
import { useEffect, useState } from "react";
import { useCart } from "../../../../context/CartContext";
import i18n from "../../../../i18n";

const imageMap = {
  "assets/images-produits/Banana.jpg": require("../../../../assets/images-produits/Banana.jpg"),
  "assets/images-produits/Bomb.jpg": require("../../../../assets/images-produits/Bomb.jpg"),
  "assets/images-produits/BulletBill.jpg": require("../../../../assets/images-produits/BulletBill.jpg"),
  "assets/images-produits/Flower_boomrang.jpg": require("../../../../assets/images-produits/Flower_boomrang.jpg"),
  "assets/images-produits/Flower_fire.jpg": require("../../../../assets/images-produits/Flower_fire.jpg"),
  "assets/images-produits/Horn.jpg": require("../../../../assets/images-produits/Horn.jpg"),
  "assets/images-produits/Lightning.jpg": require("../../../../assets/images-produits/Lightning.jpg"),
  "assets/images-produits/Mushroom_gold.jpg": require("../../../../assets/images-produits/Mushroom_gold.jpg"),
  "assets/images-produits/Mushroom_red.jpg": require("../../../../assets/images-produits/Mushroom_red.jpg"),
  "assets/images-produits/Shell_blue.jpg": require("../../../../assets/images-produits/Shell_blue.jpg"),
  "assets/images-produits/Shell_green.jpg": require("../../../../assets/images-produits/Shell_green.jpg"),
  "assets/images-produits/Shell_red.jpg": require("../../../../assets/images-produits/Shell_red.jpg"),
  "assets/images-produits/Star.jpg": require("../../../../assets/images-produits/Star.jpg"),
};

export default function ProductDetails() {
  const { id } = useLocalSearchParams();
  const db = useSQLiteContext();
  const { addToCart } = useCart();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    async function getDetails() {
      try {
        const result = await db.getFirstAsync(
          "SELECT * FROM produit WHERE id = ?",
          [id],
        );
        setProduct(result);
      } catch (error) {
        console.error("Erreur de chargement du produit:", error);
      }
    }
    getDetails();
  }, [id]);

  const handleAddToCart = () => {
    addToCart(product);
    Alert.alert("Succès", `${product.nom} a été ajouté au panier!`);
  };

  if (!product) {
    return (
      <View style={styles.loadingContainer}>
        <Text>Chargement du produit...</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Image source={imageMap[product.image]} style={styles.largeImage} />

      <View style={styles.detailsBox}>
        <Text style={styles.title}>{product.nom}</Text>
        <Text style={styles.price}>{product.prix} $</Text>

        <Text style={styles.sectionTitle}>Description</Text>
        <Text style={styles.description}>{product.description}</Text>

        <View style={styles.btnWrapper}>
          <Button
            title={i18n.t("addToCart")}
            color="#e91e63"
            onPress={handleAddToCart}
          />
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  loadingContainer: { flex: 1, justifyContent: "center", alignItems: "center" },
  container: { flex: 1, backgroundColor: "#f4f4f4" },
  content: { paddingBottom: 40 },
  largeImage: {
    width: "100%",
    height: 350,
    resizeMode: "contain",
    backgroundColor: "#fff",
    padding: 20,
  },
  detailsBox: {
    padding: 25,
    backgroundColor: "#fff",
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    marginTop: -20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 5,
  },
  title: { fontSize: 28, fontWeight: "bold", color: "#333" },
  price: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#27ae60",
    marginVertical: 10,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    marginTop: 15,
    marginBottom: 5,
    color: "#555",
  },
  description: { fontSize: 16, color: "#666", lineHeight: 24 },
  btnWrapper: { marginTop: 30, borderRadius: 8, overflow: "hidden" },
});
