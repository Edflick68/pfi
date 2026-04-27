import { FlatList, Text, Pressable, StyleSheet } from "react-native";
import { useSQLiteContext, SQLiteProvider } from "expo-sqlite";
async function initDB(db) {
  await db.execAsync(`DROP TABLE IF EXISTS produit`);
  await db.execAsync(`PRAGMA journal_mode = WAL;
    CREATE TABLE IF NOT EXISTS produit (id INTEGER PRIMARY KEY AUTOINCREMENT,
    nom TEXT, description TEXT, prix TEXT, image TEXT);
    INSERT INTO client(nom, description, prix, image) values('Champignon');
    INSERT INTO client(nom, description, prix, image) values('Étoile');
    INSERT INTO client(nom, description, prix, image) values('Haut-Parleur');
    INSERT INTO client(nom, description, prix, image) values('Fusée');
    INSERT INTO client(nom, description, prix, image) values('Fleur de feu');
    INSERT INTO client(nom, description, prix, image) values('Fleur Boomerang');
    INSERT INTO client(nom, description, prix, image) values('Banane');
    INSERT INTO client(nom, description, prix, image) values('Éclair');
    INSERT INTO client(nom, description, prix, image) values('Champignon doré');
    INSERT INTO client(nom, description, prix, image) values('Carapace verte');
    INSERT INTO client(nom, description, prix, image) values('Carapace rouge');
    INSERT INTO client(nom, description, prix, image) values('Carapace épineuse');
    INSERT INTO client(nom, description, prix, image) values('Bombe');`);
}