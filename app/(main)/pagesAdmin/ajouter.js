import {useState} from 'react';
import { View, Text, TextInput, StyleSheet, Pressable, Alert } from 'react-native';
import i18n from '../../../i18n';
import { useRouter } from 'expo-router';
import { useSQLiteContext, SQLiteProvider } from "expo-sqlite";

export default function AjouterProduit() {
    return(
    <Add/>
)
}

function Add() {
    const router = useRouter();

    const [nom, setNom] = useState("");
    const [description, setDescription] = useState("");
    const [prix, setPrix] = useState("");
    const [img, setImg] = useState("");

    const ajouter = async () => {
        if(!nom || !description || !prix || !img){
            Alert.alert("Erreur!", "Veuillez remplir le formulaire.")
        }

        await db.runAsync(
            "INSERT INTO produit (nom, description, prix, image) VALUES (?, ?, ?, ?)",
            [nom, description, parseFloat(prix), img]
        );

        router.back();
    };

    return(
        <View style={styles.container}>
            <TextInput
            placeholder={i18n.t("name")}
            style={styles.input}
            value={nom}
            onChangeText={setNom}/>

            <TextInput
            placeholder={i18n.t("description")}
            style={styles.input}
            value={description}
            onChangeText={setDescription}/>

            <TextInput
            placeholder={i18n.t("price")}
            style={styles.input}
            keyboardType = "numeric"
            value={prix}
            onChangeText={setPrix}/>

            <TextInput
            placeholder={i18n.t("image_url")}
            style={styles.input}
            value={img}
            onChangeText={setImg}/>

            <Pressable style={styles.btn} onPress={ajouter}>
                <Text style={styles.btnText}>{i18n.t("save")}</Text>
            </Pressable>
        </View>
    );
}

const styles = StyleSheet.create({
    container:{flex: 1, padding: 16},
    title: {fontSize: 22, fontWeight: 'bold', marginBottom: 16},
    input:{
        borderWidth: 1,
        borderColor: "#ccc",
        padding: 10,
        borderRadius: 8,
        marginBottom: 12
    },
    btn:{
        backgroundColor: "#2196F3",
        padding: 12,
        borderRadius: 8
    },
    btnText:{color: 'white', textAlign: 'center', fontSize: 16}
})