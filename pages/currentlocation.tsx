import React, { useEffect, useMemo, useState } from 'react';
import { GoogleMap, useLoadScript, Marker as MarkerF, InfoWindow as InfoWindowF } from '@react-google-maps/api';

export default function MyComponent() {
    const [googleMap, setGoogleMap] = useState<google.maps.Map | null>(null);
    const libraries = useMemo(() => ['geometry'], []);
    const [markers, setMarkers] = useState([]);


    const containerStyle = {
        width: '100%',
        height: '90vh',
    };

    const onMapLoad = async (map: google.maps.Map) => {
        setGoogleMap(map);
    };

    const options = useMemo<google.maps.MapOptions>(
        () => ({
            mapId: process.env.REACT_MAP_ID,
            mapTypeControl: false,
            zoomControl: false,
            fullscreenControl: false,
            clickableIcons: false,
            scrollwheel: true,
            streetViewControl: false,
        }),
        []
    );

    const { isLoaded } = useLoadScript({
        googleMapsApiKey: process.env.NEXT_PUBLIC_MAP_API_KEY as string,
        libraries: libraries as any,
    });



    useEffect(() => {
        const fetchCar = async () => {
            const vehicleNo = "MP09QR9091";
            const apiUrl = http://localhost:8000/api/v1/vehicleData?vehicleNo=${vehicleNo};
            try {
                const response = await fetch(apiUrl);
                if (!response.ok) {
                    console.error(HTTP error! Status: ${response.status}, URL: ${response.url});
                    return;
                }
                const data = await response.json();

                const lastVehicle = data.selectedVehicle[data.selectedVehicle.length - 1];
                console.log("location", lastVehicle)

                const newMarker = {
                    position: {
                        lat: parseFloat(lastVehicle.Latitude),
                        lng: parseFloat(lastVehicle.Longitude),
                    },
                };
                setMarkers([newMarker]);

            } catch (error) {
                console.error('Error fetching vehicle data:', error);
            }
        };

        fetchCar();
    }, []);


    if (!isLoaded) {
        return <p>Loading...</p>;
    }

    return isLoaded ? (
        <GoogleMap
            mapContainerStyle={containerStyle}
            options={options}
            center={markers.length > 0 ? markers[0].position : { lat: 0, lng: 0 }}
            onLoad={onMapLoad}
            zoom={10}

        >
            {markers.map((marker, index) => (
                <MarkerF
                    key={index}
                    position={marker.position}
                    cursor="pointer"
                />
            ))}
        </GoogleMap>

    ) : (
        <></>
    );
}