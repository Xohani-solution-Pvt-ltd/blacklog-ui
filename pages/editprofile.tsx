import Link from "next/link";
import React, { useState } from "react";
import { Form, Button, Container, Row, Col } from "react-bootstrap";

interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  joiningDate: string;
  mobileNumber: string;
  password: string;
  gender: string;
  confirmPassword: string;
  dateOfBirth: string;
  education: string;
  address: string;
  photo: File | null;
}

const EditProfile = () => {
  const [formData, setFormData] = useState<FormData>({
    firstName: "",
    lastName: "",
    email: "",
    joiningDate: "",
    mobileNumber: "",
    password: "",
    gender: "",
    confirmPassword: "",
    dateOfBirth: "",
    education: "",
    address: "",
    photo: null,
  });

  // Handle text input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]; // Use optional chaining to avoid null error
    if (file) {
      setFormData((prevData) => ({
        ...prevData,
        photo: file,
      }));
    }
  };

  // Handle form submission
  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(formData);

    // Reset form
    setFormData({
      firstName: "",
      lastName: "",
      email: "",
      joiningDate: "",
      mobileNumber: "",
      password: "",
      gender: "",
      confirmPassword: "",
      dateOfBirth: "",
      education: "",
      address: "",
      photo: null,
    });
  };

  // Handle form reset
  const handleFormReset = () => {
    setFormData({
      firstName: "",
      lastName: "",
      email: "",
      joiningDate: "",
      mobileNumber: "",
      password: "",
      gender: "",
      confirmPassword: "",
      dateOfBirth: "",
      education: "",
      address: "",
      photo: null,
    });
  };

  return (
    <>
      <div className="driver-profile-edit">
        <h5>Edit Profile</h5>
      </div>
      <div className="account-edit">
        <h6>Account Setting</h6>
        <Container>
          <Form onSubmit={handleFormSubmit} onReset={handleFormReset}>
            <Row>
              <Col sm={6}>
                <Col sm={8}>
                  <Form.Label htmlFor="firstName">First Name</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter First Name"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleInputChange}
                  />
                </Col>
                <Col sm={8}>
                  <Form.Label htmlFor="email">Email</Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="Enter Email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                  />
                </Col>
                <Col sm={8}>
                  <Form.Label htmlFor="mobileNumber">Mobile Number</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter Mobile Number"
                    name="mobileNumber"
                    value={formData.mobileNumber}
                    onChange={handleInputChange}
                  />
                </Col>
                <Col sm={8}>
                  <Form.Label htmlFor="gender">Gender</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter Gender"
                    name="gender"
                    value={formData.gender}
                    onChange={handleInputChange}
                  />
                </Col>
                <Col sm={8}>
                  <Form.Label htmlFor="dateOfBirth">Date of Birth</Form.Label>
                  <Form.Control
                    type="date"
                    name="dateOfBirth"
                    value={formData.dateOfBirth}
                    onChange={handleInputChange}
                  />
                </Col>
              </Col>
              <Col sm={6}>
                <Col sm={8}>
                  <Form.Label htmlFor="lastName">Last Name</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter Last Name"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleInputChange}
                  />
                </Col>
                <Col sm={8}>
                  <Form.Label htmlFor="joiningDate">Joining Date</Form.Label>
                  <Form.Control
                    type="date"
                    name="joiningDate"
                    value={formData.joiningDate}
                    onChange={handleInputChange}
                  />
                </Col>
                <Col sm={8}>
                  <Form.Label htmlFor="password">Password</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Enter Password"
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                  />
                </Col>
                <Col sm={8}>
                  <Form.Label htmlFor="confirmPassword">
                    Confirm Password
                  </Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Enter Confirm Password"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleInputChange}
                  />
                </Col>
                <Col sm={8}>
                  <Form.Label htmlFor="education">Education</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter Education"
                    name="education"
                    value={formData.education}
                    onChange={handleInputChange}
                  />
                </Col>
              </Col>
            </Row>
            <Col sm={12}>
              <Col sm={10}>
                <Form.Label htmlFor="address">Address</Form.Label>
                <Form.Control
                  as="textarea"
                  placeholder="Enter Address"
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                />
              </Col>
            </Col>
            <div className="pt-3">
              <Form.Label>Upload Photo (150px × 150px)</Form.Label>
              <Col sm={3}>
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
          </Form>
        </Container>
      </div>
    </>
  );
};

export default EditProfile;
