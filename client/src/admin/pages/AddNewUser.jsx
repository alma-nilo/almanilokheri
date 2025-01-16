// import { EditOutlined, DeleteOutlined } from "@mui/icons-material";
import React, { useState } from "react";
// import * as Yup from "yup";
import Header from "../components/Header";
import axios from "axios";
import { AuthApi } from "../../context/user";
import { AlertApi } from "../../context/AlertContext";
import Dropzone from "react-dropzone";
import FlexBetween from "../../components/FlexBetween";
// import { FlexBetween, IconButton } from "@mui/material";
const AddNewUsers = () => {
  const [fileContent, setFileContent] = useState("");
  const [isSubmitting, setSubmitting] = useState(false);
  // context
  const { setAlert } = AlertApi();

  const { admin } = AuthApi();

  const handleFileChange = (e) => {
    const file = e.target.files[0];

    if (file && file.type === "application/json") {
      const reader = new FileReader();
      reader.onload = (event) => {
        try {
          const jsonContent = JSON.parse(event.target.result);
          setFileContent(jsonContent);
        } catch (error) {
          alert("Invalid JSON file.");
        }
      };
      reader.readAsText(file);
    } else {
      alert("Please upload a valid JSON file.");
    }
  };

  const handleSubmit = async () => {
    console.log("first");
    const url = `${process.env.REACT_APP_API_KEY}/admins/add-new`;

    try {
      const response = await axios.post(url, fileContent, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${admin.token}`,
        },
      });

      console.log(response);
      if (response.status === 203) {
        setAlert({
          type: "error",
          message: response.data.msg,
        });
        return;
      }

      if (response.status === 200) {
        setAlert({
          type: "error",
          message: response.data.message,
        });
        return;
      }
      setAlert({ type: "success", message: response.data.message });
      // Handle any further logic here if needed
    } catch (error) {
      console.error("Axios Error:", error);
      setAlert({ type: "error", message: "Something Went Wrong" });
    }
  };

  return (
    <div className="p-8 rounded-lg">
      <Header title="Users Add Record" subtitle="Upload Users Data Json file" />

      <Dropzone
        acceptedFiles=".json"
        onDrop={(acceptedFiles) => handleFileChange(acceptedFiles)}
      >
        {({ getRootProps, getInputProps }) => (
          <FlexBetween {...getRootProps}>
            <div className="h-40 w-3/4 mx-auto bg-green-400 *:">
              <input
                type="file"
                accept=".json"
                className="w-full h-20 border-dashed border-4 border-yellow-500 bg-transparent px-4 py-2"
                {...getInputProps}
              />
            </div>
          </FlexBetween>
        )}
      </Dropzone>
      <div
        onClick={handleSubmit}
        className="mt-20 p-4 cursor-pointer bg-green-500 border-2 border-yellow-500  "
      >
        <button className="text-lg">Submit</button>
      </div>
    </div>
  );
};

export default AddNewUsers;
