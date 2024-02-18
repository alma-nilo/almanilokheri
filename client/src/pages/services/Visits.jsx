import React, { useState } from "react";
import Footer from "../../components/Footer/Footer";
import Navbar from "../../components/Navbar";

const PlanVisitPage = () => {
  const [selectedDate, setSelectedDate] = useState(null);

  const handleDateChange = (date) => {
    // Logic to handle selected date
    setSelectedDate(date);
  };

  const handleScheduleVisit = () => {
    // Logic to schedule a visit with the selected date
    alert(`Your campus visit is scheduled for ${selectedDate}`);
  };

  return (
    <>
      <Navbar />
      <div className="container mx-auto mt-8">
        <h1 className="text-3xl font-semibold mb-4">Plan Your Campus Visit</h1>
        <p className="text-gray-600 mb-8">
          Experience our campus firsthand by scheduling a visit. Choose a date
          that works for you and let us show you around.
        </p>

        <div className="flex items-center mb-4">
          <label htmlFor="visitDate" className="mr-4">
            Select Date:
          </label>
          <input
            type="date"
            id="visitDate"
            onChange={(e) => handleDateChange(e.target.value)}
            className="border p-2 rounded-md"
          />
        </div>

        <button
          className="bg-blue-500 text-white px-4 py-2 rounded-full"
          onClick={handleScheduleVisit}
          disabled={!selectedDate}
        >
          Schedule Visit
        </button>
      </div>
      <Footer />
    </>
  );
};

export default PlanVisitPage;
