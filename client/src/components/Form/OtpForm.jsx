import axios from "axios";
import { useState, useEffect } from "react";
import { AlertApi } from "../../context/AlertContext";

function OTPForm({
  input,
  setForValidation,
  Validatetoken,
  setIsOpen,
  sentOtp,
}) {
  const [otp, setOTP] = useState("");
  const [countdown, setCountdown] = useState(30);
  const { setAlert } = AlertApi();

  useEffect(() => {
    // Start the countdown timer when the component mounts
    const timer = setInterval(() => {
      if (countdown > 0) {
        setCountdown((countdown) => countdown - 1);
      } else {
        clearInterval(timer);
      }
    }, 1000);

    // Clean up the timer when the component unmounts
    return () => clearInterval(timer);
  }, [countdown]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    // Handle OTP submission here
    let url = `${process.env.REACT_APP_API_KEY}/validate`;

    try {
      const response = await axios.post(
        url,
        {
          email: input.email,
          otp: otp,
        },
        {
          headers: {
            token: Validatetoken,
          },
        }
      );

      // signup
      let url2 = `${process.env.REACT_APP_API_KEY}/signup`;

      await axios.post(url2, input, {
        headers: {
          authorization: response.data.token,
        },
      });
      setIsOpen(true);
      setForValidation(false);
    } catch (error) {
      setAlert({ type: "error", message: "Otp not match" });
    }

    return;
  };

  const handleResendClick = () => {
    // Handle resend button click here
    sentOtp();
    setCountdown(30);
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md">
      <label htmlFor="otp" className="block text-gray-700 font-bold mb-2">
        Enter OTP:
      </label>
      <input
        type="number"
        id="otp"
        name="otp"
        value={otp}
        onChange={(event) => setOTP(event.target.value)}
        className="border border-gray-400 rounded-lg py-2 px-4 mb-4 w-full"
      />
      <p className="text-gray-500 mb-4">OTP sent to : {input.email}</p>
      <button
        type="button"
        onClick={handleResendClick}
        disabled={countdown > 0}
        className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-lg"
      >
        Resend OTP {countdown > 0 ? `(${countdown})` : ""}
      </button>

      <button
        type="submit"
        className="bg-green-500 hover:bg-green-700 mx-4 text-white font-bold py-2 px-4 rounded-lg"
      >
        Submit
      </button>
    </form>
  );
}

export default OTPForm;
