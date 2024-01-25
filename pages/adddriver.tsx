import React, { useEffect, useState } from "react";
import { Form, Button, Row, Col } from "react-bootstrap";

const Adddriver = () => {
  const [formData, setFormData] = useState({
    name: "",
    age: "",
    address: "",
    mobile: "",
    emergencyContact: "",
    licenseNo: "",
    car: "",
    photo:"",
  });

  const handleChange = (e: any) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    try {
      const response = await fetch("http://65.0.85.221/api/v1/editprofile", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        console.log("Data saved successfully!");
      } else {
        console.log("Error saving data");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleFileChange = (e:any) => {
    const file = e.target.files[0];
    setFormData({ ...formData, photo: file });
  };

  const fetchDataFromApi = async () => {
    try {
      const data = await fetchData();
      if (data) {
        console.log("Data from API:", data);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchDataFromApi();
  }, []);

  return (
    <>
      <div className="d-flex justify-content-center">
        <Row className="pt-3">
          <h5>Add Driver Details</h5>
          <Form onSubmit={handleSubmit}>
            <Col sm={12}>
              <Form.Group controlId="formName">
                <Form.Label>Name</Form.Label>
                <Form.Control
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                />
              </Form.Group>
            </Col>
            <Col sm={12}>
              <Form.Group controlId="formName">
                <Form.Label>Age</Form.Label>
                <Form.Control
                  type="text"
                  name="age"
                  value={formData.age}
                  onChange={handleChange}
                />
              </Form.Group>
            </Col>
            <Col sm={12}>
              <Form.Group controlId="formName">
                <Form.Label>Address</Form.Label>
                <Form.Control
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                />
              </Form.Group>
            </Col>
            <Col sm={12}>
              <Form.Group controlId="formName">
                <Form.Label>Mobile</Form.Label>
                <Form.Control
                  type="text"
                  name="mobile"
                  value={formData.mobile}
                  onChange={handleChange}
                />
              </Form.Group>
            </Col>
            <Col sm={12}>
              <Form.Group controlId="formName">
                <Form.Label>EmergencyContact</Form.Label>
                <Form.Control
                  type="text"
                  name="emergencyContact"
                  value={formData.emergencyContact}
                  onChange={handleChange}
                />
              </Form.Group>
            </Col>
            <Col sm={12}>
              <Form.Group controlId="formName">
                licenseNo
                <Form.Label></Form.Label>
                <Form.Control
                  type="text"
                  name="licenseNo"
                  value={formData.licenseNo}
                  onChange={handleChange}
                />
              </Form.Group>
            </Col>
            <div className="pt-3">
              <Form.Label column sm={3}>
                upload Photo(150px*150px)
              </Form.Label>
              <Col sm={5}>
                <Form.Control
                  type="file"
                  name="photo"
                  onChange={handleFileChange}
                />
              </Col>
              <div className="pt-3">
                <Button className="me-3" variant="primary" type="submit">
                  Update
                </Button>
                <Button className="me-3" variant="secondary" type="reset">
                  Reset
                </Button>
              </div>
            </div>
            <div className="pt-4">
              <Button variant="primary" type="submit">
                Submit
              </Button>
            </div>
          </Form>
        </Row>
      </div>
    </>
  );
};
export default Adddriver;
function fetchData() {
  throw new Error("Function not implemented.");
}

