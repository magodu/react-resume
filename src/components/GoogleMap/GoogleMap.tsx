import { useMemo } from 'react';
import { GoogleMap, useLoadScript, MarkerF } from '@react-google-maps/api';

import Spinner from '../../components/Spinner/Spinner';

interface LatLngLiteral {
    lat: number;
    lng: number;
}

type googleMapsType = { 
    zoom: number;
    position: LatLngLiteral 
};

const Map = (props: googleMapsType) => {
    const currentPosition = useMemo(() => props.position, [props.position]);

    return (
        <GoogleMap zoom={props.zoom} center={currentPosition} mapContainerClassName="map-container">
            <MarkerF position={currentPosition}></MarkerF>
        </GoogleMap>
    );
};

const GoogleMapComponent = (props: googleMapsType) => {
    const { isLoaded } = useLoadScript({
        googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY ? process.env.REACT_APP_GOOGLE_MAPS_API_KEY : ''
    });

    if (!isLoaded) return <Spinner />
    return <Map zoom={props.zoom} position={props.position} />;
};

export default GoogleMapComponent;
