import { Box, Center } from 'native-base';
import React,{ useEffect, useState } from 'react';
import MapView, { Marker } from 'react-native-maps';
import Fontisto from 'react-native-vector-icons/Fontisto';
import Ionicons from 'react-native-vector-icons/Ionicons';
import * as Location from 'expo-location';
import * as Device from "expo-device";

import ubikeJson from '../json/ubike.json';
import metroJson from '../json/metro.json';
import ActionButton from '../components/ActionButton';

const MapScreen = () => {
    const [msg, setMsg] = useState("Waiting...");
    const [onCurrentLocation, setOnCurrentLocation] = useState(false);
    const [metro, setMetro] = useState(metroJson);
    const [ubike, setUbike] = useState(ubikeJson);
    const [zoomRatio, setZoomRatio] = useState(1);

    const [region, setRegion] = useState({
        longitude: 121.544637,
        latitude: 25.024624,
        longitudeDelta: 0.01,
        latitudeDelta: 0.02,
    })

    const [marker, setMarker] = useState({
        coord: {
           longitude: 121.544637,
           latitude: 25.024624,
        }
     });

    const setRegionAndMarker = (location) => {
        setRegion({
           ...region,
           longitude: location.coords.longitude,
           latitude: location.coords.latitude,
        });
        setMarker({
           ...marker,
           coord: {
              longitude: location.coords.longitude,
              latitude: location.coords.latitude,
           },
        });
     };

    const onRegionChangeComplete = (rgn) => {
        if (rgn.longitudeDelta > 0.02)
            setZoomRatio(0.02 / rgn.longitudeDelta);
        else 
            setZoomRatio(1);
    }

    const getLocation = async () => {
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
            setMsg('Permission to access location was denied');
            return;
        }
        let location = await Location.getCurrentPositionAsync({});
        setRegionAndMarker(location);
        setOnCurrentLocation(true);
    }

    useEffect(() => {
        if (Platform.OS === "android" && !Device.isDevice) {
            setMsg(
               "Oops, this will not work on Sketch in an Android emulator. Try it on your device!"
            );
            return
        }
        getLocation();
    }, []);

    return(
        <Box flex={1}>
            <MapView
                initialRegion={region}
                style={{ flex: 1 }}
                showsTraffic
                onRegionChangeComplete={onRegionChangeComplete}
            >
                {(zoomRatio > 0.14) && metro.map((site) => (
                    <Marker
                        coordinate={{ latitude: site.latitude, longitude: site.longitude }}
                        key={`${site.id}${site.line}`}
                        title={site.name}
                        description={site.address}
                    >
                        <Center bg="#556DAB" borderRadius={50} p={1.5*zoomRatio}>
                            <Fontisto name="metro" size={16 * zoomRatio} color="#FFFCF4" />
                        </Center>
                    </Marker>
                        
                ))}
                {(zoomRatio > 0.14) && ubike.map((site) => (
                    <Marker
                        coordinate={{
                            latitude: Number(site.lat),
                            longitude: Number(site.lng),
                        }}
                        key={site.sno}
                        title={site.sna.slice(11)}
                        description={site.ar}
                    >
                        <ActionButton zoomRatio={zoomRatio} site={site} />
                    </Marker>
                ))}     
            </MapView>
            {!onCurrentLocation && (
                <Box
                    bg="white"
                    borderRadius={60}
                    position="absolute"
                    shadow="2"
                    zIndex={99}
                    right={5}
                    bottom={5}
                >
                    <Ionicons name={"ios-locate"}
                        size={60}
                        color="black"
                        onPress={getLocation}
                    />
                </Box>
            )}
        </Box>
    );
}

export default MapScreen;