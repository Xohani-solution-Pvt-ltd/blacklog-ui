import React, { useEffect, useMemo, useState } from "react";
import {
  GoogleMap,
  useLoadScript,
  Marker as MarkerF,
  InfoWindow as InfoWindowF,
} from "@react-google-maps/api";

export default function MyComponent() {
  const [isInfoWindowOpen, setIsInfoWindowOpen] = useState(false);
  const [mapInitialized, setMapInitialized] = useState(false);
  const [FetchData, setFetchData] = useState<any>([]);
  const [latData, setLatData] = useState<number>(0);
  const [lngData, setLngData] = useState<number>(0);
  const [speedData, setSpeedData] = useState<any>([]);
  const [totalDistance, setTotalDistance] = useState<number>(0);
  const [googleMap, setGoogleMap] = useState<google.maps.Map | null>(null);
  const libraries = useMemo(() => ["geometry"], []);

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
    const fetchData = async () => {
      const vehicleNo = "MP09QR9091";
      const startDate = "23/01/2024";
      const endDate = "23/01/2024";
      const apiUrl =
        "http://localhost:8000/api/v1/fetchvehicleGyroData?vehicleNo=${vehicleNo}&startDate=${startDate}&endDate=${endDate}";

      try {
        const response = await fetch(apiUrl);

        if (!response.ok) {
          console.error(
            "HTTP error! Status: ${response.status}, URL: ${response.url}"
          );
          return;
        }
        const data = await response.json();
        const dataArray = [];

        if (data && Array.isArray(data.fetchdata)) {
          data.fetchdata.forEach((object) => {
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
      } catch (error) {
        console.log("Error:", error.message);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    const initMap = async () => {
      try {
        if (FetchData.length > 0) {
          const snappedRoadPath = await Promise.all(
            FetchData.map(async (point) => ({
              lat: parseFloat(point.latitude),
              lng: parseFloat(point.longitude),
              speed: point.speed,
            }))
          );

          const speedData = snappedRoadPath.map((point) => point.speed);
          const routeColor = await determineRouteColor(speedData);
          let currentColor = routeColor[0];
          let currentSegment = [snappedRoadPath[0]];

          for (let i = 1; i < snappedRoadPath.length; i++) {
            const color = routeColor[i];
            if (color === currentColor) {
              currentSegment.push(snappedRoadPath[i]);
            } else {
              if (i > 1 && routeColor[i - 1] !== color) {
                const route = new google.maps.Polyline({
                  path: currentSegment,
                  geodesic: true,
                  strokeColor: currentColor,
                  strokeOpacity: 1.0,
                  strokeWeight: 2.5,
                  map: googleMap,
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

                google.maps.event.addListener(
                  route,
                  "mouseout",
                  (event: any) => {
                    infoWindow.close();
                  }
                );

                currentSegment = [snappedRoadPath[i - 1], snappedRoadPath[i]];
              } else {
                currentSegment.push(snappedRoadPath[i]);
              }
              currentColor = color;
            }
          }
          const route = new google.maps.Polyline({
            path: currentSegment,
            geodesic: true,
            strokeColor: currentColor,
            strokeOpacity: 1.0,
            strokeWeight: 2.5,
            map: googleMap,
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
    if (FetchData.length > 0 && !mapInitialized && googleMap) {
      initMap();
      setMapInitialized(true);
    }
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

  const determineRouteColor = async (speedData) => {
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
    <GoogleMap
      mapContainerStyle={containerStyle}
      options={options}
      center={center}
      onLoad={onMapLoad}
      zoom={10}
      onClick={() => setIsInfoWindowOpen(false)}
    >
      <MarkerF position={center} cursor="pointer" onClick={MarkerClicked}>
        {isInfoWindowOpen && (
          <InfoWindowF
            onCloseClick={() => setIsInfoWindowOpen(false)}
            position={center}
          >
            <div className="w-80 p-2">
              <div className="flex items-center mb-2 space-x-5">
                <img
                  src="https://images.unsplash.com/photo-1682686581660-3693f0c588d2?q=80&w=1471&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                  style={{ width: "56px", height: "56px", borderRadius: "50%" }}
                />
                <div>
                  <h3 className="text-xl-font-bold">some title</h3>
                  <p>some subtitle</p>
                </div>
              </div>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                Voluptate, dolor nisi accusantium quia tenetur voluptatum.
                Laudantium suscipit dolores, obcaecati placeat autem voluptas
                libero aspernatur maiores ex aut, dignissimos quia inventore.
              </p>
            </div>
          </InfoWindowF>
        )}
      </MarkerF>
      <></>
    </GoogleMap>
  ) : (
    <></>
  );
}
