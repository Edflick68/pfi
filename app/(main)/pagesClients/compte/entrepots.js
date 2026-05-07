import {useState, useEffect} from 'react';
import { View, Text, Pressable, StyleSheet, FlatList, Image } from 'react-native-web';
import MapView, {Marker, Circle, Polyline} from 'react-native-maps';
import entrepots from '../../../../data/entrepots.json';
import routeMaison from '../../../../data/routeMaison.json';

export default function EntrepotsPage(){
    const[selectedId, setSelectedId] = useState(null);

    const maison = {

    };

    const distance = (lat1, lon1, lat2, lon2) => {
        const R = 6371;
        const dLat = (lat2 - lat1) * Math.PI / 180;
        const dLon = (lon2 - lon1) * Math.PI / 180;
        const a = 
           Math.sin(dLat / 2) ** 2 + 
           Math.cos(lat1 * Math.PI / 180) *
           Math.cos(lat2 * Math.PI / 180) *
           Math.sin(dLon / 2) ** 2;
        return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    };

    const nearest = entrepots.reduce((prev, curr) => {
        const dPrev = distance(maison.latitude, maison.longitude, prev.latitude, prev.longitude);
        const dCurr = distance(maison.latitude, maison.longitude, curr.latitude, curr.longitude);
        return dCurr < dPrev ? curr : prev
    });

    return(
        <View style = {styles.container}>
            <View style = {styles.list}>
                <FlatList
                data = {entrepots}
                keyExtractor = {item => item.id.toString()}
                renderItem = {({item}) => (
                    <Pressable 
                    onPress = {() => setSelectedId(item.id)}
                    style = {[
                        styles.btn,
                        selectedId === item.id && styles.btnSelected
                    ]}>
                        <Text style = {styles.btnText}>{item.nom}</Text>
                    </Pressable>
                )}/>
            </View>
            <MapView 
            style={styles.map}
            initialRegion={{
                latitude: maison.latitude,
                longitude: maison.longitude,
                latitudeDelta: 0.1,
                longitudeDelta: 0.1
            }}>
                <Marker
                coordinate={maison}
                title="Votre domicile"/>

                {entrepots.map(e => (
                    <Marker
                    key={e.id}
                    coordinate={{latitude: e.coordonnes, longitude: e.longitude}}
                    title={e.nom}
                    onPress={() => setSelectedId(e.id)}
                    image={e.image}/>
                ))}
                {entrepots.map(e => (
                    <Circle
                    key={`circle - ${e.id}`}
                    center={{latitude: e.latitude, longitude: e.longitude}}
                    radius={5000}
                    strokeColor="rgba(0, 0, 255, 0.53)"
                    fillColor="rgba(0,0,255,0.1)"/>
                ))}
                <Polyline
                coordinates={routeMaison}
                strokeWidth={3}
                strokeColor="red"/>
            </MapView>
        </View>
    )
}

const styles = StyleSheet.create({
    container:{flex: 1, flexDirection: 'row'},
    list:{width: '25%', backgroundColor: '#eee'},
    map:{width: '75%', height: '100%'},
    btn:{
        padding: 12,
        borderBottomWidth: 1,
        borderColor: '#ccc'
    },
    btnSelected:{
        backgroundColor: '#cce0ff'
    },
    btnText:{
        fontSize: 16
    }
})