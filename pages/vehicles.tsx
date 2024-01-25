import React, { useEffect, useState } from "react";
import { Col, Container, Nav, Row, Card } from "react-bootstrap";
import Layout from "@/components/Layout";
import { APIProvider, Map, Marker } from "@vis.gl/react-google-maps";
import MapSideBar from "@/pages/mapsidebar";

const vehicles = () => {
  const mapApiKey = process.env.NEXT_PUBLIC_MAP_API_KEY as string;
  const [searchTerm, setSearchTerm] = useState("");
  console.log("mapApiKey", mapApiKey);

  useEffect(() => {
    console.log("Search Term:", searchTerm);
  }, [searchTerm]);
  return (
    <>
      <Layout />
      <Container className="pt-5" fluid>
        <Row className="pt-5">
          <div style={{ position: "relative", height: "100vh" }}>
            <APIProvider apiKey={mapApiKey}>
              <Map
                zoom={5}
                zoomControl={true}
                center={{ lat: 20.5937, lng: 78.9629 }}
                gestureHandling={"greedy"}
              ></Map>
              <MapSideBar onSearch={(value) => setSearchTerm(value)} />
            </APIProvider>
          </div>
        </Row>
      </Container>
    </>
  );
};

export default vehicles;
