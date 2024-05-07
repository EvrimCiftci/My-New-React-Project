import React, { useState } from 'react';
import { motion } from 'framer-motion';

const LiveSupportButton = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleChat = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="fixed bottom-0 left-0 flex items-end justify-start p-4 z-10">
      <motion.div 
        initial={{ opacity: 0, y: 50 }}
        animate={isOpen ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
        exit={{ opacity: 0, y: 50 }}
        transition={{ duration: 0.5 }}
        className={`fixed bottom-20 left-4 w-80 bg-transparent p-4 rounded-lg shadow-md  ${isOpen ? '' : 'hidden'}`}
      >
        <div className="flex flex-col">
          <div className="text-white p-2 rounded-t-lg bg-purple-500 p-4">Live Support</div>
          <div className="bg-gray-200 h-48 overflow-y-auto p-3 ">Chat messages here</div>
          <div className="flex items-center bg-gray-200 p-2 rounded-b-lg">
            <input type="text" placeholder="Type your message" className="flex-grow border border-gray-300 rounded-lg p-2 focus:outline-none mr-2" />
            <button className="bg-purple-600 text-white rounded-lg px-4 py-2">Send</button>
          </div>
        </div>
      </motion.div>
      <motion.div 
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className="flex items-center justify-center w-12 h-12 bg-violet-800 text-white rounded-full cursor-pointer shadow-md"
        onClick={toggleChat}
      >
        <svg className={`w-8 h-8 transition-transform transform ${isOpen ? 'rotate-45' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={isOpen ? "M6 18L18 6" : "M4 6h16M4 12h16M4 18h16"} />
        </svg>
      </motion.div>


    </div>
  );
};

export default LiveSupportButton;

