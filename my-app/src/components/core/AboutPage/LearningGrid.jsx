import React from 'react'
import { Highlightedtext } from '../HomePage/Highlightedtext';
import { Button } from '../HomePage/Button';
import { Link } from 'react-router-dom';

const LearningGridArray = [
  {
    order: -1,
    heading: "World-Class Learning for",
    highlightText: "Anyone, Anywhere",
    description:
      "Studynotion partners with more than 275+ leading universities and companies to bring flexible, affordable, job-relevant online learning to individuals and organizations worldwide.",
    BtnText: "Learn More",
    BtnLink: "/",
  },
  {
    order: 1,
    heading: "Curriculum Based on Industry Needs",
    description:
      "Save time and money! The Belajar curriculum is made to be easier to understand and in line with industry needs.",
  },
  {
    order: 2,
    heading: "Our Learning Methods",
    description:
      "Studynotion partners with more than 275+ leading universities and companies to bring",
  },
  {
    order: 3,
    heading: "Certification",
    description:
      "Studynotion partners with more than 275+ leading universities and companies to bring",
  },
  {
    order: 4,
    heading: `Rating "Auto-grading"`,
    description:
      "Studynotion partners with more than 275+ leading universities and companies to bring",
  },
  {
    order: 5,
    heading: "Ready to Work",
    description:
      "Studynotion partners with more than 275+ leading universities and companies to bring",
  },
];
export const LearningGrid = () => {
  return (
    // <div className='flex'>
        // {
        //     LearningGridArray.map((data,index)=>{
        //         return(
        //             <div key={index} className='flex flex-col text-white'>
        //                 <p>{data.heading}</p>
        //                 <p>{data.description}</p>
        //             </div>
        //         )
        //     })
        // }
    // </div>
    <div className='grid grid-cols-4 grid-rows-2'>
        {
            LearningGridArray.map((data,index)=>{
                return(
                    <div key={index} className={`${index===0 && "col-span-2 h-[294px]"}
                    ${data.order%2===1 ?"bg-richblack-700 h-[294px]":data.order===0 ? "bg-richblack-800 h-[294px]": "bg-transparent"} ${data.order === 3 && "col-start-2" }`}>
                        {/* <p>{data.heading}</p>
                        <p>{data.description}</p> */}

                        {
                            data.order<0 
                            ? (<div className=' flex flex-col'>
                            <h1 className='text-3xl text-white font-bold gap-3'>{data.heading}</h1>
                            <Highlightedtext>{data.highlightText}</Highlightedtext>
                            <p className='text-richblack-300 font-medium mt-3'>{data.description}</p>
                            <div className='w-fit mt-3'>
                            <Button active={true} linkto={data.BtnLink}>{data.BtnText}</Button>
                            </div>
                            </div>) 
                            : (<div className='flex flex-col p-8 gap-8'>
                              <h1 className='text-richblack-5 text-lg'>{data.heading}</h1>
                              <p className='text-richblack-300 font-medium'>{data.description}</p>
                            </div>)
                        }
                    </div> 

                       /* <div
            key={index}
            className={`${index === 0 && "xl:col-span-2 xl:h-[294px]"}  ${
              card.order % 2 === 1
                ? "bg-richblack-700 h-[294px]"
                : card.order % 2 === 0
                ? "bg-richblack-800 h-[294px]"
                : "bg-transparent"
            } ${card.order === 3 && "xl:col-start-2"}  `}
          >
             <p>{card.heading}</p>
                        <p>{card.description}</p>
          </div> */
            )
            })
        }
    </div>
  )
}
