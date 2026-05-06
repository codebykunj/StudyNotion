import React from 'react'
import { Highlightedtext } from './Highlightedtext'
import Know_your_progress from '../../../assets/Images/Know_your_progress.png'
import Compare_with_others from '../../../assets/Images/Compare_with_others.svg'
import Plan_your_lessons from '../../../assets/Images/Plan_your_lessons.svg'
import { Button } from './Button'
export const LearningLanguageSection  = () => {
  return (
    <div className='flex flex-col items-center mx-auto mt-44 w-full'> 
      <div className='flex flex-col w-[75%] '>
        {/* <h1 className='text-4xl text-richblack-900'>Your Swiss Knife for <Highlightedtext>{"learning any LearningLanguageSection"}</Highlightedtext></h1> */}
        {/* <h1 className="text-4xl text-richblack-900">Your Swiss Knife for <Highlightedtext>learning any LearningLanguageSection</Highlightedtext></h1> */}
        <h1 className="text-4xl text-richblack-900 whitespace-nowrap m-6 text-center">
        Your Swiss Knife for<Highlightedtext>learning any Language</Highlightedtext>
        </h1>
        
        <p className='text-richblack-700 text-xl text-center'>Using spin making learning multiple languages easy. with 20+
          languages realistic voice-over, progress tracking, custom schedule
          and more.
        </p>  
      </div>

      <div className='w-full  min-h-[500px] flex flex-row relative items-center'>
          <img src={Know_your_progress} alt='image' className='absolute left-[-50px] top-[30px]'/>
          <img src={Compare_with_others} alt='image' className='absolute right-[520px] top-[-25px]'/>
          <img src={Plan_your_lessons} alt='image' className='absolute right-[150px] top-[-30px]' />
      </div>

      
        {/* <Button active={true} linkto={"/signup"}>{"Learn More"}</Button> */}
                <Button active={true} linkto={"/signup"}>{"Learn More"}</Button>
        
      
    </div>
        
    
  )
}
