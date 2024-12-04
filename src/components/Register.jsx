import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaGoogle } from "react-icons/fa";
import { useForm } from "react-hook-form";
import { useAuth } from '../context/AuthContext';


const Register = () => {

    const [message, setMessage] = useState(true);
    const {registerUser, signInWithGoogle} =useAuth();
    const navigate = useNavigate();
    
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
        } = useForm();

    //registering the user
    const onSubmit = async(data) => {
        console.log(data)
        try {
            await registerUser(data.email, data.password);
            alert("User Registered Successfully.")
        } catch (error) {
            setMessage("Please provide valid email & password")
            console.error(error);
        }
    }

    const handleGoogleSignIn = async() => {
        try {
            await signInWithGoogle();
            alert("Log in successful!!!");
            navigate("/")
        } catch (error) {
            alert("Google sign in failed!!")
            console.error(error);
        }
    };


  return (
    <div className='h-[calc(100vh-120px)] flex justify-center items-center'>
        <div className='w-full max-w-sm mx-auto bg-tertiary shadow-md rounded-md px-8 pt-6 pb-8 mb-4'>
            <h2 className='text-4xl text-matteBlack text-center font-primary font-semibold mb-4'>
                Sign up
            </h2>

            <form onSubmit={handleSubmit(onSubmit)}>
                <div className='mb-4 '>
                    <label className='block text-matteBlack text-lg font-secondary mb-2' htmlFor="email">
                        Email
                    </label>
                    <input 
                    {...register("email", { required: true })}
                    type="email" name="email" id="email" placeholder='Enter Your Email'
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

                <div>
                    <button className='btn-secondary mb-4 sm:mb-0'>
                      Sign Up
                    </button>
                </div>
            </form>
            <p className='align-baseline font-secondary mt-4 text-sm'>
                   Have an account?
                   <Link to="/login" className='text-offWhite hover:text-primary'> Log In </Link>
                   Now 
            </p>

            {/* Google Signin Button */}

            <div className='mt-4 flex justify-center items-center'>
            <button 
            onClick={handleGoogleSignIn}
            className='btn-secondary flex w-full items-center justify-center'>
            <FaGoogle className='mr-2'/>
            Sign in with Google
            </button>
            </div>

        </div>
    </div>
  )
}

export default Register