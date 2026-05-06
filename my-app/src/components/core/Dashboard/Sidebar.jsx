import React, { useState } from 'react'
// import {SidebarLinks} from "../../../data/dashboard-links"
import{sidebarLinks} from "../../../data/dashboard-links"
import { logout } from '../../../services/operations/authAPI'
import { useDispatch, useSelector } from 'react-redux'
import { VscSignOut } from 'react-icons/vsc'
import { useNavigate } from 'react-router-dom'
import {SidebarLink}  from './SidebarLink'
import { VscSettingsGear } from 'react-icons/vsc'
import ConfirmationModal from '../../common/ConfirmationModal'


export const Sidebar = () => {
  // niche ni syntax ni help thi aapde profileLoading and authLoading ni value nikadi didhi che
  const {user, loading:profileLoading} = useSelector((state)=>state.profile);
  const {loading:authLoading} = useSelector((state)=>state.auth)
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [confirmationModal,setConfirmationModal] = useState(null);
  
  //aa bev mathi koi pn true  hoi to spinner dekhadi do
    if(authLoading || profileLoading){
        return(
            <div className='text-white mt-10'>Loding</div>
        )
    }

  return (
    <div>
        <div className='flex min-w-[222px] h-[calc(100vh-3.5rem)] bg-richblack-800 py-10 flex-col border-r-[1px] border-r-richblack-700'>
            {/* sidebar ni first 3 links  */}
            <div className='flex flex-col'>
                {
                    sidebarLinks.map((link)=>{
                        //aapde signup karti vakhate je Student and Instructor (accountype)
                        //mukyu hatu te user no accountType and aa SidebarLink ni ander je
                        //link.type che te bev comparision karo..aa bev ni comparision ma aapde
                        //Dashboard pr Student and Instructor ne tene according detail show karisu..
                        //aetle to aapde profile mathi user ni value nikadiye che..


                        //aager user no accounType and link no type bev same na hoi to kai retun na karso
                        if(link.type && user?.accountType != link.type) return null;

                        //and  user no accounType and link no type bev same hoi to hu sidebar/sidebarniLink ne render kari dais

                        return(
                            <SidebarLink key={link.id} link={link} iconName = {link.icon}/>
                        )                        
                    })
                }
            </div>
            {/* aadi/Horizontal line  */}
            <div className='w-10/12 h-[1px] mx-auto mt-6 mb-6 bg-richblack-600'></div>

            {/* settig and logout link  */}
            {/* aapde jayare logout pr click kariye tayare aek modal open thai che..to aapde te modal create karvu padse*/}
            <div className='flex flex-col'>
                {/* <SidebarLinks 
                link={{name:"Setting",path:"dashboard/setting", iconName : "VscSettingsGear"}}
               
                /> */}

                <SidebarLink 
                link={{ name: "Setting", path: "dashboard/setting",  }}
                iconName= "VscSettingsGear"
                />


                <button onClick={
                    ()=>setConfirmationModal( {
                    text1:"Are You Sure",
                    text2:"You will be logged out of Your Account",
                    btn1Text:"Logout",
                    btn2Text:"Cancle",
                    btn1Handler: () => dispatch(logout(navigate)),
                    btn2Handler : () => setConfirmationModal(null),
                    })
                   } className='text-sm font-medium text-richblack-300'>
                   
                    <div className='flex flex-row items-center gap-x-2 pl-12 group text-richblack-300'>
                        <VscSignOut/>
                        <span >Logout</span>
                    </div>
                </button>
            </div>

        </div>

        {confirmationModal && <ConfirmationModal modalData={confirmationModal}/>}
        {/* {confirmationModal && <ConfirmationModal modalData={confirmationModal} />} */}

    </div>
  )
}





// import { useState } from "react"
// import { VscSignOut } from "react-icons/vsc"
// import { useDispatch, useSelector } from "react-redux"
// import { useNavigate } from "react-router-dom"

// import { sidebarLinks } from "../../../data/dashboard-links"
// import { logout } from "../../../services/operations/authAPI"
// import ConfirmationModal from "../../common/ConfirmationModal"
// import  {SidebarLink} from "./SidebarLink"

// export default function Sidebar() {
//   const { user, loading: profileLoading } = useSelector(
//     (state) => state.profile
//   )
//   const { loading: authLoading } = useSelector((state) => state.auth)
//   const dispatch = useDispatch()
//   const navigate = useNavigate()
//   // to keep track of confirmation modal
//   const [confirmationModal, setConfirmationModal] = useState(null)

//   if (profileLoading || authLoading) {
//     return (
//       <div className="grid h-[calc(100vh-3.5rem)] min-w-[220px] items-center border-r-[1px] border-r-richblack-700 bg-richblack-800">
//         <div className="spinner"></div>
//       </div>
//     )
//   }

//   return (
//     <>
//       <div className="flex h-[calc(100vh-3.5rem)] min-w-[220px] flex-col border-r-[1px] border-r-richblack-700 bg-richblack-800 py-10">
//         <div className="flex flex-col">
//           {sidebarLinks.map((link) => {
//             if (link.type && user?.accountType !== link.type) return null
//             return (
//               <SidebarLink key={link.id} link={link} iconName={link.icon} />
//             )
//           })}
//         </div>
//         <div className="mx-auto mt-6 mb-6 h-[1px] w-10/12 bg-richblack-700" />
//         <div className="flex flex-col">
//           <SidebarLink
//             link={{ name: "Settings", path: "/dashboard/settings" }}
//             iconName="VscSettingsGear"
//           />
//           <button
//             onClick={() =>
//               setConfirmationModal({
//                 text1: "Are you sure?",
//                 text2: "You will be logged out of your account.",
//                 btn1Text: "Logout",
//                 btn2Text: "Cancel",
//                 btn1Handler: () => dispatch(logout(navigate)),
//                 btn2Handler: () => setConfirmationModal(null),
//               })
//             }
//             className="px-8 py-2 text-sm font-medium text-richblack-300"
//           >
//             <div className="flex items-center gap-x-2">
//               <VscSignOut className="text-lg" />
//               <span>Logout</span>
//             </div>
//           </button>
//         </div>
//       </div>
//       {confirmationModal && <ConfirmationModal modalData={confirmationModal} />}
//     </>
//   )
// }