// //aa final correct code che je run pn thai che
// import React from "react"
// import { useDispatch, useSelector } from "react-redux"
// import { Iconbtn } from "../../../common/Iconbtn"
// import { buyCourse } from "../../../../services/operations/studentFeaturesAPI"
// import { useNavigate } from "react-router-dom"

// export const RanderTotalAmount = () => {
//   const { total, cart } = useSelector((state) => state.cart)
//   const { user } = useSelector((state) => state.profile)
//   const { token } = useSelector((state) => state.auth)
//   const navigate = useNavigate()
//   const dispatch = useDispatch()

//   const handleBuyCourse = () => {
//     const courses = cart.map((course) => course._id)
//     console.log("Bought these courses:", courses)
//     buyCourse(token, courses, user, navigate, dispatch)
//   }

//   return (
//     <div className="min-w-[280px] rounded-md border-[1px] border-richblack-700 bg-richblack-800 p-6">
//       <p className="mb-1 text-sm font-medium text-richblack-300">Total:</p>
//       <p className="mb-6 text-3xl font-medium text-yellow-100">₹ {total}</p>

//       <Iconbtn
//         text="Buy Now"
//         onclick={handleBuyCourse}
//         customClasses="w-full justify-center"
//       />


//     </div>
//   )
// }

import React from "react"
import { useDispatch, useSelector } from "react-redux"
import { Iconbtn } from "../../../common/Iconbtn"
import { buyCourse } from "../../../../services/operations/studentFeaturesAPI"
import { useNavigate } from "react-router-dom"

export const RanderTotalAmount = () => {
  const { total, cart } = useSelector((state) => state.cart)
  const { user } = useSelector((state) => state.profile)
  const { token } = useSelector((state) => state.auth)
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const handleBuyCourse = () => {
    if (!cart.length) {
      return alert("Your cart is empty!")
    }
    if (!token) {
      navigate("/login")
      return
    }

    const courses = cart.map((course) => course._id)
    console.log("Buying these courses:", courses)

    // ✅ Correct way: dispatch the thunk
    dispatch(buyCourse(token, courses, user, navigate))
    navigate("/home")
  }

  return (
    <div className="min-w-[280px] rounded-md border border-richblack-700 bg-richblack-800 p-6">
      <p className="mb-1 text-sm font-medium text-richblack-300">Total:</p>
      <p className="mb-6 text-3xl font-semibold text-yellow-100">₹ {total}</p>

      <Iconbtn
        text="Buy Now"
        onClick={handleBuyCourse}  
        customClasses="w-full justify-center"
      />
    </div>
  )
}
