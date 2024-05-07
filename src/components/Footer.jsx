import { FaLinkedin } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { FaFacebook } from "react-icons/fa";
import { AnimatePresence, motion } from 'framer-motion';
import img from '../assets/What.png'
const Footer = () => {

  return (
<div className="w-screen flex flex-wrap items-center bg-gray-100 h-96">
  <div className="w-screen sm:w-1/2 flex justify-center items-center mb-6 sm:mb-0">
    <div className=" flex flex-wrap  border-b-black border-t-black border-b-2 border-t-2 justify-center items-center w-80 bg-transparent">
      <div className="h-3/12">
        <img className="h-24 w-24" src={img} alt="logo" />
      </div>
      <div className="flex justify-between w-5/6 h-24 items-center">
        <a href="#">
          <motion.div
            whileHover={{ scale: 1.2 }}
            onHoverStart={e => {}}
            onHoverEnd={e => {}}
            className="rounded-xl h-10 w-10 bg-white rounded-full flex justify-center items-center"
          >
            <FaLinkedin className="text-2xl text-violet-800" />
          </motion.div>
        </a>
        <a href="#">
          <motion.div
            whileHover={{ scale: 1.2 }}
            onHoverStart={e => {}}
            onHoverEnd={e => {}}
            className="rounded-xl h-10 w-10 bg-white rounded-full flex justify-center items-center"
          >
            <FaXTwitter className="text-2xl text-violet-800" />
          </motion.div>
        </a>
        <a href="#">
          <motion.div
            whileHover={{ scale: 1.2 }}
            onHoverStart={e => {}}
            onHoverEnd={e => {}}
            className="rounded-xl h-10 w-10 bg-white rounded-full flex justify-center items-center"
          >
            <FaFacebook className="text-2xl text-violet-800" />
          </motion.div>
        </a>
      </div>
    </div>
  </div>
  <div className="w-full sm:w-1/2 flex justify-center">
    <div className="ml-8 flex flex-col w-4/12 items-start justify-center h-60">
      <div className="font-bold text-xl border-l-4 pl-2 border-black mt-2 sm:mt-0">
        <h2>WHATABILL</h2>
      </div>
      <div className="flex items-start my-2">
        <a href="#" className="mx-1 text-sm">About Us</a>
      </div>
    </div>
    <div className="mt-4 flex flex-col w-4/12 items-start justify-center h-60">
      <div className=" font-bold text-xl border-l-4 pl-2 border-black mt-2 sm:mt-0">
        <h2 >Quick Links</h2>
      </div>
      <div className="flex items-start flex-col my-2">
        <a href="#" className="mx-1 text-sm">Invoice Templates</a>
        <a href="#" className="mx-1 text-sm">Free invoice generator</a>
        <a href="#" className="mx-1 text-sm">Fast Payment</a>
      </div>
    </div>
    <div className="flex flex-col w-4/12 items-start justify-center h-60">
      <div className="font-bold text-xl border-l-4 pl-2 border-black mt-2 sm:mt-0">
        <h2>Contact Us</h2>
      </div>
      <div className="flex items-start my-2">
        <a href="#" className="mx-1 text-sm">Email Us</a>
      </div>
    </div>
  </div>
</div>



  )

}

export default Footer