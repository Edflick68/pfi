import { Stack } from "expo-router";
import { SQLiteProvider } from "expo-sqlite";
import { AuthProvider } from "../context/AuthContext";
import { CartProvider } from "../context/CartContext";

async function initDB(db) {
  await db.execAsync(`PRAGMA journal_mode = WAL;
    CREATE TABLE IF NOT EXISTS produit (id INTEGER PRIMARY KEY AUTOINCREMENT,
    nom TEXT, description TEXT, prix MONEY, image TEXT);
    INSERT INTO produit(nom, description, prix, image) values('Champignon', 'Donne un boost temporaire!', 8, 'assets/images-produits/Mushroom_red.jpg');
    INSERT INTO produit(nom, description, prix, image) values('Étoile', 'Vous rend invincible pendant un certain temps!', 100, 'assets/images-produits/Star.jpg');
    INSERT INTO produit(nom, description, prix, image) values('Haut-Parleur', 'Fait joueur votre klaxon au maximum pour attaquer vos adversaires!', 30, 'assets/images-produits/Horn.jpg');
    INSERT INTO produit(nom, description, prix, image) values('Fusée', 'Vous rend invincible et vous propulse à une énorme vitesse!', 150, 'assets/images-produits/BulletBill.jpg');
    INSERT INTO produit(nom, description, prix, image) values('Fleur de feu', 'Lancez des boules de feu pendant un certain temps!', 10, 'assets/images-produits/Flower_fire.jpg');
    INSERT INTO produit(nom, description, prix, image) values('Fleur Boomerang', 'Lancez un boomerang trois fois!', 15, 'assets/images-produits/Flower_boomrang.jpg');
    INSERT INTO produit(nom, description, prix, image) values('Banane', 'Ralentissez vos rivaux avec ceci!', 2, 'assets/images-produits/Banana.jpg');
    INSERT INTO produit(nom, description, prix, image) values('Éclair', 'Rapetissez et ralentissez tous les autres conducteurs!', 35, 'assets/images-produits/Lightning.jpg');
    INSERT INTO produit(nom, description, prix, image) values('Champignon doré', 'Vous donne autant de boosts que vous désirez pendant un certain temps!', 70, 'assets/images-produits/Mushroom_gold.jpg');
    INSERT INTO produit(nom, description, prix, image) values('Carapace verte', 'Visez votre adversaire avec cet objet!', 12, 'assets/images-produits/Shell_green.jpg');
    INSERT INTO produit(nom, description, prix, image) values('Carapace rouge', 'Attaquez l\\'adversaire le plus proche avec ceci!', 15, 'assets/images-produits/Shell_red.jpg');
    INSERT INTO produit(nom, description, prix, image) values('Carapace épineuse', 'Attaquez le conducteur en 1ère place avec ce fameux objet de destruction!', 60, 'assets/images-produits/Shell_blue.jpg');
    INSERT INTO produit(nom, description, prix, image) values('Bombe', 'Faites exploser tout sur la route avec ce redoutable objet!', 55, 'assets/images-produits/Bomb.jpg');
    CREATE TABLE IF NOT EXISTS client (nom TEXT NOT NULL, mdp TEXT, admin BOOL, adresse TEXT, langue TEXT);
    INSERT INTO client(nom, mdp, admin, adresse, langue) values('Lina', 'password', false, '54 Rue Trollet', 'fr');
    INSERT INTO client(nom, mdp, admin, adresse, langue) values('Edouard', 'password', true, '6 Rue Drollet', 'en');
    INSERT INTO client(nom, mdp, admin, adresse, langue) values('Sean', 'password', true, '90 Rue Jean-Dallaire', 'en');`);
}

export default function RootLayout() {
  return (
    <SQLiteProvider databaseName="pfi_db.db" onInit={initDB}>
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
