import {Stack, router} from "expo-router";
import { useSQLiteContext } from "expo-sqlite";
import {useEffect, useState} from "react";
import { time } from "react-i18next/icu.macro";

export default function AdminLayout(){
    const db = useSQLiteContext();
    return(
        <Stack>
            <Stack.Screen
            name = "listeProduits"
            options ={{title: "Liste de Produits et suppression"}}/>

            <Stack.Screen
            name = "ajouter"
            options = {{title: "Ajouter un produit"}}/>
        </Stack>
    );
}