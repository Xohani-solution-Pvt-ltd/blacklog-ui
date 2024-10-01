import React, { useState } from "react";
import { Form, Button, Row, Col } from "react-bootstrap";
import Layout from "@/components/Layout";
import Sidebar from "@/components/Sidebar";

const AddVehicle = () => {
  const [vehicleNo, setVehicleNo] = useState("");
  const [year, setYear] = useState("");
  const [model, setModel] = useState("");
  const [image, setImage] = useState("");

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    const apiUrl = "http://43.205.99.213:3000/api/v1/addCar";

    const formData = new FormData();
    formData.append("vehicleNo", vehicleNo);
    formData.append("year", year);
    formData.append("model", model);
    formData.append("image", image);

    try {
      const response = await fetch(apiUrl, {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        console.log("Vehicle added successfully!");
      } else {
        console.error("Failed to add vehicle");
      }
    } catch (error) {
      console.error("Error adding vehicle:", error);
    }
  };

  return (
    <>
      <div className="dashboard-layout">
        <Layout />
        <div className="sidebar-container">
          <Sidebar />
        </div>
        <div
          className="d-flex justify-content-center"
          style={{ marginTop: "80px" }}
        >
          <Row className="pt-3">
            <h5>Add Vehicle Details</h5>
            <Form onSubmit={handleSubmit}>
              <Col sm={5}>
                <Form.Group controlId="formVehicleNo">
                  <Form.Label>Vehicle No</Form.Label>
                  <Form.Control
                    type="text"
                    value={vehicleNo}
                    onChange={(e) => setVehicleNo(e.target.value)}
                  />
                </Form.Group>
              </Col>
              <Col sm={5}>
                <Form.Group controlId="formModel">
                  <Form.Label> Model</Form.Label>
                  <Form.Control
                    type="text"
                    value={model}
                    onChange={(e) => setModel(e.target.value)}
                  />
                </Form.Group>
              </Col>
              <Col sm={5}>
                <Form.Group controlId="formYear">
                  <Form.Label>Year</Form.Label>
                  <Form.Control
                    type="text"
                    value={year}
                    onChange={(e) => setYear(e.target.value)}
                  />
                </Form.Group>
              </Col>
              <Col sm={5}>
                <Form.Group controlId="formPhoto">
                  <Form.Label>Upload Photo</Form.Label>
                  <Form.Control
                    type="file"
                    name="image"
                    onChange={(e) => setImage(e.target.files[0])}
                  />
                </Form.Group>
              </Col>
              <div className="pt-3">
                <Button className="me-3" variant="primary" type="submit">
                  Submit
                </Button>
                <Button className="me-3" variant="secondary" type="reset">
                  Reset
                </Button>
              </div>
            </Form>
          </Row>
        </div>
      </div>
    </>
  );
};

export default AddVehicle;
