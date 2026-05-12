import {
  View,
  Text,
  FlatList,
  StyleSheet,
  Button,
  Modal,
  Image,
} from "react-native";
import { useCart } from "../../context/CartContext";
import { useState } from "react";

const imageMap = {
  "assets/images-produits/Banana.jpg": require("../../../assets/images-produits/Banana.jpg"),
  "assets/images-produits/Bomb.jpg": require("../../../assets/images-produits/Bomb.jpg"),
  "assets/images-produits/BulletBill.jpg": require("../../../assets/images-produits/BulletBill.jpg"),
  "assets/images-produits/Flower_boomrang.jpg": require("../../../assets/images-produits/Flower_boomrang.jpg"),
  "assets/images-produits/Flower_fire.jpg": require("../../../assets/images-produits/Flower_fire.jpg"),
  "assets/images-produits/Horn.jpg": require("../../../assets/assets/images-produits/Horn.jpg"),
  "assets/images-produits/Lightning.jpg": require("../../../assets/images-produits/Lightning.jpg"),
  "assets/images-produits/Mushroom_gold.jpg": require("../../../assets/images-produits/Mushroom_gold.jpg"),
  "assets/images-produits/Mushroom_red.jpg": require("../../../assets/images-produits/Mushroom_red.jpg"),
  "assets/images-produits/Shell_blue.jpg": require("../../../assets/images-produits/Shell_blue.jpg"),
  "assets/images-produits/Shell_green.jpg": require("../../../assets/images-produits/Shell_green.jpg"),
  "assets/images-produits/Shell_red.jpg": require("../../../assets/images-produits/Shell_red.jpg"),
  "assets/images-produits/Star.jpg": require("../../../assets/images-produits/Star.jpg"),
};

export default function PanierScreen() {
  const { cartItems, updateQuantity, clearCart, totalCartPrice } = useCart();
  const [showModal, setShowModal] = useState(false);

  const renderCartItem = ({ item }) => (
    <View style={styles.itemCard}>
      <Image source={imageMap[item.image]} style={styles.thumbnail} />
      <View style={styles.itemInfo}>
        <Text style={styles.itemName}>{item.nom}</Text>
        <Text>Prix unitaire: {item.prix} $</Text>
        <Text style={styles.itemTotal}>
          Total: {(item.prix * item.quantity).toFixed(2)} $
        </Text>

        <View style={styles.quantityContainer}>
          <Button title="-" onPress={() => updateQuantity(item.id, -1)} />
          <Text style={styles.quantityText}>{item.quantity}</Text>
          <Button title="+" onPress={() => updateQuantity(item.id, 1)} />
        </View>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Votre Panier</Text>

      <FlatList
        data={cartItems}
        renderItem={renderCartItem}
        keyExtractor={(item) => item.id.toString()}
        ListEmptyComponent={
          <Text style={styles.empty}>Le panier est vide.</Text>
        }
      />

      <View style={styles.footer}>
        <Text style={styles.totalGlobal}>
          Total Global: {totalCartPrice.toFixed(2)} $
        </Text>
        <View style={styles.buttonRow}>
          <Button title="Vider" color="orange" onPress={clearCart} />
          <Button
            title="Acheter"
            color="green"
            onPress={() => setShowModal(true)}
            disabled={cartItems.length === 0}
          />
        </View>
      </View>

      <Modal visible={showModal} animationType="slide" transparent={true}>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Merci pour votre achat !</Text>
            <Text>
              Votre commande de {totalCartPrice.toFixed(2)} $ a été traitée.
            </Text>
            <Button
              title="Fermer"
              onPress={() => {
                setShowModal(false);
                clearCart();
              }}
            />
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff", padding: 20 },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  itemCard: {
    flexDirection: "row",
    padding: 10,
    borderBottomWidth: 1,
    borderColor: "#eee",
    alignItems: "center",
  },
  thumbnail: { width: 50, height: 50, marginRight: 15 },
  itemInfo: { flex: 1 },
  itemName: { fontSize: 18, fontWeight: "bold" },
  itemTotal: { fontWeight: "bold", color: "blue" },
  quantityContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 5,
  },
  quantityText: { marginHorizontal: 15, fontSize: 16 },
  footer: {
    borderTopWidth: 2,
    borderColor: "#ccc",
    paddingTop: 20,
    marginTop: 10,
  },
  totalGlobal: {
    fontSize: 22,
    fontWeight: "bold",
    textAlign: "right",
    marginBottom: 15,
  },
  buttonRow: { flexDirection: "row", justifyContent: "space-between" },
  empty: { textAlign: "center", marginTop: 50, color: "#999" },
  modalOverlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  modalContent: {
    width: 300,
    padding: 30,
    backgroundColor: "white",
    borderRadius: 10,
    alignItems: "center",
  },
  modalTitle: { fontSize: 20, fontWeight: "bold", marginBottom: 15 },
});
