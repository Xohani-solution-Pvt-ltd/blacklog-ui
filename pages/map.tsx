import Layout from "@/components/Layout";
import { Col, Container, Nav, Row, Image, Card } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import React, { useEffect, useState } from "react";
import { APIProvider, Map, Marker } from "@vis.gl/react-google-maps";
const map = () => {
  const mapApiKey = process.env.NEXT_PUBLIC_MAP_API_KEY as string;
  // console.log("mapApiKey", mapApiKey);

  return (
    <>
      <Layout />
      <Container className="pt-5" fluid>
        <Row className="pt-5">
          <Col className="pt-3" md={4}>
            <Card style={{ width: "23rem", maxHeight: "auto" }}>
              <div style={{ height: "50vh", padding: "5" }}>
                <APIProvider apiKey={mapApiKey}>
                  <Map
                    zoom={5}
                    zoomControl={true}
                    center={{ lat: 20.5937, lng: 78.9629 }}
                    gestureHandling={"greedy"}
                  ></Map>
                </APIProvider>
              </div>
            </Card>
          </Col>
          <Col className="pt-3" md={4}>
            <Card style={{ width: "23rem", maxHeight: "auto" }}>
              <div style={{ height: "50vh", padding: "5" }}>
                <APIProvider apiKey={mapApiKey}>
                  <Map
                    zoom={5}
                    zoomControl={true}
                    center={{ lat: 20.5937, lng: 78.9629 }}
                    gestureHandling={"greedy"}
                  ></Map>
                </APIProvider>
              </div>
            </Card>
          </Col>
          <Col className="pt-3" md={4}>
            <Card style={{ width: "23rem", maxHeight: "auto" }}>
              <div style={{ height: "50vh", padding: "5" }}>
                <APIProvider apiKey={mapApiKey}>
                  <Map
                    zoom={5}
                    zoomControl={true}
                    center={{ lat: 20.5937, lng: 78.9629 }}
                    gestureHandling={"greedy"}
                  ></Map>
                </APIProvider>
              </div>
            </Card>
          </Col>
        </Row>
        <Row className="pt-5">
          <Col className="pt-3" md={4}>
            <Card style={{ width: "23rem", maxHeight: "auto" }}>
              <div style={{ height: "50vh", padding: "5" }}>
                <APIProvider apiKey={mapApiKey}>
                  <Map
                    zoom={5}
                    zoomControl={true}
                    center={{ lat: 20.5937, lng: 78.9629 }}
                    gestureHandling={"greedy"}
                  ></Map>
                </APIProvider>
              </div>
            </Card>
          </Col>
          <Col className="pt-3" md={4}>
            <Card style={{ width: "23rem", maxHeight: "auto" }}>
              <div style={{ height: "50vh", padding: "5" }}>
                <APIProvider apiKey={mapApiKey}>
                  <Map
                    zoom={5}
                    zoomControl={true}
                    center={{ lat: 20.5937, lng: 78.9629 }}
                    gestureHandling={"greedy"}
                  ></Map>
                </APIProvider>
              </div>
            </Card>
          </Col>
          <Col className="pt-3" md={4}>
            <Card style={{ width: "23rem", maxHeight: "auto" }}>
              <div style={{ height: "50vh", padding: "5" }}>
                <APIProvider apiKey={mapApiKey}>
                  <Map
                    zoom={5}
                    zoomControl={true}
                    center={{ lat: 20.5937, lng: 78.9629 }}
                    gestureHandling={"greedy"}
                  ></Map>
                </APIProvider>
              </div>
            </Card>
          </Col>
        </Row>
        <Button className="display-4">
          <Nav.Link href="/mapview" className="nav-link mouse-hover text-white">
            View More
          </Nav.Link>
        </Button>
      </Container>
    </>
  );
};

export default map;
