import React, { useContext, useEffect, useState } from 'react'
import { FaArrowLeftLong } from "react-icons/fa6";
import { useNavigate } from 'react-router-dom';
import { listingDataContext } from '../Context/ListingContext';
import { userDataContext } from '../Context/UserContext';
import { RxCross2 } from "react-icons/rx";
import axios from 'axios';
import { authDataContext } from '../Context/AuthContext';
import { FaStar } from "react-icons/fa";
import { bookingDataContext } from '../Context/BookingContext';
import { toast } from 'react-toastify';
function ViewCard() {
    let navigate=useNavigate()
    let {cardDetails}=useContext(listingDataContext)
    let {userData} = useContext(userDataContext)
    let [updatePopUp,setUpdatePopUp]= useState(false)
    let [bookingPopUp,setBookingPopUp]= useState(false)
     let [title,setTitle] = useState(cardDetails.title)
        let [description,setDescription]=useState(cardDetails.description)
        let [backEndImage1,setBackEndImage1]=useState(null)
        let [backEndImage2,setBackEndImage2]=useState(null)
        let [backEndImage3,setBackEndImage3]=useState(null)
        let [rent,setRent]=useState(cardDetails.rent)
        let [city,setCity]=useState(cardDetails.city)
        let [landmark,setLandmark]=useState(cardDetails.landMark)
        let {serverUrl}= useContext(authDataContext)
        let {updating,setUpdating} = useContext(listingDataContext)
        let {deleting,setDeleting} = useContext(listingDataContext)
        let [minDate,setMinDate] = useState("")

        let {checkIn,setCheckIn,
            checkOut,setCheckOut,
            total,setTotal,
            night,setNight,handleBooking,booking}=useContext(bookingDataContext)

            useEffect(()=>{
                if(checkIn && checkOut){
                    let inDate = new Date(checkIn)
                    let OutDate = new Date(checkOut)
                    let n = (OutDate - inDate)/(24*60*60*1000)
                    setNight(n)
                    let airBnbCharge = (cardDetails.rent*(7/100))
                    let tax = (cardDetails.rent*(7/100))

                    if(n>0){
                        setTotal((cardDetails.rent * n) + airBnbCharge + tax)
                    }
                    else{
                        setTotal(0)
                    }

                }

            },[checkIn,checkOut,cardDetails.rent,total])

    

   
    const handleUpdateListing =async () => {
         setUpdating(true)
        try {

            let formData = new FormData()
     formData.append("title",title)
     if(backEndImage1){formData.append("image1",backEndImage1)}
     if(backEndImage2){formData.append("image2",backEndImage2)}
     if(backEndImage3){formData.append("image3",backEndImage3)}
     formData.append("description",description)
     formData.append("rent",rent)
     formData.append("city",city)
     formData.append("landMark",landmark)
    
        
        let result = await axios.post( serverUrl + `/api/listing/update/${cardDetails._id}` ,formData, {withCredentials:true}  )
        setUpdating(false)
        console.log(result)
        toast.success("Lising Updated")
        navigate("/")
        setTitle("")
        setDescription("")
      
       setBackEndImage1(null)
       setBackEndImage2(null)
       setBackEndImage3(null)
       setRent("")
       setCity("")
       setLandmark("")
       
            
        } catch (error) {
            setUpdating(false)
            console.log(error)
            toast.error(error.response.data.message)
        }
        
     }
     const handleDeleteListing = async () => {
        setDeleting(true)
        try {
            let result = await axios.delete( serverUrl + `/api/listing/delete/${cardDetails._id}`, {withCredentials:true}  )
            console.log(result.data)
            navigate("/")
            toast.success("Listing Delete")
            setDeleting(false)
        } catch (error) {
            console.log(error)
            setDeleting(false)
            toast.error(error.response.data.message)
        }
        
     }
     const handleImage1 = (e)=>{
        let file = e.target.files[0]
        setBackEndImage1(file)
        
    }
    const handleImage2 = (e)=>{
        let file = e.target.files[0]
        setBackEndImage2(file)
        
    }
    const handleImage3 = (e)=>{
        let file = e.target.files[0]
        setBackEndImage3(file)
        
    }
        
    useEffect(()=>{
        let today=new Date().toISOString().split('T')[0]
        setMinDate(today)
    },[])
    
  return (
    <div className='w-[100%] min-h-screen bg-[white] flex items-center justify-start gap-[20px] flex-col overflow-hidden relative pt-[80px] pb-[30px]'>
             <div className='w-[50px] h-[50px] bg-purple-600 cursor-pointer absolute top-[5%] left-[20px] rounded-[50%] flex items-center justify-center hover:bg-purple-700 transition-colors' onClick={()=>navigate("/")}><FaArrowLeftLong className='w-[25px] h-[25px] text-[white]' /></div>
    
             <div className='w-[95%] md:w-[80%] max-w-[1200px]'>
                <h1 className='text-[24px] md:text-[32px] font-bold text-gray-800 mb-2'>
                    {`In ${cardDetails.landMark.toUpperCase()}, ${cardDetails.city.toUpperCase()}`}
                </h1>
             </div>
    
             <div className='w-[95%] md:w-[80%] max-w-[1200px] h-[350px] md:h-[400px] flex flex-col md:flex-row gap-4'>
                <div className='w-full md:w-[65%] h-[200px] md:h-full rounded-xl overflow-hidden shadow-lg'>
                    <img src={cardDetails.image1} alt="" className='w-full h-full object-cover hover:scale-105 transition-transform duration-300' />
                </div>
                <div className='w-full md:w-[35%] h-[140px] md:h-full flex flex-col gap-4'>
                    <div className='w-full h-1/2 rounded-xl overflow-hidden shadow-lg'>
                        <img src={cardDetails.image2} alt="" className='w-full h-full object-cover hover:scale-105 transition-transform duration-300' />
                    </div>
                    <div className='w-full h-1/2 rounded-xl overflow-hidden shadow-lg'>
                        <img src={cardDetails.image3} alt="" className='w-full h-full object-cover hover:scale-105 transition-transform duration-300' />
                    </div>
                </div>
             </div>

             <div className='w-[95%] md:w-[80%] max-w-[1200px] flex flex-col gap-4 mt-4'>
                <div className='flex items-center justify-between'>
                    <h2 className='text-[24px] md:text-[32px] font-bold text-gray-800'>{cardDetails.title.toUpperCase()}</h2>
                    <div className='flex items-center gap-2'>
                        <FaStar className='text-yellow-400 w-5 h-5' />
                        <span className='text-lg font-semibold'>{cardDetails.ratings}</span>
                    </div>
                </div>

                <div className='flex items-center gap-4 text-gray-600'>
                    <span className='text-base'>{cardDetails.category.toUpperCase()}</span>
                    <span>•</span>
                    <span className='text-base'>{cardDetails.landMark.toUpperCase()}</span>
                </div>

                <div className='text-gray-700 text-base leading-relaxed line-clamp-2'>{cardDetails.description}</div>

                <div className='flex items-center gap-2 text-xl font-bold text-purple-600'>
                    <span>₹{cardDetails.rent}</span>
                    <span className='text-gray-600 text-base font-normal'>/day</span>
                </div>
                 
                <div className='flex items-center gap-4 mt-2'>
                    {cardDetails.host == userData._id && (
                        <button 
                            className='px-6 py-2 bg-purple-600 text-white text-base rounded-lg hover:bg-purple-700 transition-colors shadow-md' 
                            onClick={()=>setUpdatePopUp(prev => !prev)}
                        > 
                            Edit listing
                        </button>
                    )}
                    {cardDetails.host != userData._id && (
                        <button 
                            className='px-6 py-2 bg-purple-600 text-white text-base rounded-lg hover:bg-purple-700 transition-colors shadow-md' 
                            onClick={()=>setBookingPopUp(prev => !prev)}
                        > 
                            Reserve
                        </button>
                    )}
                </div>
             </div>

             {/* Update Listing Popup */}
             {updatePopUp && (
                <div className='fixed inset-0 flex items-center justify-center bg-black/70 backdrop-blur-sm z-[100] p-4'>
                    <div className='relative w-full max-w-[900px] bg-white rounded-xl shadow-2xl p-6 md:p-8'>
                        <RxCross2 
                            className='w-8 h-8 bg-purple-600 text-white cursor-pointer absolute top-4 right-4 rounded-full p-1 hover:bg-purple-700 transition-colors' 
                            onClick={()=>setUpdatePopUp(false)}
                        />
                        
                        <h2 className='text-2xl font-bold text-gray-800 mb-6'>Update Listing Details</h2>
                        
                        <form className='space-y-6' onSubmit={(e)=>{e.preventDefault()}}>
                            <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                                <div className='space-y-2'>
                                    <label htmlFor="title" className='text-lg font-medium text-gray-700'>Title</label>
                                    <input 
                                        type="text" 
                                        id='title' 
                                        className='w-full h-12 px-4 border-2 border-gray-300 rounded-lg focus:border-purple-600 focus:ring-2 focus:ring-purple-200 transition-colors' 
                                        required 
                                        placeholder='Enter property title' 
                                        onChange={(e)=>setTitle(e.target.value)} 
                                        value={title}
                                    />
                                </div>

                                <div className='space-y-2'>
                                    <label htmlFor="rent" className='text-lg font-medium text-gray-700'>Rent (per day)</label>
                                    <input 
                                        type="number" 
                                        id='rent' 
                                        className='w-full h-12 px-4 border-2 border-gray-300 rounded-lg focus:border-purple-600 focus:ring-2 focus:ring-purple-200 transition-colors' 
                                        required 
                                        placeholder='Enter rent amount' 
                                        onChange={(e)=>setRent(e.target.value)} 
                                        value={rent}
                                    />
                                </div>

                                <div className='space-y-2'>
                                    <label htmlFor="city" className='text-lg font-medium text-gray-700'>City</label>
                                    <input 
                                        type="text" 
                                        id='city' 
                                        className='w-full h-12 px-4 border-2 border-gray-300 rounded-lg focus:border-purple-600 focus:ring-2 focus:ring-purple-200 transition-colors' 
                                        required 
                                        placeholder='Enter city name' 
                                        onChange={(e)=>setCity(e.target.value)} 
                                        value={city}
                                    />
                                </div>

                                <div className='space-y-2'>
                                    <label htmlFor="landmark" className='text-lg font-medium text-gray-700'>Landmark</label>
                                    <input 
                                        type="text" 
                                        id='landmark' 
                                        className='w-full h-12 px-4 border-2 border-gray-300 rounded-lg focus:border-purple-600 focus:ring-2 focus:ring-purple-200 transition-colors' 
                                        required 
                                        placeholder='Enter landmark' 
                                        onChange={(e)=>setLandmark(e.target.value)} 
                                        value={landmark}
                                    />
                                </div>
                            </div>

                            <div className='space-y-2'>
                                <label htmlFor="des" className='text-lg font-medium text-gray-700'>Description</label>
                                <textarea 
                                    id="des" 
                                    className='w-full h-32 px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-purple-600 focus:ring-2 focus:ring-purple-200 transition-colors resize-none' 
                                    required 
                                    onChange={(e)=>setDescription(e.target.value)} 
                                    value={description}
                                ></textarea>
                            </div>

                            <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
                                <div className='space-y-2'>
                                    <label htmlFor="img1" className='text-lg font-medium text-gray-700'>Image 1</label>
                                    <input 
                                        type="file" 
                                        id='img1' 
                                        className='w-full h-12 px-4 border-2 border-gray-300 rounded-lg focus:border-purple-600 focus:ring-2 focus:ring-purple-200 transition-colors' 
                                        onChange={handleImage1} 
                                    />
                                </div>

                                <div className='space-y-2'>
                                    <label htmlFor="img2" className='text-lg font-medium text-gray-700'>Image 2</label>
                                    <input 
                                        type="file" 
                                        id='img2' 
                                        className='w-full h-12 px-4 border-2 border-gray-300 rounded-lg focus:border-purple-600 focus:ring-2 focus:ring-purple-200 transition-colors' 
                                        onChange={handleImage2} 
                                    />
                                </div>

                                <div className='space-y-2'>
                                    <label htmlFor="img3" className='text-lg font-medium text-gray-700'>Image 3</label>
                                    <input 
                                        type="file" 
                                        id='img3' 
                                        className='w-full h-12 px-4 border-2 border-gray-300 rounded-lg focus:border-purple-600 focus:ring-2 focus:ring-purple-200 transition-colors' 
                                        onChange={handleImage3} 
                                    />
                                </div>
                            </div>

                            <div className='flex items-center justify-end gap-4 pt-4'>
                                <button 
                                    className='px-6 py-3 bg-red-600 text-white text-lg rounded-lg hover:bg-red-700 transition-colors shadow-md' 
                                    onClick={handleDeleteListing} 
                                    disabled={deleting}
                                >
                                    {deleting ? "Deleting..." : "Delete Listing"}
                                </button>
                                <button 
                                    className='px-6 py-3 bg-purple-600 text-white text-lg rounded-lg hover:bg-purple-700 transition-colors shadow-md' 
                                    onClick={handleUpdateListing} 
                                    disabled={updating}
                                >
                                    {updating ? "Updating..." : "Update Listing"}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
             )}

             {/* Booking Popup */}
             {bookingPopUp && (
                <div className='fixed inset-0 flex items-center justify-center bg-black/70 backdrop-blur-sm z-[100] p-4'>
                    <div className='relative w-full max-w-[900px] bg-white rounded-xl shadow-2xl p-6 md:p-8'>
                        <RxCross2 
                            className='w-8 h-8 bg-purple-600 text-white cursor-pointer absolute top-4 right-4 rounded-full p-1 hover:bg-purple-700 transition-colors' 
                            onClick={()=>setBookingPopUp(false)}
                        />
                        
                        <div className='flex flex-col md:flex-row gap-8'>
                            <div className='w-full md:w-1/2'>
                                <h2 className='text-2xl font-bold text-gray-800 mb-6'>Confirm & Book</h2>
                                
                                <form className='space-y-6' onSubmit={(e)=>{e.preventDefault()}}>
                                    <div className='space-y-4'>
                                        <h3 className='text-xl font-semibold text-gray-800'>Your Trip</h3>
                                        
                                        <div className='space-y-4'>
                                            <div className='space-y-2'>
                                                <label htmlFor="checkin" className='text-lg font-medium text-gray-700'>Check-in Date</label>
                                                <input 
                                                    type="date" 
                                                    min={minDate} 
                                                    id='checkIn' 
                                                    className='w-full h-12 px-4 border-2 border-gray-300 rounded-lg focus:border-purple-600 focus:ring-2 focus:ring-purple-200 transition-colors' 
                                                    required 
                                                    onChange={(e)=>setCheckIn(e.target.value)} 
                                                    value={checkIn} 
                                                />
                                            </div>

                                            <div className='space-y-2'>
                                                <label htmlFor="checkout" className='text-lg font-medium text-gray-700'>Check-out Date</label>
                                                <input 
                                                    type="date" 
                                                    min={minDate} 
                                                    id='checkOut' 
                                                    className='w-full h-12 px-4 border-2 border-gray-300 rounded-lg focus:border-purple-600 focus:ring-2 focus:ring-purple-200 transition-colors' 
                                                    required 
                                                    onChange={(e)=>setCheckOut(e.target.value)} 
                                                    value={checkOut} 
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </form>
                            </div>

                            <div className='w-full md:w-1/2 bg-gray-50 rounded-xl p-6'>
                                <div className='space-y-4'>
                                    <h3 className='text-xl font-semibold text-gray-800'>Price Details</h3>
                                    
                                    <div className='space-y-2'>
                                        <div className='flex justify-between text-gray-600'>
                                            <span>₹{cardDetails.rent} x {night} nights</span>
                                            <span>₹{cardDetails.rent * night}</span>
                                        </div>
                                        
                                        <div className='flex justify-between text-gray-600'>
                                            <span>Service fee</span>
                                            <span>₹{(cardDetails.rent * 0.07).toFixed(2)}</span>
                                        </div>
                                        
                                        <div className='flex justify-between text-gray-600'>
                                            <span>Tax</span>
                                            <span>₹{(cardDetails.rent * 0.07).toFixed(2)}</span>
                                        </div>
                                        
                                        <div className='border-t border-gray-300 pt-2 mt-2'>
                                            <div className='flex justify-between font-semibold text-lg'>
                                                <span>Total</span>
                                                <span>₹{total}</span>
                                            </div>
                                        </div>
                                    </div>

                                    <button 
                                        className='w-full py-3 bg-purple-600 text-white text-lg rounded-lg hover:bg-purple-700 transition-colors shadow-md mt-4' 
                                        onClick={() => handleBooking(cardDetails._id)}
                                        disabled={booking}
                                    >
                                        {booking ? "Processing..." : "Book Now"}
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
             )}
        </div>
  )
}


export default ViewCard