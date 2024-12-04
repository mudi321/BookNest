import React from 'react'

import { useAuth } from '../../context/AuthContext';
import { useGetOrderQuery } from '../../redux/features/orders/ordersApi';

const Orders = () => {
    const {currentUser} = useAuth()

    if (!currentUser || !currentUser.email) {
        return <div>Please log in to view your orders.</div>;
    }
    // const { data: orders = [], isLoading, error } = useGetOrderQuery(currentUser.email); //if an error happens make it like Top sellers
    
    
    const { data, error, isLoading } = useGetOrderQuery(currentUser.email);
    const orders = data?.orders || [];
    if (isLoading) return <div>is Loading...</div>
    // if (isError) return <div>Error fetching orders</div>
    
    // if (error) {
    //     console.error("Error fetching orders:", error);
    //     return <div>Error occurred when fetching order info: {error.message || 'Unknown error'}</div>;
    // }
    console.log("Data:", data);
    console.log("Error:", error);
    if (error) {
        console.error("Error fetching orders:", error);
    
        // Check if the error is a parsing issue
        if (error.status === "PARSING_ERROR") {
            return <div>Unexpected response format. Please contact support.</div>;
        }
    
        return (
            <div>
                Error occurred when fetching order info: {error.message || "Unknown error"}
            </div>
        );
    }
  return (

    <div className='container mx-auto p-6'>
            <h2 className='text-2xl font-semibold mb-4'>Your Orders</h2>
            {
                orders.length === 0 ? (<div>No orders found!</div>) : (<div>
                    {
                        orders.map((order, index) => (
                            <div key={order._id} className="border-b mb-4 pb-4">
                                <p className='p-1 bg-secondary text-white w-10 rounded mb-1'># {index + 1}</p>
                                <h2 className="font-bold">Order ID: {order._id}</h2>
                                <p className="text-gray-600">Name: {order.name}</p>
                                <p className="text-gray-600">Email: {order.email}</p>
                                <p className="text-gray-600">Phone: {order.phone}</p>
                                <p className="text-gray-600">Total Price: ${order.totalPrice}</p>
                                <h3 className="font-semibold mt-2">Address:</h3>
                                <p> {order.address.city}, {order.address.state}, {order.address.country}, {order.address.zipcode}</p>
                                <h3 className="font-semibold mt-2">Products Id:</h3>
                                <ul>
                                    {/* {order.productIds.map((productId) => (
                                        <li key={productId}>{productId}</li>
                                    ))} */}

                                    {(order.productIds || []).map((productId) => (
                                            <li key={productId}>{productId}</li>
                                        ))}
                                </ul>
                            </div>
                        ))
                    }
                </div>)
            }
        </div>
    )
}

export default Orders