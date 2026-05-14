import {Stack, router} from "expo-router";
import { useSQLiteContext } from "expo-sqlite";
import {useEffect, useState} from "react";
import i18n from "../../../i18n";

export default function AdminLayout(){
    const db = useSQLiteContext();
    return(
        <Stack>
            <Stack.Screen
            name = "listeProduit"
            options ={{title: i18n.t("admin_products")}}/>

            <Stack.Screen
            name = "ajouter"
            options = {{title: i18n.t("add_product")}}/>
        </Stack>
    );
}