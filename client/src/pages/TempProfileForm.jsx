import React, { useEffect, useState } from "react";
import { AlertApi } from "../context/AlertContext";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import Loader from "../components/Loader";
import UploadImageToS3WithNativeSdk from "../components/upload/UploadS3";
import PhotoUploadComponent from "../components/upload/Profile";
import Referral from "../components/Referral";

const validationSchema = Yup.object({
  aadhaar: Yup.string().required("Aadhaar is required"),
  profession: Yup.string().required("Profession is required"),
  linkdln: Yup.string().url("Invalid LinkedIn URL"),
  facebook: Yup.string().url("Invalid Facebook URL"),
  twitter: Yup.string().url("Invalid Twitter URL"),
  about: Yup.string().required("Please tell us something about yourself"),
  startYear: Yup.number().nullable().required("Starting year is required"),
  endYear: Yup.number()
    .nullable()
    .required("Ending year is required")
    .test(
      "is-greater",
      "Ending year must be greater than or equal to starting year",
      function (value) {
        const { startYear } = this.parent;
        return value >= startYear;
      }
    ),
});

export default function TempProfileForm() {
  const initalvalues = {
    aadhaar: "",
    profession: "",
    state: "",
    district: "",
    linkdln: "",
    facebook: "",
    twitter: "",
    about: "",
    startYear: null,
    endYear: null,
  };

  const [RollNo, setRollNo] = useState("");
  const [proofExist, setproofExist] = useState(false);
  const [profileExist, setprofileExist] = useState(false);
  const [selectedState, setSelectedState] = useState("");
  const [selectedvalidation, setSelectedvalidation] = useState("");
  const [selectedDistrict, setSelectedDistrict] = useState("");
  const [Duplicate, setDuplicate] = useState(false);
  const [InstituteCollectionValuesTrade, setInstituteCollectionValuesTrade] =
    useState("");
  const [InstituteCollectionValuesName, setInstituteCollectionValuesName] =
    useState("");

  const [InstituteValueFind, setInstituteValueFind] = useState(false);

  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [Tempdata, setTempdata] = useState(null);

  const { id } = useParams();
  const { setAlert } = AlertApi();

  const toggleclose = () => {
    setIsOpen(false);
    navigate("/signup");
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const yearOptions = [];
  let year = 1947;
  const currentYear = new Date().getFullYear();

  for (year; year <= currentYear; year++) {
    yearOptions.push(year);
  }

  const states = [
    "Andhra Pradesh",
    "Arunachal Pradesh",
    "Assam",
    "Bihar",
    "Chhattisgarh",
    "Goa",
    "Gujarat",
    "Haryana",
    "Himachal Pradesh",
    "Jharkhand",
    "Karnataka",
    "Kerala",
    "Madhya Pradesh",
    "Maharashtra",
    "Manipur",
    "Meghalaya",
    "Mizoram",
    "Nagaland",
    "Odisha",
    "Punjab",
    "Rajasthan",
    "Sikkim",
    "Tamil Nadu",
    "Telangana",
    "Tripura",
    "Uttar Pradesh",
    "Uttarakhand",
    "West Bengal",
    "Andaman and Nicobar Islands",
    "Chandigarh",
    "Dadra and Nagar Haveli and Daman and Diu",
    "Delhi",
    "Lakshadweep",
    "Puducherry",
  ];

  const ValidationArr = [
    { value: "proof", label: "Id proof related to collage" },
    {
      value: "Referral",
      label: "Referral from Known batchmate already registered",
    },
    { value: "NotReferral", label: "Don't have any Referral" },
  ];

  const districtsByState = {
    "Andhra Pradesh": ["Visakhapatnam", "Guntur", "Krishna"],
    "Arunachal Pradesh": ["Itanagar", "Tawang", "Changlang"],
    Assam: ["Guwahati", "Dibrugarh", "Jorhat"],
    Bihar: ["Patna", "Gaya", "Muzaffarpur"],
    Chhattisgarh: ["Raipur", "Bilaspur", "Durg"],
    Goa: ["North Goa", "South Goa"],
    Gujarat: ["Ahmedabad", "Surat", "Vadodara"],
    Haryana: [
      "Ambala",
      "Bhiwani",
      "Faridabad",
      "Gurugram",
      "Jind",
      "Hisar",
      "Jhajjar",
      "Kaithal",
      "Karnal",
      "Kurukshetra",
      "Mahendragarh",
      "Nuh",
      "Palwal",
      "Panchkula",
      "Panipat",
      "Rewari",
      "Rohtak",
      "Sirsa",
      "Sonipat",
      "Yamunanagar",
    ],
    "Himachal Pradesh": ["Shimla", "Kullu", "Mandi"],
    Jharkhand: ["Ranchi", "Jamshedpur", "Dhanbad"],
    Karnataka: ["Bangalore", "Mysore", "Hubli"],
    Kerala: ["Thiruvananthapuram", "Kochi", "Kozhikode"],
    "Madhya Pradesh": ["Bhopal", "Indore", "Jabalpur"],
    Maharashtra: ["Mumbai", "Pune", "Nagpur"],
    Manipur: ["Imphal", "Bishnupur", "Thoubal"],
    Meghalaya: ["Shillong", "Tura", "Jowai"],
    Mizoram: ["Aizawl", "Lunglei", "Champhai"],
    Nagaland: ["Kohima", "Dimapur", "Mokokchung"],
    Odisha: ["Bhubaneswar", "Cuttack", "Rourkela"],
    Punjab: ["Ludhiana", "Amritsar", "Jalandhar"],
    Rajasthan: ["Jaipur", "Udaipur", "Jodhpur"],
    Sikkim: ["Gangtok", "Namchi", "Mangan"],
    "Tamil Nadu": ["Chennai", "Coimbatore", "Madurai"],
    Telangana: ["Hyderabad", "Warangal", "Nizamabad"],
    Tripura: ["Agartala", "Dharmanagar", "Udaipur"],
    "Uttar Pradesh": ["Lucknow", "Kanpur", "Agra", "Haripur"],
    Uttarakhand: ["Dehradun", "Haridwar", "Nainital"],
    "West Bengal": ["Kolkata", "Howrah", "Durgapur"],
    "Andaman and Nicobar Islands": ["Port Blair", "Havelock", "Diglipur"],
    Chandigarh: ["Chandigarh"],
    "Dadra and Nagar Haveli and Daman and Diu": ["Daman", "Diu", "Silvassa"],
    Delhi: ["New Delhi", "South Delhi", "North Delhi"],
    Lakshadweep: ["Kavaratti", "Agatti", "Amini"],
    Puducherry: ["Puducherry", "Karaikal", "Mahe"],
  };

  const handleSubmit = async (values, actions) => {
    // Handle form submission here
    // console.log("first");
    // console.log(values);

    if (!RollNo) {
      setAlert({ type: "error", message: "RollNo are required" });
      return;
    } else if (!InstituteCollectionValuesName) {
      setAlert({ type: "error", message: "Name are required" });
      return;
    } else if (!profileExist) {
      setAlert({ type: "error", message: "profile are required" });
      return;
    } else if (!InstituteCollectionValuesTrade) {
      setAlert({ type: "error", message: "Trade are required" });
      return;
    } else if (selectedvalidation === "proof" && !proofExist) {
      setAlert({ type: "error", message: "Proof are required" });
      return;
    }

    const {
      profession,
      linkdln,
      facebook,
      twitter,
      about,
      startYear,
      endYear,
    } = values;
    // console.log(values);

    // //console.log(values);
    actions.setSubmitting(true);

    const playload = {
      uuid: id,
      name: InstituteCollectionValuesName,
      Trade: InstituteCollectionValuesTrade,
      profession: profession,
      rollNo: RollNo,
      linkdln: linkdln,
      facebook: facebook,
      twitter: twitter,
      about: about,
      startYear: startYear,
      endYear: endYear,
      state: selectedState,
      district: selectedDistrict,
    };

    const url = `${process.env.REACT_APP_API_KEY}/tempuserinfo`;

    try {
      await axios.post(url, playload);

      actions.resetForm();

      setIsOpen(true);
      // Handle any further logic here if needed
    } catch (error) {
      console.error("Axios Error:", error);

      setAlert({ type: "error", message: "Somthing Went Wrong" });
    }

    actions.setSubmitting(false);
  };

  const fetchuser = async (paramId) => {
    let url = `${process.env.REACT_APP_API_KEY}/signup/${paramId}`;

    try {
      const res = await axios.post(url);
      setTempdata(res.data.data);
      setLoading(false);
    } catch (error) {
      navigate("/signup");
    }
  };

  const getInstituteCollection = async (rollNo) => {
    const url = `${process.env.REACT_APP_API_KEY}/admins/getInstituteCollection?rollNo=${rollNo}`;
    try {
      const { data } = await axios.get(url);

      if (data.code === 201) {
        setDuplicate(true);
        //console.log("exist");
        return;
      }

      setDuplicate(false);
      // //console.log(data.data);
      setInstituteCollectionValuesTrade(data.data?.branch);
      setInstituteCollectionValuesName(data.data?.name);
      setInstituteValueFind(true);
    } catch (error) {
      setDuplicate(false);
      setInstituteCollectionValuesTrade("");
      setInstituteCollectionValuesName("");
      setInstituteValueFind(false);
    }
  };

  useEffect(() => {
    fetchuser(id);
  }, []);

  useEffect(() => {
    getInstituteCollection(RollNo);
  }, [RollNo]);

  const handleStateChange = (value) => {
    setSelectedState(value);
    setSelectedDistrict(""); // Reset district when state changes
  };
  const handlevalidationChange = (value) => {
    setSelectedvalidation(value);
  };

  return (
    <>
      {/* Modal overlay */}
      <div
        className={`${
          isOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        } fixed w-full h-full top-0 left-0 flex items-center  z-50 justify-center bg-gray-800 bg-opacity-50`}
      >
        {/* Modal container */}
        <div className="bg-white rounded-lg w-1/2">
          <div className="px-4 py-2  text-center">
            <h2 className="text-lg font-bold mb-2">Thank You for Joining!</h2>
            <p className="text-gray-500">
              Your registration is being processed. Please wait for the
              institute's approval.
            </p>
          </div>
          <div className="px-4 py-2 flex justify-end">
            <button
              onClick={toggleclose}
              className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
            >
              Close
            </button>
          </div>
        </div>
      </div>

      <Navbar />

      {loading ? (
        <Loader />
      ) : (
        <div className="w-full md:w-1/2 mx-auto m-10 flex flex-col items-center bg-white rounded p-4 shadow">
          <h2 className="text-2xl font-bold mb-5">Alumni profile </h2>
          <Formik
            initialValues={initalvalues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {({ isSubmitting, setFieldValue }) => (
              <Form className="bg-gray-100 shadow-md rounded px-8 pt-6 pb-8  mb-4 w-full mx-auto">
                <div className="mb-6">
                  <label
                    htmlFor="rollNo"
                    className="block text-gray-700 font-bold mb-2"
                  >
                    Roll No{" "}
                    <span className="text-red-400 font-bold text-2xl">*</span>
                  </label>
                  <input
                    type="text"
                    id="rollNo"
                    name="rollNo"
                    onChange={(e) => {
                      setTimeout(() => {
                        setRollNo(e.target.value);
                      }, 500);
                    }}
                    className={`${
                      Duplicate ? "bg-red-200" : "bg-white"
                    } w-full border rounded px-3 py-2  text-green-700  border-green-400 ring-green-300 focus:outline-none ring ring-opacity-40`}
                    placeholder="123456"
                  />
                  {Duplicate ? (
                    <p className="text-red-500 mt-2">
                      This RollNo Already Used{" "}
                    </p>
                  ) : (
                    ""
                  )}
                </div>
                <div className="mb-6">
                  <label
                    htmlFor="email"
                    className="block text-gray-700 font-bold mb-2 "
                  >
                    Email{" "}
                    <span className="text-red-400 font-bold text-2xl">*</span>
                  </label>
                  <Field
                    type="email"
                    id="email"
                    name="email"
                    value={Tempdata.email}
                    className="appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline  text-green-700 bg-green-100  border-green-400 ring-green-300  ring ring-opacity-40"
                    readOnly
                  />
                </div>

                <div className="mb-5">
                  <label
                    htmlFor="name"
                    className="block text-gray-700 font-bold mb-2"
                  >
                    Name{" "}
                    <span className="text-red-400 font-bold text-2xl">*</span>
                  </label>
                  <input
                    type="text"
                    id="name"
                    value={InstituteCollectionValuesName}
                    onChange={
                      InstituteValueFind
                        ? () => {}
                        : (e) => {
                            setInstituteCollectionValuesName(e.target.value);
                          }
                    }
                    placeholder="Name.."
                    name="name"
                    className={`${
                      InstituteValueFind ? "bg-green-100" : "bg-white"
                    } w-full border rounded px-3 py-2  text-green-700  border-green-400 ring-green-300 focus:outline-none ring ring-opacity-40`}
                  />
                </div>
                <div className="mb-6">
                  <label
                    htmlFor="aadhaar"
                    className="block text-gray-700 font-bold mb-2"
                  >
                    Aadhaar{" "}
                    <span className="text-red-400 font-bold text-2xl">*</span>
                  </label>
                  <Field
                    type="text"
                    id="aadhaar"
                    name="aadhaar"
                    className="appearance-none border rounded w-full py-2 px-3  text-green-700 bg-white  focus:border-green-400 focus:ring-green-300  focus:ring focus:ring-opacity-40 leading-tight focus:outline-none focus:shadow-outline"
                    placeholder="Aadhaar card No."
                  />
                  <ErrorMessage
                    name="aadhaar"
                    component="div"
                    className="text-red-500"
                  />
                </div>

                <PhotoUploadComponent
                  setFieldValue={setFieldValue}
                  data={Tempdata}
                  setprofileExist={setprofileExist}
                />

                <div className="mb-6">
                  <label
                    htmlFor="Trade"
                    className="block text-gray-700 font-bold mb-2"
                  >
                    Trade{" "}
                    <span className="text-red-400 font-bold text-2xl">*</span>
                  </label>
                  <input
                    type="text"
                    id="Trade"
                    name="trade"
                    onChange={
                      InstituteValueFind
                        ? () => {}
                        : (e) => {
                            setInstituteCollectionValuesTrade(e.target.value);
                          }
                    }
                    value={InstituteCollectionValuesTrade}
                    className={`${
                      InstituteValueFind ? "bg-green-100" : "bg-white"
                    } w-full border rounded px-3 py-2  text-green-700  border-green-400 ring-green-300 focus:outline-none ring ring-opacity-40`}
                    placeholder="Computer Engg"
                  />
                </div>
                <div className="mb-6">
                  <label
                    htmlFor="batch"
                    className="block text-gray-700 font-bold mb-2"
                  >
                    Batch{" "}
                    <span className="text-red-400 font-bold text-2xl">*</span>
                  </label>
                  <div className="flex">
                    <Field
                      as="select"
                      name="startYear"
                      className="w-1/2 appearance-none border rounded py-2 px-3 leading-tight focus:outline-none focus:shadow-outline text-green-700 bg-white focus:border-green-400 focus:ring-green-300 focus:ring focus:ring-opacity-40"
                    >
                      <option value="">****</option>
                      {yearOptions?.map((year) => (
                        <option key={year} value={year}>
                          {year}
                        </option>
                      ))}
                    </Field>
                    <span className="px-2">to</span>
                    <Field
                      as="select"
                      name="endYear"
                      className="w-1/2 appearance-none border rounded py-2 px-3 leading-tight focus:outline-none focus:shadow-outline text-green-700 bg-white focus:border-green-400 focus:ring-green-300 focus:ring focus:ring-opacity-40"
                    >
                      <option value="">****</option>
                      {yearOptions?.map((year) => (
                        <option key={year} value={year}>
                          {year}
                        </option>
                      ))}
                    </Field>
                  </div>
                  <ErrorMessage
                    name="startYear"
                    component="div"
                    className="text-red-500"
                  />
                  <ErrorMessage
                    name="endYear"
                    component="div"
                    className="text-red-500"
                  />
                </div>

                <div className="mb-6">
                  <label
                    htmlFor="state"
                    className="block text-gray-700 font-bold mb-2"
                  >
                    State{" "}
                    <span className="text-red-400 font-bold text-2xl">*</span>
                  </label>
                  <select
                    name="state"
                    value={selectedState}
                    onChange={(e) => handleStateChange(e.target.value)}
                    className="w-full appearance-none border rounded py-2 px-3 leading-tight focus:outline-none focus:shadow-outline text-green-700 bg-white focus:border-green-400 focus:ring-green-300 focus:ring focus:ring-opacity-40"
                  >
                    <option value="">Select State</option>
                    {states.map((state) => (
                      <option key={state} value={state}>
                        {state}
                      </option>
                    ))}
                  </select>
                </div>

                {/* District Section */}
                <div className="mb-6">
                  <label
                    htmlFor="district"
                    className="block text-gray-700 font-bold mb-2"
                  >
                    District{" "}
                    <span className="text-red-400 font-bold text-2xl">*</span>
                  </label>
                  <select
                    name="district"
                    value={selectedDistrict}
                    onChange={(e) => setSelectedDistrict(e.target.value)}
                    className="w-full appearance-none border rounded py-2 px-3 leading-tight focus:outline-none focus:shadow-outline text-green-700 bg-white focus:border-green-400 focus:ring-green-300 focus:ring focus:ring-opacity-40"
                  >
                    <option value="">Select District</option>
                    {selectedState &&
                      districtsByState[selectedState].map((district) => (
                        <option key={district} value={district}>
                          {district}
                        </option>
                      ))}
                  </select>
                </div>
                <div className="mb-6">
                  <label
                    htmlFor="profession"
                    className="block text-gray-700 font-bold mb-2"
                  >
                    Profession{" "}
                    <span className="text-red-400 font-bold text-2xl">*</span>
                  </label>
                  <Field
                    type="text"
                    id="profession"
                    name="profession"
                    className="appearance-none border rounded w-full py-2 px-3  text-green-700 bg-white  focus:border-green-400 focus:ring-green-300  focus:ring focus:ring-opacity-40 leading-tight focus:outline-none focus:shadow-outline"
                    placeholder="Web Developer"
                  />
                  <ErrorMessage
                    name="profession"
                    component="div"
                    className="text-red-500"
                  />
                </div>
                <div className="mb-5">
                  <label
                    htmlFor="linkdln"
                    className="block text-gray-700 font-bold mb-2"
                  >
                    LinkedIn
                  </label>
                  <Field
                    type="text"
                    id="linkdln"
                    name="linkdln"
                    className=" appearance-none w-full border rounded px-3 py-2  text-green-700 bg-white  focus:border-green-400 focus:ring-green-300  focus:ring focus:ring-opacity-40 leading-tight focus:outline-none focus:shadow-outline"
                    placeholder="Enter your LinkedIn profile URL"
                  />
                  <ErrorMessage
                    name="linkdln"
                    component="div"
                    className="text-red-500"
                  />
                </div>
                <div className="mb-5">
                  <label
                    htmlFor="facebook"
                    className="block text-gray-700 font-bold mb-2"
                  >
                    Facebook
                  </label>
                  <Field
                    type="text"
                    id="facebook"
                    name="facebook"
                    className="w-full  appearance-none leading-tight focus:outline-none focus:shadow-outline border rounded px-3 py-2  text-green-700 bg-white  focus:border-green-400 focus:ring-green-300  focus:ring focus:ring-opacity-40"
                    placeholder="Enter your Facebook profile URL"
                  />
                  <ErrorMessage
                    name="facebook"
                    component="div"
                    className="text-red-500"
                  />
                </div>
                <div className="mb-5">
                  <label
                    htmlFor="twitter"
                    className="block text-gray-700 font-bold mb-2"
                  >
                    Twitter
                  </label>
                  <Field
                    type="text"
                    id="twitter"
                    name="twitter"
                    className="w-full appearance-none border leading-tight focus:outline-none focus:shadow-outline rounded px-3 py-2  text-green-700 bg-white  focus:border-green-400 focus:ring-green-300  focus:ring focus:ring-opacity-40"
                    placeholder="Enter your Twitter profile URL"
                  />
                  <ErrorMessage
                    name="twitter"
                    component="div"
                    className="text-red-500"
                  />
                </div>

                <div className="mb-5">
                  <label
                    htmlFor="about"
                    className="block text-gray-700 font-bold mb-2"
                  >
                    Tell us something interesting about yourself{" "}
                    <span className="text-red-400 font-bold text-2xl">*</span>
                  </label>
                  <Field
                    as="textarea"
                    id="about"
                    name="about"
                    className="w-full appearance-none leading-tight focus:outline-none focus:shadow-outline border rounded px-3 py-2  text-green-700 bg-white  focus:border-green-400 focus:ring-green-300  focus:ring focus:ring-opacity-40"
                    placeholder="Write something unique about yourself"
                    rows="5"
                  />
                  <ErrorMessage
                    name="about"
                    component="div"
                    className="text-red-500"
                  />
                </div>

                <div className="mb-6">
                  <label
                    htmlFor="validation"
                    className="block text-gray-700 font-bold mb-2"
                  >
                    Validation{" "}
                    <span className="text-red-400 font-bold text-2xl">*</span>
                  </label>
                  <select
                    name="validation"
                    value={selectedvalidation}
                    onChange={(e) => handlevalidationChange(e.target.value)}
                    className="w-full appearance-none border rounded py-2 px-3 leading-tight focus:outline-none focus:shadow-outline text-green-700 bg-white focus:border-green-400 focus:ring-green-300 focus:ring focus:ring-opacity-40"
                  >
                    <option value="">Select Validation</option>
                    {ValidationArr.map((valid) => (
                      <option key={valid.value} value={valid.value}>
                        {valid.label}
                      </option>
                    ))}
                  </select>
                </div>
                {/* proof */}
                {selectedvalidation === "proof" ? (
                  <UploadImageToS3WithNativeSdk
                    title="Proof"
                    setFieldValue={setFieldValue}
                    filed={"proof"}
                    data={Tempdata}
                    setproofExist={setproofExist}
                  />
                ) : (
                  ""
                )}

                {selectedvalidation === "Referral" ? <Referral /> : ""}

                <button
                  type="submit"
                  className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
                  disabled={isSubmitting || Duplicate}
                >
                  {isSubmitting ? "Plz wait ........" : "Submit"}
                </button>
              </Form>
            )}
          </Formik>
        </div>
      )}
    </>
  );
}
