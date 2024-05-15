import { useState } from 'react';
import SideBar from "../components/SideBar";
import CustomerList from "../components/CustomerList";
import CustomerInfoBox from "../components/CustomerInfoBox";

const Customers = () => {
  const [boxOpen, setBoxOpen] = useState(false);
  const [customers, setCustomers] = useState([

  ]);

  const handleAddCustomer = (newCustomer) => {
    setCustomers([...customers, { id: Date.now(), ...newCustomer }]);
    setBoxOpen(false); // Close the modal after adding a new customer
  };

  const handleDeleteCustomer = (id) => {
    setCustomers(customers.filter(customer => customer.id !== id));
  };

  return (
    <div className="w-screen h-screen flex flex-row">
      <div class="absolute top-0 -z-10 h-full w-full bg-white"><div class="absolute bottom-auto left-auto right-0 top-0 h-[500px] w-[500px] -translate-x-[30%] translate-y-[20%] rounded-full bg-[rgba(173,109,244,0.5)] opacity-50 blur-[80px]"></div></div>
      <SideBar />
      <div className="flex flex-col w-full h-full items-center justify-center">
        <div className='w-full flex justify-end items-end mr-12 mb-2'>
          <button className='border-2 mt-14 border-purple-600 w-52 h-14 rounded-xl hover:bg-purple-600 hover:border-purple-300 hover:text-purple-300' onClick={() => setBoxOpen(true)}>
            Add New Customer
           </button>
        </div>
       
        <CustomerList customers={customers} onDeleteCustomer={handleDeleteCustomer} />
        {boxOpen && <CustomerInfoBox closeModal={() => setBoxOpen(false)} onAddCustomer={handleAddCustomer} />}
      </div>
    </div>
  );
};

export default Customers;
