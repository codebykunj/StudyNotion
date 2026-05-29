// // //aa final code che je run thai che
// // import { useEffect, useState } from "react"
// // import { useForm } from "react-hook-form"
// // import { toast } from "react-hot-toast"
// // import { RxCross2 } from "react-icons/rx"
// // import { useDispatch, useSelector } from "react-redux"

// // import {
// //   createSubSection,
// //   updateSubSection,
// // } from "../../../../../services/operations/courseDetailsAPI"
// // import { setCourse } from "../../../../../slices/courseSlice"
// // import {Iconbtn} from "../../../../common/Iconbtn"
// // import Upload from "../Upload"

// // export default function SubSectionModal({
// //   modalData,
// //   setModalData,
// //   add = false,
// //   view = false,
// //   edit = false,
// // }) {
// //   const {
// //     register,
// //     handleSubmit,
// //     setValue,
// //     formState: { errors },
// //     getValues,
// //   } = useForm()

// //   // console.log("view", view)
// //   // console.log("edit", edit)
// //   // console.log("add", add)

// //   const dispatch = useDispatch()
// //   const [loading, setLoading] = useState(false)
// //   const { token } = useSelector((state) => state.auth)
// //   const { course } = useSelector((state) => state.course)

// //   useEffect(() => {
// //     if (view || edit) {
// //       // console.log("modalData", modalData)
// //       setValue("lectureTitle", modalData.title)
// //       setValue("lectureDesc", modalData.description)
// //       setValue("lectureVideo", modalData.videoUrl)
// //     }
// //   }, [])

// //   // detect whether form is updated or not
// //   const isFormUpdated = () => {
// //     const currentValues = getValues()
// //     // console.log("changes after editing form values:", currentValues)
// //     if (
// //       currentValues.lectureTitle !== modalData.title ||
// //       currentValues.lectureDesc !== modalData.description ||
// //       currentValues.lectureVideo !== modalData.videoUrl
// //     ) {
// //       return true
// //     }
// //     return false
// //   }

// //   // handle the editing of subsection
// //   const handleEditSubsection = async () => {
// //     const currentValues = getValues()
// //     // console.log("changes after editing form values:", currentValues)
// //     const formData = new FormData()
// //     // console.log("Values After Editing form values:", currentValues)
// //     formData.append("sectionId", modalData.sectionId)
// //     formData.append("subSectionId", modalData._id)
// //     if (currentValues.lectureTitle !== modalData.title) {
// //       formData.append("title", currentValues.lectureTitle)
// //     }
// //     if (currentValues.lectureDesc !== modalData.description) {
// //       formData.append("description", currentValues.lectureDesc)
// //     }
// //     if (currentValues.lectureVideo !== modalData.videoUrl) {
// //       formData.append("video", currentValues.lectureVideo)
// //     }
// //     setLoading(true)
// //     const result = await updateSubSection(formData, token)
// //     if (result) {
// //       // console.log("result", result)
// //       // update the structure of course
// //       const updatedCourseContent = course.courseContent.map((section) =>
// //         section._id === modalData.sectionId ? result : section
// //       )
// //       const updatedCourse = { ...course, courseContent: updatedCourseContent }
// //       dispatch(setCourse(updatedCourse))
// //     }
// //     setModalData(null)
// //     setLoading(false)
// //   }

// //   const onSubmit = async (data) => {
// //     // console.log(data)
// //     if (view) return

// //     if (edit) {
// //       if (!isFormUpdated()) {
// //         toast.error("No changes made to the form")
// //       } else {
// //         handleEditSubsection()
// //       }
// //       return
// //     }

// //     const formData = new FormData()
// //     formData.append("sectionId", modalData)
// //     formData.append("title", data.lectureTitle)
// //     formData.append("description", data.lectureDesc)
// //     formData.append("video", data.lectureVideo)
// //     console.log("First loading true ho gaya");
// //     setLoading(true)
// //     console.log("Second loading true ho gaya");

// //     const result = await createSubSection(formData, token)
// //     if (result) {
// //       // update the structure of course
// //       const updatedCourseContent = course.courseContent.map((section) =>
// //         section._id === modalData ? result : section
// //       )
// //       const updatedCourse = { ...course, courseContent: updatedCourseContent }
// //       dispatch(setCourse(updatedCourse))
// //     }
// //     setModalData(null)
// //     setLoading(false)
// //   }

// //   return (
// //     <div className="fixed inset-0 z-[1000] !mt-0 grid h-screen w-screen place-items-center overflow-auto bg-white bg-opacity-10 backdrop-blur-sm">
// //       <div className="my-10 w-11/12 max-w-[700px] rounded-lg border border-richblack-400 bg-richblack-800">
// //         {/* Modal Header */}
// //         <div className="flex items-center justify-between rounded-t-lg bg-richblack-700 p-5">
// //           <p className="text-xl font-semibold text-richblack-5">
// //             {view && "Viewing"} {add && "Adding"} {edit && "Editing"} Lecture
// //           </p>
// //           <button onClick={() => (!loading ? setModalData(null) : {})}>
// //             <RxCross2 className="text-2xl text-richblack-5" />
// //           </button>
// //         </div>
// //         {/* Modal Form */}
// //         <form
// //           onSubmit={handleSubmit(onSubmit)}
// //           className="space-y-8 px-8 py-10"
// //         >
// //           {/* Lecture Video Upload */}
// //           <Upload
// //             name="lectureVideo"
// //             label="Lecture Video"
// //             register={register}
// //             setValue={setValue}
// //             errors={errors}
// //             video={true}
// //             viewData={view ? modalData.videoUrl : null}
// //             editData={edit ? modalData.videoUrl : null}
// //           />
// //           {/* Lecture Title */}
// //           <div className="flex flex-col space-y-2">
// //             <label className="text-sm text-richblack-5" htmlFor="lectureTitle">
// //               Lecture Title {!view && <sup className="text-pink-200">*</sup>}
// //             </label>
// //             <input
// //               disabled={view || loading}
// //               id="lectureTitle"
// //               placeholder="Enter Lecture Title"
// //               {...register("lectureTitle", { required: true })}
// //               className="form-style w-full"
// //             />
// //             {errors.lectureTitle && (
// //               <span className="ml-2 text-xs tracking-wide text-pink-200">
// //                 Lecture title is required
// //               </span>
// //             )}
// //           </div>
// //           {/* Lecture Description */}
// //           <div className="flex flex-col space-y-2">
// //             <label className="text-sm text-richblack-5" htmlFor="lectureDesc">
// //               Lecture Description{" "}
// //               {!view && <sup className="text-pink-200">*</sup>}
// //             </label>
// //             <textarea
// //               disabled={view || loading}
// //               id="lectureDesc"
// //               placeholder="Enter Lecture Description"
// //               {...register("lectureDesc", { required: true })}
// //               className="form-style resize-x-none min-h-[130px] w-full"
// //             />
// //             {errors.lectureDesc && (
// //               <span className="ml-2 text-xs tracking-wide text-pink-200">
// //                 Lecture Description is required
// //               </span>
// //             )}
// //           </div>
// //           {!view && (
// //             <div className="flex justify-end">
// //               <Iconbtn
// //                 disabled={loading}
// //                 text={loading ? "Loading.." : edit ? "Save Changes" : "Save"}
// //                 type="submit"
// //               />
// //             </div>
// //           )}
// //         </form>
// //       </div>
// //     </div>
// //   )
// // }

// //aa niche na code ma styleing apply kareli che
// import { useEffect, useState } from "react"
// import { useForm } from "react-hook-form"
// import { toast } from "react-hot-toast"
// import { RxCross2 } from "react-icons/rx"
// import { useDispatch, useSelector } from "react-redux"

// import {
//   createSubSection,
//   updateSubSection,
// } from "../../../../../services/operations/courseDetailsAPI"
// import { setCourse } from "../../../../../slices/courseSlice"
// import Upload from "../Upload"
// import { Iconbtn } from "../../../../common/Iconbtn"

// export default function SubSectionModal({
//   modalData,
//   setModalData,
//   add = false,
//   view = false,
//   edit = false,
// }) {
//   const {
//     register,
//     handleSubmit,
//     setValue,
//     formState: { errors },
//     getValues,
//   } = useForm()

//   const dispatch = useDispatch()
//   const [loading, setLoading] = useState(false)
//   const { token } = useSelector((state) => state.auth)
//   const { course } = useSelector((state) => state.course)

//   useEffect(() => {
//     if (view || edit) {
//       setValue("lectureTitle", modalData.title)
//       setValue("lectureDesc", modalData.description)
//       setValue("lectureVideo", modalData.videoUrl)
//     }
//   }, [])

//   const isFormUpdated = () => {
//     const currentValues = getValues()
//     return (
//       currentValues.lectureTitle !== modalData.title ||
//       currentValues.lectureDesc !== modalData.description ||
//       currentValues.lectureVideo !== modalData.videoUrl
//     )
//   }

//   const handleEditSubsection = async () => {
//     const currentValues = getValues()
//     const formData = new FormData()
//     formData.append("sectionId", modalData.sectionId)
//     formData.append("subSectionId", modalData._id)
//     if (currentValues.lectureTitle !== modalData.title) {
//       formData.append("title", currentValues.lectureTitle)
//     }
//     if (currentValues.lectureDesc !== modalData.description) {
//       formData.append("description", currentValues.lectureDesc)
//     }
//     if (currentValues.lectureVideo !== modalData.videoUrl) {
//       formData.append("video", currentValues.lectureVideo)
//     }
//     setLoading(true)
//     const result = await updateSubSection(formData, token)
//     if (result) {
//       const updatedCourseContent = course.courseContent.map((section) =>
//         section._id === modalData.sectionId ? result : section
//       )
//       const updatedCourse = { ...course, courseContent: updatedCourseContent }
//       dispatch(setCourse(updatedCourse))
//     }
//     setModalData(null)
//     setLoading(false)
//   }

//   const onSubmit = async (data) => {
//     if (view) return

//     if (edit) {
//       if (!isFormUpdated()) {
//         toast.error("No changes made to the form")
//       } else {
//         handleEditSubsection()
//       }
//       return
//     }

//     const formData = new FormData()
//     formData.append("sectionId", modalData)
//     formData.append("title", data.lectureTitle)
//     formData.append("description", data.lectureDesc)
//     formData.append("video", data.lectureVideo)
//     setLoading(true)

//     const result = await createSubSection(formData, token)
//     if (result) {
//       const updatedCourseContent = course.courseContent.map((section) =>
//         section._id === modalData ? result : section
//       )
//       const updatedCourse = { ...course, courseContent: updatedCourseContent }
//       dispatch(setCourse(updatedCourse))
//     }
//     setModalData(null)
//     setLoading(false)
//   }

//   return (
//     <div className="fixed inset-0 z-[1000] !mt-0 grid h-screen w-screen place-items-center overflow-auto bg-white bg-opacity-10 backdrop-blur-sm">
//       <div className="my-10 w-11/12 max-w-[700px] rounded-lg border border-richblack-400 bg-richblack-800">
//         {/* Modal Header */}
//         <div className="flex items-center justify-between rounded-t-lg bg-richblack-700 p-5">
//           <p className="text-xl font-semibold text-richblack-5">
//             {view && "Viewing"} {add && "Adding"} {edit && "Editing"} Lecture
//           </p>
//           <button onClick={() => (!loading ? setModalData(null) : {})}>
//             <RxCross2 className="text-2xl text-richblack-5" />
//           </button>
//         </div>

//         {/* Modal Form */}
//         <form
//           onSubmit={handleSubmit(onSubmit)}
//           className="space-y-8 px-8 py-10"
//         >
//           {/* Lecture Video Upload */}
//           <Upload
//             name="lectureVideo"
//             label="Lecture Video"
//             register={register}
//             setValue={setValue}
//             errors={errors}
//             video={true}
//             viewData={view ? modalData.videoUrl : null}
//             editData={edit ? modalData.videoUrl : null}
//           />

//           {/* Lecture Title */}
//           <div className="flex flex-col space-y-2">
//             <label className="text-sm text-richblack-5" htmlFor="lectureTitle">
//               Lecture Title {!view && <sup className="text-pink-200">*</sup>}
//             </label>
//             <input
//               disabled={view || loading}
//               id="lectureTitle"
//               placeholder="Enter Lecture Title"
//               {...register("lectureTitle", { required: true })}
//               className="form-style w-full"
//             />
//             {errors.lectureTitle && (
//               <span className="ml-2 text-xs tracking-wide text-pink-200">
//                 Lecture title is required
//               </span>
//             )}
//           </div>

//           {/* Lecture Description */}
//           <div className="flex flex-col space-y-2">
//             <label className="text-sm text-richblack-5" htmlFor="lectureDesc">
//               Lecture Description{" "}
//               {!view && <sup className="text-pink-200">*</sup>}
//             </label>
//             <textarea
//               disabled={view || loading}
//               id="lectureDesc"
//               placeholder="Enter Lecture Description"
//               {...register("lectureDesc", { required: true })}
//               // className="form-style resize-x-none min-h-[130px] w-full"
//               className="form-style resize-x-none min-h-[130px] w-full"

//             />
//             {errors.lectureDesc && (
//               <span className="ml-2 text-xs tracking-wide text-pink-200">
//                 Lecture Description is required
//               </span>
//             )}
//           </div>

//           {!view && (
//             <div className="flex justify-end">
//               <Iconbtn
//                 disabled={loading}
//                 text={loading ? "Loading.." : edit ? "Save Changes" : "Save"}
//                 type="submit"
//               />
//             </div>
//           )}
//         </form>
//       </div>
//     </div>
//   )
// }




















// // // import React, { useEffect, useState } from 'react'
// // // import { useForm } from 'react-hook-form'
// // // import toast from 'react-hot-toast';
// // // import { useDispatch, useSelector } from 'react-redux';
// // // import {
// // //   createSubSection,
// // //   updateSubSection,
// // // } from "../../../../../services/operations/courseDetailsAPI"
// // // import { setCourse } from '../../../../../slices/courseSlice';
// // // import { RxCross1 } from 'react-icons/rx';
// // // import Upload from '../Upload';
// // // import { Iconbtn } from '../../../../common/Iconbtn';

// // // export const SubSectionModal = ({
// // //     //aa aapde NrstedView.jsx mathi SubSectionModal ma as props value pass lari hati te props aai hu fetch/lav karu chu..
// // //     modalData,
// // //     setModalData,

// // //     //aai NestedView.jsx ma SubSectionModal ma me add,view and edit ni value as true pass kari che pn aai ae val hoi sake che ke aave ke na pn aave aathi aai me bydefault aemne false set kari che
// // //     add=false,
// // //     view=false,
// // //     edit=false
// // //     }) => {

// // //         const {register,
// // //             handelSubmit,
// // //             setValue,
// // //             getValue,
// // //             frorState:{errors}
// // //         }=useForm();

// // //         const dispatch = useDispatch();
// // //         const [loading,setLoading] = useState(false);
// // //         const {course} = useSelector((state) => state.course);
// // //         const {token} = useSelector((state) => state.auth);

// // //         //aai me useEffect() aetla mate lakhyu che ke first render ma aa condition check thai jai
// // //         useEffect(() => {
// // //             //aager tu view ya phir edit karne aaye ho to samaj lena ki subSection(video/title/discription vadu modal aave che tej subSection che) create ho chuka hai..
// // //             //because aek var subSection create thai gayo hase to j aapde te subSection ne edit and joi(view) kari sakisu.
// // //             if(view || edit)
// // //             {
// // //                setValue("lectureTitle",modalData.title);
// // //                setValue("lectureDesc",modalData.desc);
// // //                setValue("lectureVideo",modalData.videoUrl);

// // //             }
// // //         },[])

// // //     const isFormUpdated = () => {
// // //         //gaValue function ni help thi aapda form input ma je pn value hase/current value te badhi value getValue function lai ne aavse...
// // //         const currentValues = getValue();
// // //         if(currentValues.lectureTitle !== modalData.title ||
// // //            currentValues.lectureDesc !== modalData.desc ||
// // //            currentValues.lectureVideo !== modalData.videoUrl)
// // //         {
// // //             //jo upper ni badhi value not equal hase to aapde mani laisu ke form update thai gayu che
// // //             //because aapdi currentValue(je input form ma fill kari che te) and store value hase te bev value match nai thati hoi that means aapde samji javu joi ke form update thayu che..aathi aai return true karyu che.
// // //             return true;
// // //         }
// // //         else{
// // //             return false;
// // //         } 
// // //     }  

// // //     const handelEditSubSection = async() => {
// // //         // aa aakha function ne hu onSubmit ma je aa function call karto che thai pn lakhi saku chu..
// // //         //aa function basically form ni current value ne aapde update karvi hoi to te value ne update karva mate use thai che

// // //         const currentValue = getValue();
// // //         const formData = new FormData();

// // //         formData.append("sectionId",modalData);
// // //         formData.append("subSectionId",modalData._id);
        
// // //         if(currentValue.lectureTitle !== modalData.title)
// // //         {
// // //             formData.append("title",currentValue.lectureTitle);
// // //         }

// // //         if(currentValue.lectureDesc !== modalData.description)
// // //         {
// // //             formData.append("description",currentValue.lectureDesc);
// // //         }

// // //         if(currentValue.lectureVideo !== modalData.videoUrl)
// // //         {
// // //             formData.append("video",currentValue.lectureVideo);
// // //         }

// // //         setLoading(true);
// // //         const result = await updateSubSection({formData,token});

// // //         if(result)
// // //         {
// // //             // TODO--->Kya extra kr shakte hai 
// // //             const updatedCourseContent =  course.courseContent.map((section)=>{
// // //                 section._id === modalData.sectionId ? result : section
// // //                 });
// // //             const updatedCourse = {...course,courseContent:updatedCourseContent}
// // //             dispatch(setCourse(updatedCourse));
// // //             // dispatch(setCourse(result));
// // //         }
// // //         //clode modal
// // //         setModalData(null);
// // //         //close loading
// // //         setLoading(false);
// // //     }
    
// // //     const onSubmit = async(data) => {
// // //         //aapde subSection ne view karva aaya hasu to thai koi Subit vadu button/button hotu nathi to te case ma kai karvani jarur nathi aathi me khali return statement aetlu j lakhyu che.
// // //         if(view)
// // //         {
// // //             return;
// // //         }

// // //         //pachi joi lo view karva nathi aavya to edit karva aavya cho..aagar edit karva aavya hoi to niche if(edit) ma jav.
// // //         if(edit)
// // //         {
// // //             //aagar edit karva aavya hoi to pela isFormUpdated vado function check karo..because aej check kare che bev value compare kari ne ke form/subSection update thayo che ke nai 
// // //             //hu edit karva aavyo chu ne form update j nai thayu toast karo niche nu sentence.
// // //             // basically tame edit vada icon pr click kari edit karva aavya hoi and form/subSection ma
// // //             //kai edit karya vagar save/Save Change or click karso tayare aa toast aavse
// // //             if(!isFormUpdated)
// // //             {
// // //                 toast.error("No changes made to the form")
// // //             }
// // //             else{
// // //                 //form/subSection ne edit kari do
// // //                 handelEditSubSection();
// // //             }
// // //             return;
// // //         }

// // //         //normal case ma onSubmit ma aagad jem karyu te same j task aai karisu
// // //         const formData = new FormData();
// // //         //aa niche nu kemnu pass karyu te samjavu...NestedView ni ande modalData ni ander aapde setAddfunction ma aapde section id pass kari hati and modalData ma assSubSection variable pass karyo hato tema sectionId store thai j gai hase...aathi modalData no use kari ne mane SectionId madi..
// // //         formData.append("sectionId",modalData);
// // //         formData.append("title",data.lectureTitle);
// // //         formData.append("description",data.lectureVideo);
// // //         formData.append("video",data.lectureVideoUrl);

// // //         setLoading(true)
// // //         //API CALL for CREATE SUBSECTION
// // //         const result = await createSubSection(formData,token);

// // //         if(result){
// // //             // TODO-->Check for Update 
// // //             const updatedCourseContent =  course.courseContent.map((section)=>{
// // //                 section._id === modalData ? result : section
// // //                 });
// // //                 const updatedCourse = {...course,courseContent:updatedCourseContent}
// // //                 dispatch(setCourse(updatedCourse));
// // //             // dispatch(setCourse(result));
// // //         }
// // //         // niche vadu modal/create ne bandh/close karva mate use karvama aave che
// // //         setModalData(null)
// // //         setLoading(false);

// // //     }
// // //   return (
// // //     <div>
// // //         <div>
// // //         {/* aapde NestedView ma add,view and edit vado flag pass karya hata ne <> ma tena according hu niche condition check karu chu */}
// // //          {/* view true hoi to viewing print karo,edit true hoi to edit print karo,add true hoi to add print karo */}
// // //             <p>{view && "viewing"} {add && "Adding"} {edit && "Editing"} lecture</p>
// // //             {/* //cross vada icon pr cclick karta model jatu rese  */}
// // //             <button onClick={() => !loading && setModalData(null)}><RxCross1 /></button>
// // //             {/* <button onClick={() => {!loading ? setModalData(null) : {}}}><RxCross1/></button> */}
// // //         </div>
        
// // //         <form onSubmit={handelSubmit(onSubmit)}>
// // //         {/* Upload component aapde je video  upload karvi hoi te video upload karse  */}
// // //             <Upload
// // //                 name="lectureVideo"
// // //                 label="Lecture Video"
// // //                 register={register}
// // //                 setValue={setValue}
// // //                 errors={errors}
// // //                 video={true}
// // //                 //aai viewData ma me condition lagavi che ke view vado flag true hase toj tamne viewUrl jova madse
// // //                 viewData={view ? modalData.videoUrl : null}
// // //                 //aai editData ma me condition lagavi che ke edit vado flag true hase toj tamne viewUrl edit karva madse
// // //                 editData={edit ? modalData.videoUrl : null}

// // //                 //nai to by default add vada flag jova madse jema aapde subSection(video,tittle,discription add kari sakishu) create kari sakisu
// // //             />

// // //             <div>
// // //                 <label>Lecture title</label>
// // //                 <input id='lectureTitle'
// // //                 placeholder='Enter Lecture title'
// // //                 {...register("lectureTitle",{required:true})}
// // //                 className='w-full' />

// // //                 {
// // //                     errors.lectureTitle && <span>lecture title is required</span>
// // //                 }
// // //             </div>

// // //             <div>
// // //                 <label>lecture Description</label>
// // //                 <textarea
// // //                     id='lectureDesc'
// // //                     placeholder='Enter Lecture Description'
// // //                     {...register("lectureDesc",{required:true})}
// // //                     className='w-full min-h-[130px]'/>
// // //             </div>

// // //             {
// // //                 //aama hu aem keva magu chu ke jayare pn view vado flag true na hoi false hoi te case ma aa button show thai
// // //                 !view && (
// // //                     <div>
// // //                         <Iconbtn
// // //                         // aama pela loading check karyu aagar loading true hoi to loading dekhado
// // //                         //nai edit no flag check karo agar edit true hoi to Save Change vadu button show karo and jo edit pn false hase to last ma to add j true hovano to add mate by default save button to aavse j.
// // //                             text={loading ? "Loading..." : edit ? "Save Changes" : "Save"}
// // //                         />
// // //                     </div>
// // //                 )
// // //             }
// // //         </form>
// // //     </div>
// // //   )
// // // }

import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { toast } from "react-hot-toast"
import { RxCross2 } from "react-icons/rx"
import { useDispatch, useSelector } from "react-redux"

import {
  createSubSection,
  updateSubSection,
} from "../../../../../services/operations/courseDetailsAPI"
import { setCourse } from "../../../../../slices/courseSlice"
import Upload from "../Upload"
import { Iconbtn } from "../../../../common/Iconbtn"

export default function SubSectionModal({
  modalData,
  setModalData,
  add = false,
  view = false,
  edit = false,
}) {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
    getValues,
    unregister,
  } = useForm()

  const dispatch = useDispatch()
  const [loading, setLoading] = useState(false)
  const [videoSource, setVideoSource] = useState("upload")
  const { token } = useSelector((state) => state.auth)
  const { course } = useSelector((state) => state.course)

  useEffect(() => {
    if (videoSource === "upload") {
      unregister("lectureVideoUrl")
    } else {
      unregister("lectureVideo")
    }
  }, [videoSource, unregister])

  useEffect(() => {
    if (view || edit) {
      setValue("lectureTitle", modalData.title)
      setValue("lectureDesc", modalData.description)
      if (modalData.videoUrl && (modalData.videoUrl.includes("youtube") || modalData.videoUrl.includes("youtu.be"))) {
        setVideoSource("youtube")
        setValue("lectureVideoUrl", modalData.videoUrl)
      } else {
        setVideoSource("upload")
        setValue("lectureVideo", modalData.videoUrl)
      }
    }
  }, [])

  const isFormUpdated = () => {
    const currentValues = getValues()
    if (videoSource === "upload") {
      return (
        currentValues.lectureTitle !== modalData.title ||
        currentValues.lectureDesc !== modalData.description ||
        currentValues.lectureVideo !== modalData.videoUrl
      )
    } else {
      return (
        currentValues.lectureTitle !== modalData.title ||
        currentValues.lectureDesc !== modalData.description ||
        currentValues.lectureVideoUrl !== modalData.videoUrl
      )
    }
  }

  const handleEditSubsection = async () => {
    const currentValues = getValues()
    const formData = new FormData()
    formData.append("sectionId", modalData.sectionId)
    formData.append("subSectionId", modalData._id)
    if (currentValues.lectureTitle !== modalData.title) {
      formData.append("title", currentValues.lectureTitle)
    }
    if (currentValues.lectureDesc !== modalData.description) {
      formData.append("description", currentValues.lectureDesc)
    }
    
    if (videoSource === "upload" && currentValues.lectureVideo !== modalData.videoUrl) {
      formData.append("video", currentValues.lectureVideo)
    } else if (videoSource === "youtube" && currentValues.lectureVideoUrl !== modalData.videoUrl) {
      formData.append("videoUrl", currentValues.lectureVideoUrl)
    }

    setLoading(true)
    const result = await updateSubSection(formData, token)
    if (result) {
      const updatedCourseContent = course.courseContent.map((section) =>
        section._id === modalData.sectionId ? result : section
      )
      const updatedCourse = { ...course, courseContent: updatedCourseContent }
      dispatch(setCourse(updatedCourse))
    }
    setModalData(null)
    setLoading(false)
  }

  const onSubmit = async (data) => {
    if (view) return

    if (edit) {
      if (!isFormUpdated()) {
        toast.error("No changes made to the form")
      } else {
        handleEditSubsection()
      }
      return
    }

    const formData = new FormData()
    formData.append("sectionId", modalData)
    formData.append("title", data.lectureTitle)
    formData.append("description", data.lectureDesc)
    
    if (videoSource === "upload") {
      formData.append("video", data.lectureVideo)
    } else {
      formData.append("videoUrl", data.lectureVideoUrl)
    }

    setLoading(true)
    const result = await createSubSection(formData, token)
    if (result) {
      const updatedCourseContent = course.courseContent.map((section) =>
        section._id === modalData ? result : section
      )
      const updatedCourse = { ...course, courseContent: updatedCourseContent }
      dispatch(setCourse(updatedCourse))
    }
    setModalData(null)
    setLoading(false)
  }

  return (
    <div className="fixed inset-0 z-[1000] !mt-0 grid h-screen w-screen place-items-center overflow-auto bg-white bg-opacity-10 backdrop-blur-sm">
      <div className="my-10 w-11/12 max-w-[700px] rounded-lg border border-richblack-400 bg-richblack-800">
        <div className="flex items-center justify-between rounded-t-lg bg-richblack-700 p-5">
          <p className="text-xl font-semibold text-richblack-5">
            {view && "Viewing"} {add && "Adding"} {edit && "Editing"} Lecture
          </p>
          <button onClick={() => (!loading ? setModalData(null) : {})}>
            <RxCross2 className="text-2xl text-richblack-5" />
          </button>
        </div>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-8 px-8 py-10"
        >
          {/* Video Source Selection */}
          {!view && (
            <div className="flex gap-x-4">
              <button
                type="button"
                onClick={() => setVideoSource("upload")}
                className={`px-4 py-2 rounded-md transition-all duration-200 ${
                  videoSource === "upload" 
                  ? "bg-yellow-50 text-richblack-900 font-semibold shadow-md" 
                  : "bg-richblack-700 text-richblack-5 hover:bg-richblack-600"
                }`}
              >
                Upload Video
              </button>
              <button
                type="button"
                onClick={() => setVideoSource("youtube")}
                className={`px-4 py-2 rounded-md transition-all duration-200 ${
                  videoSource === "youtube" 
                  ? "bg-yellow-50 text-richblack-900 font-semibold shadow-md" 
                  : "bg-richblack-700 text-richblack-5 hover:bg-richblack-600"
                }`}
              >
                YouTube Link
              </button>
            </div>
          )}

          {videoSource === "upload" ? (
            <Upload
              name="lectureVideo"
              label="Lecture Video"
              register={register}
              setValue={setValue}
              errors={errors}
              video={true}
              viewData={view && (!modalData.videoUrl?.includes("youtube") && !modalData.videoUrl?.includes("youtu.be")) ? modalData.videoUrl : null}
              editData={edit && (!modalData.videoUrl?.includes("youtube") && !modalData.videoUrl?.includes("youtu.be")) ? modalData.videoUrl : null}
            />
          ) : (
            <div className="flex flex-col space-y-2">
              <label className="text-sm text-richblack-5" htmlFor="lectureVideoUrl">
                YouTube Video Link {!view && <sup className="text-pink-200">*</sup>}
              </label>
              <input
                disabled={view || loading}
                id="lectureVideoUrl"
                placeholder="Enter YouTube Link (e.g. https://www.youtube.com/watch?v=...)"
                {...register("lectureVideoUrl", { required: true })}
                className="w-full rounded-md border border-richblack-600 bg-richblack-700 px-3 py-2 text-richblack-5 placeholder-richblack-400 focus:border-yellow-500 focus:outline-none"
              />
              {errors.lectureVideoUrl && (
                <span className="ml-2 text-xs tracking-wide text-pink-200">
                  YouTube Link is required
                </span>
              )}
              {view && modalData.videoUrl && (
                  <div className="mt-4 text-richblack-200 text-sm">
                    External Video URL: <a href={modalData.videoUrl} target="_blank" rel="noreferrer" className="text-yellow-50 hover:underline">{modalData.videoUrl}</a>
                  </div>
              )}
            </div>
          )}

          <div className="flex flex-col space-y-2">
            <label className="text-sm text-richblack-5" htmlFor="lectureTitle">
              Lecture Title {!view && <sup className="text-pink-200">*</sup>}
            </label>
            <input
              disabled={view || loading}
              id="lectureTitle"
              placeholder="Enter Lecture Title"
              {...register("lectureTitle", { required: true })}
              className="w-full rounded-md border border-richblack-600 bg-richblack-700 px-3 py-2 text-richblack-5 placeholder-richblack-400 focus:border-yellow-500 focus:outline-none"
            />
            {errors.lectureTitle && (
              <span className="ml-2 text-xs tracking-wide text-pink-200">
                Lecture title is required
              </span>
            )}
          </div>

          <div className="flex flex-col space-y-2">
            <label className="text-sm text-richblack-5" htmlFor="lectureDesc">
              Lecture Description {!view && <sup className="text-pink-200">*</sup>}
            </label>
            <textarea
              disabled={view || loading}
              id="lectureDesc"
              placeholder="Enter Lecture Description"
              {...register("lectureDesc", { required: true })}
              className="w-full min-h-[130px] resize-none rounded-md border border-richblack-600 bg-richblack-700 px-3 py-2 text-richblack-5 placeholder-richblack-400 focus:border-yellow-500 focus:outline-none"
            />
            {errors.lectureDesc && (
              <span className="ml-2 text-xs tracking-wide text-pink-200">
                Lecture Description is required
              </span>
            )}
          </div>

          {!view && (
            <div className="flex justify-end">
              <Iconbtn
                disabled={loading}
                text={loading ? "Loading.." : edit ? "Save Changes" : "Save"}
                type="submit"
              />
            </div>
          )}
        </form>
      </div>
    </div>
  )
}
