import { useState, useRef, useEffect } from 'react';
import { FaEdit, FaTimes, FaInfo, FaTrash, FaArrowLeft, FaArrowRight, FaFilePdf, FaFileExcel, FaDownload } from "react-icons/fa";
import emptyImage from "../assets/empty.png";
import { jsPDF } from 'jspdf';
import * as XLSX from 'xlsx';

const CustomerList = ({ customers, onDeleteCustomer }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [customersPerPage] = useState(13);
  const [deleteConfirmation, setDeleteConfirmation] = useState(null);
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState(null);
  const [dropdownIndex, setDropdownIndex] = useState(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false); // State for dropdown menu
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownIndex(null);
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

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

  const handleDeleteConfirmation = (id) => {
    setDeleteConfirmation(id);
  };

  const handleDeleteCustomer = (id) => {
    onDeleteCustomer(id);
    setDeleteConfirmation(null);
  };

  const handleDetails = (customer) => {
    setSelectedCustomer(customer);
    setEditMode(false);
  };

  const handleEdit = (customer) => {
    setSelectedCustomer(customer);
    setEditMode(true);
    setFormData({ ...customer });
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (!formData.Bname.trim() || !formData.email.trim() || !formData.number.trim()) {
      alert('Please fill in all required fields.');
      return;
    }
    const isValidEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email);
    if (!isValidEmail) {
      alert('Please enter a valid email address.');
      return;
    }
    const updatedCustomers = customers.map((customer) =>
      customer.id === selectedCustomer.id ? { ...customer, ...formData } : customer
    );
    setSelectedCustomer(null);
    setEditMode(false);
    setFormData(null);
  };

  const handleCloseDetails = () => {
    setSelectedCustomer(null);
    setEditMode(false);
    setFormData(null);
  };

  const indexOfLastCustomer = currentPage * customersPerPage;
  const indexOfFirstCustomer = indexOfLastCustomer - customersPerPage;
  const currentCustomers = customers.slice(indexOfFirstCustomer, indexOfLastCustomer);
  const totalCustomers = customers.length;

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <div className="w-full h-full flex flex-col justify-center items-center">
      <div className="relative mb-4 flex justify-start w-full">
        <button onClick={toggleDropdown} className="flex items-center space-x-2 bg-gray-200 px-4 py-2 rounded-md shadow-md ml-5">
          <FaDownload />
          <span>Download</span>
        </button>
        {isDropdownOpen && (
          <div ref={dropdownRef} className="absolute mt-11 ml-1 bg-white border border-gray-200 rounded-md shadow-lg left-0 ">
            <button onClick={exportToPDF} className="flex items-center px-4 py-2 w-full hover:bg-gray-100">
              <FaFilePdf className="mr-2" />
              Export to PDF
            </button>
            <button onClick={exportToExcel} className="flex items-center px-4 py-2 w-full hover:bg-gray-100">
              <FaFileExcel className="mr-2" />
              Export to Excel
            </button>
          </div>
        )}
      </div>  
      {customers.length === 0 ? (
        <div className="relative w-full h-full flex justify-center items-center">
          <img src={emptyImage} alt="Empty List" className="inset-0 mb-52 object-cover w-52 h-52" />
          <div className="absolute inset-0 flex justify-center items-center">
            <p className="text-gray-500 font-bold text-2xl bg-purple-100 p-2 rounded-xl">There are no registered customers in the list</p>
          </div>
        </div>
      ) : (
        <table className="overflow-hidden h-full block table-auto border-collapse shadow-md rounded-xl whitespace-nowrap w-full overflow-x-auto m-auto">
          <thead>
            <tr className='text-lg text-purple-600'>
              <th>Customer Name</th>
              <th>Email</th>
              <th>Phone Number</th>
              <th>Address</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {currentCustomers.map((customer, index) => (
              <tr key={customer.id} className='text-center'>
                <td className="p-3 overflow-hidden border-t-2 border-t-gray-200 w-3/12 font-extrabold">{customer.Bname}</td>
                <td className='w-3/12 p-3 overflow-hidden border-t-2 border-t-gray-200'>{customer.email}</td>
                <td className='w-3/12 p-3 overflow-hidden border-t-2 border-t-gray-200'>{customer.number}</td>
                <td className='w-3/12 p-3 overflow-hidden border-t-2 border-t-gray-200'>{customer.address}</td>
                <td>
                  <div className="relative">
                    <button className="mt-2 ml-2" onClick={() => handleEdit(customer)}>
                      <FaEdit className="w-8 h-8 text-purple-500 hover:text-purple-600" />
                    </button>
                    <button className="mt-2 ml-2" onClick={() => handleDetails(customer)}>
                      <FaInfo className="w-8 h-8 text-purple-500 hover:text-purple-600" />
                    </button>
                    <button className="mt-2 ml-2" onClick={() => handleDeleteConfirmation(customer.id)}>
                      <FaTrash className="w-8 h-8 text-purple-500 hover:text-purple-600" />
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
            {!editMode ? (
              <>
                <h2 className="text-2xl font-semibold mb-4">Customer Details</h2>
                <div>
                  <p><strong>Business Name:</strong> {selectedCustomer.Bname}</p>
                  <p><strong>Email:</strong> {selectedCustomer.email}</p>
                  <p><strong>Phone Number:</strong> {selectedCustomer.number}</p>
                  <p><strong>Address:</strong> {selectedCustomer.address}</p>
                </div>
              </>
            ) : (
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
          className="ml-2 px-4 py-2 bg-transparent text-gray-800 rounded-md hover:bg-purple-100 mb-2"
        >
          <FaArrowRight />
        </button>
      </div>
    </div>
  );
};

export default CustomerList;
