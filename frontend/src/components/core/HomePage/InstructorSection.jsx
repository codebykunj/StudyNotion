import React from 'react'
// import Instructor from '../../../assets/Images/Instructor.png'
import Instructor from "../../../assets/Images/Instructor.png";
import { Button } from './Button';
import { Highlightedtext } from './Highlightedtext';

export const InstructorSection  = () => {
  return (
    <div className='w-full flex flex-row gap-20 pt-20'>
    {/* left */}
      <div className=' h-fit'>
        <img src={Instructor} alt='image' className=' shadow-white shadow-[-20px_-20px_0_0]'/>
      </div>

      {/* right  */}
      <div className='w-[50%] flex flex-col gap-10  justify-center  '>
         <h1 className='w-full text-4xl font-semibold text-white'>Become an <br/><Highlightedtext>Instructor</Highlightedtext></h1>
         <p className=' text-richblack-200 text-lg'>Instructors from around the world teach millions of students on
            StudyNotion. We provide the tools and skills to teach what you
            love.
        </p>
        <div className='w-fit h-fit'>
        <Button active={true} linkto={"/signup"}>{"Learn More"}</Button>
        </div>
      </div>

    </div>
  )
}
