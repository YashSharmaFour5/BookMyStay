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
    let {category, setCategory} = useContext(listingDataContext)

    const categories = [
        { id: 'villa', label: 'Villa', icon: GiFamilyHouse, description: 'Luxurious standalone property' },
        { id: 'farmHouse', label: 'Farm House', icon: FaTreeCity, description: 'Rural retreat with land' },
        { id: 'poolHouse', label: 'Pool House', icon: MdOutlinePool, description: 'Property with swimming pool' },
        { id: 'rooms', label: 'Rooms', icon: MdBedroomParent, description: 'Individual rooms for rent' }
    ]

    return (
        <div className='min-h-screen bg-gray-50 flex items-center justify-center relative py-12 px-4'>
            <div className='max-w-[900px] w-full bg-white rounded-2xl shadow-xl p-6 md:p-8'>
                {/* Header */}
                <div className='flex items-center justify-between mb-4'>
                    <button 
                        type="button"
                        onClick={() => navigate("/listingpage1")} 
                        className='w-10 h-10 bg-purple-600 hover:bg-purple-700 cursor-pointer rounded-full flex items-center justify-center transition-colors shadow-md'
                    >
                        <FaArrowLeftLong className='w-5 h-5 text-white' />
                    </button>
                    <h1 className='text-xl md:text-2xl font-bold text-purple-600'>Set Your Category</h1>
                </div>

                {/* Progress Indicator */}
                <div className='w-full h-1.5 bg-gray-200 rounded-full mb-6'>
                    <div className='w-2/3 h-full bg-purple-600 rounded-full'></div>
                </div>

                {/* Main Content */}
                <div className='space-y-6'>
                    <h2 className='text-lg md:text-xl text-gray-700 text-center'>
                        Which of these best describes your place?
                    </h2>

                    {/* Category Grid */}
                    <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                        {categories.map((cat) => {
                            const Icon = cat.icon
                            return (
                                <div
                                    key={cat.id}
                                    onClick={() => setCategory(cat.id)}
                                    className={`relative p-6 rounded-xl border-2 cursor-pointer transition-all duration-300 hover:shadow-lg group
                                        ${category === cat.id 
                                            ? 'border-purple-600 bg-purple-50' 
                                            : 'border-gray-200 hover:border-purple-300'
                                        }`}
                                >
                                    <div className='flex items-start gap-4'>
                                        <div className={`p-3 rounded-lg transition-colors
                                            ${category === cat.id 
                                                ? 'bg-purple-600 text-white' 
                                                : 'bg-gray-100 text-gray-600 group-hover:bg-purple-100 group-hover:text-purple-600'
                                            }`}
                                        >
                                            <Icon className='w-6 h-6' />
                                        </div>
                                        <div>
                                            <h3 className='font-semibold text-gray-800'>{cat.label}</h3>
                                            <p className='text-sm text-gray-500 mt-1'>{cat.description}</p>
                                        </div>
                                    </div>
                                    {category === cat.id && (
                                        <div className='absolute top-3 right-3 w-5 h-5 bg-purple-600 rounded-full flex items-center justify-center'>
                                            <div className='w-2 h-2 bg-white rounded-full'></div>
                                        </div>
                                    )}
                                </div>
                            )
                        })}
                    </div>
                </div>

                {/* Action Button */}
                <div className='flex items-center justify-end mt-8'>
                    <button 
                        onClick={() => navigate("/listingpage3")}
                        disabled={!category}
                        className={`px-6 py-2 rounded-lg text-base font-medium transition-all duration-300
                            ${category 
                                ? 'bg-purple-600 text-white hover:bg-purple-700 shadow-md hover:shadow-lg' 
                                : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                            }`}
                    >
                        Next Step
                    </button>
                </div>
            </div>
        </div>
    )
}

export default ListingPage2
