import React, { useContext } from "react";
import Button from "./Button";
import { motion } from "framer-motion";
// import { MenuContext } from "../components/context/MenuContext";
const ContactUs = () => {
//   const { menuState, setMenuState } = useContext(MenuContext);
//   const handleMenuClick = () => {
//     // Menu state update karein
//     setMenuState(false);
//   };
  const blogs = [1, 2, 3, 4, 5, 6];
  const AnimateVarients = {
    initial: {
      opacity: 0,
      y: 100,
    },
    animate: (index) => ({
      opacity: 1,
      y: 0,
      transition: { delay: 0.05 * index },
    })
  };
  return (
    <div className="xlll:container mx-auto" >
      <div className="hero-section bg-cover ">
        <div className="flex lg:flex-row flex-col w-full h-full xl:px-32 lg:px-20 px-10 py-20 font-spaceGrotesk">
          <motion.div
            variants={AnimateVarients}
            className="flex justify-center  w-full "
            initial={{
              opacity: 0,
              // if odd index card,slide from right instead of left
              x: -100,
            }}
            whileInView={{
              opacity: 1,
              x: 0, // Slide in to its original position
              transition: {
                duration: 0.5, // Animation duration
              },
            }}
            viewport={{ once: true }}
          >
            <div className="flex flex-col gap-5 justify-evenly lg:w-3/4 lg:pe-4 lg:ps-10 mb-5">
              <div>
                <h2 className="lg:text-3xl text-2xl  font-medium">
                  Contact Us
                </h2>
                <p className="text-1xl  text-gray-400">+75435678976</p>
                <p className="text-1xl xl:text-1xl  text-gray-400">
                  infinitygraphic@gmail.com
                </p>
              </div>

              <div>
                <h2 className=" lg:text-3xl text-2xl  font-medium">Pakistan</h2>
                <p className=" text-gray-400">4517 Washington Ave. </p>
                <p className="text-1xl xl:text-1xl  text-gray-400">
                  Manchester, Kentucky 39495
                </p>
              </div>

              <div>
                <h2 className="lg:text-3xl text-2xl  font-medium">
                  United State
                </h2>
                <p className="text-1xl xl:text-1xl  text-gray-400">
                  3891 Ranchview Dr.
                </p>
                <p className="text-1xl xl:text-1xl  text-gray-400">
                  Richardson, California 62639
                </p>
              </div>
            </div>
          </motion.div>
          <motion.div
            variants={AnimateVarients}
            className="flex justify-center w-full "
            initial={{
              opacity: 0,
              // if odd index card,slide from right instead of left
              x: 100,
            }}
            whileInView={{
              opacity: 1,
              x: 0, // Slide in to its original position
              transition: {
                duration: 0.5, // Animation duration
              },
            }}
            viewport={{ once: true }}
          >
            <div className="lg:w-full p-5 rounded-2xl bg-white">
              <div className="flex justify-start">
                <div>
                  <h5 className="text-3xl xsm:text-4xl xxl:text-4xl  font-medium">
                    Got Ideas?
                    <br className="xl:block hidden" /> Lets Team up.
                  </h5>
                  <p className="text-gray-400 mt-3">
                    Tell us about what gou want to build.
                  </p>
                </div>
                <svg
                  width="50"
                  height="50"
                  viewBox="0 0 72 75"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M67.8247 11.8256L71.6495 8L64 0.348731L60.1753 4.17437L67.8247 11.8256ZM60.1753 4.17437L0.176913 64.1867L7.8264 71.838L67.8247 11.8256L60.1753 4.17437Z"
                    fill="#00FF9C"
                  />
                  <path
                    d="M47.4023 13.9704L52.812 13.9704L52.812 3.15116L47.4023 3.15116L47.4023 13.9704ZM47.4023 3.15116L3.99931 3.15116L3.99931 13.9704L47.4023 13.9704L47.4023 3.15116Z"
                    fill="#00FF9C"
                  />
                  <path
                    d="M58.1001 68.6892L58.1001 74.0989L68.9194 74.0989L68.9194 68.6892L58.1001 68.6892ZM58.1001 23.4575L58.1001 68.6892L68.9194 68.6892L68.9194 23.4575L58.1001 23.4575Z"
                    fill="#00FF9C"
                  />
                </svg>
              </div>
              <form action="/submit-form" method="POST">
                <div className="w-[100%] flex flex-wrap  xsm:flex-row flex-col justify-between gap-4 mb-3">
                  <div className="w-full xsm:w-[48%]">
                    <label
                      htmlFor="firstName"
                      className="uppercase ms-3 block text-black font-bold mb-2"
                    >
                      First Name *
                    </label>
                    <input
                      type="text"
                      id="firstName"
                      name="firstName"
                      placeholder="First Name"
                      className="shadow-inset shadow-b-2 border-b-2  w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      required
                    />
                  </div>
                  <div className="w-full xsm:w-[48%]">
                    <label
                      htmlFor="firstName"
                      className="uppercase ms-3 block text-black font-bold mb-2"
                    >
                      Last Name *
                    </label>
                    <input
                      type="text"
                      id="lastName"
                      name="lastName"
                      placeholder="Last Name"
                      className="shadow-inset shadow-b-2 border-b-2  w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      required
                    />
                  </div>
                </div>
                <div className="w-[100%] flex flex-wrap xsm:flex-row flex-col  justify-between gap-4 mb-5">
                  <div className="w-full xsm:w-[48%]">
                    <label
                      htmlFor="firstName"
                      className="uppercase ms-3 block text-black font-bold mb-2"
                    >
                      Email*
                    </label>
                    <input
                      type="text"
                      id="firstName"
                      name="firstName"
                      placeholder="Email Address"
                      className="shadow-inset shadow-b-2 border-b-2  w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      required
                    />
                  </div>
                  <div className="w-full xsm:w-[48%]">
                    <label
                      htmlFor="firstName"
                      className="uppercase ms-3 block text-black font-bold mb-2"
                    >
                      Phone Number
                    </label>
                    <input
                      type="text"
                      id="lastName"
                      name="lastName"
                      placeholder="Your Number"
                      className="shadow-inset shadow-b-2 border-b-2  w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      required
                    />
                  </div>
                </div>

                <div className="flex mt-5">
                  <div className="w-full">
                    <label
                      htmlFor="firstName"
                      className="uppercase ms-3 block text-black font-bold mb-1"
                    >
                      tell us about your project *
                    </label>
                    <textarea
                      id="email"
                      name="email"
                      placeholder="Describe Here"
                      className="shadow-inset shadow-b-2 border-b-2  w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      required
                    ></textarea>
                  </div>
                </div>
                {/* Add more form fields as needed */}
                <div className="flex justify-center py-6">
                  <div className="rounded-full bg-black text-white 5sm:text-lg sm:text-sm ">
                    <Button title="Submit Your Inquiry Today" url="contact" />
                  </div>
                </div>
              </form>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;