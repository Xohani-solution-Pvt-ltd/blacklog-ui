import React, { useState } from "react";
import Link from "next/link";
import { APP_INFO } from "../environments/index";
import { Container, Form, Button } from "react-bootstrap";
import Logo2 from "../public/assets/img/logo_2.png";
import Email from "../public/assets/img/Icon feather-mail.svg";
import Image from "next/image";
import Layout from "@/components/Layout";
import { useRouter } from "next/navigation";

const ForgotPassword = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [process, setProcess] = useState(false);

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();

    try {
      const response = await fetch("./api/auth/forgotPassword", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      if (response.ok) {
        alert("Password reset email sent successfully!");
      } else {
        const data = await response.json();
        throw new Error(data.message);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <div className="account-page">
        <div className="main-wrapper">
          <div className="row align-items-center justify-content-center H-100vh">
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
                  <div className="col-md-12 col-lg-6 forgot-right">
                    <div className="login-header">
                      <h2>Forgot Password?</h2>
                    </div>
                    <div className="login-body">
                      <form onSubmit={handleSubmit}>
                        <div className="form-group form-focus">
                          <input
                            type="email"
                            className="form-control floating"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Enter your email"
                            required
                          />
                          <label className="focus-label">
                            <span className="mr-3">
                              <Image src={Email} alt="Email Icon" />
                            </span>
                            Email
                          </label>
                        </div>
                        <div className="text-right">
                          <Link className="forgot-link" href="/login">
                            Remember your password?
                          </Link>
                        </div>
                        <div className="login-footer">
                          <button
                            className="btn btn-primary btn-block btn-lg login-btn"
                            type="submit"
                          >
                            {process ? "Processing..." : "Reset Password"}
                          </button>
                        </div>
                      </form>
                    </div>
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

export default ForgotPassword;
