import { Stack } from "expo-router";
import { SQLiteProvider } from "expo-sqlite";
import { AuthProvider } from "../context/AuthContext";
import { CartProvider } from "../context/CartContext";
import "../i18n";
async function initDB(db) {
  await db.execAsync(`PRAGMA journal_mode = WAL;
    CREATE TABLE IF NOT EXISTS produit (id INTEGER PRIMARY KEY AUTOINCREMENT,
    nom TEXT, description TEXT, prix MONEY, image TEXT);`);
    const count = await db.getFirstAsync("SELECT COUNT(*) AS total FROM produit");

    if(count.total === 0){
        await db.execAsync(`INSERT INTO produit(nom, description, prix, image) values('Champignon', 'Donne un boost temporaire!', 8, 'mushroom_red');
    INSERT INTO produit(nom, description, prix, image) values('Étoile', 'Vous rend invincible pendant un certain temps!', 100, 'star');
    INSERT INTO produit(nom, description, prix, image) values('Haut-Parleur', 'Fait joueur votre klaxon au maximum pour attaquer vos adversaires!', 30, 'horn');
    INSERT INTO produit(nom, description, prix, image) values('Fusée', 'Vous rend invincible et vous propulse à une énorme vitesse!', 150, 'bulletbill');
    INSERT INTO produit(nom, description, prix, image) values('Fleur de feu', 'Lancez des boules de feu pendant un certain temps!', 10, 'flower_fire');
    INSERT INTO produit(nom, description, prix, image) values('Fleur Boomerang', 'Lancez un boomerang trois fois!', 15, 'flower_boomerang');
    INSERT INTO produit(nom, description, prix, image) values('Banane', 'Ralentissez vos rivaux avec ceci!', 2, 'banana');
    INSERT INTO produit(nom, description, prix, image) values('Éclair', 'Rapetissez et ralentissez tous les autres conducteurs!', 35, 'lightning');
    INSERT INTO produit(nom, description, prix, image) values('Champignon doré', 'Vous donne autant de boosts que vous désirez pendant un certain temps!', 70, 'mushroom_gold');
    INSERT INTO produit(nom, description, prix, image) values('Carapace verte', 'Visez votre adversaire avec cet objet!', 12, 'shell_green');
    INSERT INTO produit(nom, description, prix, image) values('Carapace rouge', 'Attaquez l''adversaire le plus proche avec ceci!', 15, 'shell_red');
    INSERT INTO produit(nom, description, prix, image) values('Carapace épineuse', 'Attaquez le conducteur en 1ère place avec ce fameux objet de destruction!', 60, 'shell_blue');
    INSERT INTO produit(nom, description, prix, image) values('Bombe', 'Faites exploser tout sur la route avec ce redoutable objet!', 55, 'bomb');`);
    }

    await db.execAsync(`CREATE TABLE IF NOT EXISTS client (nom TEXT NOT NULL, mdp TEXT, admin BOOL, adresse TEXT, langue TEXT);
    INSERT INTO client(nom, mdp, admin, adresse, langue) values('Lina', 'password', false, '54 Rue Trollet', 'fr');
    INSERT INTO client(nom, mdp, admin, adresse, langue) values('Edouard', 'password', true, '6 Rue Drollet', 'en');
    INSERT INTO client(nom, mdp, admin, adresse, langue) values('Sean', 'password', true, '90 Rue Jean-Dallaire', 'en');`);
}

export default function RootLayout() {
  return (
    <SQLiteProvider databaseName="pfi_db_v2.db" onInit={initDB}>
      <AuthProvider>
        <CartProvider>
          <Stack screenOptions={{ headerShown: false }}>
            <Stack.Screen name="index" />
            <Stack.Screen name="(main)" />
          </Stack>
        </CartProvider>
      </AuthProvider>
    </SQLiteProvider>
  );
}
