import React from "react";
import Footer from "../../components/Footer/Footer";
import Navbar from "../../components/Navbar";

const InviteFriendPage = () => {
  const handleInvite = () => {
    // Logic to handle the invite action
    alert("Invitation sent!");
  };

  return (
    <>
      <Navbar />
      <div className="container mx-auto mt-8">
        <h1 className="text-3xl font-semibold mb-4">Invite Your Friend</h1>
        <p className="text-gray-600 mb-8">
          Share the good news with your friends and invite them to join us!
        </p>

        <div className="flex items-center space-x-4">
          <input
            type="email"
            placeholder="Enter friend's email"
            className="border p-2 rounded-l"
          />
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded-r"
            onClick={handleInvite}
          >
            Send Invite
          </button>
        </div>

        <p className="text-gray-600 mt-4">
          Alternatively, share this link with your friends:
        </p>
        <code className="bg-gray-100 p-2 mt-2 block">
          http://www.yourwebsite.com/invite?ref=yourusername
        </code>
      </div>
      <Footer />
    </>
  );
};

export default InviteFriendPage;
