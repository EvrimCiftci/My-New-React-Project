import React from "react";
import { AiFillLike } from "react-icons/ai";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { AnimatePresence, motion } from 'framer-motion';

const Testimonial = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 3,
    responsive: [
      {
        breakpoint: 1276,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
        },
      },
      {
        breakpoint: 1020,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  const slideCount = 3; 

  const sliderStyle = slideCount === 1 ? { display: "flex", justifyContent: "center" } : {};

  return (
    <div className="w-screen  h-1/4">
      <section className="text-gray-700">
        <div className="container  py-24 mx-auto ">
          <motion.h2
            whileInView={{ opacity: 1, y: 0 }}
            initial={{ opacity: 0, y: -100 }}
            transition={{duration:1}}
            className="text-3xl title-font font-bold text-center pb-16">Reviews</motion.h2>
          <motion.div
               whileInView={{ opacity: 1, x: 0 }}
               initial={{ opacity: 0, x: -100 }}
               transition={{duration:1}}
            style={sliderStyle}
          
          >

            <Slider
              
              {...settings} className="gap-x-4">
              <ReviewBox content="Their prices are fair, not over priced." author="Evan" />
              <ReviewBox content="It made everything easier for me. There are so many options on the website." author="Sam" />
              <ReviewBox content="It's simple to use and easy to access." author="Aziz" />
              <ReviewBox content="I emailed them about my payment plan and got respond right away! Perfect customer service." author="Kerem" />
              <ReviewBox content="It was exactly what I needed for my Freelance job." author="Ozan" />
            </Slider>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

const ReviewBox = ({ content, author }) => {
  return (
    <div className="p-4 md:w-1/2 w-full">
      <motion.div
           whileHover={{ y:-10,scale: 1.1}}
           onHoverStart={e => {}}
           onHoverEnd={e => {}}
        className="h-44 w-96 bg-gray-200 flex flex-col items-center p-8 rounded shadow-lg">
        <div className="flex flex-col w-full items-start">
          <AiFillLike className="h-8 w-8" />
          <p className="text-md">{content}</p>
        </div>
        <div className="w-full text-end">
          <p>- {author}</p>
        </div>
      </motion.div>
    </div>
  );
};

export default Testimonial;
