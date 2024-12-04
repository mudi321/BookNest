import React from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux'
import { useForm } from "react-hook-form"
import { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useCreateOrderMutation } from '../../redux/features/orders/ordersApi';
import Swal from 'sweetalert2'

const Checkout = () => {

    const cartItems = useSelector(state => state.cart.cartItems);

    const totalPrice = cartItems.reduce ((acc, item) => acc + item.newPrice, 0).toFixed(2);

    const {currentUser} = useAuth();
    const navigate =  useNavigate()

    const [isChecked, setIsChecked] = useState(false);

    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm()

    const [createOrder, {isLoading, error}] = useCreateOrderMutation();

    const onSubmit = async(data) => {
        const newOrder = {
            name: data.name,
            email: currentUser?.email,
            address: {
                city: data.city,
                country: data.country,
                state: data.state,
                zipcode: data.zipcode,
            },
            phone: data.phone,
            productIds: cartItems.map(item => item?._id),
            totalPrice: totalPrice,
        }

        try {
            await createOrder(newOrder).unwrap(); 
            Swal.fire({
                title: "<b>Confirm the Order</b>",
                text: "Order Placed Successfully!!!",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#A69080",
                cancelButtonColor: "#555555",
                confirmButtonText: "<b>Confirm</b>",
                cancelButtonText: "<b>Cancel</b>"
              }).then((result) => {
                if (result.isConfirmed) {
                  Swal.fire({
                    title: "Order Confirmed!",
                    text: "Thank you for shopping with us.",
                    icon: "success"
                  });
                }
              });
              navigate("/orders")
        } catch (error) {
            console.error("Error occured",error);
            alert("Order failed.");
        }
    }

    if(isLoading) return <div>Loading.....</div>
  return (
    <section>
    <div className="min-h-screen p-6 bg-offWhite flex items-center justify-center font-secondary">
      <div className="container max-w-screen-lg mx-auto">
          <div>
              <div>
              <h2 className="font-semibold text-2xl text-matteBlack mb-2 font-primary">Cash On Delivery</h2>
              <p className="text-matteBlack mb-2">Total Price: ${totalPrice}</p>
              <p className="text-matteBlack mb-6">Items: {cartItems.length}</p>
              </div>

              <div className="bg-white rounded shadow-lg p-4 px-4 md:p-8 mb-6">
                      <form onSubmit={handleSubmit(onSubmit)} className="grid gap-4 gap-y-2 text-sm grid-cols-1 lg:grid-cols-3 my-8">
                          <div className="text-matteBlack">
                              <p className="font-medium text-3xl font-primary">Personal Details</p>
                              <p>Please fill out all the fields.</p>
                          </div>

                          <div className="lg:col-span-2">
                              <div className="grid gap-4 gap-y-2 text-sm grid-cols-1 md:grid-cols-5">
                                  <div className="md:col-span-5">
                                      <label htmlFor="full_name">Full Name</label>
                                      <input
                                        {...register("name", { required: true })}
                                        type="text" name="name" id="name" className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"  />
                                  </div>

                                  <div className="md:col-span-5">
                                      <label html="email">Email Address</label>
                                      <input
                                          
                                          type="text" name="email" id="email" className="h-10 border mt-1 rounded px-4 w-full bg-gray-50" 
                                          disabled
                                          defaultValue={currentUser?.email}
                                          placeholder="email@domain.com" />
                                  </div>
                                  <div className="md:col-span-5">
                                      <label html="phone">Phone Number</label>
                                      <input
                                        {...register("phone", { required: true })}
                                        type="number" name="phone" id="phone" className="h-10 border mt-1 rounded px-4 w-full bg-gray-50" placeholder="+123 456 7890" />
                                  </div>

                                  <div className="md:col-span-3">
                                      <label htmlFor="address">Address / Street</label>
                                      <input
                                        {...register("address", { required: true })}
                                        type="text" name="address" id="address" className="h-10 border mt-1 rounded px-4 w-full bg-gray-50" placeholder="" />
                                  </div>

                                  <div className="md:col-span-2">
                                      <label htmlFor="city">City</label>
                                      <input
                                        {...register("city", { required: true })}
                                        type="text" name="city" id="city" className="h-10 border mt-1 rounded px-4 w-full bg-gray-50" placeholder="" />
                                  </div>

                                  <div className="md:col-span-2">
                                      <label htmlFor="country">Country / region</label>
                                      <div className="h-10 bg-gray-50 flex border border-gray-200 rounded items-center mt-1">
                                          <input
                                            {...register("country", { required: true })}
                                            name="country" id="country" placeholder="Country" className="px-4 appearance-none outline-none text-gray-800 w-full bg-transparent"  />
                                          <button tabIndex="-1" className="cursor-pointer outline-none focus:outline-none transition-all text-gray-300 hover:text-red-600">
                                              <svg className="w-4 h-4 mx-2 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                                  <line x1="18" y1="6" x2="6" y2="18"></line>
                                                  <line x1="6" y1="6" x2="18" y2="18"></line>
                                              </svg>
                                          </button>
                                          <button tabIndex="-1" className="cursor-pointer outline-none focus:outline-none border-l border-gray-200 transition-all text-gray-300 hover:text-blue-600">
                                              <svg className="w-4 h-4 mx-2 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="18 15 12 9 6 15"></polyline></svg>
                                          </button>
                                      </div>
                                  </div>

                                  <div className="md:col-span-2">
                                      <label htmlFor="state">State / province</label>
                                      <div className="h-10 bg-gray-50 flex border border-gray-200 rounded items-center mt-1">
                                          <input 
                                          {...register("state", { required: true })}
                                          name="state" id="state" placeholder="State" className="px-4 appearance-none outline-none text-gray-800 w-full bg-transparent"  />
                                          <button  className="cursor-pointer outline-none focus:outline-none transition-all text-gray-300 hover:text-red-600">
                                              <svg className="w-4 h-4 mx-2 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                                  <line x1="18" y1="6" x2="6" y2="18"></line>
                                                  <line x1="6" y1="6" x2="18" y2="18"></line>
                                              </svg>
                                          </button>
                                          <button tabIndex="-1" className="cursor-pointer outline-none focus:outline-none border-l border-gray-200 transition-all text-gray-300 hover:text-blue-600">
                                              <svg className="w-4 h-4 mx-2 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="18 15 12 9 6 15"></polyline></svg>
                                          </button>
                                      </div>
                                  </div>

                                  <div className="md:col-span-1">
                                      <label htmlFor="zipcode">Zipcode</label>
                                      <input 
                                        {...register("zipcode", { required: true })}
                                        type="text" name="zipcode" id="zipcode" className="transition-all flex items-center h-10 border mt-1 rounded px-4 w-full bg-gray-50" placeholder="" />
                                  </div>

                                  <div className="md:col-span-5 mt-3">
                                      <div className="inline-flex items-center">
                                          <input 
                                          onChange={(e) => setIsChecked(e.target.checked)}
                                          type="checkbox" name="billing_same" id="billing_same" className="form-checkbox" />
                                          <label htmlFor="billing_same" className="ml-2 ">I have read & agreed to the <Link className='underline underline-offset-2 text-tertiary'>Terms & Conditions</Link> & <Link className='underline underline-offset-2 text-tertiary'>Shoping Policy.</Link></label>
                                      </div>
                                  </div>



                                  <div className="md:col-span-5 text-right">
                                      <div className="inline-flex items-end">
                                          <button 
                                          disabled={!isChecked}
                                          className=" btn-secondary">Place an Order</button>
                                      </div>
                                  </div>

                              </div>
                          </div>
                      </form>
                  </div>
              

            
          </div>

          
      </div>
  </div>
</section>
  )
}

export default Checkout
