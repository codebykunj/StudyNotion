// //aa final code che je run thai che
// import { useState } from "react"
// import { AiFillCaretDown } from "react-icons/ai"
// import { FaPlus } from "react-icons/fa"
// import { MdEdit } from "react-icons/md"
// import { RiDeleteBin6Line } from "react-icons/ri"
// import { RxDropdownMenu } from "react-icons/rx"
// import { useDispatch, useSelector } from "react-redux"

// import {
//   deleteSection,
//   deleteSubSection,
// } from "../../../../../services/operations/courseDetailsAPI"
// import { setCourse } from "../../../../../slices/courseSlice"
// import ConfirmationModal from "../../../../common/ConfirmationModal"
// import SubSectionModal from "./SubSectionModal"

// export default function NestedView({ handleChangeEditSectionName }) {
//   const { course } = useSelector((state) => state.course)
//   const { token } = useSelector((state) => state.auth)
//   const dispatch = useDispatch()
//   // States to keep track of mode of modal [add, view, edit]
//   const [addSubSection, setAddSubsection] = useState(null)
//   const [viewSubSection, setViewSubSection] = useState(null)
//   const [editSubSection, setEditSubSection] = useState(null)
//   // to keep track of confirmation modal
//   const [confirmationModal, setConfirmationModal] = useState(null)

//   const handleDeleleSection = async (sectionId) => {
//     const result = await deleteSection({
//       sectionId,
//       courseId: course._id,
//       token,
//     })
//     if (result) {
//       dispatch(setCourse(result))
//     }
//     setConfirmationModal(null)
//   }

//   const handleDeleteSubSection = async (subSectionId, sectionId) => {
//     const result = await deleteSubSection({ subSectionId, sectionId, token })
//     if (result) {
//       // update the structure of course
//       const updatedCourseContent = course.courseContent.map((section) =>
//         section._id === sectionId ? result : section
//       )
//       const updatedCourse = { ...course, courseContent: updatedCourseContent }
//       dispatch(setCourse(updatedCourse))
//     }
//     setConfirmationModal(null)
//   }

//   return (
//     <>
//       <div
//         className="rounded-lg bg-richblack-700 p-6 px-8"
//         id="nestedViewContainer"
//       >
//         {course?.courseContent?.map((section) => (
//           // Section Dropdown
//           <details key={section._id} open>
//             {/* Section Dropdown Content */}
//             <summary className="flex cursor-pointer items-center justify-between border-b-2 border-b-richblack-600 py-2">
//               <div className="flex items-center gap-x-3">
//                 <RxDropdownMenu className="text-2xl text-richblack-50" />
//                 <p className="font-semibold text-richblack-50">
//                   {section.sectionName}
//                 </p>
//               </div>
//               <div className="flex items-center gap-x-3">
//                 <button
//                   onClick={() =>
//                     handleChangeEditSectionName(
//                       section._id,
//                       section.sectionName
//                     )
//                   }
//                 >
//                   <MdEdit className="text-xl text-richblack-300" />
//                 </button>
//                 <button
//                   onClick={() =>
//                     setConfirmationModal({
//                       text1: "Delete this Section?",
//                       text2: "All the lectures in this section will be deleted",
//                       btn1Text: "Delete",
//                       btn2Text: "Cancel",
//                       btn1Handler: () => handleDeleleSection(section._id),
//                       btn2Handler: () => setConfirmationModal(null),
//                     })
//                   }
//                 >
//                   <RiDeleteBin6Line className="text-xl text-richblack-300" />
//                 </button>
//                 <span className="font-medium text-richblack-300">|</span>
//                 <AiFillCaretDown className={`text-xl text-richblack-300`} />
//               </div>
//             </summary>
//             <div className="px-6 pb-4">
//               {/* Render All Sub Sections Within a Section */}
//               {section.subSection.map((data) => (
//                 <div
//                   key={data?._id}
//                   onClick={() => setViewSubSection(data)}
//                   className="flex cursor-pointer items-center justify-between gap-x-3 border-b-2 border-b-richblack-600 py-2"
//                 >
//                   <div className="flex items-center gap-x-3 py-2 ">
//                     <RxDropdownMenu className="text-2xl text-richblack-50" />
//                     <p className="font-semibold text-richblack-50">
//                       {data.title}
//                     </p>
//                   </div>
//                   <div
//                     onClick={(e) => e.stopPropagation()}
//                     className="flex items-center gap-x-3"
//                   >
//                     <button
//                       onClick={() =>
//                         setEditSubSection({ ...data, sectionId: section._id })
//                       }
//                     >
//                       <MdEdit className="text-xl text-richblack-300" />
//                     </button>
//                     <button
//                       onClick={() =>
//                         setConfirmationModal({
//                           text1: "Delete this Sub-Section?",
//                           text2: "This lecture will be deleted",
//                           btn1Text: "Delete",
//                           btn2Text: "Cancel",
//                           btn1Handler: () =>
//                             handleDeleteSubSection(data._id, section._id),
//                           btn2Handler: () => setConfirmationModal(null),
//                         })
//                       }
//                     >
//                       <RiDeleteBin6Line className="text-xl text-richblack-300" />
//                     </button>
//                   </div>
//                 </div>
//               ))}
//               {/* Add New Lecture to Section */}
//               <button
//                 onClick={() => setAddSubsection(section._id)}
//                 className="mt-3 flex items-center gap-x-1 text-yellow-50"
//               >
//                 <FaPlus className="text-lg" />
//                 <p>Add Lecture</p>
//               </button>
//             </div>
//           </details>
//         ))}
//       </div>
//       {/* Modal Display */}
//       {addSubSection ? (
//         <SubSectionModal
//           modalData={addSubSection}
//           setModalData={setAddSubsection}
//           add={true}
//         />
//       ) : viewSubSection ? (
//         <SubSectionModal
//           modalData={viewSubSection}
//           setModalData={setViewSubSection}
//           view={true}
//         />
//       ) : editSubSection ? (
//         <SubSectionModal
//           modalData={editSubSection}
//           setModalData={setEditSubSection}
//           edit={true}
//         />
//       ) : (
//         <></>
//       )}
//       {/* Confirmation Modal */}
//       {confirmationModal ? (
//         <ConfirmationModal modalData={confirmationModal} />
//       ) : (
//         <></>
//       )}
//     </>
//   )
// }


//aa niche na code ma styleing apply kareli che
import { useState } from "react"
import { AiFillCaretDown } from "react-icons/ai"
import { FaPlus } from "react-icons/fa"
import { MdEdit } from "react-icons/md"
import { RiDeleteBin6Line } from "react-icons/ri"
import { RxDropdownMenu } from "react-icons/rx"
import { useDispatch, useSelector } from "react-redux"

import {
  deleteSection,
  deleteSubSection,
} from "../../../../../services/operations/courseDetailsAPI"
import { setCourse } from "../../../../../slices/courseSlice"
import ConfirmationModal from "../../../../common/ConfirmationModal"
import SubSectionModal from "./SubSectionModal"

export default function NestedView({ handleChangeEditSectionName }) {
  const { course } = useSelector((state) => state.course)
  const { token } = useSelector((state) => state.auth)
  const dispatch = useDispatch()
  const [addSubSection, setAddSubsection] = useState(null)
  const [viewSubSection, setViewSubSection] = useState(null)
  const [editSubSection, setEditSubSection] = useState(null)
  const [confirmationModal, setConfirmationModal] = useState(null)

  const handleDeleleSection = async (sectionId) => {
    const result = await deleteSection({
      sectionId,
      courseId: course._id,
      token,
    })
    if (result) dispatch(setCourse(result))
    setConfirmationModal(null)
  }

  const handleDeleteSubSection = async (subSectionId, sectionId) => {
    const result = await deleteSubSection({ subSectionId, sectionId, token })
    if (result) {
      const updatedCourseContent = course.courseContent.map((section) =>
        section._id === sectionId ? result : section
      )
      const updatedCourse = { ...course, courseContent: updatedCourseContent }
      dispatch(setCourse(updatedCourse))
    }
    setConfirmationModal(null)
  }

  return (
    <>
      <div
        className="rounded-lg bg-richblack-700 p-6 px-8"
        id="nestedViewContainer"
      >
        {course?.courseContent?.map((section) => (
          <details key={section._id} open>
            <summary className="flex cursor-pointer items-center justify-between border-b-2 border-b-richblack-600 py-2">
              <div className="flex items-center gap-x-3">
                <RxDropdownMenu className="text-2xl text-richblack-50" />
                <p className="font-semibold text-richblack-50">
                  {section.sectionName}
                </p>
              </div>
              <div className="flex items-center gap-x-3">
                <button
                  onClick={() =>
                    handleChangeEditSectionName(
                      section._id,
                      section.sectionName
                    )
                  }
                >
                  <MdEdit className="text-xl text-richblack-300" />
                </button>
                <button
                  onClick={() =>
                    setConfirmationModal({
                      text1: "Delete this Section?",
                      text2: "All the lectures in this section will be deleted",
                      btn1Text: "Delete",
                      btn2Text: "Cancel",
                      btn1Handler: () => handleDeleleSection(section._id),
                      btn2Handler: () => setConfirmationModal(null),
                    })
                  }
                >
                  <RiDeleteBin6Line className="text-xl text-richblack-300" />
                </button>
                <span className="font-medium text-richblack-300">|</span>
                <AiFillCaretDown className="text-xl text-richblack-300" />
              </div>
            </summary>
            <div className="px-6 pb-4">
              {section.subSection.map((data) => (
                <div
                  key={data?._id}
                  onClick={() => setViewSubSection(data)}
                  className="flex cursor-pointer items-center justify-between gap-x-3 border-b-2 border-b-richblack-600 py-2"
                >
                  <div className="flex items-center gap-x-3 py-2">
                    <RxDropdownMenu className="text-2xl text-richblack-50" />
                    <p className="font-semibold text-richblack-50">{data.title}</p>
                  </div>
                  <div
                    onClick={(e) => e.stopPropagation()}
                    className="flex items-center gap-x-3"
                  >
                    <button
                      onClick={() =>
                        setEditSubSection({ ...data, sectionId: section._id })
                      }
                    >
                      <MdEdit className="text-xl text-richblack-300" />
                    </button>
                    <button
                      onClick={() =>
                        setConfirmationModal({
                          text1: "Delete this Sub-Section?",
                          text2: "This lecture will be deleted",
                          btn1Text: "Delete",
                          btn2Text: "Cancel",
                          btn1Handler: () =>
                          handleDeleteSubSection(data._id, section._id),
                          btn2Handler: () => setConfirmationModal(null),
                        })
                      }
                    >
                      <RiDeleteBin6Line className="text-xl text-richblack-300" />
                    </button>
                  </div>
                </div>
              ))}
              <button
                onClick={() => setAddSubsection(section._id)}
                className="mt-3 flex items-center gap-x-1 text-yellow-50"
              >
                <FaPlus className="text-lg" />
                <p>Add Lecture</p>
              </button>
            </div>
          </details>
        ))}
      </div>

      {addSubSection && (
        <SubSectionModal
          modalData={addSubSection}
          setModalData={setAddSubsection}
          add={true}
          inputClass="bg-richblack-700 text-richblack-50 border border-richblack-600 rounded-lg p-2 w-full"
        />
      )}
      {viewSubSection && (
        <SubSectionModal
          modalData={viewSubSection}
          setModalData={setViewSubSection}
          view={true}
          inputClass="bg-richblack-700 text-richblack-50 border border-richblack-600 rounded-lg p-2 w-full"
        />
      )}
      {editSubSection && (
        <SubSectionModal
          modalData={editSubSection}
          setModalData={setEditSubSection}
          edit={true}
          inputClass="bg-richblack-700 text-richblack-50 border border-richblack-600 rounded-lg p-2 w-full"
        />
      )}

      {confirmationModal && <ConfirmationModal modalData={confirmationModal} />}
    </>
  )
}































// // import React, { useState } from 'react'
// // import { useDispatch, useSelector } from 'react-redux'
// // import {RxDropdownMenu} from "react-icons/rx"
// // import { MdEdit } from 'react-icons/md'
// // import {RiDeleteBin6Line} from 'react-icons/ri'
// // import {BiDownArrow} from 'react-icons/bi'
// // import {AiOutlinePlus} from 'react-icons/ai'
// // import {SubSectionModal} from './SubSectionModal'
// // import ConfirmationModal from '../../../../common/ConfirmationModal'
// // import {
// //   deleteSection,
// //   deleteSubSection,
// // } from "../../../../../services/operations/courseDetailsAPI"
// // import { setCourse } from '../../../../../slices/courseSlice'

// // export const NestedView = ({handleChangeEditSectionName}) => {
// //     const {course} = useSelector((state)=>state.auth);
// //     const {token} = useSelector((state)=>state.auth);
// //     const dispatch = useDispatch();

// //     const [addSubSection,setAddSubSection] = useState(null);
// //     const [editSubSection,setEditSubSection]= useState(null);
// //     const [viewSubSection,setViewSubSection] = useState(null);

// //     const[confirmationModal,setConfirmationModal] = useState(null);

// //     const handleDeleteSection = async(sectionId) => {
// //         const result = await deleteSection({sectionId,courseid:course._id,token})

// //         console.log("PRINTING AFTER DELETE SECTION",result);
// //         if(result){
// //             //aagar result aavigayu che to to hu dispatch kari ne course ne update kari dais msaru result ma je aayu hase aenathi..ke course taramathi aa section delete thai gayo che to database mathi pn aa course/courseid mate course delete kari de.
// //             dispatch(setCourse(result))
// //         }
// //         // delete icon pr click kari aapde aapda confirmation modal ne close kari dejo..setConfirmationModal(null) karvathi confirmation modal close thai jase..
// //         setConfirmationModal(null)
// //     }

// //     const handleDeleteSubSection = async(sunSectionid,sectionId) => {
// //         // const result = await deleteSubSection({sunSectionid,sectionId,token})
// //         const result = await deleteSubSection({sunSectionid,sectionId},token)
        
// //         if(result){
// //             //TODO---->extra kya kar sakhte hai
// //             const updatedCourseContent =  course.courseContent.map((section)=>{
// //                 section._id === sectionId ? result : section
// //             });
// //             const updatedCourse = {...course,courseContent:updatedCourseContent}
// //             dispatch(setCourse(updatedCourse));
// //         }
// //         setConfirmationModal(null);
// //     }

// //   return (
// //     <div>
// //         <div className='rounded-lg bg-richblack-700 p-6 px-8'>
// //         {/* aai backend ma course ni ander je courseContent filed che tema  me section no referance store karyo che..aathi teni upper me map function lagav yo che jethi pela koi section padya hoi koi/te particular course id ne according to te aapdane UI pr show thai. */}
// //             {course?.courseContent?.map((section)=>(
// //                 <details key={section._id} open>
// //                 {/*open--->open no use aetla mate karyo che ke by default aa starting ma open re  */}

// //                 {/*Section---> within summary tag ma aapde section nu name and section ne Edit and Delete karvana icon with functionality dekhadse.. */}
// //                     <summary className='flex items-center justify-between gap=x-3 border-b-2'>
// //                         <div className='flex items-center gap-x-3'>
// //                             <RxDropdownMenu/>
// //                             <p>{section.sectionName}</p>
// //                         </div>

// //                         <div className='flex items-center gap-x-3'>
// //                             <button onClick={() => handleChangeEditSectionName(section._id,section.sectionName)}>
// //                                 <MdEdit/>
// //                             </button>

// //                             <button onClick={()=>{setConfirmationModal({
// //                                 text1:"Delete this Section",
// //                                 text2:"All the lectures in this section will be deleted",
// //                                 btn1Text:"Delete",
// //                                 btn2Text:"Cancle",
// //                                 // btn1Handler:() => {handleDeleteSection(section._id)}
// //                                 btn1Handler:() => handleDeleteSection(section._id),
// //                                 btn2Handler:() => setConfirmationModal(null),
// //                             })}}>
// //                                 <RiDeleteBin6Line/>
// //                             </button>

// //                             <span>|</span>

// //                             <button>
// //                                 <BiDownArrow className={`text-xl text-richblack-300`}/>
// //                             </button>


// //                         </div>
// //                     </summary>

// //     {/* SubSection--->aapde subSection nu name and section ne Edit and Delete karvana icon with functionality dekhadse..                 */}
// //                     <div>
// //                         {
// //                             section?.subSection?.map((data)=>(
// //                                 <div key={data?._id} 
// //                                 onClick={() => setViewSubSection(data)} 
// //                                 className='flex items-center justify-between gap-x-3 border-b-2'>
// //                                     <div className='flex items-center gap-x-3'>
// //                                         <RxDropdownMenu/>
// //                                         <p>{data.title}</p>
// //                                     </div>
// // {/* niche na div maa onClick={(e) => {e.stopPropagation()}} lakhyu che because  me mai div ma upper  onClick={() => setViewSubSection(data)}
// // set karyu che aaathi main div ma hu game thai click karis to mane vieing secture(subsection) dekhase to edit and
// // delete na button pr click karta viewing vadu sunSection na dekhay aetle thai me onclick pr aa function onClick={(e) => {e.stopPropagation()}} call karyo che  */}
// //                                     <div className='flex items-center gap-x-3'
// //                                         onClick={(e) => {e.stopPropagation()}}>
// //                                         <button onClick={() => setEditSubSection({...data,sectionId:section._id})}>
// //                                             <MdEdit/>
// //                                         </button>

// //                                         <button onClick={() => setConfirmationModal({
// //                                             text1:"Delete this sub Section",
// //                                             text2:"current/selected lecture will be deleted",
// //                                             btn1Text:"Delete",
// //                                             btn2Text:"Cancle",
// //                                             // btn1Handler:() => {handleDeleteSection(section._id)}
// //                                             btn1Handler:() => handleDeleteSubSection(data._id,section._id),
// //                                             btn2Handler:() => setConfirmationModal(null),
// //                                             })}>
// //                                             <RiDeleteBin6Line/>
// //                                         </button>
// //                                     </div>                       
// //                                 </div>
// //                             ))
// //                         }
// //                     </div>

// //                     {/*create Add lecture button*/}
// //                     <button onClick={() => setAddSubSection(section._id)}
// //                     className='mt-4 flex items-center gap-x-2 text-yellow-50'>
// //                         <AiOutlinePlus/>  
// //                         <p>Add lecture</p>
// //                     </button>

// //                 </details>
// //             ))}
// //         </div>
        
// //         {/* aai me check karyu ke addSubSection true hoi to SubSectionModal co ponent ne render karo and addSubSection false hoi to check kari viewSubSection..aagar viewSubSection true hoi to SubSectionModal component ne render karo and false hoi to editSubSection ne check karo...editSubSection true hoi to SubSectionModal ne render karo and false hoi to khali div ne render karo  */}
// //         {addSubSection ? (<SubSectionModal modalData={addSubSection} setModalData={setAddSubSection} add={true}/>) 
// //         :viewSubSection?(<SubSectionModal modalData={viewSubSection} setModalData={setViewSubSection} view={true}/>) 
// //         :editSubSection? (<SubSectionModal modalData={editSubSection} setModalData={setViewSubSection} edit={true}/>) : <div></div>}

// //         {
// //             /* data padyo hoi conformationModal ma to aapde conformationModal ne render karavi daisu  */
// //             confirmationModal ? (<ConfirmationModal modalData={confirmationModal}/>) : (<div></div>)
// //         }
// //     </div>
// //   )
// // }
// // File: NestedView.jsx
