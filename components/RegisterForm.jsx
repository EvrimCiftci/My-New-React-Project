import React, { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { CiHome } from "react-icons/ci";

const RegisterForm = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
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

    // Validate first name
    if (data.firstName.trim().length < 2) {
      errors.firstName = 'First name must be at least 2 characters';
      return errors;
    }

    // Validate last name
    if (data.lastName.trim().length < 2) {
      errors.lastName = 'Last name must be at least 2 characters';
      return errors;
    }

    // Validate email
    if (!data.email.trim()) {
      errors.email = 'Email is required';
      return errors;
    } else if (!isValidEmail(data.email)) {
      errors.email = 'Invalid email format';
      return errors;
    }

    // Validate passwords
    if (!data.password.trim()) {
      errors.password = 'Password is required';
      return errors;
    } else if (data.password.length < 6) {
      errors.password = 'Password must be at least 6 characters';
      return errors;
    } else if (data.password !== data.confirmPassword) {
      errors.confirmPassword = 'Passwords do not match';
      return errors;
    }
    if (!isChecked) {
      errors.checkbox = 'You need to accept Privacy Policy'
      return errors;
     }
    return errors;
  };

  const isValidEmail = (email) => {
    // Basic email validation using regex
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const handleCheckboxChange = (e) => {
    setIsChecked(e.target.checked);
  };

  return (
    <div className="container mx-auto">
        <a href="/home">   <CiHome className="absolute left-4 top-4 h-12 w-12" /> </a>
     
      <div className="flex flex-col lg:flex-row w-10/12 lg:w-8/12 bg-white rounded-xl mx-auto shadow-lg overflow-hidden">
        <div className="w-full lg:w-1/2 flex flex-col items-center justify-center p-12 bg-no-repeat bg-cover bg-center content-center bg-no-repeat bg-[url(./assets/Register.png)]">
          <h1 className="text-white text-3xl mb-3 font-extrabold">Welcome</h1>
          <div className='h-full w-full text-center flex flex-col items-center justify-center '>
            <p className="text-white ">Register now and Choose your sub plan, get started right away! </p>
            <a href="#" className="text-white font-semibold font-semibold">Learn more</a>
          </div>
        </div>
        <div className="w-full lg:w-1/2 py-16 px-12">
          <h2 className="text-3xl mb-4">Register</h2>
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-2 gap-5">
              <input type="text" placeholder="Firstname" name="firstName" value={formData.firstName} onChange={handleChange} className="border border-gray-400 py-1 px-2" />
              <input type="text" placeholder="Surname" name="lastName" value={formData.lastName} onChange={handleChange} className="border border-gray-400 py-1 px-2" />
            </div>
            <div className="mt-5">
              <input type="text" placeholder="Email" name="email" value={formData.email} onChange={handleChange} className="border border-gray-400 py-1 px-2 w-full" />
            </div>
            <div className="mt-5">
              <input type="password" placeholder="Password" name="password" value={formData.password} onChange={handleChange} className="border border-gray-400 py-1 px-2 w-full" />
            </div>
            <div className="mt-5">
              <input type="password" placeholder="Confirm Password" name="confirmPassword" value={formData.confirmPassword} onChange={handleChange} className="border border-gray-400 py-1 px-2 w-full" />
            </div>
            <div className="mt-5">
              <label
                htmlFor="checkbox"
                className="relative h-[3em] w-[3em] rounded-[1.2em] bg-purple-700 border border-purple-300 shadow-[inset_-1px_1px_4px_0px_#f0fffe,inset_1px_-1px_4px_0px_#00bdb0,-1px_2px_4px_0px_#00bdb0] mr-6"
              >
                <input
                  type="checkbox"
                  name="checkbox"
                  id="checkbox"
                  checked={isChecked}
                  onChange={handleCheckboxChange}
                  className="peer appearance-none"
                />
                <span
                  className="absolute left-1/2 top-1/2 h-[2em] w-[2em] -translate-x-1/2 -translate-y-1/2 rounded-[0.8em] bg-purple-600 border border-purple-400 shadow-[inset_-1px_1px_4px_0px_#f0fffe,inset_1px_-1px_4px_0px_#00bdb0,-1px_1px_2px_0px_#00bdb0] duration-[200ms] peer-checked:shadow-[inset_1px_-1px_4px_0px_#f0fffe,inset_-1px_1px_4px_0px_#00bdb0]"
                >
                </span>
                <svg
                  fill="#ffffff"
                  viewBox="-3.2 -3.2 38.40 38.40"
                  xmlns="http://www.w3.org/2000/svg"
                  className="absolute left-1/2 top-1/2 h-[2em] w-[2em] -translate-x-1/2 -translate-y-1/2 peer-checked:opacity-0"
                >
                  <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                  <g
                    id="SVGRepo_tracerCarrier"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  ></g>
                  <g id="SVGRepo_iconCarrier">
                    <path
                      d="M5 16.577l2.194-2.195 5.486 5.484L24.804 7.743 27 9.937l-14.32 14.32z"
                    ></path>
                  </g>
                </svg>
                <svg
                  fill="#ffffff"
                  viewBox="0 0 1024 1024"
                  xmlns="http://www.w3.org/2000/svg"
                  className="absolute left-1/2 top-1/2 h-[2em] w-[2em] -translate-x-1/2 -translate-y-1/2 opacity-0 peer-checked:opacity-100"
                >
                  <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                  <g
                    id="SVGRepo_tracerCarrier"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  ></g>
                  <g id="SVGRepo_iconCarrier">
                    <path
                      d="M697.4 759.2l61.8-61.8L573.8 512l185.4-185.4-61.8-61.8L512 450.2 326.6 264.8l-61.8 61.8L450.2 512 264.8 697.4l61.8 61.8L512 573.8z"
                    ></path>
                  </g>
                </svg>
              </label>
              <span>
                I accept the <a href="#" className="text-purple-500 font-semibold">Terms of Use</a> &  <a href="#" className="text-purple-500 font-semibold">Privacy Policy</a> 
              </span>
            </div>
            <div className="mt-5">
              <motion.button
                whileHover={{ scale: 1.1 }}
                onHoverStart={e => {}}
                onHoverEnd={e => {}}
                className="w-full bg-purple-500 rounded-2xl py-3 text-center text-white">Register Now</motion.button>
            </div>
          </form>
        </div>
      </div>
      {/* Error box */}
      {errorMessage && (
        <div
          id="notification-container">
          

            {errorMessage && (
           <motion.div
             initial={{ y: -100 }}
             animate={{  y: 0 }}
             id="notification-box"
             className="bg-red-500 text-white font-semibold px-4 py-2 rounded shadow-lg fixed top-5 right-5"
            >
              {errorMessage}
         </motion.div>
  )}



      
        </div>
      )}
    </div>
  );
};

export default RegisterForm;
