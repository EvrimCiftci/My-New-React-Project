import { FaStar } from "react-icons/fa";
import img from "../assets/phone.png"
import { AnimatePresence, motion } from 'framer-motion';

const WhyChooseUs = () => {

  return (
    <div className="w-screen flex flex-wrap h-auto mt-28 ">
      <motion.div
           whileInView={{ opacity: 1, x: 0 }}
           initial={{ opacity: 0, x: -100 }}
           transition={{duration:1}}
        className="w-6/12 flex flex-wrap items-center justify-center">
        <div className="w-10/12 flex flex-col text-center items-start justify-center">
          <h3 className="text-2xl tracking-widest	text-purple-800 font-semibold">Why Choose Us</h3>
          <h2 className="text-4xl ">You get online invoice features</h2>
          <p className="text-m text-gray-500 my-3 ">
            Our platform offers bunch of different invoice templates and make it simple for you to create invoices in different templates by couple clicks.
          </p>
          <div className="flex flex-wrap w-full justify-between">
            <div className="flex flex-col">
              <div className="flex flex-row p-3 w-fit items-center justify-between ">
                <FaStar className="text-purple-800 text-3xl w-8 h-8" />
                  <p>Easy to use and navigate.</p>
              </div>
              <div className="flex flex-row p-3  w-fit items-center justify-between">
                <FaStar className="text-purple-800 text-3xl  w-8 h-8" />
                  <p >More than 10+ invoice Templates.Customize them as your needs</p>
              </div>
            </div>
            <div className="flex flex-col ">
            <div className="flex flex-row p-3  w-fit items-center justify-between ">
                <FaStar className="text-purple-800 text-3xl w-8 h-8" />
                  <p>Fair prices. No hidden charges.</p>
              </div>
              <div className="flex flex-row p-3  w-fit items-center justify-between ">
                <FaStar className="text-purple-800 text-3xl w-8 h-8" />
                  <p>Fast Customer Support.</p>
              </div>
            </div>
          
            <a href="#">
            <div className="w-full h-40 flex items-center justify-center cursor-pointer">
  <div
    className="relative inline-flex items-center justify-start py-3 pl-4 pr-12 overflow-hidden font-semibold shadow text-indigo-600 transition-all duration-150 ease-in-out rounded hover:pl-10 hover:pr-6 bg-gray-50 dark:bg-gray-700 dark:text-white dark:hover:text-gray-200 dark:shadow-none group"
  >
    <span
      className="absolute bottom-0 left-0 w-full h-1 transition-all duration-150 ease-in-out bg-purple-600 group-hover:h-full"
    ></span>
    <span
      className="absolute right-0 pr-4 duration-200 ease-out group-hover:translate-x-12"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        stroke="currentColor"
        fill="none"
        class="w-5 h-5 text-purple-800"
      >
        <path
          d="M14 5l7 7m0 0l-7 7m7-7H3"
          stroke-width="2"
          stroke-linejoin="round"
          stroke-linecap="round"
        ></path>
      </svg>
    </span>
    <span
      className="absolute left-0 pl-2.5 -translate-x-12 group-hover:translate-x-0 ease-out duration-200"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        stroke="currentColor"
        fill="none"
        class="w-5 h-5 text-purple-200"
      >
        <path
          d="M14 5l7 7m0 0l-7 7m7-7H3"
          stroke-width="2"
          stroke-linejoin="round"
          stroke-linecap="round"
        ></path>
      </svg>
    </span>
    <span
      className="relative w-full text-left transition-colors duration-200 ease-in-out group-hover:text-white dark:group-hover:text-gray-200"
      >Learn More</span>
  </div>
</div>

            </a>
          </div>
        </div>
        
      </motion.div>
      <div className="w-6/12 flex flex-wrap items-center justify-center">
          <motion.img whileInView={{ opacity: 1, y: 0 }}
        initial={{ opacity: 0, y: -100 }}
        transition={{duration:1}} src={img} alt="img"  />
      </div>
    </div>
  )

}

export  default WhyChooseUs