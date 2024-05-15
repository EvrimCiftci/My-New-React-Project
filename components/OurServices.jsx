import img from "../assets/Allura.png"
import img2 from "../assets/Chat.png"
import img3 from "../assets/bill.png"
import { AnimatePresence, motion } from 'framer-motion';

const OurServices = () => {
     return (
<div className="w-screen flex flex-col text-center p-2 border-t-2 border-b-2 border-violet-200">
      <motion.h3
           whileInView={{ opacity: 1, y: 0 }}
           initial={{ opacity: 0, y: -40 }}
           transition={{duration:1}}
        className="text-4xl tracking-widest text-violet-600 font-bold">HOW TO START?</motion.h3>
      <motion.div
          whileInView={{ opacity: 1, x: 0 }}
          initial={{ opacity: 0, x: -100 }}
          transition={{duration:1}} 
        className="flex flex-wrap justify-center items-center w-screen sm:flex-col md:flex-row lg:flex-row">
        <motion.div
           whileHover={{ y:-10,scale: 1.1}}
           onHoverStart={e => {}}
           onHoverEnd={e => {}}
          className="border-2 border-purple-200 h-96 shadow-sm shadow-gray-900 rounded-2xl mx-5 my-7 flex flex-col justify-center items-center sm:w-80 md:w-1/6 lg:w-1/6 hover:shadow-2xl	">
          <img className="h-40 w-40 rounded-full border-black border-2 object-contain" src={img} alt="image" />
          <div className="text-center mt-3 p-5">
            <h3 className="text-2xl font-semibold text-violet-700">Register</h3>
            <p className="text-l">Register now! and get access to our services.</p>
          </div>
       </motion.div>
        <motion.div
          whileHover={{ y:-10,scale: 1.1}}
          onHoverStart={e => {}}
          onHoverEnd={e => {}}
          className="border-2 border-purple-200 h-96 shadow-sm shadow-gray-900 rounded-2xl mx-5 my-7 flex flex-col justify-center items-center sm:w-80 md:w-1/6 lg:w-1/6 hover:shadow-2xl	">
      <img className="h-40 w-40 rounded-full border-black border-2 object-contain" src={img2} alt="image" />
      <div className="text-center mt-3 p-5">
        <h3 className="text-2xl font-semibold text-violet-700">Choose</h3>
        <p className="text-l"> your invoice template from bunch of different template.</p>
      </div>
    </motion.div>
        <motion.div
           whileHover={{ y:-10,scale: 1.1}}
           onHoverStart={e => {}}
           onHoverEnd={e => {}}
          className="border-2 border-purple-200 h-96 shadow-sm shadow-gray-900 rounded-2xl mx-5 my-7 flex flex-col justify-center items-center sm:w-80 md:w-1/6 lg:w-1/6 hover:shadow-2xl	">
      <img className="h-40 w-40 rounded-full border-black border-2 object-contain" src={img3} alt="image" />
      <div className="text-center mt-3 p-5">
        <h3 className="text-2xl font-semibold text-violet-700">Create </h3>
        <p className="text-l">Your invoice for your local business</p>
      </div>
    </motion.div>
  </motion.div>
</div>


   
  )
}

export default OurServices