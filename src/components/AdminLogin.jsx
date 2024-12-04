import React, { useState } from 'react'
import { useForm } from "react-hook-form"
import axios from 'axios'
import getBaseUrl from '../utils/baseUrl';
import { useNavigate } from 'react-router-dom';


const AdminLogin = () => {
    
    const [message, setMessage] = useState(true);

    const navigate = useNavigate();

    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
      } = useForm();

      const onSubmit = async(data) => {

        
        try {
            const response = await axios.post(`${getBaseUrl()}/api/auth/admin`, data, {
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            const auth = response.data;

            if(auth.token) {
                localStorage.setItem('token', auth.token);
                setTimeout(() => {
                    localStorage.removeItem('token')
                    alert('Token has been expired!, Please login again.');
                    navigate("/")
                }, 3600 * 1000)
            }

            alert("Admin Login successful!")
            navigate("/dashboard")

        } catch (error) {
            setMessage("Please provide valid email & password")
            console.error(error);
        }
    };

  return (
    <div className='h-screen flex justify-center items-center'>
        <div className='w-full max-w-sm mx-auto bg-tertiary shadow-md rounded-md px-8 pt-6 pb-8 mb-4'>
            <h2 className='text-4xl text-matteBlack text-center font-primary font-semibold mb-4 '>
                Admin Log in
            </h2>

            <form onSubmit={handleSubmit(onSubmit)}>
                <div className='mb-4 '>
                    <label className='block text-matteBlack text-lg font-secondary mb-2' htmlFor="email">
                        Username
                    </label>
                    <input 
                    {...register("username", { required: true })}
                    type="text" name="username" id="username" placeholder='Enter Your Username'
                    className='shadow appearance-none border rounded py-2 px-3 leading-tight font-secondary
                    focus:outline-none focus:shadow'/>
                </div>
                <div className='mb-4'>
                    <label className='block text-matteBlack text-lg font-secondary mb-2' htmlFor="password">
                        Password
                    </label>
                    <input 
                    {...register("password", { required: true })}
                    type="password" name="password" id="password" placeholder='Enter Your Password'
                    className='shadow appearance-none border rounded py-2 px-3 leading-tight font-secondary
                    focus:outline-none focus:shadow'/>
                </div>

                {
                    message && <p className='font-secondary text-offWhite text-sm mb-3'>{message}</p>
                }

                <div className='w-full items-center mt-6'>
                    <button className='btn-secondary mb-4 sm:mb-0 w-full'>
                        Log In
                    </button>
                </div>
            </form>
            
            

            

        </div>
    </div>
  )
}

export default AdminLogin