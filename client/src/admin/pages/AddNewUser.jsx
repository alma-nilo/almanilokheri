import React, { useState } from "react";
import Header from "../components/Header";
import axios from "axios";
import { AuthApi } from "../../context/user";
import { AlertApi } from "../../context/AlertContext";

const AddNewUsers = () => {
  const [filesData, setFilesData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState([]);
  const { setAlert } = AlertApi();
  const { admin } = AuthApi();

  // const handleFileChange = (e) => {
  //   console.log("first");
  //   const files = Array.from(e.target.files); // Convert FileList to an array
  //   console.log({ files });
  //   // Reset states
  //   setFilesData([]);
  //   setErrors([]);
  //   setIsLoading(true);

  //   const validFiles = files.filter((file) => file.type === "application/json");
  //   const invalidFiles = files.filter(
  //     (file) => file.type !== "application/json"
  //   );

  //   if (invalidFiles.length > 0) {
  //     setErrors((prev) => [
  //       ...prev,
  //       ...invalidFiles.map((file) => `${file.name} is not a JSON file.`),
  //     ]);
  //   }

  //   const readFilePromises = validFiles.map(
  //     (file) =>
  //       new Promise((resolve, reject) => {
  //         const reader = new FileReader();
  //         reader.onload = (event) => {
  //           try {
  //             const json = JSON.parse(event.target.result);
  //             resolve({ name: file.name, content: json });
  //           } catch (error) {
  //             reject(`${file.name} contains invalid JSON.`);
  //           }
  //         };
  //         reader.onerror = () => reject(`${file.name} could not be read.`);
  //         reader.readAsText(file);
  //       })
  //   );

  //   Promise.allSettled(readFilePromises)
  //     .then((results) => {
  //       const successful = results
  //         .filter((result) => result.status === "fulfilled")
  //         .map((result) => result.value);
  //       const failed = results
  //         .filter((result) => result.status === "rejected")
  //         .map((result) => result.reason);

  //       setFilesData(successful);
  //       setErrors((prev) => [...prev, ...failed]);
  //     })
  //     .finally(() => {
  //       console.log({ filesData });
  //       console.log({ errors });
  //       setIsLoading(false);
  //     });
  // };

  const handleFileChange = (e) => {
    console.log("Starting file processing...");
    const files = Array.from(e.target.files); // Convert FileList to an array
    setFilesData([]);
    setErrors([]);
    setIsLoading(true);

    const validFiles = files.filter((file) => file.type === "application/json");
    const invalidFiles = files.filter(
      (file) => file.type !== "application/json"
    );

    if (invalidFiles.length > 0) {
      setErrors((prev) => [
        ...prev,
        ...invalidFiles.map((file) => `${file.name} is not a JSON file.`),
      ]);
    }

    const readFilePromises = validFiles.map(
      (file) =>
        new Promise((resolve, reject) => {
          const reader = new FileReader();
          reader.onload = (event) => {
            try {
              const json = JSON.parse(event.target.result);
              resolve(json);
              // resolve({ name: file.name, content: json });
            } catch (error) {
              reject(`${file.name} contains invalid JSON.`);
            }
          };
          reader.onerror = () => reject(`${file.name} could not be read.`);
          reader.readAsText(file);
        })
    );

    Promise.allSettled(readFilePromises)
      .then((results) => {
        // console.log("Promise results:", results);
        const successful = results
          .filter((result) => result.status === "fulfilled")
          .map((result) => result.value);
        const failed = results
          .filter((result) => result.status === "rejected")
          .map((result) => result.reason);

        setFilesData(successful);
        // console.log(successful);
        setErrors((prev) => [...prev, ...failed]);
      })
      .finally(() => {
        console.log("Processing complete.");
        setIsLoading(false);
      });
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    const url = `${process.env.REACT_APP_API_KEY}/admins/add-new`;
    // console.log({ data: filesData.flat(Infinity) });
    const data = filesData.flat(Infinity);

    try {
      const response = await axios.post(
        url,
        {
          users: data,
        },
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${admin.token}`,
          },
        }
      );
      console.log({ res: response.data });

      if (response.status !== 200) {
        setAlert({
          type: "error",
          message: response.data.message,
        });
        // resetForm();
        return;
      }
      if (response.data.skippedUser.length) {
        setAlert({
          type: "error",
          message: `${response.data.skippedUser.length} Users are skipped by server due to some error in data format provided `,
        });
      }
      setAlert({ type: "success", message: "Data Insert Success" });
      // Handle any further logic here if needed
    } catch (error) {
      console.error("Axios Error:", error);
      setAlert({ type: "error", message: "Something Went Wrong" });
    } finally {
      setIsSubmitting(false);
      setFilesData([]);
      setErrors([]);
      setIsLoading(false);
    }
    // resetForm();
  };

  return (
    <div className="p-8 rounded-lg">
      <Header
        title="New Users Record"
        subtitle="Upload  Users in json file only. Fields  required ->{ email name rollNo Trade  mobile profile status startYear endYear}  "
      />
      <div className="space-y-6">
        <div>
          <label htmlFor="jsonFile" className="block text-white mb-2">
            Upload json file only :
          </label>
          <input
            multiple
            type="file"
            id="jsonFile"
            name="jsonFile"
            className="w-full px-4 py-2 rounded-lg bg-purple-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-600"
            onChange={handleFileChange}
          />
          {/* {isLoading &&
                setAlert({ type: "success", message: "Data is Loading ...." })} */}
        </div>

        <button
          type="submit"
          className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-2 rounded-lg"
          disabled={isLoading || isSubmitting || filesData.length === 0}
          onClick={handleSubmit}
        >
          {isSubmitting
            ? "Please wait data is Submitting"
            : isLoading
            ? "Please wait data is loading"
            : "submit"}
        </button>
      </div>
    </div>
  );
};

export default AddNewUsers;
