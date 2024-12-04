import {useState, useEffect} from 'react';
import BookCard from '../books/BookCard';

import { Swiper, SwiperSlide } from 'swiper/react';
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

// import required modules
import { Pagination, Navigation } from 'swiper/modules';
import { useFetchAllBooksQuery } from '../../redux/features/books/booksApi';



const TopSellers = () => {


  
  const [selectedCategory, setSelectedCategory] = useState("Choose a genre");
  const { data, error, isLoading } = useFetchAllBooksQuery();
  const books = data?.books || [];
  if(isLoading) return <div>Loading...</div>
    if(error) return <div>Error happending to load book info</div>
  const category = ["Choose a genre", "Business", "Fiction", "Horror", "Adventure",];

  const filteredBooks = selectedCategory === "Choose a genre" ? books : 
  books.filter (book => book.category === selectedCategory.toLowerCase());




  return (
    <div>
      <h2 className='text-4xl font-primary mb-6 mt-6 text-matteBlack font-semibold '>
        Top Sellers
      </h2>
      {/* Category */}
      <div className='mb-8 flex items-center'>
        <select 
        onChange={(e) => setSelectedCategory(e.target.value)}
        name="category" id="category"
         className=' bg-tertiary font-secondary text-matteBlack shadow-lg rounded-md px-4 py-2 
         focus-outline-none '>
          {
            category.map((book, index) => (
              <option 
              key={index} 
              value={book} 
              className=''>
                {book}
              </option>
            ))
          }
        </select>
      </div>

      <Swiper
        slidesPerView={1}
        spaceBetween={30}
        
        breakpoints={{
          640: {
            slidesPerView: 1,
            spaceBetween: 20,
          },
          768: {
            slidesPerView: 2,
            spaceBetween: 40,
          },
          1024: {
            slidesPerView: 2,
            spaceBetween: 50,
          },
          1180: {
            slidesPerView: 2,
            spaceBetween: 50,
          },
          1240: {
            slidesPerView: 2,
            spaceBetween: 50,
          },

        }}
        navigation={true}
        modules={[Pagination, Navigation]}
        className="mySwiper"
        
      >

{
        filteredBooks.length > 0 && filteredBooks.map((book, index) => (
          
          <SwiperSlide key={index}>
            <BookCard  book={book}/>
          </SwiperSlide>
        ))
      }    
        
      </Swiper>
    

      
    </div>




  )
}


export default TopSellers