import {Stack, router} from "expo-router";
import { useSQLiteContext } from "expo-sqlite";
import {useEffect, useState} from "react";

export default function AdminLayout(){
    const db = useSQLiteContext();
    return(
        <Stack>
            <Stack.Screen
            name = "listeProduit"
            options ={{title: "Liste de Produits et suppression"}}/>

            <Stack.Screen
            name = "ajouter"
            options = {{title: "Ajouter un produit"}}/>
        </Stack>
    );
}