import React from 'react'
import {FiShoppingCart} from 'react-icons/fi';
import { getImgUrl } from '../../utils/getImgUrl';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addToCart } from '../../redux/features/cart/cartSlice';

const BookCard = ({book}) => {

  const dispatch = useDispatch();

  const handleAddToCart = (item) => {
    dispatch(addToCart(item))
  }

  return (
    <div className="rounded-lg transition-shadow duration-300 min-h-[350px] flex flex-col justify-center bg-tertiary">
  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-center gap-1 text-center sm:text-left ">
    
    {/* Wrapper div with dynamic width */}
    <div className="border-none rounded-md flex items-center justify-center mx-auto" style={{ maxWidth: '200px' }}>
      <Link to={`/books/${book._id}`}>
        <img
          src={`${getImgUrl(book?.coverImage)}`}
          alt=""
          className="w-full sm:w-auto h-auto p-2 rounded-md cursor-pointer hover:scale-105 transition-all duration-200"
          style={{ maxWidth: '200px' }} // Adjust width as needed
        />
      </Link>
    </div>

    {/* Right side content centered on small screens */}
    <div className="sm:w-1/2 w-full flex flex-col items-center sm:items-start text-center sm:text-left">
      <Link to={`/books/${book._id}`}>
        <h3 className="text-xl text-matteBlack font-secondary font-semibold hover:text-offWhite mb-3">
          {book?.title}
        </h3>
      </Link>
      <p className="font-secondary text-gray-600 mb-5">
        {book?.description.length > 80 ? `${book.description.slice(0, 80)}...` : book.description}
      </p>
      <p className="font-medium font-secondary mb-5">
        ${book?.newPrice} <span className="line-through font-normal ml-2">${book?.oldPrice}</span>
      </p>
      <button 
      onClick={() => handleAddToCart(book)}
      className="btn-secondary px-6 space-x-1 flex items-center gap-1 mb-4 sm:mb-0">
        <FiShoppingCart />
        <span>Add to Cart</span>
      </button>
    </div>
  </div>
</div>
  )
}

export default BookCard