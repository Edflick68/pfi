import { Tabs } from 'expo-router'
import Ionicons from '@expo/vector-icons/Ionicons';
import { useTranslation } from 'react-i18next';
const TabsLayout = () => {
    const {t} = useTranslation();
return (<Tabs
screenOptions={{headerShown:false, tabBarActiveTintColor:"blue", tabBarInactiveTintColor: "#87CEFA"}}>
<Tabs.Screen name="produits" 
options={{title: t("products"), tabBarIcon: ({color, focused})=> <Ionicons name="list" size={24} color={color}/>}} />
<Tabs.Screen name="panier" 
options={{title: t("cart"),tabBarIcon: ({color, focused})=> <Ionicons name="cart" size={24} color={color}/> }} />
<Tabs.Screen name="compte" 
options={{title: t("account"),tabBarIcon: ({color, focused})=> <Ionicons name="person" size={24} color={color}/>}}/>
</Tabs>)
}
export default TabsLayout