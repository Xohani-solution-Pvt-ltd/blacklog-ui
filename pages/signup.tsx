import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Button, Form } from "react-bootstrap";
import Image from "next/image";
import Logo2 from "../public/assets/img/logo_2.png";
import User from "../public/assets/img/Icon feather-user.svg";
import Email from "../public/assets/img/Icon feather-mail.svg";
import Lock from "../public/assets/img/Icon feather-lock.svg";
import { useRouter } from "next/router";
import axios from "axios";
import { toast } from "react-toastify";

const Signup = () => {
  const router = useRouter();
  const [user, setUser] = React.useState({
    fullName: "",
    email: "",
    password: "",
    confirmpassword: "",
  });

  const [loading, setLoading] = React.useState(false);
  const onSignup = async (event: any) => {
    event.preventDefault();
    try {
      setLoading(true);
      const response = await axios.post(
        "http://65.0.85.221/api/v1/register",
        user
      );
      console.log("signup success", response.data);
      router.push("/login");
    } catch (error: any) {
      console.log("signup failed", error.message);
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (event: any) => {
    event.preventDefault();
    console.log("Submitted user data:", user);
    onSignup(event);
  };

  return (
    <>
      <div className="account-page">
        <div className="main-wrapper">
          <div className="row align-items-center justify-content-center H-100%">
            <div className="col-md-8">
              <div className="account-content">
                <div className="row align-items-center justify-content-center">
                  <div className="col-md-7 col-lg-6 login-left text-center">
                    <Image
                      src={Logo2}
                      className="img-fluid logo-img"
                      alt="Login"
                    />
                  </div>
                  <div className="col-md-12 col-lg-6 login-right">
                    <div className="login-header">
                      <h2>Sign up</h2>
                    </div>
                    <Form className="mt-8 space-y-6" onSubmit={handleSubmit}>
                      <Form.Group controlId="fullName" className="mb-4">
                        <Image src={User} alt="User Icon" />
                        <Form.Label className="icon-set">Full Name</Form.Label>
                        <Form.Control
                          tabIndex={0}
                          type="text"
                          name="fullName"
                          className="rounded-none form-control-secondary-300"
                          placeholder="John Doe"
                          aria-labelledby="fullName"
                          required={true}
                          value={user.fullName}
                          onChange={(e) =>
                            setUser({ ...user, fullName: e.target.value })
                          }
                        />
                      </Form.Group>
                      <Form.Group controlId="emailAddress" className="mb-4">
                        <Image src={Email} alt="Email Icon" />
                        <Form.Label className="icon-set">
                          Email Address
                        </Form.Label>
                        <Form.Control
                          type="email"
                          value={user.email}
                          name="email"
                          placeholder="youremail@example.com"
                          required={true}
                          onChange={(e) =>
                            setUser({ ...user, email: e.target.value })
                          }
                        />
                      </Form.Group>
                      <Form.Group controlId="password" className="mb-4">
                        <Image src={Lock} alt="Password" />
                        <Form.Label className="icon-set"> Password</Form.Label>
                        <Form.Control
                          type="password"
                          name="password"
                          value={user.password}
                          placeholder="Enter your password"
                          minLength={8}
                          required={true}
                          onChange={(e) =>
                            setUser({ ...user, password: e.target.value })
                          }
                        />
                      </Form.Group>
                      <Form.Group controlId="confirmPassword" className="mb-4">
                        <Image src={Lock} alt="Confirm Password" />
                        <Form.Label className="icon-set">
                          Confirm Password
                        </Form.Label>
                        <Form.Control
                          type="password"
                          name="confirmPassword"
                          value={user.confirmpassword}
                          placeholder="Confirm Your Password"
                          minLength={8}
                          required={true}
                          onChange={(e) =>
                            setUser({
                              ...user,
                              confirmpassword: e.target.value,
                            })
                          }
                        />
                      </Form.Group>

                      <div>
                        <Button
                          variant="primary"
                          type="submit"
                          onClick={(e) => onSignup(e)}
                        >
                          Sign up
                        </Button>

                        <div className="text-center dont-have">
                          <Link className="nav-link" href="/login">
                            Already have an account ? <strong>Sign in</strong>
                          </Link>
                        </div>
                      </div>
                    </Form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Signup;
