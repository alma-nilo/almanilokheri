import React from "react";
import { Formik, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import Header from "../components/Header";
import axios from "axios";
import { AuthApi } from "../../context/user";
import { AlertApi } from "../../context/AlertContext";

const AddNewUsers = () => {
  const initialValues = {
    jsonFile: null,
  };

  const validationSchema = Yup.object({
    jsonFile: Yup.mixed().required("jsonFile is required"),
  });
  // context
  const { setAlert } = AlertApi();
  const { admin } = AuthApi();

  const handleSubmit = async (values, { setSubmitting }) => {
    // Prevent the default form submission
    if (
      values.jsonFile.type !== "application/json"
      // "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
    ) {
      setAlert({ type: "warning", message: "Only JSON File Required !" });
      return;
    }
    setSubmitting(true);
    const formData = new FormData();
    formData.append("users", values.jsonFile);

    const url = `${process.env.REACT_APP_API_KEY}/admins/add-new`;

    try {
      const response = await axios.post(url, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${admin.token}`,
        },
      });
      console.log({ response });

      if (response.status !== 200) {
        setAlert({
          type: "error",
          message: response.data.message,
        });
        // resetForm();
        return;
      }

      if (response.status !== 200) {
        setAlert({
          type: "error",
          message: response.data.message,
        });
        // resetForm();
        return;
      }

      setAlert({ type: "success", message: "Data Insert Success" });

      // Handle any further logic here if needed
    } catch (error) {
      console.error("Axios Error:", error);
      setAlert({ type: "error", message: "Something Went Wrong" });
    }
    // resetForm();
    setSubmitting(false);
  };

  return (
    <div className="p-8 rounded-lg">
      <Header
        title="New Users Record"
        subtitle="Upload  Users in json file only. Fields  required ->{ email name rollNo Trade  mobile profile status startYear endYear}  "
      />

      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting, setFieldValue }) => (
          <Form className="space-y-6">
            <div>
              <label htmlFor="jsonFile" className="block text-white mb-2">
                Upload json file only :
              </label>
              <input
                type="file"
                id="jsonFile"
                name="jsonFile"
                className="w-full px-4 py-2 rounded-lg bg-purple-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-600"
                onChange={(event) => {
                  setFieldValue("jsonFile", event.currentTarget.files[0]);
                }}
              />
              <ErrorMessage
                name="jsonFile"
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

export default AddNewUsers;
///!------------------------------------------------------------------------------------------------------------------------------------
// const [fileContent, setFileContent] = useState(null);

// // Read JSON file content
// const handleFileChange = (e) => {
//   const file = e.target.files[0];
//   const reader = new FileReader();

//   reader.onload = (event) => {
//     try {
//       const json = JSON.parse(event.target.result);
//       setFileContent(json);
//       console.log("Parsed JSON:", json);
//     } catch (error) {
//       alert("Invalid JSON file.");
//     }
//   };

//   if (file) {
//     reader.readAsText(file);
//   }
// };
