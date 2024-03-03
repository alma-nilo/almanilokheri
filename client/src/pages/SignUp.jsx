import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AlertApi } from "../context/AlertContext";

import axios from "axios";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer/Footer";
import { Grid, Typography } from "@mui/material";

import Cookies from "js-cookie";
import { AuthApi } from "../context/user";

export default function SignUp() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [secret, setSecret] = useState("");
  const [qrCode, setQRCode] = useState("");
  const [isLogin, setisLogin] = useState(false);
  const [showQrCode, setShowQrCode] = useState(false);
  const [totp, setTotp] = useState("");
  const [isValidEmail, setIsValidEmail] = useState(false);

  const { setAlert } = AlertApi();
  const { setuser } = AuthApi();

  const fetchQrCode = async (mail) => {
    const url = `${process.env.REACT_APP_API_KEY}/signup?mail=${mail}`;

    try {
      const response = await axios.post(url);
      setSecret(response.data.secret);
      setQRCode(response.data.qrCode);
    } catch (error) {
      console.error("Error signing up:", error);
    }
  };

  const handleEmailSubmit = async () => {
    // Handle email submission logic here

    if (!isValidEmail) {
      // Don't generate QR code if email is not valid
      setAlert({ type: "error", message: "only Valid email required " });

      return;
    }

    try {
      const url = `${process.env.REACT_APP_API_KEY}/flagforauth`;

      const response = await axios.post(url, { mail: email });

      if (response.data.status === "LOGIN") {
        setShowQrCode(true);
        setisLogin(true);
      } else if (response.data.status === "BLOCK") {
        setAlert({
          type: "error",
          message: "This Account is Block",
        });
      } else if (response.data.status === "WAIT") {
        setAlert({
          type: "success",
          message: "Wait For Institute Confirmation",
        });
      } else if (response.data.status === "REGISTRATION") {
        navigate(response.data.tempUser.uuid);
      } else if (response.data.status === "TOTP") {
        setShowQrCode(true); // Show QR code after email submission
        fetchQrCode(email);
      } else {
        setAlert({ type: "error", message: "Somthing Went Wrong" });
      }
    } catch (error) {
      setAlert({ type: "error", message: "Somthing Went Wrong" });
    }
  };

  const handleChangeTotp = (e) => {
    setTotp(e.target.value);
  };

  const handleChangeEmail = (e) => {
    // Validate the entered email using regex
    const enteredEmail = e.target.value;
    setEmail(enteredEmail);

    const isValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(enteredEmail);
    setIsValidEmail(isValid);
  };

  const handleSubmit = async () => {
    // Handle submission logic here
    const url = `${process.env.REACT_APP_API_KEY}/validate`;
    const playload = {
      totp,
      email,
      secret,
    };
    try {
      await axios.post(url, playload);
      navigate(`/signup/${secret}`);
      setAlert({ type: "success", message: "Validate" });
    } catch (error) {
      setAlert({ type: "error", message: "Somthing Went Wrong" });
    }
  };

  const handleLogin = async () => {
    const url = `${process.env.REACT_APP_API_KEY}/login`;
    const playload = {
      totp,
      email,
    };
    try {
      const res = await axios.post(url, playload);

      if (res.data.code === 1) {
        console.log(res);
        setuser(res.data);
        const Token = JSON.stringify(res.data);
        Cookies.set("User", Token, { expires: 2 });
        navigate(`/alumni`);
        // navigate("/Login");
      }

      setAlert({ type: "success", message: "Login Success" });
    } catch (error) {
      setAlert({ type: "error", message: "invalid Otp" });
    }
  };

  const openGoogleAuthenticator = () => {
    window.open(
      `otpauth://totp/Alma Nilokheri: ${email}?secret=${secret}`,
      "_blank"
    );
  };

  // Function to handle opening Microsoft Authenticator
  const openMicrosoftAuthenticator = () => {
    window.open(
      `msauth://com.microsoft.azureauthenticator/otpauth/Alma Nilokheri: ${email}?secret=${secret}`,
      "_blank"
    );
  };

  return (
    <>
      <Navbar />
      <div className="w-full p-4 m-auto my-10 rounded-md shadow-md lg:max-w-5xl">
        <Grid container spacing={2} justifyContent="center" alignItems="center">
          {/* Left Side - Image */}
          <Grid item xs={12} md={6} className="relative">
            {/* Replace the image source with your desired image */}
            <img
              src="/5853-min-scaled.jpg"
              alt="Alumni Image"
              className="w-full h-full object-cover rounded-md"
            />
            <div className="absolute rounded-md"></div>
          </Grid>

          {/* Right Side - Text and Buttons */}
          <Grid item xs={12} md={6} className="relative">
            <div className="p-3 bg-gradient-to-bl from-green-500 via-yellow-500 to-orange-500 opacity-80 rounded-md">
              <Typography
                variant="h4"
                className="font-medium text-white mb-4 md:text-left"
              >
                Connect with your classmates on your alumni portal!
              </Typography>
              <div className="mt-4 md:mt-6 mb-6">
                <Typography className="mb-4 md:mb-6 text-white">
                  <ul>
                    <li className="mb-2 md:mb-0">Create your profile.</li>
                    <li className="mb-2 md:mb-0">
                      Browse members by company, industry, and location.
                    </li>
                    <li className="mb-2 md:mb-0">
                      Post memories and thoughts.
                    </li>
                  </ul>
                </Typography>

                {showQrCode ? (
                  <>
                    {isLogin ? (
                      <>
                        <Typography
                          variant="body1"
                          className="mb-4 md:mb-6 text-white"
                        >
                          Enter Totp from your{" "}
                          <button
                            onClick={openGoogleAuthenticator}
                            className="text-blue-500"
                          >
                            Google Authenticator
                          </button>{" "}
                          or{" "}
                          <button
                            onClick={openMicrosoftAuthenticator}
                            className="text-blue-500"
                          >
                            Microsoft Authenticator
                          </button>{" "}
                          to complete the Login process.
                        </Typography>
                        <div className="flex justify-center mt-2">
                          <p className="text-white font-bold">Email: {email}</p>
                        </div>
                        <div className="mt-2 flex justify-center">
                          <input
                            type="text"
                            value={totp}
                            onChange={handleChangeTotp}
                            placeholder="Enter TOTP"
                            className="py-2 px-4 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                          />
                        </div>
                        <div className="mt-2 flex justify-center">
                          <button
                            onClick={handleLogin}
                            className="inline-flex justify-center py-1 px-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                          >
                            Login
                          </button>
                        </div>
                      </>
                    ) : (
                      <>
                        <Typography
                          variant="body1"
                          className="mb-4 md:mb-6 text-white"
                        >
                          Scan the QR code using{" "}
                          <button
                            onClick={openGoogleAuthenticator}
                            className="text-blue-500"
                          >
                            Google Authenticator
                          </button>{" "}
                          or{" "}
                          <button
                            onClick={openMicrosoftAuthenticator}
                            className="text-blue-500"
                          >
                            Microsoft Authenticator
                          </button>{" "}
                          to complete the setup process.
                        </Typography>
                        <div className="flex justify-center mt-2">
                          <p className="text-white font-bold">Email: {email}</p>
                        </div>
                        <div className="flex justify-center mt-2">
                          <img src={qrCode} alt="QR Code" />
                        </div>
                        <div className="mt-2 flex justify-center">
                          <input
                            type="text"
                            value={totp}
                            onChange={handleChangeTotp}
                            placeholder="Enter TOTP"
                            className="py-2 px-4 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                          />
                        </div>
                        <div className="mt-2 flex justify-center">
                          <button
                            onClick={handleSubmit}
                            className="inline-flex justify-center py-1 px-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                          >
                            Verify
                          </button>
                        </div>
                      </>
                    )}
                  </>
                ) : (
                  <>
                    <Typography
                      variant="body1"
                      className="mb-4 md:mb-6 text-white"
                    >
                      Enter your email to complete the setup process.
                    </Typography>
                    <div className="mt-2 flex justify-center">
                      <input
                        type="email"
                        value={email}
                        onChange={handleChangeEmail}
                        placeholder="Enter Email"
                        className="py-2 px-4 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                      />
                    </div>
                    <div className="mt-2 flex justify-center">
                      <button
                        onClick={handleEmailSubmit}
                        className="inline-flex justify-center py-1 px-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                      >
                        Submit Email
                      </button>
                    </div>
                  </>
                )}
              </div>
            </div>
          </Grid>
        </Grid>
      </div>

      <Footer />
    </>
  );
}
