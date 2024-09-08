import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer/Footer";
import { FaMapMarkerAlt, FaPhone, FaEnvelope } from "react-icons/fa";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { AlertApi } from "../context/AlertContext";
import EmailButton from "../components/EmailIcon";

const validationSchema = Yup.object().shape({
  name: Yup.string().required("Name is required"),
  mobile: Yup.string().required("Mobile No required "),
  email: Yup.string()
    .email("Invalid email format")
    .required("Email is required"),
  message: Yup.string().required("Message is required"),
});

export default function ContactUs() {
  const { setAlert } = AlertApi();
  const handleSubmit = async (values, { resetForm }) => {
    try {
      // Replace 'YOUR_API_ENDPOINT' with the actual API endpoint
      const apiEndpoint = `${process.env.REACT_APP_API_KEY}/admins/contactUs`;
      // Make an HTTP POST request to the API
      await axios.post(apiEndpoint, values);

      // Handle the response (you can customize this part)
      setAlert({ type: "success", message: "Message send success" });

      // Reset the form after successful submission
      resetForm();
    } catch (error) {
      // Handle errors (e.g., validation errors or network issues)
      console.error("API Error:", error);
    }
  };
  return (
    <>
      <div className=" bg-slate-200 ">
        <Navbar />
        <EmailButton />

        {/* content  */}

        <div className="flex flex-col p-6 items-center justify-center min-h-screen bg-gray-100">
          <h1 className="text-4xl font-bold mb-8 text-green-600">Contact Us</h1>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl w-full">
            <div className="bg-white rounded-lg p-8">
              <h2 className="text-lg font-bold mb-2 text-green-600">
                Get in touch
              </h2>
              <p className="text-gray-700 mb-4">
                Fill out the form below and we'll get back to you as soon as
                possible.
              </p>

              {/*  form  */}
              <Formik
                initialValues={{ name: "", email: "", message: "", mobile: "" }}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
              >
                <Form>
                  <div className="mb-4">
                    <label
                      htmlFor="name"
                      className="block text-gray-700 font-bold mb-2"
                    >
                      Name
                    </label>
                    <Field
                      type="text"
                      id="name"
                      name="name"
                      className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      placeholder="Enter your name"
                    />
                    <ErrorMessage
                      name="name"
                      component="div"
                      className="text-red-500"
                    />
                  </div>
                  <div className="mb-4">
                    <label
                      htmlFor="email"
                      className="block text-gray-700 font-bold mb-2"
                    >
                      Email
                    </label>
                    <Field
                      type="email"
                      id="email"
                      name="email"
                      className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      placeholder="Enter your email address"
                    />
                    <ErrorMessage
                      name="email"
                      component="div"
                      className="text-red-500"
                    />
                  </div>
                  <div className="mb-4">
                    <label
                      htmlFor="mobile"
                      className="block text-gray-700 font-bold mb-2"
                    >
                      Mobile No
                    </label>
                    <Field
                      type="number"
                      id="mobile"
                      name="mobile"
                      className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      placeholder="Enter your Mobile No"
                    />
                    <ErrorMessage
                      name="mobile"
                      component="div"
                      className="text-red-500"
                    />
                  </div>
                  <div className="mb-4">
                    <label
                      htmlFor="message"
                      className="block text-gray-700 font-bold mb-2"
                    >
                      Message
                    </label>
                    <Field
                      as="textarea"
                      id="message"
                      name="message"
                      className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      placeholder="Enter your message"
                      rows="5"
                    />
                    <ErrorMessage
                      name="message"
                      component="div"
                      className="text-red-500"
                    />
                  </div>
                  <button
                    type="submit"
                    className="bg-green-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline hover:bg-green-700"
                  >
                    Submit
                  </button>
                </Form>
              </Formik>

              {/*  form  */}
            </div>
            <div className="bg-white rounded-lg p-8">
              <h2 className="text-lg font-bold mb-2 text-green-600">
                Contact info
              </h2>
              <div className="flex flex-col mb-4">
                <div className="flex items-center mb-2">
                  <FaMapMarkerAlt className="text-3xl text-green-600 mr-4" />
                  <a
                    href="https://maps.app.goo.gl/rUZfmMu4eKHZr2Dm7"
                    className="hover:text-green-500 hover:underline"
                  >
                    <p className="text-gray-700 hover:text-green-500">
                      GBN Govt Polytechnic Nilokheri <br />
                      Karnal, Haryana - 132117
                    </p>
                  </a>
                </div>
                <div className="flex items-center mb-2 hover:text-green-500 hover:underline">
                  <FaPhone className="text-3xl text-green-600 mr-4" />
                  <a href="tel:+91 1745-246002">
                    <p className="text-gray-700 hover:text-green-500">
                      +91 1745-246002
                    </p>
                  </a>
                </div>
                <div className="flex items-center mb-2 mt-1">
                  <a
                    // href="mailto:gpnilokheri@hry.nic.in"
                    href="gbn.alumni.nilokheri@gmail.com"
                    className="flex justify-center items-center hover:underline hover:text-green-500"
                  >
                    <FaEnvelope className="text-3xl text-green-600 mr-4" />
                    {/* <p className="text-xl ">gpnilokheri@hry.nic.in</p> */}
                    <p className="text-lg text-gray-700 hover:text-green-500">
                      gbn.alumni.nilokheri@gmail.com
                    </p>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* content  */}
      </div>
      <Footer />
    </>
  );
}
