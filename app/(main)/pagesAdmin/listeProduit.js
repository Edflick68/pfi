import { View, FlatList, Text, Pressable, StyleSheet } from "react-native";
import { useSQLiteContext, SQLiteProvider } from "expo-sqlite";
async function initDB(db) {
  await db.execAsync(`DROP TABLE IF EXISTS produit`);
  await db.execAsync(`PRAGMA journal_mode = WAL;
    CREATE TABLE IF NOT EXISTS produit (id INTEGER PRIMARY KEY AUTOINCREMENT,
    nom TEXT, description TEXT, prix MONEY, image TEXT);
    INSERT INTO client(nom, description, prix, image) values('Champignon', 'Donne un boost temporaire!', 8);
    INSERT INTO client(nom, description, prix, image) values('Étoile', 'Vous rend invincible pendant un certain temps!', 100);
    INSERT INTO client(nom, description, prix, image) values('Haut-Parleur', 'Fait joueur votre klaxon au maximum pour attaquer vos adversaires!', 30);
    INSERT INTO client(nom, description, prix, image) values('Fusée', 'Vous rend invincible et vous propulse à une énorme vitesse!', 150);
    INSERT INTO client(nom, description, prix, image) values('Fleur de feu', 'Lancez des boules de feu pendant un certain temps!', 10);
    INSERT INTO client(nom, description, prix, image) values('Fleur Boomerang', 'Lancez un boomerang trois fois!', 15);
    INSERT INTO client(nom, description, prix, image) values('Banane', 'Ralentissez vos rivaux avec ceci!', 2);
    INSERT INTO client(nom, description, prix, image) values('Éclair', 'Rapetissez et ralentissez tous les autres conducteurs!', 35);
    INSERT INTO client(nom, description, prix, image) values('Champignon doré', 'Vous donne autant de boosts que vous désirez pendant un ceratin temps!', 70);
    INSERT INTO client(nom, description, prix, image) values('Carapace verte', 'Snipez votre adversaire avec cette util objet!', 12);
    INSERT INTO client(nom, description, prix, image) values('Carapace rouge', 'Attaquez l'adversaire le plus proche avec ceci!', 15);
    INSERT INTO client(nom, description, prix, image) values('Carapace épineuse' 'Attquez le conducteur en 1ère place avec ce fameux objet de destruction!', 60);
    INSERT INTO client(nom, description, prix, image) values('Bombe', 'Faites exploser tout sur la route avec ce retoutable objet!', 55);`);
}

export default function ListeProduit(){
     <SQLiteProvider databaseName="produit.db" onInit={initDB} options={{useNewConnection: false}}>
     <Content/>
     </SQLiteProvider>
}
function Content() {
  const db = useSQLiteContext(); 
  const [notes, setNotes] = useState([]);
  
  async function chargerNotes() {
    const result = await db.getAllAsync("SELECT * FROM produit ORDER BY num DESC");
    setNotes(result);
  };

  useEffect(() => {
    chargerNotes();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.titre}>Le pit stop</Text>
      {afficherFormulaire && (
        <Formulaire note={note} setNote={setNote} ajouterNote={ajouterNote}/>
      )}
      <FlatList
        data={notes}
        keyExtractor={(item) => item.num.toString()}
        renderItem={({item}) => ()}
        ListEmptyComponent={
          <Text style={{marginTop: 20, fontSize: 16}}>
            Vous n'avez pas aucune note pour le moment...
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
  },
  titre:{
    fontSize: 20,
    fontWeight:'bold'

  },
  notePressable: {
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
  }
});