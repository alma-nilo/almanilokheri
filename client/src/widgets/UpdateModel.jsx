import React, { useState } from "react";
import axios from "axios";

import { Close } from "@mui/icons-material";
import { AlertApi } from "../context/AlertContext";
import UpdatePhotoUploadComponent from "../components/upload/UpdateProfile";

export default function UploadModel({ isOpen, onClose, data }) {
  const [formData, setFormData] = useState({
    rollNo: data?.rollNo || "",
    mobile: data?.mobile || "",
    name: data?.name || "",
    state: data?.state || "",
    district: data?.district || "",
    profession: data?.profession || "",
    linkdln: data?.linkdln || "",
    facebook: data?.facebook || "",
    twitter: data?.twitter || "",
    about: data?.about || "",
  });

  const { setAlert } = AlertApi();

  const [isSubmitting, setisSubmitting] = useState(false);

  if (!isOpen) return null;
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

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    // console.log(name, value);
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleStateChange = (value) => {
    setFormData((prevData) => ({
      ...prevData,
      state: value,
      district: "", // Reset district when state changes
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // console.log(formData);
    setisSubmitting(true);
    try {
      const url = `${process.env.REACT_APP_API_KEY}/updateprofile`;
      const playload = { _id: data._id, formData };
      await axios.post(url, playload);
      onClose();
      window.location.reload();
      setAlert({ type: "success", message: "Profile Update" });
    } catch (error) {
      setAlert({ type: "error", message: "Somthing Went Wrong" });
    }
    setisSubmitting(false);

    // Add your form submission logic here
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

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div
        className="absolute inset-0 bg-gray-800 opacity-75"
        onClick={onClose}
      ></div>
      <div className="z-50  w-full md:w-1/2  relative h-screen flex flex-col item-start bg-white p-8 rounded-lg max-w-md modal-content">
        <div
          onClick={onClose}
          className="absolute top-2 right-4 hover:bg-gray-400 bg-white rounded-full z-20 p-1"
        >
          <Close className="text-red-500 hover:text-gray-100" />
        </div>
        <h2 className="text-2xl font-bold text-center mb-4">Update Profile</h2>

        <form
          onSubmit={handleSubmit}
          className="bg-gray-100 shadow-md rounded px-8 pt-6 pb-8  mb-4 w-full mx-auto"
        >
          <UpdatePhotoUploadComponent data={data} />
          <div className="mb-6">
            <label
              htmlFor="rollNo"
              className="block text-gray-700 font-bold mb-2"
            >
              Roll No{" "}
            </label>
            <input
              type="text"
              id="rollNo"
              name="rollNo"
              value={data?.rollNo}
              readOnly
              className={`
                    w-full border rounded px-3 py-2 bg-green-100  text-green-700  border-green-400 ring-green-300 focus:outline-none ring ring-opacity-40`}
              // placeholder="123456"
            />
          </div>
          <div className="mb-5">
            <label
              htmlFor="name"
              className="block text-gray-700 font-bold mb-2"
            >
              Name{" "}
            </label>
            <input
              type="text"
              id="name"
              placeholder="Name.."
              name="name"
              onChange={handleInputChange}
              value={formData?.name}
              className={`w-full border rounded px-3 py-2  text-green-700  border-green-400 ring-green-300 focus:outline-none ring ring-opacity-40`}
            />
          </div>
          <div className="mb-5">
            <label
              htmlFor="mobile"
              className="block text-gray-700 font-bold mb-2"
            >
              Mobile No{" "}
            </label>
            <input
              type="number"
              id="mobileame"
              placeholder="Mobile No...."
              name="mobile"
              onChange={handleInputChange}
              value={formData?.mobile}
              className={`w-full border rounded px-3 py-2  text-green-700  border-green-400 ring-green-300 focus:outline-none ring ring-opacity-40  `}
            />
          </div>


          <div className="mb-6">
            <label
              htmlFor="profession"
              className="block text-gray-700 font-bold mb-2"
            >
              Profession{" "}
            </label>
            <input
              type="text"
              id="profession"
              name="profession"
              onChange={handleInputChange}
              value={formData?.profession}
              className="appearance-none border rounded w-full py-2 px-3  text-green-700 bg-white  focus:border-green-400 focus:ring-green-300  focus:ring focus:ring-opacity-40 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="Web Developer"
            />
          </div>
          <div className="mb-6">
            <label
              htmlFor="state"
              className="block text-gray-700 font-bold mb-2"
            >
              State{" "}
            </label>
            <select
              name="state"
              value={formData.state}
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
            </label>
            <select
              name="district"
              value={formData.district}
              onChange={(e) =>
                setFormData({ ...formData, district: e.target.value })
              }
              className="w-full appearance-none border rounded py-2 px-3 leading-tight focus:outline-none focus:shadow-outline text-green-700 bg-white focus:border-green-400 focus:ring-green-300 focus:ring focus:ring-opacity-40"
            >
              <option value="">Select District</option>
              {formData.state &&
                districtsByState[formData.state].map((district) => (
                  <option key={district} value={district}>
                    {district}
                  </option>
                ))}
            </select>
          </div>
          <div className="mb-5">
            <label
              htmlFor="linkdln"
              className="block text-gray-700 font-bold mb-2"
            >
              LinkedIn
            </label>
            <input
              type="text"
              id="linkdln"
              name="linkdln"
              onChange={handleInputChange}
              value={formData?.linkdln}
              className=" appearance-none w-full border rounded px-3 py-2  text-green-700 bg-white  focus:border-green-400 focus:ring-green-300  focus:ring focus:ring-opacity-40 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="Enter your LinkedIn profile URL"
            />
          </div>
          <div className="mb-5">
            <label
              htmlFor="facebook"
              className="block text-gray-700 font-bold mb-2"
            >
              Facebook
            </label>
            <input
              type="text"
              id="facebook"
              name="facebook"
              onChange={handleInputChange}
              value={formData?.facebook}
              className="w-full  appearance-none leading-tight focus:outline-none focus:shadow-outline border rounded px-3 py-2  text-green-700 bg-white  focus:border-green-400 focus:ring-green-300  focus:ring focus:ring-opacity-40"
              placeholder="Enter your Facebook profile URL"
            />
          </div>
          <div className="mb-5">
            <label
              htmlFor="twitter"
              className="block text-gray-700 font-bold mb-2"
            >
              Twitter
            </label>
            <input
              type="text"
              id="twitter"
              name="twitter"
              onChange={handleInputChange}
              value={formData?.twitter}
              className="w-full appearance-none border leading-tight focus:outline-none focus:shadow-outline rounded px-3 py-2  text-green-700 bg-white  focus:border-green-400 focus:ring-green-300  focus:ring focus:ring-opacity-40"
              placeholder="Enter your Twitter profile URL"
            />
          </div>
          <div className="mb-5">
            <label
              htmlFor="about"
              className="block text-gray-700 font-bold mb-2"
            >
              About yourself{" "}
            </label>
            <textarea
              as="textarea"
              id="about"
              name="about"
              onChange={handleInputChange}
              value={formData?.about}
              className="w-full appearance-none leading-tight focus:outline-none focus:shadow-outline border rounded px-3 py-2  text-green-700 bg-white  focus:border-green-400 focus:ring-green-300  focus:ring focus:ring-opacity-40"
              placeholder="Write something unique about yourself"
              rows="5"
            />
          </div>
          <button
            type="submit"
            className="bg-green-500 mt-2 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Plz wait ........" : "Submit"}
          </button>
        </form>
      </div>
    </div>
  );
}
