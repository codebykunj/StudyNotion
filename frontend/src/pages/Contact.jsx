
// niche no code upper jevo che pn tema styling apply kareli che
import React from "react"
import { IoCall } from "react-icons/io5"
import { TbWorld } from "react-icons/tb"
import { BsFillChatLeftDotsFill } from "react-icons/bs"
// import  ContactUsForm  from "../contactPage/ContactUsForm"
// import Footer from "../components/common/Footer"
import ReviewSlider from "../components/common/ReviewSlider"
import { ContactUsForm } from "../contactPage/ContactUsForm "

export const Contact = () => {
  return (
    <div className="text-white bg-richblack-900">
      {/* ===== Main Content Wrapper ===== */}
      <div className="mx-auto mt-20 flex w-11/12 max-w-maxContent flex-col justify-between gap-10 lg:flex-row">
        {/* ===== LEFT CONTACT DETAILS ===== */}
        <div className="lg:w-[40%] flex flex-col gap-10 bg-richblack-800 rounded-2xl p-10 shadow-[0_4px_15px_rgba(0,0,0,0.4)]">
          {/* Chat */}
          <div className="flex flex-col">
            <div className="flex flex-row items-center gap-3">
              <BsFillChatLeftDotsFill className="text-2xl text-yellow-50" />
              <p className="text-xl font-semibold">Chat with us</p>
            </div>
            <p className="text-richblack-200 text-[15px] mt-1">
              Our friendly team is here to help.
            </p>
            <p className="text-richblack-5 text-[15px] font-bold">
              info@studynotion.com
            </p>
          </div>

          {/* Visit */}
          <div className="flex flex-col">
            <div className="flex flex-row items-center gap-3">
              <TbWorld className="text-2xl text-yellow-50" />
              <p className="text-xl font-semibold">Visit us</p>
            </div>
            <p className="text-richblack-200 text-[15px] mt-1">
              Come and say hello at our office HQ.
            </p>
            <p className="text-richblack-5 text-[15px] font-bold">
              Akshya Nagar 1st Block 1st Cross, Lal Darwaja, Umreth - 388220
            </p>
          </div>

          {/* Call */}
          <div className="flex flex-col">
            <div className="flex flex-row items-center gap-3">
              <IoCall className="text-2xl text-yellow-50" />
              <p className="text-xl font-semibold">Call us</p>
            </div>
            <p className="text-richblack-200 text-[15px] mt-1">
              Mon - Fri from 8am to 5pm
            </p>
            <p className="text-richblack-5 text-[15px] font-bold">
              +91 7016302399
            </p>
          </div>
        </div>

        {/* ===== RIGHT FORM ===== */}
        <div className="lg:w-[60%] bg-richblack-900 rounded-2xl border border-richblack-600 p-10 shadow-[0_4px_15px_rgba(0,0,0,0.3)]">
          <h1 className="text-4xl font-semibold mb-3">
            Got an Idea? We’ve got the skills. Let’s team up.
          </h1>
          <p className="text-richblack-200 mb-8">
            Tell us more about yourself and what you’ve got in mind.
          </p>
          <ContactUsForm />
        </div>
      </div>

      {/* ===== REVIEWS SECTION ===== */}
      <div className="relative mx-auto my-20 flex w-11/12 max-w-maxContent flex-col items-center justify-between gap-8 bg-richblack-900 text-white">
        <h1 className="text-center text-4xl font-semibold mt-8">
          Reviews from other learners
        </h1>
        <ReviewSlider />
      </div>

      {/* <Footer /> */}
    </div>
  )
}
