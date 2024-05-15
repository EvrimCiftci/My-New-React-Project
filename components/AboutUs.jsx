import React from 'react';
import hero from '../assets/hero.png'
import customer from '../assets/customer.png'
import freelance from '../assets/freelance.png'
import { AnimatePresence, motion } from 'framer-motion';

const AboutUs = () => {
  return (
    <div className='h-92 mt-4 mb-4 flex justify-center  items-center w-screen'>
      <motion.div
        whileInView={{ opacity: 1, y: 0 }}
        initial={{ opacity: 0, y: -100 }}
        transition={{duration:1}}
        className="max-w-4xl mx-auto p-8 bg-white rounded-lg shadow-md">
      <h2 className="text-3xl font-bold text-purple-800 mb-4">About Us</h2>
        <motion.div
          whileInView={{ opacity: 1, x: 0 }}
          initial={{ opacity: 0, x: -100 }}
          transition={{duration:1}}
          className="flex items-center mb-8">
        <div className="w-24 h-24 bg-purple-200 rounded-full overflow-hidden">
           <img src={freelance} alt="About Us" className="w-full h-full object-cover" /> 
        </div>
        <p className="ml-4 text-gray-800">
         We Are WhatABill.com Who's a startup company helping to local businesses and freelancers.
        </p>
      </motion.div>
        <motion.div
       whileInView={{ opacity: 1, x: 0 }}
       initial={{ opacity: 0, x: -100 }}
       transition={{duration:1}}
          className="flex items-center mb-8">
        <div className="w-32 h-24 bg-purple-200 rounded-full overflow-hidden">
          <img src={hero} alt="About Us" className="w-full h-full object-cover" /> 
        </div>
        <p className="ml-4 text-gray-800">
         Our mission is to provide an easy way for small business owners, as well as independent professionals, to manage their invoices.
        </p>
      </motion.div>
        <motion.div
            whileInView={{ opacity: 1, x: 0 }}
            initial={{ opacity: 0, x: -100 }}
            transition={{duration:1}}
          className="flex items-center">
        <div className="w-32 h-24 bg-purple-200 rounded-full overflow-hidden">
          <img src={customer} alt="About Us" className="w-full h-full object-cover" /> 
        </div>
        <p className="ml-4 text-gray-800">
         We prioritize the needs and satisfaction of our customers above all else, striving to exceed their expectations with every interaction.
        </p>
      </motion.div>
    </motion.div>
    </div>
  
  );
};

export default AboutUs;
