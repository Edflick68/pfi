import { Tabs } from 'expo-router'
import Ionicons from '@expo/vector-icons/Ionicons';
const TabsLayout = () => {
return (<Tabs
screenOptions={{headerShown:false, tabBarActiveTintColor:"blue", tabBarInactiveTintColor: "#87CEFA"}}>
<Tabs.Screen name="produits" 
options={{title: "Produits", tabBarIcon: ({color, focused})=> <Ionicons name="list" size={24} color={color}/>}} />
<Tabs.Screen name="panier" 
options={{title: "Panier",tabBarIcon: ({color, focused})=> <Ionicons name="cart" size={24} color={color}/> }} />
<Tabs.Screen name="compte" 
options={{title: "Compte",tabBarIcon: ({color, focused})=> <Ionicons name="person" size={24} color={color}/>}}/>
</Tabs>)
}
export default TabsLayout