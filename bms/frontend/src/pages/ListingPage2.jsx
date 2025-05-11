import React from 'react'
import { FaArrowLeftLong } from "react-icons/fa6";
import { useNavigate } from 'react-router-dom';
import { GiFamilyHouse } from "react-icons/gi";
import { MdBedroomParent } from "react-icons/md";

import { MdOutlinePool } from "react-icons/md";
import { GiWoodCabin } from "react-icons/gi";
import { SiHomeassistantcommunitystore } from "react-icons/si";

import { IoBedOutline } from "react-icons/io5";

import { FaTreeCity } from "react-icons/fa6";
import { BiBuildingHouse } from "react-icons/bi";
import { useContext } from 'react';
import { listingDataContext } from '../Context/ListingContext';

function ListingPage2() {

    let navigate = useNavigate()
    let {category,setCategory} = useContext(listingDataContext)
  return (
    <div className='w-[100%] h-[100vh] bg-white flex items-center justify-center relative overflow-auto '>
         <div className='w-[50px] h-[50px] bg-[purple] cursor-pointer absolute top-[5%] left-[20px] rounded-[50%] flex items-center justify-center' onClick={()=>navigate("/listingpage1")}><FaArrowLeftLong className='w-[25px] h-[25px] text-[white]' /></div>
        <div className='w-[200px] h-[50px] text-[20px] bg-[purple] text-[white] flex items-center justify-center rounded-[30px] absolute top-[5%] right-[10px] shadow-lg'> Set Your Category </div>

        <div className='max-w-[900px] w-[100%] h-[550px] overflow-auto bg-white flex items-center justify-start flex-col gap-[40px] mt-[30px] '>
        <h1 className='text-[18px] text-[black] md:text-[30px] px-[10px] text-center'>Which of these best describes your place?</h1>
        
        <div className='max-w-[800px] w-[100%] grid grid-cols-2 md:grid-cols-4 gap-6 px-[20px] place-items-center'>
            <div className={`w-[200px] h-[120px] flex justify-center items-center flex-col cursor-pointer border-[2px] hover:border-[#a6a5a5] text-[16px] rounded-lg transition-all duration-300 ${category == "villa" ?"border-3 border-[#8b8b8b] shadow-lg" : ""}`} onClick={()=>setCategory("villa")}>
                <GiFamilyHouse className='w-[35px] h-[35px] text-[black] mb-2' />
                <h3 className='font-medium'>Villa</h3>
            </div>

            <div className={`w-[200px] h-[120px] flex justify-center items-center flex-col cursor-pointer border-[2px] hover:border-[#a6a5a5] text-[16px] rounded-lg transition-all duration-300 ${category == "farmHouse" ?"border-3 border-[#8b8b8b] shadow-lg" : ""}`} onClick={()=>setCategory("farmHouse")}>
                <FaTreeCity className='w-[35px] h-[35px] text-[black] mb-2' />
                <h3 className='font-medium'>Farm House</h3>
            </div>

            <div className={`w-[200px] h-[120px] flex justify-center items-center flex-col cursor-pointer border-[2px] hover:border-[#a6a5a5] text-[16px] rounded-lg transition-all duration-300 ${category == "poolHouse" ?"border-3 border-[#8b8b8b] shadow-lg" : ""}`} onClick={()=>setCategory("poolHouse")}>
                <MdOutlinePool className='w-[35px] h-[35px] text-[black] mb-2' />
                <h3 className='font-medium'>Pool House</h3>
            </div>

            <div className={`w-[200px] h-[120px] flex justify-center items-center flex-col cursor-pointer border-[2px] hover:border-[#a6a5a5] text-[16px] rounded-lg transition-all duration-300 ${category == "rooms" ?"border-3 border-[#8b8b8b] shadow-lg" : ""}`} onClick={()=>setCategory("rooms")}>
                <MdBedroomParent className='w-[35px] h-[35px] text-[black] mb-2' />
                <h3 className='font-medium'>Rooms</h3>
            </div>
        </div>
        <button className='px-[50px] py-[10px] bg-[purple] text-[white] text-[18px] md:px-[100px] rounded-lg absolute right-[5%] bottom-[5%] hover:bg-[#6b1b6b] transition-colors duration-300' onClick={()=>navigate("/listingpage3")} disabled={!category}>Next</button>
        </div>
      
    </div>
  )
}

export default ListingPage2
