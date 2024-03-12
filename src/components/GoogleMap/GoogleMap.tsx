import { useMemo } from 'react';
import { GoogleMap, useJsApiLoader, MarkerF } from '@react-google-maps/api';

import Spinner from 'src/components/Spinner/Spinner';

interface LatLngLiteral {
    lat: number;
    lng: number;
}

const googleMapsApiKey = process.env.REACT_APP_GOOGLE_MAPS_API_KEY ? process.env.REACT_APP_GOOGLE_MAPS_API_KEY : '';

const Map: React.FC<{ zoom: number; position: LatLngLiteral }> = ({ zoom, position }) => {
    const currentPosition = useMemo(() => position, [position]);

    return (
        <GoogleMap zoom={zoom} center={currentPosition} mapContainerClassName="map-container">
            {/* <MarkerF position={currentPosition}></MarkerF> */}
        </GoogleMap>
    );
};


const GoogleMapComponent: React.FC<{ zoom: number; position: LatLngLiteral }> = ({ zoom, position }) => {

    const { isLoaded } = useJsApiLoader({
        googleMapsApiKey: googleMapsApiKey,
    });

    if (!isLoaded) return <Spinner />

    return <Map zoom={zoom} position={position} />;

};

export default GoogleMapComponent;
