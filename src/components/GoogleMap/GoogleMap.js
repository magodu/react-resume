import React, { useMemo } from 'react';
import { GoogleMap, useLoadScript, MarkerF } from '@react-google-maps/api';

const GOOGLE_MAPS_API_KEY = 'AIzaSyD-xSxeguqtWK4kNUrDTTU0gsNK0iXIYK4';   // TODO: move the key to environments

const Map = ({ zoom, position }) => {
    const currentPosition = useMemo(() => position, [position]);

    return (
        <GoogleMap zoom={zoom} center={currentPosition} disableDefaultUI="true" mapContainerClassName="map-container">
            <MarkerF position={currentPosition}></MarkerF>
        </GoogleMap>
    );
};

const GoogleMapComponent = ({ zoom, position }) => {
    const { isLoaded } = useLoadScript({
        googleMapsApiKey: GOOGLE_MAPS_API_KEY,
    });

    if (!isLoaded) return <div>Loading...</div>;
    return <Map zoom={zoom} position={position} />;
};

export default GoogleMapComponent;
