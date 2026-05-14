import { Slot } from "expo-router";
import { View, Text, Button } from "react-native";
import { AuthProvider, useAuth } from "../../context/AuthContext";
import { CartProvider, useCart } from "../../context/CartContext";


export default function MainLayout() {
  const { user, logout } = useAuth();

  return (
    <AuthProvider>
      <CartProvider>
        <Slot/>
      </CartProvider>
    </AuthProvider>
  );
}
