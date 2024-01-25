import Link from "next/link";
import React, { useState } from "react";
import { Form, Button, Container, Row, Col } from "react-bootstrap";

const EditProfile = () => {
  const [formData, setFormData] = useState({});

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFormData({ ...formData, photo: file });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    console.log(formData);
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
                  <Form.Label column sm={8} htmlFor="firstName">
                    First Name
                  </Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter First Name"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleInputChange}
                  />
                </Col>
                <Col sm={8}>
                  <Form.Label column sm={8} htmlFor="email">
                    Email
                  </Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter Email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                  />
                </Col>
                <Col sm={8}>
                  <Form.Label column sm={8} htmlFor="mobilnumber">
                    Mobile Number
                  </Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter Mobile Number"
                    name="Mobile Number"
                    value={formData.mobileNumber}
                    onChange={handleInputChange}
                  />
                </Col>
                <Col sm={8}>
                  <Form.Label column sm={8} htmlFor="gender">
                    Gender
                  </Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter Gender"
                    name="gender"
                    value={formData.gender}
                    onChange={handleInputChange}
                  />
                </Col>
                <Col sm={8}>
                  <Form.Label column sm={8} htmlFor="DateofBirth">
                    Date of Birth
                  </Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter Date of Birth"
                    name="Date of Birth"
                    value={formData.dateOfBirth}
                    onChange={handleInputChange}
                  />
                </Col>
              </Col>
              <Col sm={6}>
                <Col sm={8}>
                  <Form.Label column sm={8} htmlFor="lastName">
                    Last Name
                  </Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter Last Name"
                    name="Last Name"
                    value={formData.lastName}
                    onChange={handleInputChange}
                  />
                </Col>
                <Col sm={8}>
                  <Form.Label column sm={8} htmlFor="JoiningDate">
                    Joining Date
                  </Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter Joining Date"
                    name="joining Date"
                    value={formData.joiningDate}
                    onChange={handleInputChange}
                  />
                </Col>
                <Col sm={8}>
                  <Form.Label column sm={8} htmlFor="Password">
                    Password
                  </Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter Password"
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                  />
                </Col>
                <Col sm={8}>
                  <Form.Label column sm={8} htmlFor="ConfirmPassword">
                    Confirm Password
                  </Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter Confirm Password"
                    name=" ConfirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleInputChange}
                  />
                </Col>
                <Col sm={8}>
                  <Form.Label column sm={8} htmlFor="Education">
                    Education
                  </Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter Education"
                    name="Education"
                    value={formData.education}
                    onChange={handleInputChange}
                  />
                </Col>
              </Col>
            </Row>
            <Col sm={12}>
              <Col sm={10}>
                <Form.Label column sm={10} htmlFor="Address">
                  Address
                </Form.Label>
                <Form.Control
                  className="address-style"
                  type="address"
                  placeholder="Enter Address"
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                />
              </Col>
            </Col>
            <div className="pt-3">
              <Form.Label column sm={3}>
                Upload Photo(150px*150px)
              </Form.Label>
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
