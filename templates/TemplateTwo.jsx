// TemplateTwo.jsx
import React from 'react';

const TemplateTwo = ({ formData, calculateTotal, calculateTax }) => {
  return (
    <div className="h-auto w-5/12 border-2 border-gray-200 shadow-lg rounded-xl p-4 bg-white">
      <div className="bg-white rounded-lg shadow-lg px-8 py-10 max-w-xl mx-auto">
        <div className="text-center mb-8">
          <div className="text-gray-700 font-bold text-2xl">{formData.companyName}</div>
          <div className="text-gray-700">{formData.companyAddress}</div>
          <div className="text-gray-700">{formData.companyCity}, {formData.companyZip}</div>
        </div>
        <div className="flex justify-between mb-8">
          <div className="text-gray-700">
            <h2 className="text-xl font-bold mb-2">Bill To:</h2>
            <div className="mb-2">{formData.customerName}</div>
            <div className="mb-2">{formData.customerAddress}</div>
            <div className="mb-2">{formData.customerCity}, {formData.customerZip}</div>
            <div>{formData.customerEmail}</div>
          </div>
          <div className="text-gray-700 text-right">
            <div className="text-xl font-bold">INVOICE</div>
            <div>Date: {formData.invoiceDate}</div>
            <div>Invoice #: {formData.invoiceNumber}</div>
          </div>
        </div>
        <table className="w-full text-left mb-8">
          <thead>
            <tr>
              <th className="text-gray-700 font-bold uppercase py-2">Description</th>
              <th className="text-gray-700 font-bold uppercase py-2">Quantity</th>
              <th className="text-gray-700 font-bold uppercase py-2">Price</th>
              <th className="text-gray-700 font-bold uppercase py-2">Total</th>
            </tr>
          </thead>
          <tbody>
            {formData.items.map((item, index) => (
              <tr key={index}>
                <td className="py-4 text-gray-700">{item.description}</td>
                <td className="py-4 text-gray-700">{item.quantity}</td>
                <td className="py-4 text-gray-700">${item.price.toFixed(2)}</td>
                <td className="py-4 text-gray-700">${(item.quantity * item.price).toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="flex justify-end mb-8">
          <div className="text-gray-700 mr-2">Subtotal:</div>
          <div className="text-gray-700">${calculateTotal().toFixed(2)}</div>
        </div>
        <div className="text-right mb-8">
          <div className="text-gray-700">Tax: ${calculateTax().toFixed(2)}</div>
        </div>
        <div className="flex justify-end mb-8">
          <div className="text-gray-700 font-bold text-xl">${(calculateTotal() + calculateTax()).toFixed(2)}</div>
        </div>
        <div className="text-center border-t-2 border-gray-300 pt-8">
          <div className="text-gray-700 mb-2">Please make payments to:</div>
          <div className="text-gray-700">{formData.companyName}</div>
          <div className="text-gray-700">{formData.companyAddress}, {formData.companyCity}, {formData.companyZip}</div>
        </div>
      </div>
    </div>
  );
};

export default TemplateTwo;
