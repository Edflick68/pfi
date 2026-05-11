import { View, FlatList, Text, Pressable, StyleSheet } from "react-native";
import { useSQLiteContext, SQLiteProvider } from "expo-sqlite";
import { formatPrice } from "../../../../utils/formatPrice";

export default function ListeProduit() {
  <SQLiteProvider
    databaseName="produit.db"
    onInit={initDB}
    options={{ useNewConnection: false }}
  >
    <Content />
  </SQLiteProvider>;
}

function Content() {
  const db = useSQLiteContext();
  const [notes, setNotes] = useState([]);

  async function chargerNotes() {
    const result = await db.getAllAsync(
      "SELECT * FROM produit ORDER BY num DESC",
    );
    setNotes(result);
  }

  useEffect(() => {
    chargerNotes();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.titre}>Le pit stop</Text>
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
