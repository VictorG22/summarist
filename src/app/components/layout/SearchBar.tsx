"use client";

import { FaBars } from "react-icons/fa6";
import { useSidebar } from "../../context/SidebarContext";
import { BiSearchAlt2 } from "react-icons/bi";

export default function SearchBar() {
  const { openSidebar } = useSidebar();

  return (
    <div className="border-b border-gray-200">
    <div className="flex items-center py-6 pl-6 px-2 max-w-225 mx-auto">

      <form action="" 
      className=" flex items-center justify-between ml-auto min-w-75 h-10 px-3 border-2 border-[#e1e7ea] rounded-md bg-[#f1f6f4]">
        <input
          type="text"
          placeholder="Search for books"
          className="focus:outline-0"
        />
        <button className="border-l-2 border-gray-200 pl-3 h-full">
          <BiSearchAlt2 className="w-6 h-6 text-[#032b41]"/>
        </button>
      </form>

      <button
        onClick={openSidebar}
        className="md:hidden mx-3 p-2 rounded-md hover:bg-gray-100"
      >
        <FaBars className="w-6 h-6 " />
      </button>
    </div>
    </div>
  );
}

//Implement a search bar that will display any books from the API
