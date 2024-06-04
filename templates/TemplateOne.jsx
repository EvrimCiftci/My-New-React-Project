// TemplateOne.jsx
import React from 'react';

const TemplateOne = ({ formData, calculateTotal, calculateTax }) => {
  return (
    <div className="h-auto w-5/12 border-2 border-gray-200 shadow-lg rounded-xl p-4 bg-white">
      <div className="bg-white rounded-lg shadow-lg px-8 py-10 max-w-xl mx-auto ">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center">
            <div className="text-gray-700 font-semibold text-lg">{formData.companyName}</div>
          </div>
          <div className="text-gray-700">
            <div className="font-bold text-xl mb-2">INVOICE</div>
            <div className="text-sm">Date: {formData.invoiceDate}</div>
            <div className="text-sm">Invoice #: {formData.invoiceNumber}</div>
          </div>
        </div>
        <div className="border-b-2 border-gray-300 pb-8 mb-8">
          <h2 className="text-2xl font-bold mb-4">Bill To:</h2>
          <div className="text-gray-700 mb-2 h-7">{formData.customerName}</div>
          <div className="text-gray-700 mb-2 h-7">{formData.customerAddress}</div>
          <div className="text-gray-700 mb-2 h-7">{formData.customerCity} {formData.customerZip}</div>
          <div className="text-gray-700 h-4">{formData.customerEmail}</div>
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
        <div className="border-t-2 border-gray-300 pt-8 mb-8">
          <div className="text-gray-700 mb-2">
            Payment is due within {Math.ceil((new Date(formData.dueDate) - new Date(formData.invoiceDate)) / (1000 * 3600 * 24))} days. Late payments are subject to fees.
          </div>
          <div className="text-gray-700 mb-2">Please make checks payable to {formData.companyName} and mail to:</div>
          <div className="text-gray-700">{formData.companyAddress}, {formData.companyCity}, {formData.companyZip}</div>
        </div>
      </div>
    </div>
  );
};

export default TemplateOne;
