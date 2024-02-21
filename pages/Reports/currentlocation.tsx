import React, { useEffect, useMemo, useState } from "react";
import {
  GoogleMap,
  useLoadScript,
  MarkerF,
  InfoWindowF,
} from "@react-google-maps/api";
import Image from "next/image";
import axios from "axios";
import { Col } from "react-bootstrap";
import Tracklayout from "@/components/Tracklayout";

export default function MyComponent() {
  const [isInfoWindowOpen, setIsInfoWindowOpen] = useState(false);
  const [mapInitialized, setMapInitialized] = useState(false);
  const [FetchData, setFetchData] = useState<any>([]);
  const [googleMap, setGoogleMap] = useState<google.maps.Map | null>(null);
  const libraries = useMemo(() => ["geometry"], []);
  const [carNames, setCarNames] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedVehicle, setSelectedVehicle] = useState(null);
  const [selectedVehicleLocation, setSelectedVehicleLocation] = useState({
    lat: 0,
    lng: 0,
  });

  const CarName = ({ car }) => (
    <li className="carItem">
      <p onClick={() => onSelectCar(car)}>{car.vehicleNo}</p>
    </li>
  );

  function MarkerClicked() {
    setIsInfoWindowOpen(true);
  }
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

  const center = useMemo(
    () => ({
      lat: FetchData.length > 0 ? parseFloat(FetchData[0].latitude) : 0,
      lng: FetchData.length > 0 ? parseFloat(FetchData[0].longitude) : 0,
    }),
    [FetchData]
  );

  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_MAP_API_KEY as string,
    libraries: libraries as any,
  });

  useEffect(() => {
    setLoading(true);
    axios
      .get("http://localhost:8000/api/v1/fetchCar")
      .then((response) => {
        console.log("Fetched data:", response.data);
        setCarNames(response.data.data);
        setLoading(false);
      })
      .catch((error) => {
        setError(error);
        setLoading(false);
        console.error("Error fetching car list:", error);
      });
  }, []);

  const onSelectCar = async (selectedCar) => {
    setSelectedVehicle(selectedCar);
    const vehicleNo = selectedCar.vehicleNo;
    try {
      const response = await fetch(
        `http://localhost:8000/api/v1/vehicleData?vehicleNo=${vehicleNo}`
      );

      const data = await response.json();
      const dataArray: {
        latitude: number;
        longitude: any;
      }[] = [];

      if (data && Array.isArray(data.selectedVehicle)) {
        data.selectedVehicle.forEach((object) => {
          if (
            object.Latitude !== undefined &&
            object.Latitude !== 0 &&
            object.Longitude !== undefined &&
            object.Longitude !== 0 &&
            object.Speed !== undefined
          ) {
            if (
              String(object.Latitude).length > 7 &&
              String(object.Longitude).length > 7
            ) {
              const formattedData = {
                latitude: parseFloat(object.Latitude),
                longitude: parseFloat(object.Longitude),
                speed: object.Speed,
              };
              dataArray.push(formattedData);
            }
          }
        });
      }
      setFetchData(dataArray);

      if (dataArray.length > 0) {
        setSelectedVehicleLocation({
          lat: dataArray[0].latitude,
          lng: dataArray[0].longitude,
        });
      }
    } catch (error) {
      console.error("Error Fetching Data", error);
    }
  };

  useEffect(() => {
    const initMap = async () => {
      try {
        if (FetchData.length > 0) {
          const snappedRoadPath = await Promise.all(
            FetchData.map(
              async (point: {
                latitude: string;
                longitude: string;
                speed: any;
              }) => ({
                lat: parseFloat(point.latitude),
                lng: parseFloat(point.longitude),
                speed: point.speed,
              })
            )
          );

          const route = new google.maps.Polyline({
            path: currentSegment,
            geodesic: true,
            strokeColor: currentColor,
            strokeOpacity: 1.0,
            strokeWeight: 2.5,
          });

          const infoWindow = new google.maps.InfoWindow();

          google.maps.event.addListener(
            route,
            "mouseover",
            async (event: any) => {
              const hoveredIndex = findHoveredIndex(
                event,
                route.getPath().getArray()
              );
              const hoveredPoint = FetchData[hoveredIndex];
              const content = `<div style="background-color: #004d4d ;padding:2px; ">
                            <div style="color : #ffffff">Speed: ${hoveredPoint.speed}</div>
                            <div style="color : #ffffff"> Time :${hoveredPoint.time}</div>
                            <div style="color : #ffffff"> Date :${hoveredPoint.date}</div>
                            <div style="color : #ffffff"> Distance :</div>
                           </div>
                              `;
              infoWindow.setContent(content);
              infoWindow.setPosition(event.latLng);
              infoWindow.open(googleMap);
            }
          );

          google.maps.event.addListener(route, "mouseout", () => {
            infoWindow.close();
          });
        }
        setMapInitialized(true);
      } catch (error) {
        console.error("Error Initializing Map", error);
      }
    };
  }, [FetchData, googleMap, mapInitialized]);

  const findHoveredIndex = (event: any, path: any[]) => {
    const latLng = event.latLng;
    let closestIndex = 0;
    let closestDistance = Number.MAX_VALUE;

    for (let i = 0; i < path.length; i++) {
      const distance = google.maps.geometry.spherical.computeDistanceBetween(
        latLng,
        path[i]
      );
      if (distance < closestDistance) {
        closestDistance = distance;
        closestIndex = i;
      }
    }
    return closestIndex;
  };

  const determineRouteColor = async (speedData: string | any[]) => {
    const colors = [];
    for (let i = 0; i < speedData.length - 1; i++) {
      const currentSpeed = speedData[i];
      const nextSpeed = speedData[i + 1];
      const color = currentSpeed > 40 ? "#ff0000" : "#6a5acd";

      if (currentSpeed !== nextSpeed) {
        colors.push(color);
      } else {
        colors.push(color);
      }
    }

    colors.push(speedData[speedData.length - 1] > 50 ? "#ff0000" : "#6a5acd");

    return colors;
  };

  if (!isLoaded) {
    return <p>Loading...</p>;
  }

  return isLoaded ? (
    <>
      <Tracklayout />
      <div
        style={{
          position: "relative",
          height: "100vh",
          width: "100%",
          marginTop: "80px",
        }}
      >
        <GoogleMap
          mapContainerStyle={containerStyle}
          options={options}
          center={center}
          onLoad={onMapLoad}
          zoom={15}
          onClick={() => setIsInfoWindowOpen(false)}
        >
          <MarkerF
            position={{
              lat: selectedVehicleLocation.lat,
              lng: selectedVehicleLocation.lng,
            }}
            cursor="pointer"
            onClick={MarkerClicked}
          >
            {isInfoWindowOpen && selectedVehicle && (
              <InfoWindowF
                onCloseClick={() => setIsInfoWindowOpen(false)}
                position={{
                  lat: parseFloat(selectedVehicle.latitude),
                  lng: parseFloat(selectedVehicle.longitude),
                }}
              >
                <div className="w-80 p-2">
                  <div className="flex items-center mb-2 space-x-5">
                    <h3 className="text-xl font-bold">
                      {selectedVehicle.vehicleNo}
                    </h3>
                    <p>{selectedVehicle.model}</p>
                  </div>

                  <p>Speed: {selectedVehicle.speed}</p>
                </div>
              </InfoWindowF>
            )}
          </MarkerF>
          <></>
          <div
            style={{
              position: "absolute",
              top: 60,
              left: 20,
              zIndex: 1,
              backgroundColor: "white",
            }}
          >
            <Col md={4}>
              {loading && <p>Loading...</p>}
              {error && <p>Error: {error.message}</p>}

              {carNames.length > 0 ? (
                <>
                  <ul>
                    {carNames.map((car) => (
                      <CarName key={car.id} car={car} onSelectCar={undefined} />
                    ))}
                  </ul>
                </>
              ) : (
                <p>No cars available</p>
              )}
            </Col>
          </div>{" "}
        </GoogleMap>
      </div>
    </>
  ) : (
    <></>
  );
}
