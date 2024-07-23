const EmailModal = ({ isOpen, onClose, onOpenEmail }) => {
  setTimeout(() => {
    onClose();
  }, 20000);
  return (
    <div
      className={`fixed inset-0 flex items-center justify-center shadow-lg ${
        isOpen ? "visible" : "hidden"
      }`}
      style={{
        backdropFilter: isOpen ? "blur(8px)" : "none",
        zIndex: isOpen ? 999 : -1,
      }}
    >
      <div className="absolute inset-0 bg-gradient-to-r opacity-75"></div>
      <div className="relative h-52 w-80 bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-2xl text-gray-800 mb-4">Connect with our Team</h2>
        <p className="text-gray-700 mb-4">
          Feel free to ask your Queries using Email.{" "}
        </p>
        <div className="flex justify-around items-center">
          <button
            onClick={onOpenEmail}
            className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 mr-2"
          >
            <a
              href="mailto:gbn.alumni.nilokheri@gmail.com"
              className="hover:scale-105"
            >
              Email Us
            </a>
          </button>
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default EmailModal;
