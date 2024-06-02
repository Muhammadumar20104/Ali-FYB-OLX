import React from "react";
import { BsArrowUpRight } from "react-icons/bs";

const Button = ({ title,url }) => {
  return <div className="bg-black px-4 py-2 rounded-full flex items-center text-white">
    <a href={url} className="">{title}</a>
   <div className="ms-2">
   <BsArrowUpRight size={18} />
    </div>
  </div>;
};

export default Button;