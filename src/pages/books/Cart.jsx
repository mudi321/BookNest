import React from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { getImgUrl } from '../../utils/getImgUrl';
import { clearCart, removeCart } from '../../redux/features/cart/cartSlice';


const Cart = () => {

  const cartItems = useSelector(state => state.cart.cartItems);

  const dispatch = useDispatch()

  const totalPrice = cartItems.reduce ((acc, item) => acc + item.newPrice, 0).toFixed(2);

  const handleRemoveBtn = (item) => {
    dispatch(removeCart(item))
  }

  const handleClearBtn = () => {
    dispatch(clearCart())
  }

  return (
    <>
    <div className="flex mt-12 h-full flex-col overflow-hidden bg-tertiary shadow-xl rounded-2xl">
    <div className="flex-1 overflow-y-auto px-4 py-6 sm:px-6">
      <div className="flex items-start justify-between">
        <div className="text-3xl font-primary font-semibold text-primary">My Cart</div>
        <div className="ml-3 flex h-7 items-center ">
          <button
            type="button"
            onClick={handleClearBtn}
            className="btn-primary relative"
          >
            <span className="">Clear Cart</span>
          </button>
        </div>
      </div>

      <div className="mt-8">
        <div className="flow-root">
          {
            cartItems.length > 0 ? (
              <ul role="list" className="-my-6 divide-y divide-offWhite">
                {
                  cartItems.map ((item) => (
                    <li key={item?._id} className="flex py-6">
                  <div className="h-29 w-24 flex-shrink-0 overflow-hidden rounded-md border border-offWhite">
                    <img
                      alt=""
                      src={`${getImgUrl(item?.coverImage)}`}
                      className="h-full w-full object-fill object-center"
                    />
                  </div>

                  <div className="ml-4 flex flex-1 flex-col">
                    <div>
                      <div className="flex flex-wrap justify-between text-base font-secondary font-semibold text-matteBlack">
                        <h3>
                          <Link to='/'>{item?.title}</Link>
                        </h3>
                        <p className="sm:ml-4">${item.newPrice}</p>
                      </div>
                      <p className="mt-1 font-secondary text-md text-matteBlack capitalize"><strong>Category:</strong> {item.category}</p>
                    </div>
                    <div className="flex flex-1 flex-wrap items-end justify-between space-y-2 text-md">
                      <p className="text-matteBlack font-secondary"><strong>Qty:</strong> 1</p>

                      <div className="flex">
                        <button  
                        onClick = {() => handleRemoveBtn(item)}
                        className="btn-primary">
                          Remove
                        </button>
                      </div>
                    </div>
                  </div>
                </li>
                  ))
                }
                
          
            </ul>
            ) : (<p className='font-secondary font-semibold text-matteBlack 
              flex justify-center items-center'>Your Cart Is Currently Empty.</p>)
          }
          
             
        </div>
      </div>
    </div>

    <div className="border-t border-offWhite px-4 py-6 sm:px-6">
      <div className="flex justify-between text-base font-secondary font-semibold text-matteBlack">
        <p>Subtotal</p>
        <p>${totalPrice ? totalPrice : 0}</p>
      </div>
      <p className="mt-0.5 text-sm text-primary font-secondary">*Shipping and taxes calculated at checkout.</p>
      <div className="mt-6">
        <Link
          to="/checkout"
          className="btn-secondary flex items-center justify-center "
        >
          Checkout
        </Link>
      </div>
      <div className="mt-6 flex justify-center text-center text-lg text-primary">
        <Link to="/">
          <button
            type="button"
            className="font-secondary font-semibold text-offWhite hover:text-primary">
            Continue Shopping
            <span aria-hidden="true"> &rarr;</span>
          </button>
        </Link>
      </div>
    </div>
  </div>
    </>
  )
}

export default Cart