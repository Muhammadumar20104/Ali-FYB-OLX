import { FaFacebookSquare, FaTwitter, FaYoutube, FaInstagram, FaGooglePlusG } from 'react-icons/fa';
function Footer() {
  return (
    <>
      <div className="w-full p-6 bg-gray-900 grid lg:grid-cols-3 sm:grid-cols-1">
        <div className="flex flex-col gap-5 px-4">
          <div className="text-4xl font-bold text-white">Swag Fits</div>
          <div className="flex flex-col gap-4"><input type="email" placeholder="Enter Your Email" className="bg-slate-900 text-white w-[70%] rounded-md" /><button
            className="bg-indigo-600 text-white px-4 py-2 rounded-full hover:bg-indigo-700 w-fit ">
            Subscribe
          </button></div>
          <div className="text-white">
            Get monthly updates and free resources.
          </div>
        </div>
        <div className="px-4 flex flex-col gap-3">
          <div className="text-white font-semibold">Contact Us </div>
          <div className="text-slate-400 flex flex-col gap-2">
            <div>Phone:+92 3019666491</div>
            <div>Email:m.umar201031@gmail.com</div>
            <div>Address:Muslim Colony Sadiqabad Punjab Pakistan</div>
            <div className='flex text-[30px] gap-4 mt-2'>
              <div className='text-[#1873EB] hover:cursor-pointer hover:text-[35px]'><FaFacebookSquare /></div>
              <div className='text-[#4DA6E9] hover:cursor-pointer hover:text-[35px]'><FaTwitter /></div>
              <div className='text-[#F70000] hover:cursor-pointer hover:text-[35px]'><FaYoutube /></div>
              <div className='text-[#AC3C80] hover:cursor-pointer hover:text-[35px]'><FaInstagram /></div>
              <div className='text-slate-100 hover:cursor-pointer hover:text-[35px]'><FaGooglePlusG /></div>
            </div>
          </div>
        </div>
        <div className='flex px-4 flex-col gap-4'>
          <div className='text-lg font-bold text-white'>RECENT NEWS</div>
          <div className='flex flex-col gap-2'>
            <div className='text-slate-400'>About Us</div>
            <div className='text-slate-400'>Services</div>
            <div className='text-slate-400'>Get In Touch</div>
          </div>

        </div>
      </div>
    </>
  );
}

export default Footer;