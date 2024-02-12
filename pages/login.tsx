import Link from "next/link";
import React, { useState, useEffect } from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import { LoginFormInterface, initialLoginValues } from "../interfaces/login";
import * as Yup from "yup";
import Email from "../public/assets/img/Icon feather-mail.svg";
import Logo2 from "../public/assets/img/logo_2.png";
import Lock from "../public/assets/img/Icon feather-lock.svg";
import Image from "next/image";
import { useRouter } from "next/navigation";
import axios from "axios";
import { toast } from "react-toastify";

const validationSchema = Yup.object({
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is Required"),
  password: Yup.string().required("Password is Required"),
});

const Login = () => {
  const router = useRouter();
  const [user, setUser] = React.useState({
    email: "",
    password: "",
  });
  const [loading, setLoading] = React.useState(false);
  const onSignup = async () => {
    try {
      setLoading(true);
      const response = await axios.post(
        "http://localhost:8000/api/v1/login",
        user
      );
      console.log("login success", response.data);
      router.push("/dashboard");
    } catch (error: any) {
      console.log("login failed", error.message);
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };
  const handleSubmit = (event: any) => {
    event.preventDefault();
    console.log("Submitted user data:", user);
    onSignup();
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
                      <h2>Sign in</h2>
                    </div>

                    <Formik
                      initialValues={initialLoginValues}
                      validationSchema={validationSchema}
                      onSubmit={handleSubmit}
                    >
                      <Form onSubmit={handleSubmit}>
                        <Image src={Email} alt="Email Icon" />
                        <label className="icon-set" htmlFor="email">
                          Email
                        </label>
                        <Field
                          type="email"
                          id="email"
                          name="email"
                          className="form-control"
                          value={user.email}
                          placeholder="youremail@example.com"
                          required={true}
                          onChange={(e: { target: { value: any } }) =>
                            setUser({ ...user, email: e.target.value })
                          }
                        />
                        <ErrorMessage
                          name="email"
                          component="div"
                          className="text-danger"
                        />
                        <Image src={Lock} alt="Lock Icon" />
                        <label className="icon-set" htmlFor="password">
                          Password
                        </label>
                        <Field
                          type="password"
                          id="password"
                          name="password"
                          className="form-control"
                          value={user.password}
                          placeholder="Enter your password"
                          required={true}
                          onChange={(e: { target: { value: any } }) =>
                            setUser({ ...user, password: e.target.value })
                          }
                        />
                        <ErrorMessage
                          name="password"
                          component="div"
                          className="text-danger"
                        />
                        <div className="text-right">
                          <Link className="forgot-link" href="/forgotPassword">
                            Forgot Password ?
                          </Link>
                        </div>
                        <div className="text-end">
                          <button
                            type="submit"
                            className="btn btn-primary display-4"
                            onClick={() => router.push("/")}
                            // onClick={onSignup}
                          >
                            Login
                          </button>
                        </div>
                        <div className="login-or">
                          <span className="or-line"></span>
                          <span className="span-or">or</span>
                        </div>

                        <div className="text-center dont-have">
                          <Link className="nav-link" href="/signup">
                            Dont have an account ? <strong>Sign up</strong>
                          </Link>
                        </div>
                      </Form>
                    </Formik>
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

export default Login;
