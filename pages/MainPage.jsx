import SideBar from '../components/SideBar'
import PastInvoices from '../components/PastInvoices'
import SideBarItem from '../components/SideBar'
import { FaFileInvoiceDollar } from "react-icons/fa6";
import { IoPeople } from "react-icons/io5";
import { FaHandshake } from "react-icons/fa";
import { IoIosSettings } from "react-icons/io";

const MainPage = () => {
  return (
    <div className='h-screen w-screen flex flex-wrap'>
      <div className="absolute top-0 -z-10 h-full w-full bg-white">
              <div className="absolute bottom-auto left-auto right-0 top-0 h-[500px] w-[500px] -translate-x-[30%] translate-y-[20%] rounded-full bg-[rgba(173,109,244,0.5)] opacity-50 blur-[80px]"></div>
            </div>
      <SideBar/>
      <div className='p-7 text-2xl font-semibold flex-1 h-screen w-full'>
        <div className='h-3/6 w-full  flex flex-wrap'>
          
        </div>
      </div>
      
    </div>
  );


}

export default MainPage