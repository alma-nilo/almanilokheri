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
import { AuthApi } from "../context/user";
import Cookies from "js-cookie";
import { Close } from "@mui/icons-material";

const validationSchema = Yup.object({
  profession: Yup.string().required("Profession is required"),
  linkdln: Yup.string().url("Invalid LinkedIn URL"),
  facebook: Yup.string().url("Invalid Facebook URL"),
  twitter: Yup.string().url("Invalid Twitter URL"),
  about: Yup.string().required("Please tell us something about yourself"),
  trade: Yup.string().required("Trade is required"),
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

const Modal = ({ isOpen, onClose, onAgree }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div
        className="absolute inset-0 bg-gray-800 opacity-75"
        onClick={onClose}
      ></div>
      <div className="z-50 relative flex flex-col item-start bg-white p-8 rounded-lg max-w-md modal-content">
        <h2 className="text-2xl font-bold mb-4">Terms and Conditions</h2>
        <h2 className="text-xl font-semibold mb-2 text-gray-700 text-left">
          # Introduction
        </h2>
        <p className="text-sm text-gray-600 leading-relaxed text-left">
          Welcome to Guru BrahmaNand Ji Govt. Polytechnic Alumni Platform! These
          terms and conditions outline the rules and regulations for the use of
          our platform. By accessing this platform, we assume you accept these
          terms and conditions. Do not continue to use Guru BrahmaNand Ji Govt.
          Polytechnic Alumni Platform if you do not agree to all of the terms
          and conditions stated on this page. The following terminology applies
          to these Terms and Conditions, Privacy Statement and Disclaimer Notice
          and all Agreements: "Client", "You" and "Your" refers to you, the
          person accessing this platform and accepting the Company’s terms and
          conditions. "The Company", "Ourselves", "We", "Our" and "Us", refers
          to our Company. "Party", "Parties", or "Us", refers to both the Client
          and ourselves. All terms refer to the offer, acceptance and
          consideration of payment necessary to undertake the process of our
          assistance to the Client in the most appropriate manner, whether by
          formal meetings of a fixed duration, or any other means, for the
          express purpose of meeting the Client’s needs in respect of provision
          of the Company’s stated services/products, in accordance with and
          subject to, prevailing law of India. Any use of the above terminology
          or other words in the singular, plural, capitalisation and/or he/she
          or they, are taken as interchangeable and therefore as referring to
          same.
        </p>
        <h2 className="text-xl font-semibold mb-2 text-gray-700 text-left">
          # Suspicious Activity
        </h2>
        <p className="text-sm text-gray-600 leading-relaxed text-left">
          If we find any suspicious activity, we reserve the right to remove you
          and your post from Guru BrahmaNand Ji Govt. Polytechnic Alumni
          Platform without notice.
        </p>
        <h2 className="text-xl font-semibold mb-2 text-gray-700 text-left">
          # Cookies
        </h2>
        <p className="text-sm text-gray-600 leading-relaxed text-left">
          We employ the use of cookies. By accessing Guru BrahmaNand Ji Govt.
          Polytechnic Alumni Platform, you agreed to use cookies in agreement
          with the Guru BrahmaNand Ji Govt. Polytechnic's Privacy Policy.
        </p>
        <h2 className="text-xl font-semibold mb-2 text-gray-700 text-left">
          # License
        </h2>
        <p className="text-sm text-gray-600 leading-relaxed text-left">
          Unless otherwise stated, Guru BrahmaNand Ji Govt. Polytechnic and/or
          its licensors own the intellectual property rights for all material on
          Guru BrahmaNand Ji Govt. Polytechnic Alumni Platform. All intellectual
          property rights are reserved. You may access this from Guru BrahmaNand
          Ji Govt. Polytechnic Alumni Platform for your own personal use
          subjected to restrictions set in these terms and conditions.
        </p>
        <h2 className="text-xl font-semibold mb-2 text-gray-700 text-left">
          # Restrictions
        </h2>
        <p className="text-sm text-gray-600 leading-relaxed text-left">
          You are specifically restricted from all of the following: publishing
          any Guru BrahmaNand Ji Govt. Polytechnic Alumni Platform material in
          any other media; selling, sublicensing and/or otherwise
          commercializing any Guru BrahmaNand Ji Govt. Polytechnic Alumni
          Platform material; publicly performing and/or showing any Guru
          BrahmaNand Ji Govt. Polytechnic Alumni Platform material; using Guru
          BrahmaNand Ji Govt. Polytechnic Alumni Platform in any way that is or
          may be damaging to this platform; using Guru BrahmaNand Ji Govt.
          Polytechnic Alumni Platform in any way that impacts user access to
          this platform; using Guru BrahmaNand Ji Govt. Polytechnic Alumni
          Platform contrary to applicable laws and regulations, or in any way
          may cause harm to the platform, or to any person or business entity;
          engaging in any data mining, data harvesting, data extracting or any
          other similar activity in relation to Guru BrahmaNand Ji Govt.
          Polytechnic Alumni Platform; using Guru BrahmaNand Ji Govt.
          Polytechnic Alumni Platform to engage in any advertising or marketing.
          Certain areas of Guru BrahmaNand Ji Govt. Polytechnic Alumni Platform
          are restricted from being accessed by you and Guru BrahmaNand Ji Govt.
          Polytechnic may further restrict access by you to any areas of this
          platform, at any time, in absolute discretion. Any user ID and
          password you may have for Guru BrahmaNand Ji Govt. Polytechnic Alumni
          Platform are confidential and you must maintain confidentiality as
          well.
        </p>
        <h2 className="text-xl font-semibold mb-2 text-gray-700 text-left">
          # Your Content
        </h2>
        <p className="text-sm text-gray-600 leading-relaxed text-left">
          In these terms and conditions, "Your Content" shall mean any audio,
          video text, images or other material you choose to display on Guru
          BrahmaNand Ji Govt. Polytechnic Alumni Platform. By displaying Your
          Content, you grant Guru BrahmaNand Ji Govt. Polytechnic a
          non-exclusive, worldwide irrevocable, sub licensable license to use,
          reproduce, adapt, publish, translate and distribute it in any and all
          media. Your Content must be your own and must not be invading any
          third-party’s rights. Guru BrahmaNand Ji Govt. Polytechnic reserves
          the right to remove any of Your Content from Guru BrahmaNand Ji Govt.
          Polytechnic Alumni Platform at any time without notice.
        </p>
        <h2 className="text-xl font-semibold mb-2 text-gray-700 text-left">
          # No warranties
        </h2>
        <p className="text-sm text-gray-600 leading-relaxed text-left">
          This platform is provided "as is," with all faults, and Guru
          BrahmaNand Ji Govt. Polytechnic express no representations or
          warranties, of any kind related to Guru BrahmaNand Ji Govt.
          Polytechnic Alumni Platform or the materials contained on this
          platform. Also, nothing contained on Guru BrahmaNand Ji Govt.
          Polytechnic Alumni Platform shall be interpreted as advising you.
        </p>
        <h2 className="text-xl font-semibold mb-2 text-gray-700 text-left">
          # Limitation of liability
        </h2>
        <p className="text-sm text-gray-600 leading-relaxed text-left">
          In no event shall Guru BrahmaNand Ji Govt. Polytechnic, nor any of its
          officers, directors and employees, shall be held liable for anything
          arising out of or in any way connected with your use of Guru
          BrahmaNand Ji Govt. Polytechnic Alumni Platform whether such liability
          is under contract. Guru BrahmaNand Ji Govt. Polytechnic, including its
          officers, directors and employees shall not be held liable for any
          indirect, consequential or special liability arising out of or in any
          way related to your use of Guru BrahmaNand Ji Govt. Polytechnic Alumni
          Platform.
        </p>
        <h2 className="text-xl font-semibold mb-2 text-gray-700 text-left">
          # Indemnification
        </h2>
        <p className="text-sm text-gray-600 leading-relaxed text-left">
          You hereby indemnify to the fullest extent Guru BrahmaNand Ji Govt.
          Polytechnic from and against any and/or all liabilities, costs,
          demands, causes of action, damages and expenses arising in any way
          related to your breach of any of the provisions of these terms.
        </p>

        <h2 className="text-xl font-semibold mb-2 text-gray-700 text-left">
          # Severability
        </h2>
        <p className="text-sm text-gray-600 leading-relaxed text-left">
          If any provision of these terms is found to be invalid under any
          applicable law, such provisions shall be deleted without affecting the
          remaining
        </p>
        <div className="mt-4 flex justify-end">
          {" "}
          <div>
            <button
              onClick={onClose}
              className="text-white hover:bg-red-700 rounded-lg w-16 h-8 mr-2 bg-red-500"
            >
              {" "}
              close
            </button>
            <button
              onClick={() => {
                onAgree();
                onClose();
              }}
              className="text-white hover:bg-green-700 rounded-lg w-16 h-8 mr-2 bg-green-500"
            >
              {" "}
              Agree
            </button>
          </div>
        </div>
        <div className="absolute right-1 top-1 text-red-500" onClick={onClose}>
          <Close />
        </div>
      </div>
    </div>
  );
};

export default function TempProfileForm() {
  const initalvalues = {
    mobile:"",
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
    trade: "",
  };

  const [RollNo, setRollNo] = useState("");
  const [proofExist, setproofExist] = useState(false);
  const [profileExist, setprofileExist] = useState(false);
  const [selectedState, setSelectedState] = useState("");
  const [selectedvalidation, setSelectedvalidation] = useState("");
  const [selectedDistrict, setSelectedDistrict] = useState("");
  const [Duplicate, setDuplicate] = useState(false);
  const [Referralaccount, setReferralaccount] = useState(null);

  const [InstituteCollectionValuesName, setInstituteCollectionValuesName] =
    useState("");

  const [InstituteValueFind, setInstituteValueFind] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isTermsAccepted, setIsTermsAccepted] = useState(false);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [Tempdata, setTempdata] = useState(null);

  const { id } = useParams();
  const { setAlert } = AlertApi();
  const { setuser } = AuthApi();

  const toggleclose = () => {
    setIsOpen(false);
    navigate("/alumni");
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

  const Tradearr = [
    "Computer Engineering",
    "Civil Engineering",
    "Mechanical Engineering",
    "Electrical Engineering",
    "Electronics Engineering",
    "Instrumentation and Control Engineering",
    "Production Engineering",
    "Mechatronics Engineering",
    "Information Technology",
    "Electronics & Communication Engineering",
  ];

  const ValidationArr = [
    { value: "proof", label: "Document proof related to collage" },
    {
      value: "Referral",
      label: "Referral from Known batchmate already registered",
    },
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
      "Fatehabad",
      "Charkhi Dadri",
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
    } else if (selectedvalidation === "proof" && !proofExist) {
      setAlert({ type: "error", message: "Proof are required" });
      return;
    } else if (selectedvalidation === "Referral" && !Referralaccount) {
      setAlert({ type: "error", message: "reference are required" });
      return;
    } else if (!selectedvalidation) {
      setAlert({ type: "error", message: "Validation are required" });
      return;
    } else if (!isTermsAccepted) {
      setAlert({ type: "error", message: "Please Accept terms and condition" });
      return;
    }

    const {
      mobile,
      profession,
      linkdln,
      facebook,
      twitter,
      about,
      startYear,
      endYear,
      aadhaar,
      trade,
    } = values;
    // console.log(values);

    // //console.log(values);
    actions.setSubmitting(true);

    const playload = {
      uuid: id,
      email: Tempdata.email,
      mobile: mobile,
      name: InstituteCollectionValuesName,
      Trade: trade,
      profession: profession,
      rollNo: RollNo,
      aadhaar: aadhaar,
      validation: selectedvalidation,
      linkdln: linkdln,
      facebook: facebook,
      twitter: twitter,
      about: about,
      startYear: startYear,
      endYear: endYear,
      state: selectedState,
      district: selectedDistrict,
      referral: Referralaccount?._id,
    };

    const url = `${process.env.REACT_APP_API_KEY}/tempuserinfo`;

    try {
      const res = await axios.post(url, playload);

      actions.resetForm();
      setuser(res.data);
      const Token = JSON.stringify(res.data);
      Cookies.set("User", Token, { expires: 2 });
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
      setInstituteCollectionValuesName(data.data?.name);
      setInstituteValueFind(true);
    } catch (error) {
      setDuplicate(false);
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

  const handleAccept = () => {
    setIsModalOpen(true);
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
            {selectedvalidation === "proof" ? (
              <p className="text-gray-500">
                Your registration is being processed. Please wait for the
                institute's approval.
              </p>
            ) : (
              ""
            )}
            {selectedvalidation === "Referral" ? (
              <p className="text-gray-500">
                Your registration is being processed. Please wait for your
                referral to accept .
              </p>
            ) : (
              ""
            )}
            {selectedvalidation === "NotReferral" ? (
              <p className="text-gray-500">
                you are not fully verified but still access our platform.
              </p>
            ) : (
              ""
            )}
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
                    htmlFor="mobile"
                    className="block text-gray-700 font-bold mb-2"
                  >
                    Mobile No{" "}
                    <span className="text-red-400 font-bold text-2xl">*</span>
                  </label>
                  <Field
                    type="number"
                    id="mobile"
                    name="mobile"
                    className="appearance-none border rounded w-full py-2 px-3  text-green-700 bg-white  focus:border-green-400 focus:ring-green-300  focus:ring focus:ring-opacity-40 leading-tight focus:outline-none focus:shadow-outline"
                    placeholder="Mobile No."
                  />
                  <ErrorMessage
                    name="mobile"
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
                    htmlFor="trade"
                    className="block text-gray-700 font-bold mb-2"
                  >
                    Trade{" "}
                    <span className="text-red-400 font-bold text-2xl">*</span>
                  </label>
                  <Field
                    as="select"
                    name="trade"
                    className="w-full appearance-none border rounded py-2 px-3 leading-tight focus:outline-none focus:shadow-outline text-green-700 bg-white focus:border-green-400 focus:ring-green-300 focus:ring focus:ring-opacity-40"
                  >
                    <option value="">Select Trade</option>
                    {Tradearr?.map((value) => (
                      <option key={value} value={value}>
                        {value}
                      </option>
                    ))}
                  </Field>
                  <ErrorMessage
                    name="trade"
                    component="div"
                    className="text-red-500"
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
                    <div className="w-1/2">
                      <Field
                        as="select"
                        name="startYear"
                        className="w-full appearance-none border rounded py-2 px-3 leading-tight focus:outline-none focus:shadow-outline text-green-700 bg-white focus:border-green-400 focus:ring-green-300 focus:ring focus:ring-opacity-40"
                      >
                        <option value="">****</option>
                        {yearOptions?.map((year) => (
                          <option key={year} value={year}>
                            {year}
                          </option>
                        ))}
                      </Field>

                      <ErrorMessage
                        name="startYear"
                        component="div"
                        className="text-red-500"
                      />
                    </div>
                    <span className="px-2">to</span>
                    <div className="w-1/2">
                      <Field
                        as="select"
                        name="endYear"
                        className="w-full appearance-none border rounded py-2 px-3 leading-tight focus:outline-none focus:shadow-outline text-green-700 bg-white focus:border-green-400 focus:ring-green-300 focus:ring focus:ring-opacity-40"
                      >
                        <option value="">****</option>
                        {yearOptions?.map((year) => (
                          <option key={year} value={year}>
                            {year}
                          </option>
                        ))}
                      </Field>
                      <ErrorMessage
                        name="endYear"
                        component="div"
                        className="text-red-500"
                      />
                    </div>
                  </div>
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
                {selectedvalidation === "Referral" ? (
                  <Referral setReferralaccount={setReferralaccount} />
                ) : (
                  ""
                )}

                <div className="text-center ">
                  <div className="inline-flex items-center">
                    <input
                      type="checkbox"
                      className="form-checkbox h-5 w-5 text-blue-600"
                      checked={isTermsAccepted}
                      onChange={() => setIsTermsAccepted(!isTermsAccepted)}
                    />
                    <span className="ml-2 text-sm">
                      I accept the{" "}
                      <span
                        className="text-sm  text-red-500"
                        onClick={handleAccept}
                      >
                        terms and conditions
                      </span>
                    </span>
                  </div>
                  <Modal
                    isOpen={isModalOpen}
                    onClose={() => setIsModalOpen(false)}
                    onAgree={() => setIsTermsAccepted(true)}
                  />
                </div>
                <button
                  type="submit"
                  className="bg-green-500 mt-2 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
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
