import React, { useState } from 'react';
import logo from "../assets/What.png";
import { FaAngleLeft } from "react-icons/fa";
import { FaFileInvoiceDollar } from "react-icons/fa6";
import { MdHandshake } from "react-icons/md";
import { IoPeopleSharp } from "react-icons/io5";
import { RiCalendarScheduleFill } from "react-icons/ri";
import { IoIosSettings } from "react-icons/io";

const SideBar = () => {

  const [open, setOpen] = useState(true);
  const Menus = [
    { title: "Invoice", src: <FaFileInvoiceDollar />, href: "/invoice" },
    { title: "Offer", src: <MdHandshake />, href: "/offer" },
    { title: "Customer management", src: <IoPeopleSharp />, href: "/Customers" },
    { title: "Schedule", src: <RiCalendarScheduleFill />, href: "/schedule" },
    { title: "Setting", src: <IoIosSettings />, gap: true },  
  ];

  const handleMenuClick = (href) => {
    // Navigate to the specified route
    window.location.href = href;
  };

  return (
    <div className={`${open ? 'w-72' : 'w-20'} duration-300 h-screen p-5 pt-8 bg-purple-600 relative `}>
      <FaAngleLeft className={`absolute cursor-pointer
        -right-3 top-9 w-7 h-7 
          bg-white border-2 border-purple-600 rounded-full
          ${!open && "rotate-180"}`}
        onClick={() => setOpen(!open)} />
      <div className='flex gap-x-4 items-center'>
        <img src={logo} alt="logo" className={`cursor-pointer duration-500 ${open ? 'w-32 h-auto rotate-[360deg]' : 'w-full h-full'}`} />
      </div>
      <ul className='pt-6'>
        {Menus.map((menu, index) => (
          <li key={index} className={`text-purple-300 text-sm cursor-pointer flex
            gap-x-4  items-center p-2 hover:bg-purple-500 rounded-md ${menu.gap ? 'mt-9' : 'mt-2'}`}
            onClick={() => handleMenuClick(menu.href)}>
            <button className='text-3xl '>{menu.src}</button>
            <span className={`${!open ? "hidden" : "inline"} origin-left duration-200`}>{menu.title}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SideBar;
