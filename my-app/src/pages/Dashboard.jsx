// import React from 'react'
// import { useSelector } from 'react-redux'
// import { Outlet } from 'react-router-dom';
// import { Sidebar } from '../components/core/Dashboard/Sidebar';
// import {MyProfile} from '../components/core/Dashboard/MyProfile';


// export const Dashboard = () => {
//     //user and profile slice mathi loading lai ne aavo
//     //aai loading:authLoading lakhyu che that means auth vada loading ne authLoading aem name aapyu che...
//     const {loading:authLoading} = useSelector((state)=>state.auth);
//     const {loading:profileLoading} = useSelector((state)=>state.profile)

//     //aa bev mathi koi pn true  hoi to spinner dekhadi do
//     if(authLoading || profileLoading){
//         return(
//             <div className='text-white mt-10'>Loding</div>
//         )
//     }

//     //aagar laoding true nai hoi to aapde aapdu profile/div render karisu......
//     return(
//         <div className='min-h-[calc(100vh-3.5rem)] flex relative'>
//             <Sidebar/>
//             <div className='h-[calc[(100vh-3.5rem)]'>
//                 <div className='w-11/12 max-w-[1000px] py-10 mx-auto '>
//                     <Outlet/>
//                     {/* <MyProfile/> */}
//                 </div>
//             </div>
//         </div>
//     )

// //   return (
// //     <div>
// //         Dashboard
// //     </div>
// //   )
// }
import React from 'react'
import { useSelector } from 'react-redux'
import { Outlet } from 'react-router-dom';
import { Sidebar } from '../components/core/Dashboard/Sidebar';
import {MyProfile} from '../components/core/Dashboard/MyProfile';


export const Dashboard = () => {
    //user and profile slice mathi loading lai ne aavo
    //aai loading:authLoading lakhyu che that means auth vada loading ne authLoading aem name aapyu che...
    const {loading:authLoading} = useSelector((state)=>state.auth);
    const {loading:profileLoading} = useSelector((state)=>state.profile)

    //aa bev mathi koi pn true  hoi to spinner dekhadi do
    if(authLoading || profileLoading){
        return(
            <div className='text-white mt-10'>Loding</div>
        )
    }

    //aagar laoding true nai hoi to aapde aapdu profile/div render karisu......
    return(
        <div className='relative flex min-h-[calc(100vh-3.5rem)]'>
            <Sidebar/>
            <div className='h-[calc(100vh-3.5rem)] flex-1 overflow-auto'>
                <div className='mx-auto w-11/12 max-w-[1000px] py-10 '>
                    <Outlet/>
                    {/* <MyProfile/> */}
                </div>
            </div>
        </div>
    )

//   return (
//     <div>
//         Dashboard
//     </div>
//   )
}