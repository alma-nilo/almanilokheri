import React from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { motion } from "framer-motion";
import { AlertApi } from "../../context/AlertContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie";
import { AuthApi } from "../../context/user";

const AdminLogin = () => {
  const initialValues = {
    username: "",
    password: "",
  };

  const validationSchema = Yup.object({
    username: Yup.string().required("Required"),
    password: Yup.string().required("Required"),
  });
  const navigate = useNavigate();
  const { setAlert } = AlertApi();
  const { setadmin } = AuthApi();
  const handleSubmit = async (values, { setSubmitting }) => {
    let url = `${process.env.REACT_APP_API_KEY}/admins`;
    try {
      const response = await axios.post(url, {
        email: values.username,
        password: values.password,
      });
      setadmin(response.data.data);
      const Admin = JSON.stringify(response.data.data);
      Cookies.set("Admin", Admin, { expires: 2 });

      setAlert({ type: "success", message: response.data.message });
      navigate("/admin");
    } catch (error) {
      setAlert({ type: "error", message: error.response.data.error });
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-blue-900">
      <motion.div
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="bg-white p-8 rounded shadow-md w-full max-w-sm"
      >
        <h1 className="text-3xl font-bold mb-6 text-center text-blue-900">
          Admin Login
        </h1>

        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting }) => (
            <Form>
              <div className="mb-6">
                <label
                  htmlFor="username"
                  className="block font-medium mb-1 text-blue-900"
                >
                  Username
                </label>
                <Field
                  type="text"
                  id="username"
                  name="username"
                  className="w-full p-3 border border-blue-900 rounded focus:outline-none focus:ring-2 focus:ring-blue-900"
                />
                <ErrorMessage
                  name="username"
                  component="div"
                  className="text-red-500"
                />
              </div>

              <div className="mb-6">
                <label
                  htmlFor="password"
                  className="block font-medium mb-1 text-blue-900"
                >
                  Password
                </label>
                <Field
                  type="password"
                  id="password"
                  name="password"
                  className="w-full p-3 border border-blue-900 rounded focus:outline-none focus:ring-2 focus:ring-blue-900"
                />
                <ErrorMessage
                  name="password"
                  component="div"
                  className="text-red-500"
                />
              </div>

              <motion.button
                type="submit"
                className="bg-blue-900 text-white px-4 py-3 rounded w-full hover:bg-blue-800 transition-colors"
                disabled={isSubmitting}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {isSubmitting ? "Logging in..." : "Log In"}
              </motion.button>
            </Form>
          )}
        </Formik>

        <div className="flex justify-center mt-6">
          <motion.div
            className="bg-purple-600 w-6 h-6 rounded-full mr-2"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.5 }}
          ></motion.div>
          <motion.div
            className="bg-purple-600 w-6 h-6 rounded-full"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.6 }}
          ></motion.div>
        </div>
      </motion.div>
    </div>
  );
};

export default AdminLogin;
