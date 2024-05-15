import React, { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import img from '../assets/Register.png'
import { CiHome } from "react-icons/ci";

const LoginForm = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [errors, setErrors] = useState({});
  const [errorMessage, setErrorMessage] = useState('');
  const [isChecked, setIsChecked] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errors = validateForm(formData);
    if (Object.keys(errors).length === 0 && isChecked) {
      // Form is valid, proceed with submission
      console.log('Form submitted:', formData);
    } else {
      // Form has errors, update state to display error message
      const firstError = Object.values(errors)[0];
      const errorMessage = firstError || !isChecked ? firstError : 'Please accept the Terms of Use and Privacy Policy';
      setErrorMessage(errorMessage);
      // Display error notification for 5 seconds
      setTimeout(() => {
        setErrorMessage('');
      }, 5000);
    }
  };

  const validateForm = (data) => {
    const errors = {};

    // Validate email
    if (!data.email.trim()) {
      errors.email = 'Email is required';
      return errors;
    }

    // Validate password
    if (!data.password.trim()) {
      errors.password = 'Password is required';
      return errors;
    }

    return errors;
  };

  const handleCheckboxChange = (e) => {
    setIsChecked(e.target.checked);
  };

  return (
    <div className="container mx-auto flex justify-center items-center  ">
      <a href="/home">   <CiHome className="absolute left-4 top-4 h-12 w-12" /> </a>
     
      <div className="flex flex-col lg:flex-row w-10/12 lg:w-8/12 bg-white rounded-xl mx-auto shadow-lg overflow-hidden">
        <div className="w-full h-96 lg:w-1/2 py-16 px-12 bg-no-repeat bg-cover  bg-center content-center bg-no-repeat bg-[url(./assets/Login.png)]">
          <h2 className="text-3xl text-purple-500 font-extrabold mb-4">Login</h2>
          <div className='h-full w-full text-center flex flex-col items-center justify-center'>
            <img src={img} alt="" />
          </div>
        </div>
        <div className="w-full lg:w-1/2 py-16 px-12">
          <form onSubmit={handleSubmit}>
            <div className="mt-5">
              <input type="text" placeholder="Email" name="email" value={formData.email} onChange={handleChange} className="border border-gray-400 py-1 px-2 w-full" />
              {errors.email && <span className="text-red-500">{errors.email}</span>}
            </div>
            <div className="mt-5">
              <input type="password" placeholder="Password" name="password" value={formData.password} onChange={handleChange} className="border border-gray-400 py-1 px-2 w-full" />
              {errors.password && <span className="text-red-500">{errors.password}</span>}
            </div>
            <div className="mt-5">
              <motion.button
                whileHover={{ scale: 1.1 }}
                onHoverStart={e => {}}
                onHoverEnd={e => {}}
                className="w-full bg-purple-500 rounded-2xl py-3 text-center text-white">Login</motion.button>
            </div>
            <p className="text-purple-500">Welcome back! Log in to your account.</p>
            <a href="#" className="text-purple-500  font-semibold">Forgot Password?</a>
          </form>
        </div>
      </div>
      {/* Error box */}
      {errorMessage && (
        <div id="notification-container">
          <AnimatePresence>
            {errorMessage && (
              <motion.div
                initial={{ opacity: 1, y: -100 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -100 }}
                id="notification-box"
                className="bg-red-500 text-white font-semibold px-4 py-2 rounded shadow-lg fixed top-5 right-5"
              >
                {errorMessage}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      )}
    </div>
  );
};

export default LoginForm;
