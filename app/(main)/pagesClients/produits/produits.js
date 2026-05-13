import {
  View,
  Text,
  FlatList,
  StyleSheet,
  Pressable,
  Image,
} from "react-native";
import { useSQLiteContext } from "expo-sqlite";
import { useEffect, useState } from "react";
import { useRouter } from "expo-router";

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

const ProduitCard = ({ item, onPress }) => (
  <Pressable style={styles.card} onPress={onPress}>
    <Image source={imageMap[item.image]} style={styles.card_img} />
    <View style={styles.info}>
      <Text style={styles.name}>{item.nom}</Text>
      <Text style={styles.price}>{item.prix} $</Text>
    </View>
  </Pressable>
);

export default function ProduitsList() {
  const db = useSQLiteContext();
  const router = useRouter();
  const [items, setItems] = useState([]);

  useEffect(() => {
    async function loadData() {
      const result = await db.getAllAsync("SELECT * FROM produit");
      setItems(result);
    }
    loadData();
  }, []);

  return (
    <View style={styles.container}>
      <FlatList
        data={items}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <ProduitCard
            item={item}
            onPress={() =>
              router.push(`/(main)/pagesClients/produits/${item.id}`)
            }
          />
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },
  card: {
    flexDirection: "row",
    padding: 15,
    borderBottomWidth: 1,
    borderColor: "#eee",
    alignItems: "center",
  },
  card_img: { width: 60, height: 60, marginRight: 15, resizeMode: "contain" },
  info: { flex: 1 },
  name: { fontSize: 18, fontWeight: "bold" },
  price: { color: "#666", marginTop: 4 },
});
