import { useState } from 'react';
import { FaTimes } from "react-icons/fa";

const CustomerInfoBox = ({ closeModal, onAddCustomer }) => {
  const [formData, setFormData] = useState({
    Bname: '',
    email: '',
    number: '',
    address: ''
  });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validateForm(formData);
    if (Object.keys(validationErrors).length === 0) {
      // Form is valid, proceed with submission
      onAddCustomer(formData);
      setFormData({
        Bname: '',
        email: '',
        number: '',
        address: ''
      });
    } else {
      // Form has errors, update state to display error messages
      setErrors(validationErrors);
    }
  };

  const validateForm = (data) => {
    const errors = {};

    // Validate Business Name
    if (!data.Bname.trim()) {
      errors.Bname = 'Business Name is required';
    }

    // Validate Email
    if (!data.email.trim()) {
      errors.email = 'Email is required';
    } else if (!isValidEmail(data.email)) {
      errors.email = 'Invalid email format';
    }

    // Validate Phone Number
    if (!data.number.trim()) {
      errors.number = 'Phone Number is required';
    }

    return errors;
  };

  const isValidEmail = (email) => {
    // Basic email validation using regex
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  return (
    <div className="h-screen w-screen flex items-center ml-10 justify-center fixed z-10 left-0 top-0 bg-transparent">
      <div className="p-8 bg-white ml-36 shadow-2xl border-2 border-gray-200 rounded-xl w-96 h-auto relative">
        <button
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
          onClick={closeModal}
        >
          <FaTimes />
        </button>
        <form onSubmit={handleSubmit}>
          <div className="flex flex-col mb-6">
            <label htmlFor="Bname" className="mb-1">Business Name</label>
            <input type="text" name="Bname" value={formData.Bname} onChange={handleChange} className={`h-12 border-2 rounded-md ${errors.Bname ? 'border-red-500' : 'border-purple-300'}`} />
            {errors.Bname && <span className="text-red-500 text-sm">{errors.Bname}</span>}
          </div>
          <div className="flex flex-col mb-6">
            <label htmlFor="email" className="mb-1">Email</label>
            <input type="email" name="email" value={formData.email} onChange={handleChange} className={`h-12 border-2 rounded-md ${errors.email ? 'border-red-500' : 'border-purple-300'}`} />
            {errors.email && <span className="text-red-500 text-sm">{errors.email}</span>}
          </div>
          <div className="flex flex-col mb-6">
            <label htmlFor="number" className="mb-1">Phone Number</label>
            <input type="tel" name="number" value={formData.number} onChange={handleChange} className={`h-12 border-2 rounded-md ${errors.number ? 'border-red-500' : 'border-purple-300'}`} />
            {errors.number && <span className="text-red-500 text-sm">{errors.number}</span>}
          </div>
          <div className="flex flex-col mb-6">
            <label htmlFor="address" className="mb-1">Address</label>
            <input type="text" name="address" value={formData.address} onChange={handleChange} className="h-12 border-2 border-purple-300 rounded-md" />
          </div>
          <button type="submit" className="block m-auto mt-4 bg-purple-200 text-purple-500 w-16 h-8 rounded-md shadow-md">Add</button>
        </form>
      </div>
    </div>
  );
};

export default CustomerInfoBox;
