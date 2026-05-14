import {Stack, router} from "expo-router";
import { useSQLiteContext } from "expo-sqlite";
import { useTranslation } from "react-i18next";

export default function AdminLayout(){
    const db = useSQLiteContext();
    const {t} = useTranslation();
    return(
        <Stack>
            <Stack.Screen
            name = "listeProduit"
            options ={{title: t("admin_products")}}/>

            <Stack.Screen
            name = "ajouter"
            options = {{title: t("add_product")}}/>
        </Stack>
    );
}