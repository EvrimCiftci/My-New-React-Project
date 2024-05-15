import Accordion from './Accordion'
import { AnimatePresence, motion } from 'framer-motion';


const FAQ = () => {
  return (
<div className="flex flex-wrap w-screen h-auto justify-center items-center ">
      <motion.div
         whileInView={{ opacity: 1, x: 0 }} 
         initial={{ opacity: 0, x: -100 }}
         transition={{duration:1}}
        className=" border-t border-black border-b p-10  w-56	  text-left font-bold ">
       <h2 className="text-3xl tracking-wider w-1/3">Frequently Asked Questions</h2>
      </motion.div>
      <div
            
        className=" w-8/12 my-4 flex flex-col  items-center justify-center h-svh	">
        <motion.div
        whileInView={{ opacity: 1, y: 0 }}
        initial={{ opacity: 0, y: -100 }}
        transition={{duration:1}}
          className="shadow-xl p-4 mb-4 bg-gray-200 rounded-lg w-9/12 ">
          <Accordion  title="Is Whatabill's software something I need to install" answer="no it's not , it's completely webapp that you can use on your browser " />
        </motion.div>
        <motion.div
         whileInView={{ opacity: 1, y: 0 }}
         initial={{ opacity: 0, y: -100 }}
         transition={{duration:1}}
          className="shadow-xl  p-4 my-4 bg-gray-200 rounded-lg w-9/12 ">
          <Accordion  title="How can I change my subscription plan?" answer="Simply You can go to your account settings , click on my plan and you change your plan as you want " />
        </motion.div>
        <motion.div
          whileInView={{ opacity: 1, y: 0 }}
          initial={{ opacity: 0, y: -100 }}
          transition={{duration:1}}
          className="shadow-xl  p-4 my-4 bg-gray-200 rounded-lg w-9/12 ">
          <Accordion  title="Do you provide customer support?" answer="Yes,We do. You can find our contact information on the website." />
        </motion.div>
        <motion.div
        whileInView={{ opacity: 1, y: 0 }}
        initial={{ opacity: 0, y: -100 }}
        transition={{duration:1}}
          className="shadow-xl  p-4 my-4 bg-gray-200 rounded-lg w-9/12 ">
          <Accordion  title="Do you have free trial that I can try?" answer="Yes,We do. You can check free trial options on the website" />
        </motion.div>
      </div>
    </div>
  )
}

export  default FAQ