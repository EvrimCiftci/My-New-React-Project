import { useState, useRef, useEffect } from 'react';
import { FaEdit, FaTimes, FaInfo } from "react-icons/fa";
import { FaTrash } from "react-icons/fa";
import emptyImage from "../assets/empty.png";
import { FaArrowLeft, FaArrowRight, FaFilePdf, FaFileExcel } from 'react-icons/fa';
import { jsPDF } from 'jspdf';
import * as XLSX from 'xlsx';

const CustomerList = ({ customers, onDeleteCustomer }) => {
  // Function to export data to PDF
  const exportToPDF = () => {
    const doc = new jsPDF();
    doc.text(20, 20, 'Customer List');
    let y = 30;
    customers.forEach((customer) => {
      doc.text(20, y, `Name: ${customer.name}, Email: ${customer.email}, Phone: ${customer.phone}`);
      y += 10;
    });
    doc.save('customer_list.pdf');
  };

  // Function to export data to Excel
  const exportToExcel = () => {
    const data = [['Name', 'Email', 'Phone']];
    customers.forEach((customer) => {
      data.push([customer.name, customer.email, customer.phone]);
    });
    const ws = XLSX.utils.aoa_to_sheet(data);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Customer List');
    XLSX.writeFile(wb, 'customer_list.xlsx');
  };

  // State variables
  const [currentPage, setCurrentPage] = useState(1); // Current page number for pagination
  const [customersPerPage] = useState(13); // Number of customers per page
  const [deleteConfirmation, setDeleteConfirmation] = useState(null); // Customer ID for delete confirmation
  const [selectedCustomer, setSelectedCustomer] = useState(null); // Selected customer for details or edit mode
  const [editMode, setEditMode] = useState(false); // Edit mode indicator
  const [formData, setFormData] = useState(null); // Form data for editing
  const [dropdownIndex, setDropdownIndex] = useState(null); // Index for dropdown menu
  const dropdownRef = useRef(null); // Ref for dropdown menu

  useEffect(() => {
    // Handle click outside dropdown menu
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownIndex(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside); // Add event listener for click outside
    return () => {
      document.removeEventListener("mousedown", handleClickOutside); // Remove event listener on component unmount
    };
  }, []);

  // Function to set delete confirmation
  const handleDeleteConfirmation = (id) => {
    setDeleteConfirmation(id);
  };

  // Function to handle customer deletion
  const handleDeleteCustomer = (id) => {
    onDeleteCustomer(id); // Call onDeleteCustomer function from props to delete customer
    setDeleteConfirmation(null); // Close the confirmation dialog after deletion
  };

  // Function to show customer details
  const handleDetails = (customer) => {
    setSelectedCustomer(customer); // Set selected customer
    setEditMode(false); // Set edit mode to false
  };

  // Function to enter edit mode for a customer
  const handleEdit = (customer) => {
    setSelectedCustomer(customer); // Set selected customer
    setEditMode(true); // Set edit mode to true
    setFormData({ ...customer }); // Initialize form data with customer data
  };

  // Function to handle form input change
  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  // Function to handle form submission
  const handleFormSubmit = (e) => {
    e.preventDefault();
    // Validation can be added here before updating the customer
    if (!formData.Bname.trim() || !formData.email.trim() || !formData.number.trim()) {
      // Handle validation errors, e.g., display error messages
      alert('Please fill in all required fields.');
      return;
    }
    // Optional: Additional validation, such as email format validation
    const isValidEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email);
    if (!isValidEmail) {
      alert('Please enter a valid email address.');
      return;
    }
    // Update the selected customer data
    const updatedCustomers = customers.map((customer) =>
      customer.id === selectedCustomer.id ? { ...customer, ...formData } : customer
    );
    // Reset the selected customer and form data
    setSelectedCustomer(null);
    setEditMode(false);
    setFormData(null);
    // Update the state with the updated customers
    // setCustomers(updatedCustomers); // Make sure to update the state with the updated customers
  };

  // Function to close details or edit mode
  const handleCloseDetails = () => {
    setSelectedCustomer(null); // Reset selected customer
    setEditMode(false); // Reset edit mode
    setFormData(null); // Reset form data
  };

  // Pagination
  const indexOfLastCustomer = currentPage * customersPerPage; // Index of last customer on current page
  const indexOfFirstCustomer = indexOfLastCustomer - customersPerPage; // Index of first customer on current page
  const currentCustomers = customers.slice(indexOfFirstCustomer, indexOfLastCustomer); // Current customers to display
  const totalCustomers = customers.length; // Total number of customers

  // Function to change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="w-full h-full  flex  flex flex-col justify-center items-center">
            <button onClick={exportToPDF}><FaFilePdf /> Export to PDF</button>
           <button onClick={exportToExcel}><FaFileExcel /> Export to Excel</button>
      {/* Your existing component code goes here */}

      {customers.length === 0 ? ( // Render empty list message if no customers
        <div className="relative w-full h-full flex justify-center items-center">
          <img src={emptyImage} alt="Empty List" className="inset-0 mb-52 object-cover w-52 h-52" />
          <div className="absolute inset-0 flex justify-center items-center ">
            <p className="text-gray-500 font-bold text-2xl bg-purple-100 p-2 rounded-xl">There are no registered customers in the list</p>
          </div>
        </div>
      ) : ( 
        <table className="overflow-hidden h-full block table-auto border-collapse shadow-md rounded-xl whitespace-nowrap w-full overflow-x-auto m-auto">
          <thead>
            <tr className=' text-lg text-purple-600'>
              <th >Customer Name</th>
              <th>Email</th>
              <th>Phone Number</th>
              <th>Address</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {currentCustomers.map((customer, index) => (
              <tr key={customer.id} className='text-center'>
                <td className="p-3 overflow-hidden border-t-2 border-t-gray-200 w-3/12 font-extrabold	 ">{customer.Bname}</td>
                <td className='w-3/12 p-3 overflow-hidden border-t-2 border-t-gray-200'>{customer.email}</td>
                <td className='w-3/12 p-3 overflow-hidden border-t-2 border-t-gray-200'>{customer.number}</td>
                <td className='w-3/12 p-3 overflow-hidden border-t-2 border-t-gray-200'>{customer.address}</td>
                <td>
                  <div className="relative">
                    <button className="mt-2 ml-2" onClick={() => handleEdit(customer)}>
                      <FaEdit className="w-8 h-8 text-purple-500  hover:text-purple-600" />
                    </button>
                    <button className="mt-2 ml-2" onClick={() => handleDetails(customer)}>
                      <FaInfo className="w-8 h-8 text-purple-500  hover:text-purple-600" />
                    </button>
                    <button className="mt-2 ml-2" onClick={() => handleDeleteConfirmation(customer.id)}>
                      <FaTrash className="w-8 h-8 text-purple-500 hover:text-purple-600"/>
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      {deleteConfirmation && (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white ml-36 p-8 rounded-md shadow-lg">
            <p className="mb-4">Are you sure you want to delete this customer?</p>
            <div className="flex justify-end ml-18">
              <button className="mr-4 px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600" onClick={() => handleDeleteCustomer(deleteConfirmation)}>Delete</button>
              <button className="px-4 py-2 bg-gray-300 text-gray-800 rounded-md hover:bg-gray-400" onClick={() => setDeleteConfirmation(null)}>Cancel</button>
            </div>
          </div>
        </div>
      )}
      {selectedCustomer && (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white ml-36 p-8 rounded-md shadow-lg relative">
            {!editMode ? ( // Render customer details if not in edit mode
              <>
                <h2 className="text-2xl font-semibold mb-4">Customer Details</h2>
                <div>
                  <p><strong>Business Name:</strong> {selectedCustomer.Bname}</p>
                  <p><strong>Email:</strong> {selectedCustomer.email}</p>
                  <p><strong>Phone Number:</strong> {selectedCustomer.number}</p>
                  <p><strong>Address:</strong> {selectedCustomer.address}</p>
                </div>
              </>
            ) : ( // Render edit form if in edit mode
              <form onSubmit={handleFormSubmit}>
                <div className="flex flex-col mb-6">
                  <label htmlFor="Bname" className="mb-1">Business Name</label>
                  <input type="text" name="Bname" value={formData.Bname} onChange={handleFormChange} className="h-12 border-2 border-purple-300 rounded-md" />
                </div>
                <div className="flex flex-col mb-6">
                  <label htmlFor="email" className="mb-1">Email</label>
                  <input type="email" name="email" value={formData.email} onChange={handleFormChange} className="h-12 border-2 border-purple-300 rounded-md" />
                </div>
                <div className="flex flex-col mb-6">
                  <label htmlFor="number" className="mb-1">Phone Number</label>
                  <input type="tel" name="number" value={formData.number} onChange={handleFormChange} className="h-12 border-2 border-purple-300 rounded-md" />
                </div>
                <div className="flex flex-col mb-6">
                  <label htmlFor="address" className="mb-1">Address</label>
                  <input type="text" name="address" value={formData.address} onChange={handleFormChange} className="h-12 border-2 border-purple-300 rounded-md" />
                </div>
                <button type="submit" className="block m-auto mt-4 bg-purple-200 text-purple-500 w-16 h-8 rounded-md shadow-md">Save</button>
              </form>
            )}
            <button className="absolute top-2 right-2 text-gray-500 hover:text-gray-700" onClick={handleCloseDetails}>
              <FaTimes />
            </button>
          </div>
        </div>
      )}
      <div className="flex justify-center mt-4">
        <button
          onClick={() => setCurrentPage(currentPage - 1)}
          disabled={currentPage === 1}
          className="mr-2 px-4 py-2 bg-transparent text-gray-800 rounded-md hover:bg-purple-100 mb-2"
        >
          <FaArrowLeft />

        </button>
        <div>Page {currentPage}</div>
        <button
          onClick={() => setCurrentPage(currentPage + 1)}
          disabled={indexOfLastCustomer >= totalCustomers}
          className="ml-2 px-4 py-2  bg-transparent text-gray-800 rounded-md hover:bg-purple-100 mb-2"
        >
          <FaArrowRight />

        </button>
      </div>
    </div>
  );
};

export default CustomerList;
