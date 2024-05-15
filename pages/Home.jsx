import { useState } from 'react';
import Header from '../components/Header';
import GetStarted from '../components/GetStarted';
import OurServices from '../components/OurServices';
import FAQ from '../components/FASQ';
import Footer from '../components/Footer';
import BackToTopButton from '../components/BackToToButton';
import Copyright from '../components/Copyright';
import WhyChooseUs from '../components/WhyChooseUs';
import ScrollBarIndicator from '../components/ScrollBarIndicator';
import Testimonial from '../components/Testimonial';
import LiveSupportButton from '../components/LiveSupportButton';
import AboutUs from '../components/AboutUs';
import PricingComponent from '../components/PricingComponent';


function Home() {

        return (
          <>
            <ScrollBarIndicator />
            <div className="absolute top-0 -z-10 h-full w-full bg-white">
              <div className="absolute bottom-auto left-auto right-0 top-0 h-[500px] w-[500px] -translate-x-[30%] translate-y-[20%] rounded-full bg-[rgba(173,109,244,0.5)] opacity-50 blur-[80px]"></div>
            </div>
            <div className="h-svh bg-[url(./assets/City.png)] bg-no-repeat bg-center bg-cover ">
              <Header />
              <GetStarted />
            </div>
            <OurServices />
            <PricingComponent />
            <AboutUs />
            <WhyChooseUs />
            <Testimonial />
            <FAQ />
            <Footer />
            <Copyright />
            <BackToTopButton />
            <LiveSupportButton />
          </>
        );
  };

 

export default Home;
