import {useState} from 'react';
import { View, Text, TextInput, StyleSheet, Pressable } from 'react-native';
import { useTranslation } from 'react-i18next';
import { useRouter } from 'expo-router';
import { useSQLiteContext, SQLiteProvider } from "expo-sqlite";

export default function AjouterProduit() {
    <SQLiteProvider databaseName="produit.db" onInit={initDB} options={{useNewConnection: false}}>
    <Add/>
    </SQLiteProvider>
}

function Add() {
    const {t} = useTranslation();
    const router = useRouter();

    const [nom, setNom] = useState("");
    const [description, setDescription] = useState("");
    const [prix, setPrix] = useState("");
    const [img, setImg] = useState("");

    const ajouter = async () => {
        await db.runAsync(
            "INSERT INTO produit (nom, description, prix, image) VALUES (?, ?, ?, ?)",
            [nom, description, parseFloat(prix), img]
        );

        router.back();
    };

    return(
        <View style={styles.container}>
            <Text style={styles.title}>{t("add_product")}</Text>

            <TextInput
            placeholder={t("name")}
            style={styles.input}
            value={nom}
            onChangeText={setNom}/>

            <TextInput
            placeholder={t("description")}
            style={styles.input}
            value={description}
            onChangeText={setDescription}/>

            <TextInput
            placeholder={t("price")}
            style={styles.input}
            keyboardType = "numeric"
            value={prix}
            onChangeText={setPrix}/>

            <TextInput
            placeholder={t("image_url")}
            style={styles.input}
            value={img}
            onChangeText={setImg}/>

            <Pressable style={styles.btn} onPress={ajouter}>
                <Text style={styles.btnText}>{t("save")}</Text>
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