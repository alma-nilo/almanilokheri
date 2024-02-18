import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { AlertApi } from "../../context/AlertContext";
import { AuthApi } from "../../context/user";

const NewsSchema = Yup.object().shape({
  title: Yup.string().required("Title is required"),
  date: Yup.date().required("Date is required"),
  eventText: Yup.string().required("Event text is required"),
});

const EventsUploadFrom = ({ fetchEvent }) => {
  const { setAlert } = AlertApi();

  const { admin } = AuthApi();
  const handleSubmit = async (values, { resetForm }) => {
    // Handle the form submission here
    const { title, date, eventText } = values;

    const url = `${process.env.REACT_APP_API_KEY}/admins/event`;

    const playload = {
      title: title,
      date: date,
      description: eventText,
    };

    const config = {
      headers: {
        Authorization: `Bearer ${admin.token}`,
      },
    };
    try {
      await axios.post(url, playload, config);
      setAlert({ type: "success", message: "success" });
      fetchEvent();
      resetForm();
    } catch (error) {
      setAlert({ type: "error", message: "Somthing went wrong" });
    }
  };
  return (
    <Formik
      initialValues={{ title: "", date: "", eventText: "" }}
      validationSchema={NewsSchema}
      onSubmit={handleSubmit}
    >
      {({ errors, touched, isSubmitting }) => (
        <Form className="mt-4">
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="title"
            >
              Event Title:
            </label>
            <Field
              type="text"
              name="title"
              id="title"
              className={`appearance-none  rounded w-full py-2 px-3 text-white-900 font-bold bg-purple-600 leading-tight focus:outline-none focus:shadow-outline ${
                errors.title && touched.title ? " border border-red-500" : ""
              }`}
              placeholder="Enter Event title"
            />
            <ErrorMessage
              name="title"
              component="div"
              className="text-red-500 text-sm mt-1"
            />
          </div>

          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="date"
            >
              Date:
            </label>
            <Field
              type="date"
              name="date"
              id="date"
              className={`appearance-none  rounded w-full py-2 px-3 text-white-900 font-bold leading-tight  bg-purple-600 focus:outline-none focus:shadow-outline ${
                errors.date && touched.date ? "border border-red-500" : ""
              }`}
              placeholder="Select news date"
            />
            <ErrorMessage
              name="date"
              component="div"
              className="text-red-500 text-sm mt-1"
            />
          </div>

          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="eventText"
            >
              News Text:
            </label>
            <Field
              as="textarea"
              name="eventText"
              id="eventText"
              rows="4"
              className={`appearance-none  rounded w-full py-2 px-3 text-white-900 font-bold leading-tight bg-purple-600 focus:outline-none focus:shadow-outline ${
                errors.eventText && touched.eventText
                  ? "border border-red-500"
                  : ""
              }`}
              placeholder="Enter Event text"
            />
            <ErrorMessage
              name="eventText"
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
  );
};

export default EventsUploadFrom;
