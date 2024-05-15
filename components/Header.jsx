import { useState } from "react";
import image from "../assets/What.png";
import { AnimatePresence, motion } from 'framer-motion';


const containerY = (delay) => ({
  hidden: { y: -100, opacity: 0 },
  visible:{y:0, opacity:1,transition:{duration:0.5,delay:delay}}

})


function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const Header = () => {
  return (
    <motion.div
    variants={containerY(0)}
    initial="hidden"
    animate="visible"
      className="w-screen bg-transparent h-48   flex flex-row border-b border-purple-200">
      <div className="w-4/12">
        <a href="/home"> <img className="h-48 w-48 mb-4" src={image} alt="" /></a>
     
      </div>
      <div className="w-4/12 flex items-center justify-start">
        <FlyoutLink href="#"  flyoutContent={<Features />}>
          Features
        </FlyoutLink>
        <a className="mx-4 " href="#">
          Sub Plans
        </a>
      </div>
      <div className="w-3/12 flex justify-end items-center  ">
       
            <a href="/register" className="mx-4 	font-semibold tracking-wider hover:text-purple-700	">Register Now!</a>
           <a href="/login" className="mx-4 font-semibold tracking-wider	hover:text-purple-700">Log In</a>
      </div>

    </motion.div>
  );
};

const FlyoutLink = ({ children, href, flyoutContent }) => {
  const [open, setOpen] = useState(false);

  const showFlyOut = open && flyoutContent;
  return (
    <div
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
      className="group relative h-fit w-fit"
    >
      <a href={href} className="text-violet-800">
        {children}
        <span
          style={{
            transform: showFlyOut ? "scaleX(1)" : "scaleX(0)"
          }}
          className="absolute -bottom-2 -left-2 -right-2 h-1 origin-left rounded-full bg-indigo-300 transition-transform duration-300 ease-out"
        />
      </a>
      <AnimatePresence>
      {showFlyOut && (
        <motion.div
          initial={{opacity:0,y:-15}}
          animate={{opacity:1,y:0}}
          exit={{ opacity: 0, y: -15 }}
          transition={{duration:0.3,ease:"easeOut"}}
          style={{x:"-50%"}}
          className="absolute left-1/2 top-12 text-black">
          <div className="absolute -top-6 left-0 right-0 h-6 bg-transparent"></div>
          <div className="absolute left-1/2 top-0 h-4 w-4 -translate-x-1/2 -translate-y-1/2 rotate-45 bg-purple-100 "></div>
          {flyoutContent}
        </motion.div>
        )}
        </AnimatePresence>
    </div>
  );
};



const Features = () => {
  return (
    <div className=" w-64 bg-purple-100 p-6 shadow-xl text-left rounded-3xl	">
      <div className="mt-3 space-y-3 ">
        <h3 className="font-semibold">Invoice</h3>
        <a href="#" className="block text-sm hover:underline">Invoicing</a>
        <a href="#"  className="block text-sm hover:underline">Pricing</a>
      </div>
      <div className="mt-3 space-y-3 ">
        <h3 className="font-semibold">Templates</h3>
        <a href="#" className="block text-sm hover:underline">Invoicing Templates</a>
        
      </div>
      <div className="mt-3 space-y-3">
        <h3 className="font-semibold">Expense Tracker</h3>
      <a href="#" className="block text-sm hover:underline">Expense tracking Features</a>
      </div>
    </div>
  );
};

export default Header;
