import React, { useState } from 'react';
import SideBar from '../components/SideBar';
import TemplateOne from '../templates/TemplateOne';
import TemplateTwo from '../templates/TemplateTwo';
import StepTracker from '../components/StepTracker';

const Invoice = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState({
    companyName: '',
    companyCity: '',
    companyZip: '',
    companyAddress: '',
    customerName: '',
    customerEmail: '',
    customerAddress: '',
    customerCity: '',
    customerZip: '',
    invoiceNumber: '',
    invoiceDate: '',
    dueDate: '',
    items: [{ description: '', quantity: 0, price: 0 }]
  });

  const [isFormValid, setIsFormValid] = useState(true);
  const [selectedTemplate, setSelectedTemplate] = useState('TemplateOne');

  const handleTemplateChange = (e) => {
    setSelectedTemplate(e.target.value);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleItemChange = (index, e) => {
    const { name, value } = e.target;
    const newItems = [...formData.items];
    newItems[index][name] = name === 'quantity' || name === 'price' ? parseFloat(value) : value;
    setFormData({ ...formData, items: newItems });
  };

  const addItem = () => {
    setFormData({ ...formData, items: [...formData.items, { description: '', quantity: 0, price: 0 }] });
  };

  const deleteItem = (index) => {
    const newItems = formData.items.filter((_, itemIndex) => itemIndex !== index);
    setFormData({ ...formData, items: newItems });
  };

  const validateForm = () => {
    if (!formData.customerName.trim() || !formData.customerEmail.trim() || !formData.invoiceNumber.trim() || !formData.invoiceDate.trim() || !formData.dueDate.trim()) {
      return false;
    }
    return formData.items.every(item => item.description.trim() && item.quantity > 0 && item.price > 0);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      setIsFormValid(true);
      console.log('Invoice created:', formData);
    } else {
      setIsFormValid(false);
    }
  };

  const calculateTotal = () => {
    return formData.items.reduce((total, item) => total + (item.quantity * item.price), 0);
  };

  const calculateTax = () => {
    const subtotal = calculateTotal();
    const taxRate = 0.13; // 13% HST for Ontario
    return subtotal * taxRate;
  };

  const nextStep = () => {
    if (currentStep < 4) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const renderTemplate = () => {
    switch (selectedTemplate) {
      case 'TemplateOne':
        return <TemplateOne formData={formData} calculateTotal={calculateTotal} calculateTax={calculateTax} />;
      case 'TemplateTwo':
        return <TemplateTwo formData={formData} calculateTotal={calculateTotal} calculateTax={calculateTax} />;
      default:
        return null;
    }
  };

  return (
    <div className="h-screen w-screen flex flex-row">
      <SideBar />
      <div className="w-full h-screen flex flex-row items-center justify-around">
        <div className="flex flex-col w-5/12 ">
          <div className="mb-4">
            <label className="block text-gray-700 font-bold mb-2" htmlFor="template">Select Template</label>
            <select value={selectedTemplate} onChange={handleTemplateChange} className="w-full p-2 border border-gray-300 rounded">
              <option value="TemplateOne">Template One</option>
              <option value="TemplateTwo">Template Two</option>
            </select>
          </div>
          <StepTracker currentStep={currentStep} />
          <div className="w-full border-2    ">
            <div className="bg-white rounded-lg shadow-lg px-8 py-10 h-auto w-auto">
              {currentStep === 0 && (
                <>
                  <div className="mb-4">
                    <label className="block text-gray-700 font-bold mb-2" htmlFor="companyName">Company Name</label>
                    <input
                      type="text"
                      name="companyName"
                      value={formData.companyName}
                      onChange={handleChange}
                      className="w-full p-2 border border-gray-300 rounded"
                    />
                  </div>
                  <div className="mb-4">
                    <label className="block text-gray-700 font-bold mb-2" htmlFor="companyCity">Company City</label>
                    <input
                      type="text"
                      name="companyCity"
                      value={formData.companyCity}
                      onChange={handleChange}
                      className="w-full p-2 border border-gray-300 rounded"
                    />
                  </div>
                  <div className="mb-4">
                    <label className="block text-gray-700 font-bold mb-2" htmlFor="companyZip">Company Zip</label>
                    <input
                      type="text"
                      name="companyZip"
                      value={formData.companyZip}
                      onChange={handleChange}
                      className="w-full p-2 border border-gray-300 rounded"
                    />
                  </div>
                  <div className="mb-4">
                    <label className="block text-gray-700 font-bold mb-2" htmlFor="companyAddress">Company Address</label>
                    <input
                      type="text"
                      name="companyAddress"
                      value={formData.companyAddress}
                      onChange={handleChange}
                      className="w-full p-2 border border-gray-300 rounded"
                    />
                  </div>
                  <button onClick={nextStep} className="bg-blue-500 text-white p-2 rounded">Next</button>
                </>
              )}
              {currentStep === 1 && (
                <>
                  <div className="mb-4">
                    <label className="block text-gray-700 font-bold mb-2" htmlFor="customerName">Customer Name</label>
                    <input
                      type="text"
                      name="customerName"
                      value={formData.customerName}
                      onChange={handleChange}
                      className="w-full p-2 border border-gray-300 rounded"
                    />
                  </div>
                  <div className="mb-4">
                    <label className="block text-gray-700 font-bold mb-2" htmlFor="customerEmail">Customer Email</label>
                    <input
                      type="email"
                      name="customerEmail"
                      value={formData.customerEmail}
                      onChange={handleChange}
                      className="w-full p-2 border border-gray-300 rounded"
                    />
                  </div>
                  <div className="mb-4">
                    <label className="block text-gray-700 font-bold mb-2" htmlFor="customerAddress">Customer Address</label>
                    <input
                      type="text"
                      name="customerAddress"
                      value={formData.customerAddress}
                      onChange={handleChange}
                      className="w-full p-2 border border-gray-300 rounded"
                    />
                  </div>
                  <div className="mb-4">
                    <label className="block text-gray-700 font-bold mb-2" htmlFor="customerCity">Customer City</label>
                    <input
                      type="text"
                      name="customerCity"
                      value={formData.customerCity}
                      onChange={handleChange}
                      className="w-full p-2 border border-gray-300 rounded"
                    />
                  </div>
                  <div className="mb-4">
                    <label className="block text-gray-700 font-bold mb-2" htmlFor="customerZip">Customer Zip</label>
                    <input
                      type="text"
                      name="customerZip"
                      value={formData.customerZip}
                      onChange={handleChange}
                      className="w-full p-2 border border-gray-300 rounded"
                    />
                  </div>
                  <button onClick={prevStep} className="bg-gray-500 text-white p-2 rounded">Previous</button>
                  <button onClick={nextStep} className="bg-blue-500 text-white p-2 rounded ml-2">Next</button>
                </>
              )}
              {currentStep === 2 && (
                <>
                  <div className="mb-4">
                    <label className="block text-gray-700 font-bold mb-2" htmlFor="invoiceNumber">Invoice Number</label>
                    <input
                      type="text"
                      name="invoiceNumber"
                      value={formData.invoiceNumber}
                      onChange={handleChange}
                      className="w-full p-2 border border-gray-300 rounded"
                    />
                  </div>
                  <div className="mb-4">
                    <label className="block text-gray-700 font-bold mb-2" htmlFor="invoiceDate">Invoice Date</label>
                    <input
                      type="date"
                      name="invoiceDate"
                      value={formData.invoiceDate}
                      onChange={handleChange}
                      className="w-full p-2 border border-gray-300 rounded"
                    />
                  </div>
                  <div className="mb-4">
                    <label className="block text-gray-700 font-bold mb-2" htmlFor="dueDate">Due Date</label>
                    <input
                      type="date"
                      name="dueDate"
                      value={formData.dueDate}
                      onChange={handleChange}
                      className="w-full p-2 border border-gray-300 rounded"
                    />
                  </div>
                  <button onClick={prevStep} className="bg-gray-500 text-white p-2 rounded">Previous</button>
                  <button onClick={nextStep} className="bg-blue-500 text-white p-2 rounded ml-2">Next</button>
                </>
              )}
              {currentStep === 3 && (
                <>
                  {formData.items.map((item, index) => (
                    <div key={index} className="mb-4">
                      <div className="flex">
                        <input
                          type="text"
                          name="description"
                          placeholder="Description"
                          value={item.description}
                          onChange={(e) => handleItemChange(index, e)}
                          className="w-full p-2 border border-gray-300 rounded mr-2"
                        />
                        <input
                          type="number"
                          name="quantity"
                          placeholder="Quantity"
                          value={item.quantity}
                          onChange={(e) => handleItemChange(index, e)}
                          className="w-1/4 p-2 border border-gray-300 rounded mr-2"
                        />
                        <input
                          type="number"
                          name="price"
                          placeholder="Price"
                          value={item.price}
                          onChange={(e) => handleItemChange(index, e)}
                          className="w-1/4 p-2 border border-gray-300 rounded"
                        />
                        <button onClick={() => deleteItem(index)} className="bg-red-500 text-white p-2 rounded ml-2">Delete</button>
                      </div>
                    </div>
                  ))}
                 
                  <button onClick={prevStep} className="bg-gray-500 text-white p-2 rounded mt-4">Previous</button>
                  <button onClick={nextStep} className="bg-blue-500 text-white p-2 rounded ml-2 mt-4">Next</button>
                  <button onClick={addItem} className="bg-green-500 text-white p-2 rounded  ml-96">Add Item</button>
                </>
              )}
              {currentStep === 4 && (
                <>
                  <div className="mb-4">
                    <label className="block text-gray-700 font-bold mb-2" htmlFor="subtotal">Subtotal</label>
                    <input
                      type="text"
                      name="subtotal"
                      value={calculateTotal()}
                      readOnly
                      className="w-full p-2 border border-gray-300 rounded"
                    />
                  </div>
                  <div className="mb-4">
                    <label className="block text-gray-700 font-bold mb-2" htmlFor="tax">Tax</label>
                    <input
                      type="text"
                      name="tax"
                      value={calculateTax()}
                      readOnly
                      className="w-full p-2 border border-gray-300 rounded"
                    />
                  </div>
                  <div className="mb-4">
                    <label className="block text-gray-700 font-bold mb-2" htmlFor="total">Total</label>
                    <input
                      type="text"
                      name="total"
                      value={calculateTotal() + calculateTax()}
                      readOnly
                      className="w-full p-2 border border-gray-300 rounded"
                    />
                  </div>
                  <button onClick={prevStep} className="bg-gray-500 text-white p-2 rounded">Previous</button>
                  <button onClick={handleSubmit} className="bg-blue-500 text-white p-2 rounded ml-2">Submit</button>
                </>
              )}
            </div>
          </div>
          {!isFormValid && <p className="text-red-500 text-center">Please fill in all required fields and add at least one item.</p>}
        </div>
        {renderTemplate()}
      </div>
    </div>
  );
};

export default Invoice;
