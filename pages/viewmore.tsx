import React, { useEffect, useState } from "react";
import { Loader } from "@googlemaps/js-api-loader";
import Link from "next/link";
import Layout from "@/components/Layout";
import { Card, Col, Container, Figure, Row } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import Image from "next/image";
import T2 from "../public/assets/img/t2.jpg";
import T1 from "../public/assets/img/t1.jpg";

const ViewMore = () => {
  const mapRef = React.useRef<HTMLDivElement>(null);
  const [totalDistance, setTotalDistance] = useState<number>(0);
  const [FetchData, setFetchData] = useState([]);
  const [latData, setLatData] = useState<number>(0);
  const [lngData, setLngData] = useState<number>(0);
  const [routeColor, setRouteColor] = useState<string>("#00FF00");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://65.0.85.221/api/v1/fetchGyro");
        const data = await response.json();
        setFetchData(data.data);
        const latitude =
          data.data.length > 0
            ? data.data[data.data.length - 1].latitude
            : null;
        const longitude =
          data.data.length > 0
            ? data.data[data.data.length - 1].longitude
            : null;
        if (latitude !== 0 && longitude !== 0) {
          setLatData(latitude);
          setLngData(longitude);
        }
      } catch (error) {
        console.error("Error Fetching Data", error);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    const initMap = async () => {
      if (latData !== 0 && lngData !== 0) {
        const loader = new Loader({
          apiKey: process.env.NEXT_PUBLIC_MAP_API_KEY as string,
          version: "weekly",
          libraries: ["geometry"],
        });
        const { Map } = await loader.importLibrary("maps");
        const { Marker } = (await loader.importLibrary(
          "marker"
        )) as google.maps.MarkerLibrary;
        console.log("data of lat", latData);
        console.log("data of lng", lngData);
        console.log("data of distance", totalDistance);

        const position = {
          lat: Number(latData),
          lng: Number(lngData),
        };
        const mapOptions: google.maps.MapOptions = {
          center: position,
          zoom: 11,
          mapId: "satellite",
          disableDefaultUI: true,
          clickableIcons: true,
          scrollwheel: false,
        };

        const map = new Map(mapRef.current as HTMLDivElement, mapOptions);

        const marker = new Marker({
          map: map,
          position: position,
        });

        if (FetchData.length > 0) {
          const pathCoordinates = FetchData.map((point) => ({
            lat: Number(point.latitude),
            lng: Number(point.longitude),
          }));

          const route = new google.maps.Polyline({
            path: pathCoordinates,
            geodesic: true,
            strokeColor: "#FF0000",
            strokeOpacity: 1.0,
            strokeWeight: 2,
          });

          route.setMap(map);

          const distance = google.maps.geometry.spherical.computeLength(
            route.getPath()
          );
          setTotalDistance(distance);

          const speed = FetchData[FetchData.length - 1].speed;

          if (speed > 55) {
            setRouteColor("#FF0000");
          } else {
            setRouteColor("#00FF00");
          }
        }
      }
    };

    initMap();
  }, [latData, lngData, FetchData, totalDistance]);
  return (
    <>
      <div className="account-page">
        <Layout />
        <Container className="pt-5" fluid>
          <Row className="pt-5">
            <Col md={6} className="scrollable-column">
              <Card style={{ width: "42rem", maxHeight: "auto" }}>
                <div style={{ height: "360px", width: "42rem" }} ref={mapRef} />

                <div className="card-body">
                  <div className="location-widget">
                    <div className="doc-info-left">
                      <div className="location-img">
                        <a href="location-profile.html">
                          <Image src={T1} className="img-fluid" alt="t1" />
                        </a>
                      </div>
                      <div className="doc-info-cont">
                        <h4 className="doc-name">
                          <a href="location-profile.html">Jack Hemswire</a>
                        </h4>
                        <div className="clinic-details">
                          <p className="doc-location">
                            <i className="fas fa-map-marker-alt"></i> Hartmann
                            Rd, Royal Docks, London E16 2PX, United Kingdom
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="doc-info-right">
                      <div className="clini-infos">
                        <ul>
                          <li>
                            <i className="far fa-thumbs-up"></i> 98%
                          </li>
                          <li>
                            <i className="far fa-comment"></i> 17 Feedback
                          </li>
                          <li>
                            <i className="fas fa-map-marker-alt"></i> Londan,
                            USA
                          </li>
                        </ul>
                      </div>
                      <div className="clinic-booking">
                        <Link className="view-pro-btn" href="/viewmap">
                          View Location
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
              <Card
                style={{ width: "42rem", maxHeight: "auto" }}
                className="pt-5"
              >
                <div className="card-body">
                  <div className="location-widget">
                    <div className="doc-info-left">
                      <div className="location-img">
                        <a href="location-profile.html">
                          <Image src={T1} className="img-fluid" alt="t1" />
                        </a>
                      </div>
                      <div className="doc-info-cont">
                        <h4 className="doc-name">
                          <a href="location-profile.html">Jack Hemswire</a>
                        </h4>
                        <div className="clinic-details">
                          <p className="doc-location">
                            <i className="fas fa-map-marker-alt"></i> Hartmann
                            Rd, Royal Docks, London E16 2PX, United Kingdom
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="doc-info-right">
                      <div className="clini-infos">
                        <ul>
                          <li>
                            <i className="far fa-thumbs-up"></i> 98%
                          </li>
                          <li>
                            <i className="far fa-comment"></i> 17 Feedback
                          </li>
                          <li>
                            <i className="fas fa-map-marker-alt"></i> Londan,
                            USA
                          </li>
                        </ul>
                      </div>
                      <div className="clinic-booking">
                        <a
                          className="view-pro-btn"
                          href="location-profile.html"
                        >
                          View Location
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
              <Card
                style={{ width: "42rem", maxHeight: "auto" }}
                className="pt-5"
              >
                <div className="card-body">
                  <div className="location-widget">
                    <div className="doc-info-left">
                      <div className="location-img">
                        <a href="location-profile.html">
                          <Image src={T1} className="img-fluid" alt="t1" />
                        </a>
                      </div>
                      <div className="doc-info-cont">
                        <h4 className="doc-name">
                          <a href="location-profile.html">Jack Hemswire</a>
                        </h4>
                        <div className="clinic-details">
                          <p className="doc-location">
                            <i className="fas fa-map-marker-alt"></i> Hartmann
                            Rd, Royal Docks, London E16 2PX, United Kingdom
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="doc-info-right">
                      <div className="clini-infos">
                        <ul>
                          <li>
                            <i className="far fa-thumbs-up"></i> 98%
                          </li>
                          <li>
                            <i className="far fa-comment"></i> 17 Feedback
                          </li>
                          <li>
                            <i className="fas fa-map-marker-alt"></i> Londan,
                            USA
                          </li>
                        </ul>
                      </div>
                      <div className="clinic-booking">
                        <a
                          className="view-pro-btn"
                          href="location-profile.html"
                        >
                          View Location
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            </Col>
            <Col md={6} className="fixed-column">
              {/* <div style={{ height: "360px", width: "42rem" }} ref={mapRef} /> */}
            </Col>
          </Row>
        </Container>
      </div>
    </>
  );
};
export default ViewMore;
