import React, { useEffect, useMemo, useState } from "react";
import {
  GoogleMap,
  useLoadScript,
  Marker as MarkerF,
  InfoWindow as InfoWindowF,
} from "@react-google-maps/api";

export default function MyComponent() {
  const [selectedMarker, setSelectedMarker] = useState(null);
  const [googleMap, setGoogleMap] = useState<google.maps.Map | null>(null);
  const libraries = useMemo(() => ["geometry"], []);
  const [vehicleNumbers, setVehicleNumbers] = useState<string[]>([]);
  const [markers, setMarkers] = useState<any[]>([]);

  const containerStyle = {
    width: "100%",
    height: "90vh",
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
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:8000/api/v1/fetchCar");
        const data = await response.json();
        const dataArray = [];
        // console.log('d====', data);
        if (data && Array.isArray(data.data)) {
          data.data.forEach((object) => {
            const formattedData = {
              vehicleNo: object.vehicleNo,
            };
            dataArray.push(formattedData);
          });
          setVehicleNumbers(dataArray.map((item) => item.vehicleNo));
        }
      } catch (error) {
        console.error("Error Fetching Data", error);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    const fetchCar = async () => {
      if (vehicleNumbers.length === 0) {
        return;
      }
      const markersArray = [];

      for (const vehicleNo of vehicleNumbers) {
        const apiUrl =
          `http://localhost:8000/api/v1/vehicleData?vehicleNo=${vehicleNo}`;
        try {
          const response = await fetch(apiUrl);
          if (!response.ok) {
            console.error(
              `HTTP error! Status: ${response.status}, URL: ${response.url}`
            );
            return;
          }
          const data = await response.json();

          const lastVehicle =
            data.selectedVehicle[data.selectedVehicle.length - 1];

          const marker = {
            vehicleNo: lastVehicle.vehicleNo,
            position: {
              lat: parseFloat(lastVehicle.Latitude),
              lng: parseFloat(lastVehicle.Longitude),
            },
          };
          markersArray.push(marker);
        } catch (error) {
          console.error("Error fetching vehicle data:", error);
        }
      }
      setMarkers(markersArray);
    };

    fetchCar();
  }, [vehicleNumbers]);

  const handleMarkerClick = async (marker) => {
    try {
      const vehicleNo = marker.vehicleNo;
      const apiUrl =
        `http://localhost:8000/api/v1/fetchsingleCar?vehicleNo=${vehicleNo}`;

      const response = await fetch(apiUrl);
      const data = await response.json();
      const selectedVehicle = data.vehicleData[data.vehicleData.length - 1];
      setSelectedMarker({
        details: {
          imageUrl: selectedVehicle.image,
          model: selectedVehicle.model,
          year: selectedVehicle.year,
          vehicleNo: selectedVehicle.vehicleNo,
        },
      });
    } catch (error) {
      console.error("Error fetching vehicle details:", error);
    }
  };

  if (!isLoaded) {
    return <p>Loading...</p>;
  }
  console.log("Image URL:", selectedMarker);

  return isLoaded ? (
    <GoogleMap
      mapContainerStyle={containerStyle}
      options={options}
      center={markers.length > 0 ? markers[0].position : { lat: 0, lng: 0 }}
      onLoad={onMapLoad}
      zoom={10}
      onClick={() => setSelectedMarker(null)}
    >
      {markers.map((marker) => (
        <MarkerF
          key={marker.vehicleNo}
          position={marker.position}
          cursor="pointer"
          onClick={() => handleMarkerClick(marker)}
        >
          {selectedMarker &&
            selectedMarker.details.vehicleNo === marker.vehicleNo && (
              <InfoWindowF
                onCloseClick={() => setSelectedMarker(null)}
                position={marker.position}
              >
                <div className="w-80 p-2">
                  <div className="flex items-center mb-2 space-x-5">
                    <img
                      src={selectedMarker.details.imageUrl}
                      style={{
                        width: "56px",
                        height: "56px",
                        borderRadius: "50%",
                      }}
                    />
                    <div>
                      <h4 className="text-xl-font-bold">
                        vehicleNo : {selectedMarker.details.vehicleNo}
                      </h4>
                      <h4 className="text-xl-font-bold">
                        {" "}
                        Model : {selectedMarker.details.model}
                      </h4>
                      <h4 className="text-xl-font-bold">
                        {" "}
                        year : {selectedMarker.details.year}
                      </h4>
                    </div>
                  </div>
                  <p>
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                    Voluptate, dolor nisi accusantium quia tenetur voluptatum.
                    Laudantium suscipit dolores, obcaecati placeat autem
                    voluptas libero aspernatur maiores ex aut, dignissimos quia
                    inventore.
                  </p>
                </div>
              </InfoWindowF>
            )}
        </MarkerF>
      ))}
    </GoogleMap>
  ) : (
    <></>
  );
}
