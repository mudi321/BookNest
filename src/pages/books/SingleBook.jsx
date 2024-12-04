import React from 'react'
import { useParams } from "react-router-dom"
import { useFetchBookByIdQuery } from '../../redux/features/books/booksApi';
import { getImgUrl } from '../../utils/getImgUrl';
import { FiShoppingCart } from 'react-icons/fi';
import { useDispatch } from 'react-redux';
import { addToCart } from '../../redux/features/cart/cartSlice';

const SingleBook = () => {

    const {id} =  useParams();
    // const {data: book, error, isLoading } = useFetchBookByIdQuery(id);
    const { data, error, isLoading } = useFetchBookByIdQuery(id);
    const book = data?.book || [];

    if(isLoading) return <div>Loading...</div>
    if(error) return <div>Error happending to load book info</div>

    const dispatch = useDispatch();

    const handleAddToCart = (item) => {
        dispatch(addToCart(item))
    }

  return (
    <div className=" shadow-lg p-5 rounded-lg">
    <h1 className="text-2xl font-bold mb-6">{book.title}</h1>

{/* edited bot div flex */}
    <div className='grid sm:flex'> 
        <div>
            <img
                src={`${getImgUrl(book.coverImage)}`}
                alt={book.title}
                className="mb-8 "
            />
        </div>
{/* edited bot div ml-5 */}
        <div className='mb-5 ml-5'>
            <p className="text-gray-700 mb-2"><strong>Author:</strong> {book.author || 'admin'}</p>
            <p className="text-gray-700 mb-4">
                <strong>Published:</strong> {new Date(book?.createdAt).toLocaleDateString()}
            </p>
            <p className="text-gray-700 mb-4 capitalize">
                <strong>Category:</strong> {book?.category}
            </p>
            <p className="text-gray-700"><strong>Description:</strong> {book.description}</p>
        

        <button onClick={() => handleAddToCart(book)} className="btn-primary px-6 space-x-1 flex items-center gap-1 mt-3 ">
            <FiShoppingCart className="" />
            <span>Add to Cart</span>

        </button>
        </div>
    </div>
</div>

  )
}

export default SingleBook