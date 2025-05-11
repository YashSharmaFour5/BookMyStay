import React, { useContext, useState } from 'react'
import { IoMdEye } from "react-icons/io";
import { IoMdEyeOff } from "react-icons/io";
import { useNavigate } from 'react-router-dom';
import { FaArrowLeftLong } from "react-icons/fa6";
import axios from 'axios';
import { authDataContext } from '../Context/AuthContext';
import { userDataContext } from '../Context/UserContext';
import { toast } from 'react-toastify';

function SignUp() {
    let [show,setShow] = useState(false)
    let navigate = useNavigate()
    let {serverUrl} = useContext(authDataContext)
    let {userData,setUserData} = useContext(userDataContext)
    let [name,setName]= useState("")
    let [email,setEmail]= useState("")
    let [password,setPassword]= useState("")
    let {loading,setLoading}= useContext(authDataContext)

    const handleSignUP = async (e) => {
      setLoading(true)
        try {
            e.preventDefault()
            let result = await axios.post(serverUrl + "/api/auth/signup",{
                name,
                email,
                password

            },{withCredentials:true})
            setLoading(false)
            setUserData(result.data)
            navigate("/")
            toast.success("Signup Successfully")
            console.log(result)
        } catch (error) {
          setLoading(false)
            console.log(error)
            toast.error("Something went wrong")
        }
        
    }
  return (
    <div className='w-[100vw] min-h-[100vh] flex items-center justify-center relative bg-gray-50'>
        <div className='w-[50px] h-[50px] bg-purple-600 cursor-pointer absolute top-[10%] left-[20px] rounded-[50%] flex items-center justify-center hover:bg-purple-700 transition-colors shadow-lg' onClick={()=>navigate("/")}><FaArrowLeftLong className='w-[25px] h-[25px] text-[white]' /></div>
        <form action="" className='max-w-[500px] w-[90%] bg-white p-8 rounded-2xl shadow-xl flex items-center justify-center flex-col gap-6' onSubmit={handleSignUP}>
            <h1 className='text-3xl font-bold text-gray-800 mb-2'>Create Account</h1>
            <p className='text-gray-600 mb-6'>Join BookMyStay for the best stay experience</p>
            <div className='w-full flex items-start justify-start flex-col gap-2'>
                <label htmlFor="name" className='text-sm font-medium text-gray-700'>Username</label>
                <input type="text" id='name' className='w-full h-12 border-2 border-gray-200 rounded-lg text-base px-4 focus:border-purple-600 focus:outline-none transition-colors' required onChange={(e)=>setName(e.target.value)} value={name}/>
            </div> 
            <div className='w-full flex items-start justify-start flex-col gap-2'>
                <label htmlFor="email" className='text-sm font-medium text-gray-700'>Email</label>
                <input type="text" id='email' className='w-full h-12 border-2 border-gray-200 rounded-lg text-base px-4 focus:border-purple-600 focus:outline-none transition-colors' required onChange={(e)=>setEmail(e.target.value)} value={email}/>
            </div> 
            <div className='w-full flex items-start justify-start flex-col gap-2 relative'>
                <label htmlFor="password" className='text-sm font-medium text-gray-700'>Password</label>
                <input type={show?"text":"password"} id='password' className='w-full h-12 border-2 border-gray-200 rounded-lg text-base px-4 focus:border-purple-600 focus:outline-none transition-colors' required onChange={(e)=>setPassword(e.target.value)} value={password} />
                {!show && <IoMdEye className='w-6 h-6 absolute right-4 bottom-3 cursor-pointer text-gray-500 hover:text-purple-600 transition-colors' onClick={()=>setShow(prev =>!prev)}/>}
                {show && <IoMdEyeOff className='w-6 h-6 absolute right-4 bottom-3 cursor-pointer text-gray-500 hover:text-purple-600 transition-colors' onClick={()=>setShow(prev =>!prev)}/>}
            </div>
            <button className='w-full h-12 bg-purple-600 text-white text-lg font-medium rounded-lg hover:bg-purple-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed' disabled={loading}>
                {loading ? "Loading..." : "Create Account"}
            </button>
            <p className='text-gray-600'>Already have an account? <span className='text-purple-600 font-medium cursor-pointer hover:text-purple-700 transition-colors' onClick={()=>navigate("/login")}>Sign In</span></p>
        </form>
    </div>
  )
}

export default SignUp