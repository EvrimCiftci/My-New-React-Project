import { AnimatePresence, motion } from 'framer-motion';


const GetStarted = () => {

  return (
    <div className="flex w-screen flex-col items-center justify-center">
      <motion.div
       whileInView={{ opacity: 1, y: 0 }}
        initial={{ opacity: 0, y: -100 }}
        transition={{duration:1}}
        className="text-5xl flex flex-row justify-center font-semibold w-screen bg-transparent items-center pt-36 text-center tracking-wider">
      <p className="w-1/3 text-center">
        Simple <span className="font-extrabold text-violet-800">Invoicing</span> online web app for Local businesses and freelancers
      </p>
    </motion.div>
      <motion.button
       whileInView={{ opacity: 1, x: 0 }}
       initial={{ opacity: 0, x: -100 }}
       transition={{duration:1}}
       whileHover={{ scale: 1.1 }}
       onHoverStart={e => {}}
       onHoverEnd={e => {}}
       className="bg-purple-300 w-48 sm:w-60 mt-4 h-20 sm:h-24 rounded-full border-purple-800 border-2 text-3xl font-semibold tracking-wider text-purple-800 hover:bg-purple-800 hover:text-purple-200 hover:border-purple-200">
       Get Started
    </motion.button>
  </div>
  
  
  )

}

export default GetStarted