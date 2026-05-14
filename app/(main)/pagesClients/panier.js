import {
  View,
  Text,
  FlatList,
  StyleSheet,
  Image,
  Pressable,
  Alert,
} from "react-native";
import { useCart } from "../../../context/CartContext";
import { useTranslation } from "react-i18next";
import {Header} from "../../Composants/header"

const imageMap = {
  "assets/images-produits/Banana.jpg": require("../../../assets/images-produits/Banana.jpg"),
  "assets/images-produits/Bomb.jpg": require("../../../assets/images-produits/Bomb.jpg"),
  "assets/images-produits/BulletBill.jpg": require("../../../assets/images-produits/BulletBill.jpg"),
  "assets/images-produits/Flower_boomrang.jpg": require("../../../assets/images-produits/Flower_boomrang.jpg"),
  "assets/images-produits/Flower_fire.jpg": require("../../../assets/images-produits/Flower_fire.jpg"),
  "assets/images-produits/Horn.jpg": require("../../../assets/images-produits/Horn.jpg"),
  "assets/images-produits/Lightning.jpg": require("../../../assets/images-produits/Lightning.jpg"),
  "assets/images-produits/Mushroom_gold.jpg": require("../../../assets/images-produits/Mushroom_gold.jpg"),
  "assets/images-produits/Mushroom_red.jpg": require("../../../assets/images-produits/Mushroom_red.jpg"),
  "assets/images-produits/Shell_blue.jpg": require("../../../assets/images-produits/Shell_blue.jpg"),
  "assets/images-produits/Shell_green.jpg": require("../../../assets/images-produits/Shell_green.jpg"),
  "assets/images-produits/Shell_red.jpg": require("../../../assets/images-produits/Shell_red.jpg"),
  "assets/images-produits/Star.jpg": require("../../../assets/images-produits/Star.jpg"),
};

const CartItemCard = ({ item, onUpdateQuantity }) => (
  <View style={styles.cartItem}>
    <Image source={imageMap[item.image]} style={styles.thumb} />

    <View style={styles.itemInfo}>
      <Text style={styles.itemName}>{item.nom}</Text>
      <Text style={styles.itemPrice}>{item.prix} $</Text>
    </View>

    <View style={styles.quantityControls}>
      <Pressable
        style={styles.qtyBtn}
        onPress={() => onUpdateQuantity(item.id, -1)}
      >
        <Text style={styles.qtyBtnText}>-</Text>
      </Pressable>

      <Text style={styles.qtyText}>{item.quantity}</Text>

      <Pressable
        style={styles.qtyBtn}
        onPress={() => onUpdateQuantity(item.id, 1)}
      >
        <Text style={styles.qtyBtnText}>+</Text>
      </Pressable>
    </View>
  </View>
);

export default function PanierScreen() {
  const { cartItems, updateQuantity, clearCart, totalCartPrice } = useCart();
  const { t } = useTranslation();

  const handleCheckout = () => {
    Alert.alert(
      t("cart.success_title", "Succès"),
      t("cart.success_msg", "Commande passée!"),
    );
    clearCart();
  };

  if (cartItems.length === 0) {
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyText}>
          {t("cart.empty", "Votre panier est vide.")}
        </Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.headerTitle}>{t("cart.title", "Votre Panier")}</Text>

      <FlatList
        data={cartItems}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <CartItemCard item={item} onUpdateQuantity={updateQuantity} />
        )}
      />

      <View style={styles.footer}>
        <Text style={styles.totalText}>
          {t("cart.total", "Total")}: {totalCartPrice} $
        </Text>
        <Pressable style={styles.checkoutBtn} onPress={handleCheckout}>
          <Text style={styles.checkoutBtnText}>
            {t("cart.checkout", "Passer la commande")}
          </Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f4f4f4", padding: 20 },
  emptyContainer: { flex: 1, justifyContent: "center", alignItems: "center" },
  emptyText: { fontSize: 18, color: "#666" },
  headerTitle: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#333",
  },

  // Component
  cartItem: {
    flexDirection: "row",
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  thumb: { width: 50, height: 50, resizeMode: "contain", marginRight: 15 },
  itemInfo: { flex: 1 },
  itemName: { fontSize: 18, fontWeight: "bold" },
  itemPrice: { fontSize: 16, color: "#666", marginTop: 5 },
  quantityControls: { flexDirection: "row", alignItems: "center" },
  qtyBtn: {
    width: 30,
    height: 30,
    backgroundColor: "#eee",
    borderRadius: 15,
    justifyContent: "center",
    alignItems: "center",
  },
  qtyBtnText: { fontSize: 18, fontWeight: "bold", color: "#333" },
  qtyText: { fontSize: 16, fontWeight: "bold", marginHorizontal: 15 },

  // Footer
  footer: {
    marginTop: 20,
    padding: 20,
    backgroundColor: "#fff",
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 5,
  },
  totalText: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 15,
    textAlign: "center",
  },
  checkoutBtn: {
    backgroundColor: "#27ae60",
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
  },
  checkoutBtnText: { color: "#fff", fontSize: 18, fontWeight: "bold" },
});
