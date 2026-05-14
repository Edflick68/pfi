import { View, FlatList, Text, Pressable, StyleSheet,Image } from "react-native";
import { useSQLiteContext} from "expo-sqlite";
import { useEffect, useState} from "react";
import { useTranslation } from "react-i18next";
import { formatPrice } from "../../../utils/formatPrice";
import { useRouter } from "expo-router";
import { productImages } from "../../../utils/productsImages";

export default function ListeProduit(){
     return(
      <Content/>
     )
}
function Content() {
  const db = useSQLiteContext(); 
  const [items, setItems] = useState([]);
  const router = useRouter();
  const {t} = useTranslation();
  
  async function chargerItems() {
    const result = await db.getAllAsync("SELECT * FROM produit ORDER BY id DESC");
    setItems(result);
  };

  async function supprimerItem(id){
    await db.getAllAsync("DELETE FROM produit WHERE id = ?", [id]);
    chargerItems();
  }

  function getImageSource(imageSource){
    if(productImages[imageSource]){
      return productImages[imageSource]
    }else{
      return{uri: imageSource}
    }
  }

  useEffect(() => {
    chargerItems();
  }, []);

  return (
    <View style={styles.container}>
      <Pressable style={styles.btnToAdd}
      onPress={() => router.push('pagesAdmin/ajouter')}>
        <Text style={styles.txtToAdd}>{t("add_product")}</Text>
      </Pressable>
      <FlatList
        data={items}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({item}) => (
           <View style={styles.produit}>
            <Image source={getImageSource(item.image)} style={styles.img}/>

            <View style={{flex: 1}}>
              <Text style={styles.nom}>{item.nom}</Text>
              <Text>{formatPrice(item.prix)}</Text>
            </View>

            <Pressable
            style={styles.btnSupprimer}
            onPress={() => supprimerItem(item.id)}>
              <Text style={styles.txtSupprimer}>{t("delete")}</Text>
            </Pressable>
           </View>
        )}
        ListEmptyComponent={
          <Text style={{marginTop: 20, fontSize: 16}}>
            {t("Aucun item")}
          </Text>
        }/>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    paddingTop: 30,
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 16
  },
  titre:{
    fontSize: 20,
    fontWeight:'bold'

  },
  produit:{
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderColor: "#ddd"
  },
  img:{
    width: 60,
    height: 60,
    marginRight: 10,
    borderRaduis: 6
  },
  produitPressable: {
    backgroundColor: "lightsalmon",
    paddingBottom: 5,
    marginBottom: 5,
    borderWidth: 5
  },
  produitContent: {
    backgroundColor: "lightgrey",
    paddingBottom: 5,
    marginBottom: 5,
    fontSize: 16
  },
  input:{
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    marginVertical: 5,
    borderRadius: 5
  },
  nom:{
    fontSize: 16,
    fontWeight: "bold"
  },
  btnSupprimer:{
    backgroundColor:"#E53935",
    padding: 8,
    borderRadius: 6
  },
  txtSupprimer:{
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
    fontSize: 16
  },
  btnToAdd:{
    backgroundColor:"#2fc158",
    padding: 8,
    borderRadius: 6
  },
  txtToAdd:{
    color: "white",
    fontSize: 16,
    textAlign: "center"
  },
});