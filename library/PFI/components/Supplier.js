import React, { useContext } from 'react';
import { StyleSheet, SafeAreaView, Image } from 'react-native';
import MapView, { Marker, PROVIDER_DEFAULT } from 'react-native-maps';
import { SupplierMarker } from './SupplierComponents/SupplierMarker';
import MapViewDirections from 'react-native-maps-directions';
import { UserContext } from '../../../App.js';

export default function Supplier() {
    const { userCredentials } = useContext(UserContext);

    const GOOGLE_MAPS_APIKEY = "AIzaSyBfTqixl2-DDAiGP4ZfG6Lygs5SMHZvP9Y";
    const currentPos = {
        "latitude": 45.642625084219745,
        "longitude": -73.84102441129004,
    };

    const region = {
        "latitude": currentPos.latitude,
        "longitude": currentPos.longitude,
        "latitudeDelta": 0.2898489739060395,
        "longitudeDelta": 0.24999964982271194,
    };

    const suppliers = require("../assets/data/suppliers.json");

    let closest = 0;
    let minDistance = 100000000000000000000n;

    for (let index = 0; index < suppliers.length; index++) {
        const element = suppliers[index].coord;

        let distance = calculateDistance(currentPos.latitude, currentPos.longitude, element.latitude, element.longitude);

        if (distance >= minDistance)
            continue;

        minDistance = distance;
        closest = index;
    }

    return (
        <SafeAreaView>
            <MapView style={styles.map} provider={PROVIDER_DEFAULT} initialRegion={region}>
                <MapViewDirections
                    origin={currentPos}
                    destination={suppliers[closest].coord}
                    apikey={GOOGLE_MAPS_APIKEY}
                    strokeColor='hotpink'
                    strokeWidth={3}
                />
                <Marker title={userCredentials.i18n.t("label_current_pos")} coordinate={currentPos}>
                    <Image style={styles.home} source={require("../assets/icons/home.png")}></Image>
                </Marker>
                {
                    suppliers.map(e => <SupplierMarker key={e.name} data={e} />)
                }
            </MapView>
        </SafeAreaView >
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    map: {
        width: '100%',
        height: '100%',
    },
    home: {
        width: 50,
        height: 50
    }
});

// From: https://stackoverflow.com/a/70168851
function calculateDistance(lattitude1, longittude1, lattitude2, longittude2) {
    const toRadian = n => (n * Math.PI) / 180

    let lat2 = lattitude2
    let lon2 = longittude2
    let lat1 = lattitude1
    let lon1 = longittude1

    let R = 6371  // km
    let x1 = lat2 - lat1
    let dLat = toRadian(x1)
    let x2 = lon2 - lon1
    let dLon = toRadian(x2)
    let a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(toRadian(lat1)) * Math.cos(toRadian(lat2)) * Math.sin(dLon / 2) * Math.sin(dLon / 2)
    let c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
    let d = R * c
    return d
}