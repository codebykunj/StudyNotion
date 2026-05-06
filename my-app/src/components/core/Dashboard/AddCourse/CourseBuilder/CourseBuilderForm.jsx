// //aa final code che je run thai che
// import React, { useEffect, useState } from 'react';
// import { useForm } from 'react-hook-form';
// import { Iconbtn } from '../../../../common/Iconbtn';
// import { MdAddCircleOutline } from 'react-icons/md';
// import { useDispatch, useSelector } from 'react-redux';
// import { BiRightArrow } from 'react-icons/bi';
// import { setCourse, setEditCourse, setStep } from '../../../../../slices/courseSlice';
// import toast from 'react-hot-toast';
// import { createSection, updateSection } from '../../../../../services/operations/courseDetailsAPI';
// // import { NestedView } from './NestedView';
// import  NestedView  from './NestedView';


// export const CourseBuilderForm = () => {
//   const {
//     register,
//     handleSubmit,
//     setValue,
//     formState: { errors },
//   } = useForm();

//   const [editSectionName, setEditSectionName] = useState(null);
//   const [loading, setLoading] = useState(false);

//   const { course } = useSelector((state) => state.course);
//   const { token } = useSelector((state) => state.auth);
//   const dispatch = useDispatch();

//   useEffect(() => {
//     console.log("UPDATED");
//   },[course])

//   const cancelEdit = () => {
//     setEditSectionName(null);
//     setValue('sectionName', '');
//   };

//   const goBack = () => {
//     dispatch(setStep(1));
//     dispatch(setEditCourse(true));
//   };

//   const goToNext = () => {
//     if (!course || course.courseContent?.length === 0) {
//       toast.error('Please add at least one Section');
//       return;
//     }

//     if (
//       course.courseContent.some(
//         (section) => !section.subSection || section.subSection.length === 0
//       )
//     ) {
//       toast.error('Please add at least one lecture in each Section');
//       return;
//     }

//     dispatch(setStep(3));
//   };

//   const onSubmit = async (data) => {
//     setLoading(true);
//     let result;

//     if (!course?._id) {
//       toast.error('Course not found. Please try again.');
//       setLoading(false);
//       return;
//     }

//     if (editSectionName) {
//       result = await updateSection(
//         {
//           sectionName: data.sectionName,
//           sectionId: editSectionName,
//           courseId: course._id,
//         },
//         token
//       );
//     } else {
//       result = await createSection(
//         {
//           sectionName: data.sectionName,
//           courseId: course._id,
//         },
//         token
//       );
//     }

//     if (result) {
//       dispatch(setCourse(result));
//       setEditSectionName(null);
//       setValue('sectionName', '');
//     }

//     setLoading(false);
//   };

//   const handleChangeEditSectionName = (sectionId, sectionName) => {
//     if (editSectionName === sectionId) {
//       cancelEdit();
//       return;
//     }

//     setEditSectionName(sectionId);
//     setValue('sectionName', sectionName);
//   };

//   return (
//     <div className="text-white w-full max-w-[600px] mx-auto">
//       <p className="text-xl font-semibold mb-4">Course Builder</p>

//       <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
//         <div>
//           <label htmlFor="sectionName" className="block text-sm font-medium text-gray-300">
//             Section Name <sup className="text-red-500">*</sup>
//           </label>
//           <input
//             id="sectionName"
//             placeholder="Add Section Name"
//             {...register('sectionName', { required: true })}
//             className="w-full mt-1 p-2 rounded bg-richblack-700 text-white border border-richblack-600"
//           />
//           {errors.sectionName && (
//             <span className="text-pink-200 text-sm">Section name is required</span>
//           )}
//         </div>

//         <div className="flex items-center space-x-4">
//           <Iconbtn
//             type="submit"
//             text={editSectionName ? 'Edit Section Name' : 'Create Section'}
//             outline={true}
//             customClasses="text-white border-yellow-200"
//           >
//             <MdAddCircleOutline className="text-yellow-50" />
//           </Iconbtn>

//           {editSectionName && (
//             <button
//               type="button"
//               onClick={cancelEdit}
//               className="text-sm text-richblack-300 underline"
//             >
//               Cancel Edit
//             </button>
//           )}
//         </div>
//       </form>

//       {course?.courseContent?.length > 0 && (
//         <div className="mt-8 bg-pink-200">
//           <NestedView handleChangeEditSectionName={handleChangeEditSectionName} />
//         </div>
//       )}

//       <div className="flex justify-end gap-x-3 mt-8">
//         <button
//           onClick={goBack}
//           className="rounded-md px-4 py-2 bg-richblack-600 text-white hover:bg-richblack-700"
//         >
//           Back
//         </button>

//         <Iconbtn text="Next" onClick={goToNext}>
//           <BiRightArrow />
//         </Iconbtn>
//       </div>
//     </div>
//   );
// };

//aa niche na code ma styleing apply kareli che
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Iconbtn } from "../../../../common/Iconbtn";
import { MdAddCircleOutline } from "react-icons/md";
import { BiRightArrow } from "react-icons/bi";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-hot-toast";
import {
  setCourse,
  setEditCourse,
  setStep,
} from "../../../../../slices/courseSlice";
import { createSection, updateSection } from "../../../../../services/operations/courseDetailsAPI";
import NestedView from "./NestedView";

export const CourseBuilderForm = () => {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  const [editSectionName, setEditSectionName] = useState(null);
  const [loading, setLoading] = useState(false);

  const { course } = useSelector((state) => state.course);
  const { token } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    console.log("Course updated");
  }, [course]);

  const cancelEdit = () => {
    setEditSectionName(null);
    setValue("sectionName", "");
  };

  const goBack = () => {
    dispatch(setStep(1));
    dispatch(setEditCourse(true));
  };

  const goToNext = () => {
    if (!course || course.courseContent?.length === 0) {
      toast.error("Please add at least one Section");
      return;
    }

    if (
      course.courseContent.some(
        (section) => !section.subSection || section.subSection.length === 0
      )
    ) {
      toast.error("Please add at least one lecture in each Section");
      return;
    }

    dispatch(setStep(3));
  };

  const onSubmit = async (data) => {
    setLoading(true);
    let result;

    if (!course?._id) {
      toast.error("Course not found. Please try again.");
      setLoading(false);
      return;
    }

    if (editSectionName) {
      result = await updateSection(
        {
          sectionName: data.sectionName,
          sectionId: editSectionName,
          courseId: course._id,
        },
        token
      );
    } else {
      result = await createSection(
        {
          sectionName: data.sectionName,
          courseId: course._id,
        },
        token
      );
    }

    if (result) {
      dispatch(setCourse(result));
      setEditSectionName(null);
      setValue("sectionName", "");
    }

    setLoading(false);
  };

  const handleChangeEditSectionName = (sectionId, sectionName) => {
    if (editSectionName === sectionId) {
      cancelEdit();
      return;
    }
    setEditSectionName(sectionId);
    setValue("sectionName", sectionName);
  };

  return (
    <div className="space-y-8 rounded-md border-[1px] border-richblack-700 bg-richblack-800 p-6 w-[600px]">
      <p className="text-2xl font-semibold text-richblack-5">Course Builder</p>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* Section Name Input */}
        <div className="flex flex-col space-y-2">
          <label htmlFor="sectionName" className="text-sm text-richblack-5">
            Section Name <sup className="text-pink-200">*</sup>
          </label>
          {/* <input
            id="sectionName"
            placeholder="Add a section to build your course"
            disabled={loading}
            {...register("sectionName", { required: true })}
            // className="form-style w-full"
        className="form-style w-full px-3 py-2 mt-1 rounded-md bg-richblack-800 text-white  border-richblack-300"

          /> */}
          <input
  id="sectionName"
  placeholder="Add a section to build your course"
  disabled={loading}
  {...register("sectionName", { required: true })}
  className="form-style w-full px-3 py-2 mt-1 rounded-md bg-richblack-800 text-white border border-richblack-300 focus:outline-none focus:ring-2 focus:ring-yellow-300 focus:border-yellow-300"
/>

          {errors.sectionName && (
            <span className="ml-2 text-xs tracking-wide text-pink-200">
              Section name is required
            </span>
          )}
        </div>

        {/* Buttons */}
        <div className="flex items-end gap-x-4">
          <Iconbtn
            type="submit"
            text={editSectionName ? "Edit Section Name" : "Create Section"}
            outline={true}
            disabled={loading}
          >
            <MdAddCircleOutline className="text-yellow-50" />
          </Iconbtn>

          {editSectionName && (
            <button
              type="button"
              onClick={cancelEdit}
              className="text-sm text-richblack-300 underline"
            >
              Cancel Edit
            </button>
          )}
        </div>
      </form>

      {/* Nested Sections */}
      {course?.courseContent?.length > 0 && (
        <div className="mt-6">
          <NestedView handleChangeEditSectionName={handleChangeEditSectionName} />
        </div>
      )}

      {/* Navigation Buttons */}
      <div className="flex justify-end gap-x-3 mt-6">
        <button
          onClick={goBack}
          className="flex cursor-pointer items-center gap-x-2 rounded-md bg-richblack-300 py-[8px] px-[20px] font-semibold text-richblack-900"
        >
          Back
        </button>

        <Iconbtn disabled={loading} text="Next" onClick={goToNext}>
          <BiRightArrow />
        </Iconbtn>
      </div>
    </div>
  );
};



















































// // import React from 'react'

// // export const CourseBuilderForm = () => {
// //   return (
// //     <div>CourseBuilderForm</div>
// //   )
// // }


// // import React, { useState } from 'react'
// // import { useForm } from 'react-hook-form'
// // import { Iconbtn } from '../../../../common/Iconbtn';
// // import { MdAddCircleOutline } from 'react-icons/md';
// // import { useDispatch, useSelector } from 'react-redux';
// // import {BiRightArrow} from "react-icons/bi"
// // import { setCourse, setEditCourse, setStep } from '../../../../../slices/courseSlice';
// // import toast from 'react-hot-toast';
// // // import { createSection, updateSection } from '../../../../../../server/controller/Section';
// // import {createSection,updateSection} from "../../../../../services/operations/courseDetailsAPI"
// // import { NestedView } from './NestedView';

// // export const CourseBuilderForm = () => {
// //   const {
// //     register,
// //     handleSubmit,
// //     setValue,
// //     // getValue,
// //     formState: {errors} 
// //   } = useForm();
// //   //section input field pachi je button che tema starting ma create section aem text aave che.
// //   //pn jayare hu niche pen va edit icon pr click karu chu to thai create section ni jagya ae
// //   //edit section aem aavi jai che...aathi me editSectionName,setEditSectionName variable create karya che.
// //   // jo editSectionName  true hou to edit Section no text dekhase and false hase to create section dekhase
// //   const [editSectionName,setEditSectionName] = useState(null)
// //   // const [editSectionName,setEditSectionName] = useState(false)


// //   const cancleEdit = () =>
// //   {
// //     //setEditSection ne aapde fari thi false/null kari daisu to te automatic Create section print karse..
// //     //because editSectionName true hase ae j case ma khali Edit Section Print thase...false vada
// //     //case ma Create Section print thase
// //     setEditSectionName(null)
// //     // setEditSectionName(false)

// //     //aapde aai form no pn use kariye che aathi koi button pr click karta  form ni badhi value aai khali section name che aathi (sectionName) ni value
// //     //empty set karvi padse aathi setValue function aapde useForm ma che te form ni value set karva mate use thai che
// //     //aai mare empty karvaniche value aathi setValue("sectionName","") sectionName("sectionName") ni value ne  empty ("") set kari che
// //     setValue("sectionName","")

// //   }

// //   // aapde backend ma course nu model create karyu che je tema aapde courseContent name ni
// //   //field ma Section no referance store karyo che...aathi aapde nichhe ni syntax thi pela
// //   //couse ne fetch kari lavo padse useSelectot() hook ni help thi...
// //   const {course} = useSelector((state)=>state.course);

// //   const dispatch = useDispatch();
// //   const {token} = useSelector((state)=>state.auth);

// //   const goBack = () =>{
// //   //aapde back course ne Edit karva mate j jata hoi ye...
// //   //aam aapde setStep(1) ma course aapde sucessefully create kari dai ae che and setStep(2) page ma aavi jai che.
// //   // setStep(2) mathi aapde Back button thi setStep(1) ma pacha jai aa case ma aapde  create karela(createCourse) ne update kariye che aathi aai editCourse vado function no use karisu je aapde backend na controller ma already lakhelo che.
// //     dispatch(setStep(1))

// //     //aai aapde setEditCourse(true) ne true mark kari ne aem keva magiye che ne tame course edit karva jav cho create karva nai
// //     dispatch(setEditCourse(true))
// //   }

// //   const goToNext = () => {
// //     //aapde setStep(2) page mathi setStep(3) ma tayare j jai sakiye jayare me atlest 1 (section) create karela hoi..
// //     // backem na course.courseContent.length ni length aapde check kari sakisu ke tema ketla (section) created che 
// //     if(course.courseContent.length === 0)
// //     {
// //       toast.error("Please add atleast one Section")
// //     }

// //     //aai aapde check karisu ke Section ma koi subSection created che ke nai...
// //     //aapde backend ma section na model ma sunSection no referance store karyo che..aathi teni lenth check kari uppper na same logic thi aapde bata lagavi sakisu ke tema koi subsection created che ke nai.
// //     if(course.courseContent.some((section)=>section.subSection.length === 0))
// //     {
// //       toast.error("Please add atleast one lecture in each section ")
// //       return;
// //     }

// //     //if everything is dood then aagad na step ma jata ro
// //     dispatch(setStep(3))
// //   }


// //   const [loading,setLoading] = useState(false);
// //   //form ne submit karta pr click karta je action perform thase te aapde niche na function ma lakhisu...
// //   //create section and Edit Section button ne click karta je/kaya action perform thase te action aapde aa onSubmit vada function ma lakhisu.
// //   //aa bev ma[i]create Section bth---->section ne create karse   [ii]edit section btn---->section ne edit karse..
// //   // createSection and editSection ni api niche na function ma j call thase 
// //   const onSubmit = async(data) => {
// //     setLoading(true);
// //     let result;

// //     //aai pela check karisu ke hu Edit karu chu ke Create karu chu Section ne..
// //     //mani lo ke hu section ne Edit karu chu...to hu edit vadi api call kari dais
// //     if(editSectionName){
// //       //we are a editing the section name
// //       //aai updateSection na bracket/parameter ma aapde ae badha j data pass karisu je data aapde backend ma updateSection na controller ma input/request ni body mathi leta haisu
// //       result = await updateSection({
// //                       sectionName:data.sectionName, 
// //                       sectionId:editSectionName,
// //                       // kai course mate section create karvana che te  mate me mari rite courseId pass kari che..te backend na conroller ma aapde request ni body mathi nati lidhi..
// //                       courseId:course._id
// //                     },token)
// //     }
// //     else{
// //       // jo editsectioon na btn pr click nai karyu hoi to last/else aapde create section btn pr click karyu hase to else case ma aapde section ne create karisu
// //       result = await createSection({
// //         sectionName:data.sectionName,
// //         // aai aapde kaya course no section create karyo che te janva mate courseId ne aai aapde mention kariye che...
// //         // const {course} = useSelector((state)=>state.course); aama thi aapde course ni id lai aavisu..     
// //         courseId:course._id
// //       },token)
// //     }

// //     //update values 
// //     if(result){
// //       // aai aapde section add karya che and section/subsection add karya che course aam course/courseid section/subsection add/update  karva thi course ne pn change/update karvo padse ..aathi
// //       // aapde course ni value pn update karvi padse..
// //       dispatch(setCourse(result));
// //       //have aapdu edit vadu kam thai gayu che aathi aapde setEditSectionName ne null mark kari daisu
// //       setEditSectionName(null);
// //       //and form ni pachi empty mark kari do
// //       setValue("sectionName","");
// //     }
// //     setLoading(false);
// //   }
  

// //   const handleChangeEditSectionName = (sectionId,sectionName) =>{

// //     //jo editSectionName ma pehle thi j sectionId padi rai li hoi to to toggrl/cancleEdit() function ne call kari devanu
// //     if(editSectionName === sectionId)
// //     {
// //       cancleEdit();
// //       return;
// //     }

// //     //and jo editSectionName  pehla thi koi value nai hoi to aa case ma tane niche mujab sectionName and sectionId ni value set kari do...
// //     setEditSectionName(sectionId);
// //     setValue("sectionName",sectionName);
// //   }


// //   return (
// //     <div className='text-pink-200 w-[300px]'>
// //       <p>Course Builder</p>
      
// //       <form onSubmit={handleSubmit(onSubmit)}>
// //         <div>
// //           <label htmlFor='sectionName'>Section Name <sup>*</sup></label>
// //           <input id='sectionName'
// //           placeholder='Add Section Name'
// //           {...register("sectionName",{required:true})} 
// //           className='w-full'  
// //           />

// //           {
// //            errors.sectionName && (<span className='text-pink-200'>Section name is required</span>)
// //           }
// //         </div>

// //       <div className='mt-10 flex items-center justify-center'>
// //         <div>
// //           <Iconbtn
// //           type='Submit'
// //           text={editSectionName ? "Edit Section Name" : "Create Section"}
// //           outline={true} 
// //           //customClasses ma aapde koi pn ne background color ke text color aapisu to te apply to thase bu te colour na name aagad tena colour no square ma color nai aave..pn badhi property apply to thase
// //           customClasses='text-white border-yellow-200'
// //          >
// //          {/*btn ni ander icon joi che aathi aapdeoprning and closing icon ni vache icon mukyu che  */}
// //               <MdAddCircleOutline className='text-yellow-50'/>
// //           </Iconbtn>
// //         </div>


// //         <div>
// //         {/* jayare aapde pen(edit icon) pr click kariye che tayare tema Edit Section ni sathe 
// //         sathe baju ma cancle ni link(<a></a> tag) / button pn aave che to aapde have cancle button
// //         editvadaCase Section j batavanu che create Section vada case ma nai batavanu.. to haveaapde cancle button nu logic lakhiye */}


// //         {/* cancle Edit button pr clickkarta/onClick karta cancleEdit function call thase.. aa function top pr define karelo che   */}
// //         {/* khali aek j condition(if) test karvi hoi to aapde &&(and ) operator no use kari sakiye che */}
// //           {editSectionName && (<button type='button' onClick={cancleEdit} className='text-smtext-richblack-300 underline ml-2'>
// //                               Cancle Edit
// //                             </button>) 
// //           }
// //         </div>
// //       </div>
// //     </form>

// //     {/* niche nu logic nestedView ne kai case ma render karisu te che  */}
// //     {/* pela aapde check karisu ke section avilable che ke nai jo section available hase toj aapde render/(subSection) create/render karavisu  */}
// //     {
// //       //backend ma course na model ma courseContent fileld ma aapde Section no referance store karyo che.
// //       //aathi aap aapde aai course model ni ander rahela courseContent ni length check kariye che
// //       //aagar teni length > 0 hase that meand pelathi jo koi section created hase to teni id tema store hase..
// //       //aam je case ma section created hase te case ma aapde NestedView ne render karavisu...
// //       course.courseContent.length > 0 && (
// //         <NestedView handleChangeEditSectionName={handleChangeEditSectionName}/>
// //       )
// //     }

// //        <div className='flex justify-end gap-x-3'>
// //           <button onClick={goBack} className='rounded-md cursor-pointer flex items-center'>
// //             Back
// //           </button>

// //           <Iconbtn text="Next" onClick={goToNext}>
// //               <BiRightArrow/>
// //           </Iconbtn>
// //        </div>

// //     </div>
// //   )
// // }








