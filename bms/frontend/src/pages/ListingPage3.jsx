import React, { useContext } from 'react'
import { FaArrowLeftLong } from "react-icons/fa6";
import { useNavigate } from 'react-router-dom';
import { listingDataContext } from '../Context/ListingContext';
import { FaStar } from "react-icons/fa";

function ListingPage3() {
    let navigate = useNavigate()
    let {
        title, setTitle,
        description, setDescription,
        frontEndImage1, setFrontEndImage1,
        frontEndImage2, setFrontEndImage2,
        frontEndImage3, setFrontEndImage3,
        backEndImage1, setBackEndImage1,
        backEndImage2, setBackEndImage2,
        backEndImage3, setBackEndImage3,
        rent, setRent,
        city, setCity,
        landmark, setLandmark,
        category, setCategory,
        handleAddListing,
        adding, setAdding
    } = useContext(listingDataContext)

    return (
        <div className='min-h-screen bg-gray-50 flex items-center justify-center relative py-4 px-4'>
            <div className='max-w-[900px] w-full bg-white rounded-2xl shadow-xl p-4 md:p-6'>
                {/* Header */}
                <div className='flex items-center justify-between mb-2'>
                    <button 
                        type="button"
                        onClick={() => navigate("/listingpage2")} 
                        className='w-8 h-8 bg-purple-600 hover:bg-purple-700 cursor-pointer rounded-full flex items-center justify-center transition-colors shadow-md'
                    >
                        <FaArrowLeftLong className='w-4 h-4 text-white' />
                    </button>
                    <h1 className='text-lg md:text-xl font-bold text-purple-600'>Review Your Listing</h1>
                </div>

                {/* Progress Indicator */}
                <div className='w-full h-1 bg-gray-200 rounded-full mb-3'>
                    <div className='w-full h-full bg-purple-600 rounded-full'></div>
                </div>

                {/* Main Content */}
                <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                    {/* Left Column - Images */}
                    <div className='space-y-2'>
                        <div className='aspect-[4/3] rounded-lg overflow-hidden'>
                            <img 
                                src={frontEndImage1} 
                                alt="Main" 
                                className='w-full h-full object-cover'
                            />
                        </div>
                        <div className='grid grid-cols-2 gap-2'>
                            <div className='aspect-[4/3] rounded-lg overflow-hidden'>
                                <img 
                                    src={frontEndImage2} 
                                    alt="Secondary" 
                                    className='w-full h-full object-cover'
                                />
                            </div>
                            <div className='aspect-[4/3] rounded-lg overflow-hidden'>
                                <img 
                                    src={frontEndImage3} 
                                    alt="Tertiary" 
                                    className='w-full h-full object-cover'
                                />
                            </div>
                        </div>
                    </div>

                    {/* Right Column - Details */}
                    <div className='space-y-3'>
                        <div>
                            <h2 className='text-base font-semibold text-gray-800'>
                                {`In ${landmark.toUpperCase()}, ${city.toUpperCase()}`}
                            </h2>
                        </div>

                        <div className='flex items-center justify-between'>
                            <h3 className='text-lg font-bold text-gray-800'>
                                {`${title.toUpperCase()} ${category.toUpperCase()}`}
                            </h3>
                            <div className='flex items-center gap-1 bg-purple-50 px-2 py-0.5 rounded-full'>
                                <FaStar className='text-yellow-400 w-3 h-3' />
                                <span className='text-xs font-medium text-purple-600'>New Listing</span>
                            </div>
                        </div>

                        <p className='text-sm text-gray-600 line-clamp-3'>
                            {description}
                        </p>

                        <div className='flex items-center gap-1 text-lg font-bold text-purple-600'>
                            <span>₹{rent}</span>
                            <span className='text-gray-600 text-sm font-normal'>/day</span>
                        </div>

                        <div className='pt-2'>
                            <button 
                                onClick={handleAddListing}
                                disabled={adding}
                                className={`w-full px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300
                                    ${adding 
                                        ? 'bg-gray-100 text-gray-400 cursor-not-allowed' 
                                        : 'bg-purple-600 text-white hover:bg-purple-700 shadow-md hover:shadow-lg'
                                    }`}
                            >
                                {adding ? 'Adding...' : 'Add Listing'}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ListingPage3
