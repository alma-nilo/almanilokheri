import React, { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiSend } from "react-icons/fi";
import ReactMarkdown from "react-markdown";
import { Prism as SyntaxHighlighter } from "prism-react-renderer";
import remarkGfm from "remark-gfm";

const Chatbot = () => {
  const [messages, setMessages] = useState(() => {
    try {
      const saved = localStorage.getItem("chatHistory");
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [placeholderIndex, setPlaceholderIndex] = useState(0);
  const chatboxRef = useRef(null);

  const placeholders = [
    "Ask about our alumni network...",
    "Looking for event information?",
    "How can I help you today?",
    "Need help reconnecting with classmates?",
  ];

  // Auto-scroll and save messages
  useEffect(() => {
    if (chatboxRef.current) {
      chatboxRef.current.scrollTop = chatboxRef.current.scrollHeight;
    }
    try {
      localStorage.setItem("chatHistory", JSON.stringify(messages));
    } catch (error) {
      console.error("Failed to save chat history:", error);
    }
  }, [messages]);

  // Rotate placeholders
  useEffect(() => {
    const interval = setInterval(() => {
      setPlaceholderIndex((prev) => (prev + 1) % placeholders.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [placeholders.length]);

  const sendMessage = async () => {
    const message = input.trim();
    if (!message || loading) return;

    const newMessages = [...messages, { role: "user", content: message }];
    setMessages(newMessages);
    setInput("");
    setLoading(true);

    try {
      const response = await fetch(`${process.env.REACT_APP_API_KEY}/chat`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userQuestion: message,
        }),
      });

      const data = await response.json();
      const botReply =
        data.reply || "I couldn't process your request. Please try again.";
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: botReply },
      ]);
    } catch (error) {
      console.error("API Error:", error);
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content:
            "Sorry, I'm having trouble connecting. Please try again later.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-full rounded-xl w-full max-w-full overflow-hidden">
      {/* Chat Messages Container */}
      <div
        ref={chatboxRef}
        className="flex-1 overflow-y-auto p-4 bg-white flex flex-col gap-3"
      >
        <AnimatePresence>
          {messages.length === 0 && (
            <motion.div
              key="welcome-message"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="text-center text-gray-500 my-auto"
            >
              Ask me anything about our alumni network!
            </motion.div>
          )}

          {messages.map((msg, i) => (
            <motion.div
              key={`msg-${i}`}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, x: msg.role === "user" ? 50 : -50 }}
              transition={{ duration: 0.2 }}
              className={`max-w-[85%] p-3 rounded-lg break-words ${
                msg.role === "user"
                  ? "bg-green-100 self-end"
                  : "bg-white border border-green-200 self-start"
              }`}
            >
              <div className="font-semibold text-green-700">
                {msg.role === "user" ? "You" : "Alumni Assistant"}:
              </div>
              <div className="mt-1 prose prose-sm max-w-none overflow-hidden">
                <ReactMarkdown
                  remarkPlugins={[remarkGfm]}
                  components={{
                    code({ node, inline, className, children, ...props }) {
                      const match = /language-(\w+)/.exec(className || "");
                      return !inline && match ? (
                        <SyntaxHighlighter
                          language={match[1]}
                          PreTag="div"
                          {...props}
                        >
                          {String(children).replace(/\n$/, "")}
                        </SyntaxHighlighter>
                      ) : (
                        <code className={className} {...props}>
                          {children}
                        </code>
                      );
                    },
                    a: ({ node, children, ...props }) => (
                      <a
                        {...props}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-green-600 hover:underline"
                      >
                        {children || "Link"}
                      </a>
                    ),
                    ul: ({ node, ...props }) => (
                      <ul className="list-disc pl-5" {...props} />
                    ),
                    ol: ({ node, ...props }) => (
                      <ol className="list-decimal pl-5" {...props} />
                    ),
                  }}
                >
                  {msg.content}
                </ReactMarkdown>
              </div>
            </motion.div>
          ))}

          {loading && (
            <motion.div
              key="typing-indicator"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex items-center gap-1 p-3 bg-white border border-green-200 rounded-lg self-start max-w-[85%]"
            >
              <TypingDots />
              <span className="ml-2 text-gray-500">Thinking...</span>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Input Area */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="flex gap-2 p-3 bg-white border-t border-green-200"
      >
        <motion.input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder={placeholders[placeholderIndex]}
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
          className="flex-1 p-2 border border-green-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
          disabled={loading}
        />
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={sendMessage}
          disabled={loading}
          className="p-2 bg-green-600 text-white rounded-lg disabled:bg-gray-400"
        >
          <FiSend size={20} />
        </motion.button>
      </motion.div>
    </div>
  );
};

const TypingDots = () => {
  return (
    <div className="flex space-x-1">
      {[0, 0.2, 0.4].map((delay) => (
        <motion.div
          key={delay}
          className="w-2 h-2 bg-green-400 rounded-full"
          animate={{ y: [0, -4, 0] }}
          transition={{
            duration: 1,
            repeat: Infinity,
            delay,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
};

export default Chatbot;
