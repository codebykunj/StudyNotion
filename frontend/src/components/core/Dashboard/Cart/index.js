// import React from 'react'
// import { useSelector } from 'react-redux'
// import { RanderCartCourses } from './RanderCartCourses';
// import { RanderTotalAmount } from './RanderTotalAmount';


// export default function Cart ()
// {
//    // const [total,totalItems] = useSelector((state) => state.auth);
//     const {total,totalItems} = useSelector((state) => state.cart);

//   return (
//     <div className='w-full h-screen bg-richblack-900 text-white'>
//         <h1>Your Cart</h1>
//         <p>{totalItems} Course in Cart</p>
//         {
//             total>0 ? (<div>
//             <RanderCartCourses/>
//             <RanderTotalAmount/>
           
//            </div>) : (<p>Your Cart is Empty</p>)
//         }
//     </div>
//   )
// }
import React from "react"
import { useSelector } from "react-redux"
import { RanderCartCourses } from "./RanderCartCourses"
import { RanderTotalAmount } from "./RanderTotalAmount"

export default function Cart() {
  const { total, totalItems } = useSelector((state) => state.cart)

  return (
    <div className="min-h-screen w-full bg-richblack-900 px-6 py-10 text-white lg:px-12">
      {/* Heading */}
      <h1 className="mb-14 text-3xl font-medium text-richblack-5">Cart</h1>

      {/* Cart Count */}
      <p className="border-b border-b-richblack-400 pb-2 font-semibold text-richblack-400">
        {totalItems} {totalItems === 1 ? "Course" : "Courses"} in Cart
      </p>

      {/* Content */}
      {total > 0 ? (
        <div className="mt-8 flex flex-col-reverse items-start gap-x-10 gap-y-6 lg:flex-row">
          <RanderCartCourses />
          <RanderTotalAmount />
        </div>
      ) : (
        <p className="mt-14 text-center text-3xl text-richblack-100">
          Your cart is empty
        </p>
      )}

      {/* Example of styled input (if added later) */}

    </div>
  )
}
