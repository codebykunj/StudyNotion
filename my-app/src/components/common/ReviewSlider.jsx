import React, { useEffect, useState } from "react"
import ReactStars from "react-rating-stars-component"
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react"

// Import Swiper styles
import "swiper/css"
import "swiper/css/free-mode"
import "swiper/css/pagination"
import "../../App.css"
// Icons
import { FaStar } from "react-icons/fa"
// Import required modules
import { Autoplay, FreeMode, Pagination } from "swiper"

// Get apiFunction and the endpoint
import { apiconnector } from "../../services/apiconnector"
import { ratingsEndpoints } from "../../services/apis"

function ReviewSlider() {
  const [reviews, setReviews] = useState([])
  const truncateWords = 15

  useEffect(() => {
    ;(async () => {
      try {
        const { data } = await apiconnector(
          "GET",
          ratingsEndpoints.REVIEWS_DETAILS_API
        )
        const fakeReviews = [
          {
            user: { firstName: "Aarav", lastName: "Patel" },
            course: { courseName: "Full Stack Web Dev" },
            review: "This platform is absolutely amazing! The projects helped me build a great portfolio.",
            rating: 5
          },
          {
            user: { firstName: "Priya", lastName: "Shah" },
            course: { courseName: "Data Structures in C++" },
            review: "The DSA course is very well structured. I cracked my campus placement easily.",
            rating: 4.5
          },
          {
            user: { firstName: "Meet", lastName: "Desai" },
            course: { courseName: "Learn React Native" },
            review: "Bov saras course! Very easy to understand for beginners. Highly recommended.",
            rating: 5
          },
          {
            user: { firstName: "Neha", lastName: "Mehta" },
            course: { courseName: "Backend Node.js" },
            review: "The real-world examples are very practical and the dashboard is super smooth.",
            rating: 4.8
          },
          {
            user: { firstName: "Rahul", lastName: "Parmar" },
            course: { courseName: "Python for Data Science" },
            review: "Great learning experience! The platform design is visually stunning like a top-tier app.",
            rating: 5
          },
          {
            user: { firstName: "Aneri", lastName: "Gandhi" },
            course: { courseName: "UI/UX Design Masterclass" },
            review: "The design course is very practical. I learned Figma from scratch in weeks.",
            rating: 4.9
          },
          {
            user: { firstName: "Dev", lastName: "Thakkar" },
            course: { courseName: "Machine Learning A-Z" },
            review: "I never thought ML could be explained this simply. Excellent instructors!",
            rating: 4.7
          },
          {
            user: { firstName: "Riya", lastName: "Joshi" },
            course: { courseName: "Advanced JavaScript" },
            review: "Mind-blowing content! Cleared all my core concepts perfectly.",
            rating: 5
          }
        ];

        if (data?.success && data?.data?.length > 0) {
          setReviews([...data.data, ...fakeReviews]);
        } else {
          setReviews(fakeReviews);
        }
      } catch (error) {
        console.error("Error fetching reviews", error)
      }
    })()
  }, [])

  // console.log(reviews)

  return (
    <div className="text-white w-full flex items-center mx-auto justify-center">
      <div className="h-auto min-h-[184px] max-w-maxContentTab lg:max-w-maxContent w-full">
        <Swiper
          slidesPerView={1}
          breakpoints={{
            640: { slidesPerView: 2 },
            1024: { slidesPerView: 4 }
          }}
          spaceBetween={25}
          loop={true}
          freeMode={true}
          autoplay={{
            delay: 2500,
            disableOnInteraction: false,
          }}
          modules={[FreeMode, Pagination, Autoplay]}
          className="w-full"
        >
          {reviews.map((review, i) => {
            return (
              <SwiperSlide key={i}>
                <div className="flex flex-col gap-3 bg-richblack-800 p-3 text-[14px] text-richblack-25">
                  <div className="flex items-center gap-4">
                    <img
                      src={
                        review?.user?.image
                          ? review?.user?.image
                          : `https://api.dicebear.com/5.x/initials/svg?seed=${review?.user?.firstName} ${review?.user?.lastName}`
                      }
                      alt=""
                      className="h-9 w-9 rounded-full object-cover"
                    />
                    <div className="flex flex-col">
                      <h1 className="font-semibold text-richblack-5">{`${review?.user?.firstName} ${review?.user?.lastName}`}</h1>
                      <h2 className="text-[12px] font-medium text-richblack-500">
                        {review?.course?.courseName}
                      </h2>
                    </div>
                  </div>
                  <p className="font-medium text-richblack-25">
                    {review?.review.split(" ").length > truncateWords
                      ? `${review?.review
                          .split(" ")
                          .slice(0, truncateWords)
                          .join(" ")} ...`
                      : `${review?.review}`}
                  </p>
                  <div className="flex items-center gap-2 ">
                    <h3 className="font-semibold text-yellow-100">
                      {review.rating.toFixed(1)}
                    </h3>
                    <ReactStars
                      count={5}
                      value={review.rating}
                      size={20}
                      edit={false}
                      activeColor="#ffd700"
                      emptyIcon={<FaStar />}
                      fullIcon={<FaStar />}
                    />
                  </div>
                </div>
              </SwiperSlide>
            )
          })}
          {/* <SwiperSlide>Slide 1</SwiperSlide> */}
        </Swiper>
      </div>
    </div>
  )
}

export default ReviewSlider