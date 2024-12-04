import {useState, useEffect} from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

// import required modules
import { Pagination, Navigation } from 'swiper/modules';
import BookCard from '../books/BookCard';
import { useFetchAllBooksQuery } from '../../redux/features/books/booksApi';


const Recommened = () => {

  const { data, error, isLoading } = useFetchAllBooksQuery();
  const books = data?.books || [];

  return (
    <div className='py-16'>
        <h2 className='text-4xl font-primary mb-6 mt-6 text-matteBlack font-semibold '>
        Recomended For You
        </h2>

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
        books.length > 0 && books.slice(8,16).map((item, index) => (
          
          <SwiperSlide key={index}>
            <BookCard  book={item}/>
          </SwiperSlide>
        ))
        }    
        
        </Swiper>
    </div>
  )
}

export default Recommened