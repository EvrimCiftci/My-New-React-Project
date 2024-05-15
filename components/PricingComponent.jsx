import React, { useState } from 'react';
import { motion } from 'framer-motion';

const PricingBox = ({ price, packageInfo }) => {
  return (
    <div className="flex flex-col justify-between bg-white rounded-lg shadow-md p-6 w-full sm:w-1/2 md:w-1/3 lg:w-1/4 mx-2 my-4">
      <div>
        <h2 className="text-3xl font-bold text-purple-800 mb-4">Plan</h2>
        <div className="flex items-center mb-4">
          <h3 className="text-2xl font-bold mr-2">${price}</h3>
          <span className="text-gray-600">/month</span>
        </div>
        <p className="text-gray-700">{packageInfo}</p>
      </div>
      <motion.button 
        className="bg-purple-600 text-white rounded-lg px-4 py-2 mt-4"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        Subscribe Now
      </motion.button>  
    </div>
  );
};

const PricingComponent = () => {
  const [isMonthly, setIsMonthly] = useState(true);

  const toggleBillingPeriod = () => {
    setIsMonthly(!isMonthly);
  };

  const billingPeriod = isMonthly ? 'Monthly' : 'Annually';
  const pricingData = isMonthly
    ? [
        { price: '19.99', packageInfo: 'Package 1' },
        { price: '29.99', packageInfo: 'Package 2' },
        { price: '39.99', packageInfo: 'Package 3' },
      ]
    : [
        { price: '14.99', packageInfo: 'Package 1' },
        { price: '22.99', packageInfo: 'Package 2' },
        { price: '30.99', packageInfo: 'Package 3' },
      ];

  return (
    <div className="flex flex-col items-center justify-center w-screen h-92 mt-4">
      <div className="flex flex-col w-full items-center mb-4">
        <motion.div
          className="flex items-center mb-4"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
      
          <motion.label
               whileInView={{ opacity: 1, x: 0 }}
               initial={{ opacity: 0, x: -100 }}
               transition={{duration:1}}
            className="relative inline-flex items-center cursor-pointer">
             <input className="sr-only peer" onChange={toggleBillingPeriod} checked={!isMonthly} value="" type="checkbox" />
             <div className="peer rounded-full outline-none duration-100 after:duration-500 w-32 h-14 bg-purple-300 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-purple-500  after:content-['Monthly'] after:absolute after:outline-none after:rounded-full after:h-12 after:w-16 after:bg-white after:top-1 after:left-1 after:flex after:justify-center after:items-center  after:text-sky-800 after:font-bold peer-checked:after:translate-x-14 peer-checked:after:content-['Annually'] peer-checked:after:border-white">
              </div>
            </motion.label>
         
        
        </motion.div>
      </div>
      <motion.div
           whileInView={{ opacity: 1, x: 0 }}
           initial={{ opacity: 0, x: -100 }}
           transition={{duration:1}}
        className="flex flex-wrap justify-center w-screen">
        {pricingData.map((item, index) => (
          <PricingBox key={index} price={item.price} packageInfo={item.packageInfo} />
        ))}
      </motion.div>
    </div>
  );
};

export default PricingComponent;
