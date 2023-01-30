import React, { useMemo } from 'react';
import { GoogleMap, useLoadScript, MarkerF } from '@react-google-maps/api';

const Map = ({ zoom, position }) => {
    const currentPosition = useMemo(() => position, [position]);

    return (
        <GoogleMap zoom={zoom} center={currentPosition} mapContainerClassName="map-container">
            <MarkerF position={currentPosition}></MarkerF>
        </GoogleMap>
    );
};

const GoogleMapComponent = ({ zoom, position }) => {
    const { isLoaded } = useLoadScript({
        googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
    });

    if (!isLoaded) return <div>Loading...</div>;
    return <Map zoom={zoom} position={position} />;
};

export default GoogleMapComponent;
