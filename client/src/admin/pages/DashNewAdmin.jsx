import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
// import { AlertApi } from "../../context/alert";
// import { AuthApi } from "../../context/user";
import axios from "axios";

const CreateAdminForm = () => {
  let initialValues = {
    name: "",
    email: "",
    password: "",
  };

  const validationSchema = Yup.object({
    name: Yup.string().required("Required"),
    email: Yup.string().email("Invalid email").required("Required"),
    password: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .required("Required"),
  });

  // const { setAlert } = AlertApi();
  // const { user } = AuthApi();

  const onSubmit = async (values, { setSubmitting, resetForm }) => {
    // You can handle form submission here.

    setSubmitting(true);

    // const config = {
    //   headers: {
    //     authorization: user.token,
    //   },
    // };

    // let url = `${process.env.REACT_APP_API_KEY}/admins/newadmin`;
    // try {
    //   const { data } = await axios.post(url, values, config);
    //   setAlert({ type: "success", message: "New Admin Created" });
    //   setSubmitting(false);
    //   resetForm();
    // } catch (error) {
    //   //console.log(error);
    //   setAlert({ type: "error", message: "Somthing went wrong " });
    //   setSubmitting(false);
    // }
  };

  return (
    <div className=" min-h-screen flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-lg w-96">
        <h2 className="text-3xl font-bold mb-6 text-center text-purple-800">
          Create New Admin
        </h2>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={onSubmit}
        >
          {({ isSubmitting }) => (
            <Form>
              <div className="mb-4">
                <label
                  htmlFor="name"
                  className="block text-gray-800 font-semibold mb-2"
                >
                  Name
                </label>
                <Field
                  type="text"
                  name="name"
                  id="name"
                  className="w-full px-4 py-2 bg-purple-100 text-gray-800 border rounded-lg focus:outline-none focus:border-purple-500"
                />
                <ErrorMessage
                  name="name"
                  component="p"
                  className="text-red-600"
                />
              </div>

              <div className="mb-4">
                <label
                  htmlFor="email"
                  className="block text-gray-800 font-semibold mb-2"
                >
                  Email
                </label>
                <Field
                  type="email"
                  name="email"
                  id="email"
                  className="w-full px-4 py-2 bg-purple-100 text-gray-800 border rounded-lg focus:outline-none focus:border-purple-500"
                />
                <ErrorMessage
                  name="email"
                  component="p"
                  className="text-red-600"
                />
              </div>

              <div className="mb-4">
                <label
                  htmlFor="password"
                  className="block text-gray-800 font-semibold mb-2"
                >
                  Password
                </label>
                <Field
                  type="password"
                  name="password"
                  id="password"
                  className="w-full px-4 py-2 bg-purple-100 text-gray-800 border rounded-lg focus:outline-none focus:border-purple-500"
                />
                <ErrorMessage
                  name="password"
                  component="p"
                  className="text-red-600"
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="bg-purple-500 hover:bg-purple-600 text-white font-semibold px-4 py-2 rounded-lg focus:outline-none w-full"
              >
                {isSubmitting ? "Submitting..." : "Create Admin"}
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default CreateAdminForm;
