import React, { useState } from 'react';
import SideBar from "../components/SideBar";
import { IoCloseOutline } from "react-icons/io5";
import { motion } from 'framer-motion';

const Schedule = () => {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(null);
  const [isEventBoxVisible, setIsEventBoxVisible] = useState(false);
  const [isAddEventBoxVisible, setIsAddEventBoxVisible] = useState(false);
  const [customers, setCustomers] = useState({});
  const [newCustomer, setNewCustomer] = useState({
    name: '',
    email: '',
    address: '',
    city: '',
    zip: '',
    items: [{ description: '', quantity: 0, price: 0 }]
  });

  const daysInMonth = (month, year) => new Date(year, month + 1, 0).getDate();

  const handleDayClick = (date) => {
    setSelectedDate(date);
    setIsEventBoxVisible(true);
  };

  const closeEventBox = () => {
    setIsEventBoxVisible(false);
    setSelectedDate(null);
  };

  const openAddEventBox = () => {
    setIsAddEventBoxVisible(true);
  };

  const closeAddEventBox = () => {
    setIsAddEventBoxVisible(false);
    setNewCustomer({
      name: '',
      email: '',
      address: '',
      city: '',
      zip: '',
      items: [{ description: '', quantity: 0, price: 0 }]
    });
  };

  const handleMonthChange = (offset) => {
    const newMonth = new Date(currentMonth.setMonth(currentMonth.getMonth() + offset));
    setCurrentMonth(new Date(newMonth));
  };

  const handleNewCustomerChange = (e) => {
    const { name, value } = e.target;
    setNewCustomer({ ...newCustomer, [name]: value });
  };

  const handleItemChange = (index, e) => {
    const { name, value } = e.target;
    const newItems = [...newCustomer.items];
    newItems[index][name] = name === 'quantity' || name === 'price' ? parseFloat(value) : value;
    setNewCustomer({ ...newCustomer, items: newItems });
  };

  const addItem = () => {
    setNewCustomer({ ...newCustomer, items: [...newCustomer.items, { description: '', quantity: 0, price: 0 }] });
  };

  const deleteItem = (index) => {
    const newItems = newCustomer.items.filter((_, itemIndex) => itemIndex !== index);
    setNewCustomer({ ...newCustomer, items: newItems });
  };

  const handleAddCustomer = () => {
    if (newCustomer.name.trim() && newCustomer.email.trim()) {
      const dateKey = selectedDate.toDateString();
      setCustomers({
        ...customers,
        [dateKey]: [...(customers[dateKey] || []), newCustomer]
      });
      closeAddEventBox();
    }
  };

  const calculateTotal = (items) => {
    return items.reduce((total, item) => total + (item.quantity * item.price), 0);
  };

  const calculateTax = (items) => {
    const subtotal = calculateTotal(items);
    const taxRate = 0.13; // 13% HST for Ontario
    return subtotal * taxRate;
  };

  const renderDays = () => {
    const days = [];
    const year = currentMonth.getFullYear();
    const month = currentMonth.getMonth();
    const totalDays = daysInMonth(month, year);

    for (let day = 1; day <= totalDays; day++) {
      const date = new Date(year, month, day);
      const dateKey = date.toDateString();
      const dayCustomers = customers[dateKey] || [];

      days.push(
        <motion.div
          key={day}
          className="w-1/7 h-24 border p-2 cursor-pointer shadow-md rounded-lg relative mr-3 mt-3"
          onClick={() => handleDayClick(date)}
          whileHover={{ scale: 1.1 }}
        >
          <span className="block text-left">{day}</span>
          {dayCustomers.length > 0 && (
            <div className="absolute bottom-2 left-2 w-full">
              <span className="text-xs bg-gray-200 p-1 rounded">{dayCustomers[0].name}</span>
              {dayCustomers.length > 1 && (
                <div className="relative inline-block group">
                  <span className="text-xs bg-gray-200 p-1 rounded ml-1">+{dayCustomers.length - 1}</span>
                  <div className="absolute left-0 top-8 bg-white border shadow-lg p-2 rounded hidden group-hover:block z-10">
                    {dayCustomers.slice(1).map((customer, index) => (
                      <div key={index} className="text-xs">{customer.name}</div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </motion.div>
      );
    }

    return days;
  };

  return (
    <div className="w-screen h-screen flex flex-row">
      <SideBar />
      <div className="w-full h-screen p-4 flex flex-col">
        <div className="flex justify-between mb-4">
          <button onClick={() => handleMonthChange(-1)}>Previous Month</button>
          <h2>{currentMonth.toLocaleString('default', { month: 'long' })} {currentMonth.getFullYear()}</h2>
          <button onClick={() => handleMonthChange(1)}>Next Month</button>
        </div>
        <div className="grid grid-cols-7 gap-2">
          {renderDays()}
        </div>
        {isEventBoxVisible && (
          <div className="fixed top-0 right-0 w-1/3 h-full bg-white shadow-lg p-4 overflow-y-auto">
            <button onClick={closeEventBox} className="mb-4 border-2 border-gray-200 p-1 rounded-xl shadow-md"><IoCloseOutline /></button>
            <h3 className='font-bold'>Customers for {selectedDate?.toDateString()}</h3>
            <ul>
              {(customers[selectedDate?.toDateString()] || []).map((customer, index) => (
                
                <li key={index} className="flex flex-col w-full rounded-xl border-2 border-gray-200 mb-2 p-2">
                  <strong className="border-b border-b-gray-300">{customer.name}</strong>
                  <p>{customer.email}</p>
                  <p>{customer.address}, {customer.city}, {customer.zip}</p>
                  <div>
                    <h4>Items:</h4>
                    {customer.items.map((item, i) => (
                      <div key={i}>
                        <p>Description: {item.description}</p>
                        <p>Quantity: {item.quantity}</p>
                        <p>Price: {item.price}</p>
                      </div>
                    ))}
                  </div>
                  <p>Subtotal: ${calculateTotal(customer.items).toFixed(2)}</p>
                  <p>Tax: ${calculateTax(customer.items).toFixed(2)}</p>
                  <p>Total: ${(calculateTotal(customer.items) + calculateTax(customer.items)).toFixed(2)}</p>
                  <button onClick={() => handleDeleteCustomer(selectedDate, index)} className="mt-2 bg-red-500 text-white p-2 rounded w-28">Delete</button>

                </li>
                
              ))}
            </ul>
            <button className="mt-2 bg-blue-500 text-white p-2 rounded" onClick={openAddEventBox}>Add Customer</button>
          </div>
        )}
        {isAddEventBoxVisible && (
          <div className="fixed top-0 right-0 w-1/3 h-full bg-gray-100 shadow-lg p-4 overflow-y-auto	">
            <button onClick={closeAddEventBox} className="mb-4"><IoCloseOutline /></button>
            <h3>Add Customer for {selectedDate?.toDateString()}</h3>
            <div className="mb-4">
              <label className="block text-gray-700 font-semibold mb-2" htmlFor="name">Name</label>
              <input
                type="text"
                name="name"
                value={newCustomer.name}
                onChange={handleNewCustomerChange}
                className="w-full p-2 border border-gray-300 rounded"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 font-bold mb-2" htmlFor="email">Email</label>
              <input
                type="email"
                name="email"
                value={newCustomer.email}
                onChange={handleNewCustomerChange}
                className="w-full p-2 border border-gray-300 rounded"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 font-bold mb-2" htmlFor="address">Address</label>
              <input
                type="text"
                name="address"
                value={newCustomer.address}
                onChange={handleNewCustomerChange}
                className="w-full p-2 border border-gray-300 rounded"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 font-bold mb-2" htmlFor="city">City</label>
              <input
                type="text"
                name="city"
                value={newCustomer.city}
                onChange={handleNewCustomerChange}
                className="w-full p-2 border border-gray-300 rounded"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 font-bold mb-2" htmlFor="zip">Zip Code</label>
              <input
                type="text"
                name="zip"
                value={newCustomer.zip}
                onChange={handleNewCustomerChange}
                className="w-full p-2 border border-gray-300 rounded"
              />
            </div>
            <h4 className="font-semibold mb-2">Items</h4>
            {newCustomer.items.map((item, index) => (
              <div key={index} className="mb-4">
                <input
                  type="text"
                  name="description"
                  placeholder="Description"
                  value={item.description}
                  onChange={(e) => handleItemChange(index, e)}
                  className="w-full p-2 border border-gray-300 rounded mb-2"
                />
                <input
                  type="number"
                  name="quantity"
                  placeholder="Quantity"
                  value={item.quantity}
                  onChange={(e) => handleItemChange(index, e)}
                  className="w-full p-2 border border-gray-300 rounded mb-2"
                />
                <input
                  type="number"
                  name="price"
                  placeholder="Price"
                  value={item.price}
                  onChange={(e) => handleItemChange(index, e)}
                  className="w-full p-2 border border-gray-300 rounded"
                />
                <button onClick={() => deleteItem(index)} className="bg-red-500 text-white p-2 rounded ml-2 mt-2">Delete Item</button>
              </div>
            ))}
            <button onClick={addItem} className="bg-green-500 text-white p-2 rounded mb-4">Add Item</button>
            <button className="mt-2 bg-blue-500 text-white p-2 rounded" onClick={handleAddCustomer}>Add Customer</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Schedule;
