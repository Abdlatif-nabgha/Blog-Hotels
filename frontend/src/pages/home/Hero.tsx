// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// import images 
import img1 from '../../assets/hero/img1.jpg';
import img2 from '../../assets/hero/img2.jpg';
import img3 from '../../assets/hero/img3.jpg';
import img4 from '../../assets/hero/img4.jpg';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';

// import required modules
import { Autoplay, Pagination } from 'swiper/modules';



const Hero = () => {
    return (
        <div className="flex flex-col md:flex-row justify-between text-center md:gap-14 gap-8">
            <div className="md:w-1/2 w-full items-center">
                <h1 className="md:text-5xl text-3xl font-bold md:leading-tight">Hotels With Rooftop Pools Near You</h1>
                <p className="py-4">Discovering hotels with rooftop pools near to you! whether your planning a staycation or a vacation,
                    our curated selection of hotels with rooftop pools has something for everyone.</p>
            </div>
            <div className="md:w-1/2 w-full mx-auto">
                <Swiper
                    slidesPerView={1}
                    spaceBetween={10}
                    pagination={{
                        clickable: true,
                    }}
                    autoplay={{
                        delay: 2000,
                        disableOnInteraction: false
                    }}
                    breakpoints={{
                        640: {
                            slidesPerView: 1,
                            spaceBetween: 20,
                        },
                        768: {
                            slidesPerView: 1,
                            spaceBetween: 40,
                        },
                        1024: {
                            slidesPerView: 1,
                            spaceBetween: 50,
                        },
                    }}
                    modules={[Pagination, Autoplay]}
                    className="mySwiper"
                >
                    <SwiperSlide>
                        <img src={img1} alt="image 1" className='w-full lg:h-[420px] sm:h-96 h-80' />
                    </SwiperSlide>
                    <SwiperSlide>
                        <img src={img2} alt="image 2" className='w-full lg:h-[420px] sm:h-96 h-80' />
                    </SwiperSlide>
                    <SwiperSlide>
                        <img src={img3} alt="image 3" className='w-full lg:h-[420px] sm:h-96 h-80' />
                    </SwiperSlide>
                    <SwiperSlide>
                        <img src={img4} alt="image 4" className='w-full lg:h-[420px] sm:h-96 h-80' />
                    </SwiperSlide>
                </Swiper>
            </div>
        </div>
    )
}

export default Hero