// import React from 'react'
// import {Swiper, SwiperSlide} from "swiper/react"
// import "swiper/css"
// import "swiper/css/free-mode"
// import "swiper/css/pagination"
// import {FreeMode,Pagination} from 'swiper'
// import { Course_Card } from './Course_Card'
// //Slider create karva mate aapde Swiper package no use karvo padse
// //Command to install Swiper package : npm i swiper
// // export const CourseSlider = ({Courses}) => {
// //   return (
// //     <>
// //       {
// //         //aai check karvanu ke courses ni length hase that means courses.length>0
// //         // that meand courses hoi to tene display/show karo nai to pachi courses.length 0 
// //         // hoi to No Course Found
// //         Courses?.length > 0  ? (
// //         <Swiper
// //         loop={true}
// //         slidesPerView={1}
// //         spaceBetween={25}
// //         className='min-h-[30rem]'
// //         modules={[Pagination]
// //        }
// //         >
// //           {
// //             Courses?.map((course,index)=>(
// //               <SwiperSlide key={index}>
// //               {/* aapde aagad Course_Card vadu card create karyu che and tema j aa 
// //               badhi details che to me aej Course_Card component no use kari badhi 
// //               details/item ne map karavi didhi che */}
// //                 <Course_Card course={course} Height={"h-[250px]"}/>
// //               </SwiperSlide>
// //             ))
// //           }
// //         </Swiper>) : (<p>No Course Found</p>)
// //       }
// //     </>
// //   )
// // }






//aa code final che and run pn thai che
import React from 'react'
import { Swiper, SwiperSlide } from "swiper/react"
import "swiper/css"
import "swiper/css/free-mode"
import "swiper/css/pagination"
import "swiper/css/navigation"

import { Autoplay, FreeMode, Navigation, Pagination } from 'swiper'
import { Course_Card } from './Course_Card'

export const CourseSlider = ({ Courses }) => {
  return (
    <>
      {Courses?.length ? (
        <Swiper
          slidesPerView={1}
          spaceBetween={25}
          loop={true}
          autoplay={{ delay: 200, disableOnInteraction: false }}
          navigation={true}
          pagination={{ clickable: true }}
          modules={[FreeMode, Pagination, Autoplay, Navigation]}
          breakpoints={{
            1024: {
              slidesPerView: 3,
            },
          }}
          className="max-h-[30rem]"
        >
          {Courses.map((course, i) => (
            <SwiperSlide key={i}>
              <Course_Card course={course} Height={"h-[250px]"} />
            </SwiperSlide>
          ))}
        </Swiper>
      ) : (
        <p className="text-xl text-richblack-5">No Course Found</p>
      )}
    </>
  )
}
