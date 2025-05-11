import React, { useContext, useState } from 'react'
import { FaArrowLeftLong } from "react-icons/fa6";
import { useNavigate } from 'react-router-dom';
import { listingDataContext } from '../Context/ListingContext';
import { FaCloudUploadAlt } from "react-icons/fa";

function ListingPage1() {
   let navigate = useNavigate()
   let {title,setTitle,
    description,setDescription,
    frontEndImage1,setFrontEndImage1,
    frontEndImage2,setFrontEndImage2,
    frontEndImage3,setFrontEndImage3,
    backEndImage1,setBackEndImage1,
    backEndImage2,setBackEndImage2,
    backEndImage3,setBackEndImage3,
    rent,setRent,
    city,setCity,
    landmark,setLandmark,
    category,setCategory} = useContext(listingDataContext)
    
    const [image1Name, setImage1Name] = useState("Choose an image file...")
    const [image2Name, setImage2Name] = useState("Choose an image file...")
    const [image3Name, setImage3Name] = useState("Choose an image file...")

    const handleImage1 = (e)=>{
        let file = e.target.files[0]
        setBackEndImage1(file)
        setFrontEndImage1(URL.createObjectURL(file))
        setImage1Name(file.name)
    }
    const handleImage2 = (e)=>{
        let file = e.target.files[0]
        setBackEndImage2(file)
        setFrontEndImage2(URL.createObjectURL(file))
        setImage2Name(file.name)
    }
    const handleImage3 = (e)=>{
        let file = e.target.files[0]
        setBackEndImage3(file)
        setFrontEndImage3(URL.createObjectURL(file))
        setImage3Name(file.name)
    }
  return (
    <div className='min-h-screen bg-gray-50 flex items-center justify-center relative py-12 px-4'>
        <form action="" className='max-w-[900px] w-full bg-white rounded-2xl shadow-xl p-6 md:p-8' onSubmit={(e)=>{e.preventDefault()
            navigate("/listingpage2")}
        }>
            {/* Header */}
            <div className='flex items-center justify-between mb-4'>
                <button 
                    type="button"
                    onClick={() => navigate("/")} 
                    className='w-10 h-10 bg-purple-600 hover:bg-purple-700 cursor-pointer rounded-full flex items-center justify-center transition-colors shadow-md'
                >
                    <FaArrowLeftLong className='w-5 h-5 text-white' />
                </button>
                <h1 className='text-xl md:text-2xl font-bold text-purple-600'>Set Up Your Home</h1>
            </div>

            {/* Progress Indicator */}
            <div className='w-full h-1.5 bg-gray-200 rounded-full mb-6'>
                <div className='w-1/3 h-full bg-purple-600 rounded-full'></div>
            </div>

            {/* Form Fields */}
            <div className='space-y-4'>
                {/* Title */}
                <div className='space-y-1.5'>
                    <label htmlFor="title" className='text-base font-semibold text-gray-700'>Title</label>
                    <input 
                        type="text" 
                        id='title' 
                        className='w-full h-10 border-2 border-gray-300 rounded-lg text-base px-4 focus:border-purple-600 focus:ring-2 focus:ring-purple-200 transition-all outline-none' 
                        required 
                        onChange={(e)=>setTitle(e.target.value)} 
                        value={title} 
                        placeholder='Enter property title'
                    />
                </div>

                {/* Description */}
                <div className='space-y-1.5'>
                    <label htmlFor="des" className='text-base font-semibold text-gray-700'>Description</label>
                    <textarea 
                        id="des" 
                        className='w-full h-24 border-2 border-gray-300 rounded-lg text-base px-4 py-2 focus:border-purple-600 focus:ring-2 focus:ring-purple-200 transition-all outline-none resize-none' 
                        required 
                        onChange={(e)=>setDescription(e.target.value)} 
                        value={description}
                        placeholder='Describe your property...'
                    ></textarea>
                </div>

                {/* Image Uploads */}
                <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
                    {[
                        { id: 'img1', label: 'Main Image', name: image1Name, handler: handleImage1 },
                        { id: 'img2', label: 'Image 2', name: image2Name, handler: handleImage2 },
                        { id: 'img3', label: 'Image 3', name: image3Name, handler: handleImage3 }
                    ].map((img) => (
                        <div key={img.id} className='space-y-1.5'>
                            <label htmlFor={img.id} className='text-base font-semibold text-gray-700'>{img.label}</label>
                            <div className='relative'>
                                <input 
                                    type="file" 
                                    id={img.id} 
                                    className='absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10' 
                                    required 
                                    onChange={img.handler} 
                                    accept="image/*"
                                />
                                <div className='w-full h-10 border-2 border-gray-300 rounded-lg flex items-center justify-between px-4 bg-white hover:border-purple-600 transition-colors'>
                                    <span className='text-sm text-gray-500 truncate max-w-[70%]'>{img.name}</span>
                                    <div className='flex items-center gap-2'>
                                        <FaCloudUploadAlt className='text-purple-600' />
                                        <span className='text-purple-600 font-medium'>Choose</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Price and Location */}
                <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                    <div className='space-y-1.5'>
                        <label htmlFor="rent" className='text-base font-semibold text-gray-700'>Rent (per day)</label>
                        <div className='relative'>
                            <span className='absolute left-4 top-1/2 -translate-y-1/2 text-gray-500'>₹</span>
                            <input 
                                type="number" 
                                id='rent' 
                                className='w-full h-10 border-2 border-gray-300 rounded-lg text-base pl-8 pr-4 focus:border-purple-600 focus:ring-2 focus:ring-purple-200 transition-all outline-none' 
                                required 
                                onChange={(e)=>setRent(e.target.value)} 
                                value={rent} 
                                placeholder='Enter daily rent'
                            />
                        </div>
                    </div>

                    <div className='space-y-1.5'>
                        <label htmlFor="city" className='text-base font-semibold text-gray-700'>City</label>
                        <input 
                            type="text" 
                            id='city' 
                            className='w-full h-10 border-2 border-gray-300 rounded-lg text-base px-4 focus:border-purple-600 focus:ring-2 focus:ring-purple-200 transition-all outline-none' 
                            required 
                            onChange={(e)=>setCity(e.target.value)} 
                            value={city} 
                            placeholder='Enter city name'
                        />
                    </div>
                </div>

                {/* Landmark */}
                <div className='space-y-1.5'>
                    <label htmlFor="landmark" className='text-base font-semibold text-gray-700'>Landmark</label>
                    <input 
                        type="text" 
                        id='landmark' 
                        className='w-full h-10 border-2 border-gray-300 rounded-lg text-base px-4 focus:border-purple-600 focus:ring-2 focus:ring-purple-200 transition-all outline-none' 
                        required 
                        onChange={(e)=>setLandmark(e.target.value)} 
                        value={landmark}
                        placeholder='Enter nearby landmark'
                    />
                </div>
            </div>

            {/* Action Buttons */}
            <div className='flex items-center justify-end gap-4 mt-6'>
                <button 
                    type="button"
                    onClick={() => navigate("/")} 
                    className='px-6 py-2 bg-gray-100 text-gray-700 text-base font-medium rounded-lg hover:bg-gray-200 transition-colors'
                >
                    Cancel
                </button>
                <button 
                    type="submit"
                    className='px-6 py-2 bg-purple-600 text-white text-base font-medium rounded-lg hover:bg-purple-700 transition-colors shadow-md hover:shadow-lg'
                >
                    Next Step
                </button>
            </div>
        </form>
    </div>
  )
}

export default ListingPage1