import React, { useEffect, useState } from "react";
import { Container, Form, FormControl, Row, Col } from "react-bootstrap";
import Layout from "@/components/Layout";
import { APIProvider, Map } from "@vis.gl/react-google-maps";
import axios from "axios";

// const CarName = ({ car, onSelectCar }) => (
//   <li className="carItem" onClick={() => onSelectCar(car)}>
//     <p className="carItem">{car.vehicleNo}</p>
//   </li>
// );
const CarName = ({ car, onSelectCar, onDeleteCar }) => (
  <li className="carItem">
    <p onClick={() => onSelectCar(car)}>{car.vehicleNo}</p>
    <button
      style={{ backgroundColor: "red" }}
      onClick={() => onDeleteCar(car.id)}
    >
      Delete
    </button>
  </li>
);

// const CarName = ({ car, onSelectCar, onDeleteCar }) => (
//   <li className="carItem" style={{ display: "flex", alignItems: "center" }}>
//     <p onClick={() => onSelectCar(car)}>{car.vehicleNo}</p>
//     <button style={{ backgroundColor: "red", marginLeft: "10px" }} onClick={() => onDeleteCar(car.id)}>Delete</button>
//   </li>
// );

const CarDetails = ({ car }) => (
  <div>
    <h4>Selected Car Details:</h4>
    <p>Name: {car.vehicleNo}</p>
    <p>Model: {car.model}</p>
    <p>Year: {car.year}</p>
    <p>Image: {car.image}</p>
  </div>
);

const Vehicles = () => {
  const mapApiKey = process.env.NEXT_PUBLIC_MAP_API_KEY as string;
  const [searchTerm, setSearchTerm] = useState("");
  const [carNames, setCarNames] = useState([]);
  const [selectedCar, setSelectedCar] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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

  useEffect(() => {
    if (selectedCar) {
      axios
        .get(`http://localhost:8000/api/v1/vehicleData/${selectedCar.id}`)
        .then((response) => {
          console.log("Selected car details:", response.data);
        })
        .catch((error) =>
          console.error("Error fetching selected car details:", error)
        );
    }
  }, [selectedCar]);

  const onDeleteCar = (carId: any) => {
    console.log("Deleting car with ID:", carId);
    axios
      .delete(`http://localhost:8000/api/v1/removeVehicle/${carId}`)
      .then(() => {
        console.log("Car deleted successfully");
        setCarNames((prevCars) => prevCars.filter((car) => car.id !== carId));

        if (selectedCar && selectedCar.id === carId) {
          setSelectedCar(null);
        }
      })
      .catch((error) => {
        console.error("Error deleting car:", error);
      });
  };

  const onSearch = (value: any) => {
    setSearchTerm(value);
  };

  return (
    <>
      <Layout />
      <Container className="pt-4" fluid>
        <Row className="pt-5">
          <Col
            md={8}
            style={{ position: "relative", height: "100vh", width: "100%" }}
          >
            <APIProvider apiKey={mapApiKey}>
              <Map
                zoom={5}
                zoomControl={true}
                center={{ lat: 20.5937, lng: 78.9629 }}
                gestureHandling={"greedy"}
              ></Map>
              <div
                style={{
                  position: "absolute",
                  top: 60,
                  left: 20,
                  zIndex: 1,
                  backgroundColor: "white",
                }}
              >
                <Form>
                  <FormControl
                    type="text"
                    placeholder="Search"
                    className="mr-sm-2"
                    onChange={(e) => onSearch(e.target.value)}
                  />
                </Form>
                <Col md={4}>
                  {loading && <p>Loading...</p>}
                  {error && <p>Error: {error.message}</p>}

                  {carNames.length > 0 ? (
                    <>
                      <ul>
                        {carNames.map((car) => (
                          <CarName
                            key={car.id}
                            car={car}
                            onSelectCar={(selectedCar) =>
                              setSelectedCar(selectedCar)
                            }
                            onDeleteCar={onDeleteCar}
                          />
                        ))}
                      </ul>
                      {selectedCar && <CarDetails car={selectedCar} />}
                    </>
                  ) : (
                    <p>No cars available</p>
                  )}
                </Col>
              </div>
            </APIProvider>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Vehicles;
