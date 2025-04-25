import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiMessageCircle, FiX } from "react-icons/fi";
import Chatbot from "./Chatbot";

export const ChatbotInterface = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="fixed bottom-14 right-4 z-[9999]">
      {!isOpen && (
        <motion.button
          onClick={() => setIsOpen(true)}
          className="w-14 h-14 sm:w-16 sm:h-16 bg-green-500 flex items-center justify-center rounded-full shadow-lg"
        >
          <FiMessageCircle size={32} className="text-white sm:hidden" />
          <FiMessageCircle size={40} className="text-white hidden sm:block" />
        </motion.button>
      )}

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 100 }}
            className="fixed inset-0 sm:inset-auto sm:bottom-20 sm:right-4 bg-green-50 border-2 border-green-500 rounded-none sm:rounded-lg w-screen h-screen sm:w-[400px] sm:h-[480px] z-[9998] shadow-lg overflow-hidden"
          >
            <motion.header
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              className="bg-green-600 p-4 relative text-white text-center font-bold text-lg shadow-md"
            >
              Alumni Assistant
              <button
                onClick={() => setIsOpen(false)}
                className="absolute right-3 top-4"
              >
                <FiX size={24} />
              </button>
            </motion.header>

            <div className="h-[calc(100%-56px)] overflow-y-auto p-4">
              <Chatbot />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
