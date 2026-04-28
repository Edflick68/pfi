import { View, TextInput,  } from "react-native";
import { useSQLiteContext, SQLiteProvider } from "expo-sqlite";

async function initDB(db) {
  await db.execAsync(`DROP TABLE IF EXISTS client`);
  await db.execAsync(`PRAGMA journal_mode = WAL;
    CREATE TABLE IF NOT EXISTS client (nom TEXT, mdp TEXT, admin BOOL, adresse TEXT, langue TEXT);
    INSERT INTO client(nom, mdp, admin, adresse, langue) values('Lina', 'password', false, '54 Rue Trollet', 'Français');
    INSERT INTO client(nom, mdp, admin, adresse, langue) values('Edouard', 'password', true, '6 Rue Drollet', 'Anglais');
    INSERT INTO client(nom, mdp, admin, adresse, langue) values('Sean', 'password', false, '90 Rue Jean-Dallaire', 'Français');`);
}