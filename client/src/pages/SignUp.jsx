import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AlertApi } from "../context/AlertContext";
// import { useFormik } from "formik";
// import * as Yup from "yup";
import axios from "axios";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer/Footer";
import { Button, Grid, Typography } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Google } from "@mui/icons-material";
import {
  GoogleAuthProvider,
  signInWithPopup,
  createUserWithEmailAndPassword,
  FacebookAuthProvider,
  signInWithRedirect,
  signOut,
} from "firebase/auth";
import { auth } from "../auth/firebase";
import Cookies from "js-cookie";
import { AuthApi } from "../context/user";

export default function SignUp() {
  // const [match, setMatch] = useState(true);
  // const [passwordStrength, setPasswordStrength] = useState("");
  // const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const { setAlert } = AlertApi();
  const { setuser } = AuthApi();
  // const formik = useFormik({
  //   initialValues: {
  //     email: "",
  //     password: "",
  //     Cpassword: "",
  //   },
  //   validationSchema: Yup.object({
  //     name: Yup.string().required("Required"),
  //     email: Yup.string().email("Invalid email address").required("Required"),
  //     password: Yup.string()
  //       .matches(
  //         /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
  //         "Must contain at least 8 characters, one uppercase letter, one lowercase letter, one number, and one special character"
  //       )
  //       .required("Required"),
  //     Cpassword: Yup.string()
  //       .oneOf([Yup.ref("password"), null], "Passwords must match")
  //       .required("Required"),
  //   }),
  //   onSubmit: async (values, { resetForm }) => {
  //     // Handle form submission here using axios or any other method
  //     setLoading(true);
  //     await handleSignup(values);
  //     setLoading(false);
  //     resetForm();
  //   },
  // });

  // const handleSignup = async (values) => {
  //   const { email, password } = values;
  //   if ((!email, !password)) {
  //     setAlert({ type: "warning", message: "All fields are Required" });
  //     return;
  //   }
  //   try {
  //     const user = await createUserWithEmailAndPassword(auth, email, password);

  //     // Send the user data to the server

  //     const playload = {
  //       uuid: user.user.uid,
  //       email: email,
  //     };

  //     if (user) {
  //       let url = `${process.env.REACT_APP_API_KEY}/signup`;
  //       const res = await axios.post(url, playload);
  //       navigate(`/signup/${res.data.uuid}`);
  //       setAlert({ type: "success", message: "Sign Up success" });
  //     }
  //   } catch (error) {
  //     if (error.message === "Firebase: Error (auth/email-already-in-use).") {
  //       setAlert({
  //         type: "error",
  //         message: "Account Already exist wait for intitute approvel",
  //       });
  //     }
  //     // //console.log("Failed to sign up with Google.");
  //   }
  // };

  const handleSignupWithGoogle = async () => {
    try {
      const provider = new GoogleAuthProvider();

      // provider.setCustomParameters({ prompt: "select_account" });
      // console.log(provider);

      // //console.log(auth);

      const user = await signInWithPopup(auth, provider);

      // console.log("USER", user);
      // Send the user data to the server
      const playload = {
        uuid: user.user.uid,
        email: user.user.email,
      };

      // console.log(playload);

      const out = await signOut(auth);

      // console.log(out);

      // //console.log(user.user);
      // //console.log(user._tokenResponse);
      if (user) {
        let url = `${process.env.REACT_APP_API_KEY}/signup`;

        const res = await axios.post(url, playload);
        // console.log(res);
        if (res.data.code === 0) {
          navigate(`/signup/${res.data.uuid}`);
          window.scrollTo({
            top: 0,
            behavior: "smooth",
          });
          setAlert({ type: "success", message: "success" });
        } else if (res.data.code === 1) {
          // console.log(res);
          setuser(res.data);
          const Token = JSON.stringify(res.data);
          Cookies.set("User", Token, { expires: 2 });
          navigate(`/alumni`);
          // navigate("/Login");
        }
      }
    } catch (error) {
      console.log(error);
    }
  };
  const handleSignupWithFaceBook = async () => {
    try {
      const provider = new FacebookAuthProvider();
      // provider.setCustomParameters({ prompt: "select_account" });
      // //console.log(provider);
      // //console.log(auth);
      const user = await signInWithPopup(auth, provider);
      // Send the user data to the server
      const playload = {
        uuid: user.user.uid,
        email: user.user.email,
      };

      console.log(user);

      // //console.log(user.user);
      // //console.log(user._tokenResponse);
      if (user) {
        let url = `${process.env.REACT_APP_API_KEY}/signup`;

        const res = await axios.post(url, playload);
        // //console.log(res);
        if (res.data.code === 0) {
          navigate(`/signup/${res.data.uuid}`);
          window.scrollTo({
            top: 0,
            behavior: "smooth",
          });
          setAlert({ type: "success", message: "success" });
        } else if (res.data.code === 1) {
          setAlert({ type: "warning", message: "This Mail Already exist" });
          // navigate("/Login");
        } else if (res.data.code === 2) {
          setAlert({ type: "error", message: "You are Blocked" });
        } else if (res.data.code === 3) {
          setAlert({
            type: "error",
            message: "your account Already exist wait for intitute approvel",
          });
        }
      }
    } catch (error) {}
  };

  // const handleinput = (e) => {
  //   const { value, id } = e.target;
  //   formik.setFieldValue(id, value);
  // };

  // const checkpwd = () => {
  //   const { password, Cpassword } = formik.values;

  //   if (!Cpassword || !password) {
  //     return setMatch(true);
  //   }

  //   if (Cpassword === password) {
  //     setMatch(true);
  //   } else {
  //     setMatch(false);
  //   }
  // };

  // useEffect(() => {
  //   checkpwd();
  // }, [formik.values]);

  // const checkPasswordStrength = (password) => {
  //   if (
  //     password.match(
  //       /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/
  //     )
  //   ) {
  //     setPasswordStrength("Strong");
  //   } else if (password.match(/^(?=.*[a-zA-Z])(?=.*\d)[A-Za-z\d]{8,}$/)) {
  //     setPasswordStrength("Medium");
  //   } else {
  //     setPasswordStrength("Weak");
  //   }
  // };

  // useEffect(() => {
  //   checkPasswordStrength(formik.values.password);
  // }, [formik.values.password]);

  const theme = createTheme({
    palette: {
      primary: {
        main: "#1976d2",
      },
    },
  });

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
              </div>

              <Grid container spacing={2}>
                <Grid item xs={12} sm={4}>
                  <ThemeProvider theme={theme}>
                    <Button
                      variant="contained"
                      color="primary"
                      startIcon={<Google />}
                      onClick={handleSignupWithGoogle}
                      fullWidth
                    >
                      Google
                    </Button>
                  </ThemeProvider>
                </Grid>

                {/* <Grid item xs={12} sm={4}>
                  <ThemeProvider theme={theme}>
                    <Button
                      variant="contained"
                      color="primary"
                      startIcon={<Facebook />}
                      fullWidth
                      onClick={handleSignupWithFaceBook}
                      className="hidden"
                    >
                      Facebook
                    </Button>
                  </ThemeProvider>
                </Grid> */}
              </Grid>
            </div>
          </Grid>
        </Grid>
      </div>

      <Footer />
    </>
  );
}
