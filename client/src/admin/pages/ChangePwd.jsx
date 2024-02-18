import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { AlertApi } from "../../context/AlertContext";
import { AuthApi } from "../../context/user";

const pwdSchema = Yup.object().shape({
  oldpwd: Yup.string()
    .required("Required")
    .notOneOf(
      [Yup.ref("newpwd"), null],
      "Old password must not be the same as the new password"
    ),
  newpwd: Yup.string()
    .required("Required")
    .matches(
      /^(?=.*\d)(?=.*[A-Z]).{8,}$/,
      "Password must be at least 8 characters long, contain at least one number, and have at least one capital letter"
    ),
  Cpwd: Yup.string()
    .oneOf([Yup.ref("newpwd"), null], "Passwords must match")
    .required("Required"),
});

const ChangePwd = () => {
  const { setAlert } = AlertApi();

  const { admin } = AuthApi();

  const handleSubmit = async (values, { resetForm }) => {
    // Handle the form submission here
    const { oldpwd, newpwd } = values;

    // //console.log(values);

    const url = `${process.env.REACT_APP_API_KEY}/admins/changePwd`;

    const playload = {
      oldpwd: oldpwd,
      newpwd: newpwd,
    };

    const config = {
      headers: {
        Authorization: `Bearer ${admin.token}`,
      },
    };
    try {
      const { data } = await axios.post(url, playload, config);

      if (data.code === 0) {
        setAlert({
          type: "error",
          message: "Old Password Wrong",
        });
        return;
      } else {
        setAlert({
          type: "success",
          message: "Password Change success",
        });
      }

      resetForm();
    } catch (error) {
      //console.log(error.config);
      setAlert({ type: "error", message: error.message });
    }
  };

  return (
    <div className="container mx-auto p-8">
      <h1 className={` text-3xl text-gray-400 font-bold mb-4`}>
        Password Change
      </h1>

      <Formik
        initialValues={{ oldpwd: "", newpwd: "", Cpwd: "" }}
        validationSchema={pwdSchema}
        onSubmit={handleSubmit}
      >
        {({ errors, touched, isSubmitting }) => (
          <Form className="mt-4">
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="oldpwd"
              >
                Old Password:
              </label>
              <Field
                type="text"
                name="oldpwd"
                id="oldpwd"
                className={`appearance-none  rounded w-full py-2 px-3 text-white-900 font-bold bg-purple-600 leading-tight focus:outline-none focus:shadow-outline ${
                  errors.oldpwd && touched.oldpwd
                    ? " border border-red-500"
                    : ""
                }`}
                placeholder="Enter Old password"
              />
              <ErrorMessage
                name="oldpwd"
                component="div"
                className="text-red-500 text-sm mt-1"
              />
            </div>

            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="newpwd"
              >
                New Password:
              </label>
              <Field
                type="password"
                name="newpwd"
                id="newpwd"
                className={`appearance-none  rounded w-full py-2 px-3 text-white-900 font-bold leading-tight  bg-purple-600 focus:outline-none focus:shadow-outline ${
                  errors.newpwd && touched.newpwd ? "border border-red-500" : ""
                }`}
                placeholder="New Password"
              />
              <ErrorMessage
                name="newpwd"
                component="div"
                className="text-red-500 text-sm mt-1"
              />
            </div>

            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="Cpwd"
              >
                Confirm Password:
              </label>
              <Field
                type="password"
                name="Cpwd"
                id="Cpwd"
                className={`appearance-none  rounded w-full py-2 px-3 text-white-900 font-bold leading-tight bg-purple-600 focus:outline-none focus:shadow-outline ${
                  errors.Cpwd && touched.Cpwd ? "border border-red-500" : ""
                }`}
                placeholder="Enter Confirm Password"
              />
              <ErrorMessage
                name="Cpwd"
                component="div"
                className="text-red-500 text-sm mt-1"
              />
            </div>

            <button
              type="submit"
              className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Plz wait ......" : " Submit Event"}
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default ChangePwd;
