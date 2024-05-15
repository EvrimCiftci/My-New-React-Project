import React, { useState } from 'react';

// Function to render individual invoice boxes
const InvoiceBox = ({ shipTo, billedTo, total, date }) => {
  return (
    <div className="w-3/6 h-full bg-white rounded-lg shadow-md p-4 flex flex-col justify-between">
      <div>
        <p className="font-semibold text-lg">Ship To: {shipTo}</p>
        <p className="font-semibold text-lg">Billed To: {billedTo}</p>
        <p className="font-semibold text-lg">Total: {total}</p>
        <p className="font-semibold text-lg">Date: {date}</p>
      </div>
      <button className="bg-purple-600 text-white px-4 py-2 rounded-md text-lg">See Details</button>
    </div>
  );
};

// Sample invoices data
const invoices = [
  {
    shipTo: 'Customer A',
    billedTo: 'Company X',
    total: '$100',
    date: '2022-05-01',
  },
  {
    shipTo: 'Customer B',
    billedTo: 'Company Y',
    total: '$200',
    date: '2022-05-05',
  },
  {
    shipTo: 'Customer C',
    billedTo: 'Company Z',
    total: '$150',
    date: '2022-05-10',
  },
  {
    shipTo: 'Customer D',
    billedTo: 'Company W',
    total: '$180',
    date: '2022-05-15',
  },
  {
    shipTo: 'Customer E',
    billedTo: 'Company V',
    total: '$220',
    date: '2022-05-20',
  },
  {
    shipTo: 'Customer F',
    billedTo: 'Company U',
    total: '$130',
    date: '2022-05-25',
  },
];

// Function to render past invoices component with carousel
const PastInvoices = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex === invoices.length - 1 ? 0 : prevIndex + 1));
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? invoices.length - 1 : prevIndex - 1));
  };

  return (
    <div className="flex flex-col w-6/12 h-82 bg-purple-100 shadow-lg p-4 relative">
      <div className="flex w-full h-16 p-3 border-b border-purple-300">
        <h3 className="font-extrabold tracking-widest text-purple-600">Past Invoices</h3>
      </div>
      <div className="w-full h-4/6 flex items-center justify-center">
        {/* Carousel component */}
        <div className="relative w-full h-full">
          {invoices.map((invoice, index) => (
            <div
              key={index}
              className={`w-full h-full absolute top-0 left-full transform transition-transform duration-500 ${
                index === currentIndex ? 'translate-x-0' : 'translate-x-full'
              }`}
            >
              <InvoiceBox {...invoice} />
            </div>
          ))}
        </div>
        <button
          className="absolute top-1/2 left-2 transform -translate-y-1/2 bg-transparent text-gray-500 px-2 py-1 rounded-full transition-all duration-300 hover:bg-gray-200"
          onClick={prevSlide}
        >
          {'<'}
        </button>
        <button
          className="absolute top-1/2 right-2 transform -translate-y-1/2 bg-transparent text-gray-500 px-2 py-1 rounded-full transition-all duration-300 hover:bg-gray-200"
          onClick={nextSlide}
        >
          {'>'}
        </button>
      </div>
    </div>
  );
};

export default PastInvoices;
