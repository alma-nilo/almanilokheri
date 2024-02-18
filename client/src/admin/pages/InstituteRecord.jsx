import React from "react";
import { Formik, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import Header from "../components/Header";
import axios from "axios";
import { AuthApi } from "../../context/user";
import { AlertApi } from "../../context/AlertContext";

const InstituteRecord = () => {
  const initialValues = {
    xlsxFile: null,
  };

  const validationSchema = Yup.object({
    xlsxFile: Yup.mixed().required("xlsxFile is required"),
  });
  // context
  const { setAlert } = AlertApi();

  const { admin } = AuthApi();

  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    // Prevent the default form submission

    if (
      values.xlsxFile.type !==
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
    ) {
      setAlert({ type: "warning", message: "Only XLXS File Required !" });
      return;
    }
    setSubmitting(true);
    const formData = new FormData();
    formData.append("institute", values.xlsxFile);

    const url = `${process.env.REACT_APP_API_KEY}/admins/insertInstituteCollection`;

    try {
      const response = await axios.post(url, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${admin.token}`,
        },
      });

      //console.log(response);
      if (response.status === 203) {
        setAlert({
          type: "error",
          message: response.data.msg,
        });
        // resetForm();
        return;
      }

      if (response.status === 200) {
        setAlert({
          type: "error",
          message: response.data.msg,
        });
        // resetForm();
        return;
      }

      setAlert({ type: "success", message: "Data Insert Success" });

      // Handle any further logic here if needed
    } catch (error) {
      console.error("Axios Error:", error);

      setAlert({ type: "error", message: "Somthing Went Wrong" });
    }
    // resetForm();
    setSubmitting(false);
  };

  return (
    <div className="p-8 rounded-lg">
      <Header title="Institute Record" subtitle="Upload Institute Recorde" />

      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting, setFieldValue }) => (
          <Form className="space-y-6">
            <div>
              <label htmlFor="xlsxFile" className="block text-white mb-2">
                Upload xlsx file only :
              </label>
              <input
                type="file"
                id="xlsxFile"
                name="xlsxFile"
                className="w-full px-4 py-2 rounded-lg bg-purple-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-600"
                onChange={(event) => {
                  setFieldValue("xlsxFile", event.currentTarget.files[0]);
                }}
              />
              <ErrorMessage
                name="xlsxFile"
                component="div"
                className="text-red-500 mt-2"
              />
            </div>

            <button
              type="submit"
              className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-2 rounded-lg"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Plz wait ..." : "Upload"}
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default InstituteRecord;
