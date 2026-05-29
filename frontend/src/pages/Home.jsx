import React from 'react'
import { Link } from 'react-router-dom'
import { FaArrowRight } from "react-icons/fa";
import { Highlightedtext } from '../components/core/HomePage/Highlightedtext';
import {Button} from '../components/core/HomePage/Button'
import Banner from '../assets/Images/banner.mp4'
import { CodeBlocks } from '../components/core/HomePage/CodeBlocks';
import { TimelineSection } from '../components/core/HomePage/TimelineSection';
import { LearningLanguageSection } from '../components/core/HomePage/LearningLanguageSection';
import { InstructorSection } from '../components/core/HomePage/InstructorSection';
import ReviewSlider from '../components/common/ReviewSlider';

export const Home = () => {
return (
<div className='w-full h-fit bg-richblack-900'>   
<div className='w-11/12 max-w-maxContent mx-auto flex flex-col items-center'>
    
  {/* section-1 nu box-1*/}
  <div className='flex flex-col items-center gap-5 '>
   <Link to="/signup">
    <div className=' bg-richblack-600 border-b border-richblack-400 rounded-full group w-fit hover:scale-95 transition-all duration-200 '>
    <div className='flex flex-row items-center text-lg py-3 px-12  text-white  gap-1  group-hover:bg-richblack-700 rounded-full transition-all duration-200 font-bold'>
   Become an instructor
    <FaArrowRight />
   </div>
   </div>
   </Link>

  <div className='w-full flex flex-col gap-2 m-3 mx-auto items-center'>
  
   <p className='text-4xl font-bold text-white'>Empower Your Future With</p>
   <Highlightedtext text="Coding Skills"/>

   <div className='w-[70%]'>
   <p className='text-richblack-200 text-lg text-center'>with our online coding course, you can learn at your own pace, from anywhere in the world, and
    get access to a wealth of resources, including hands-on projects, quizzes, and personalized feedback from instructors.  </p>
   </div>

   <div className=' flex flex-row gap-3 mt-8 group '>
    <Button active={true} linkto={"/signup"}>Learn more</Button>
    <Button active={false} linkto={"/signup"}  >Book a Demo</Button>
   </div>
   </div>
    


  <div className=' border-b-8 border-r-8 border-white mb-5'>
  <video autoPlay loop muted >
  <source src={Banner} type='video/mp4'>

  </source> 
  </video>
  </div>
  </div>

  {/* sectiom-1 no box-2    */}

<div className='w-full '>
   <CodeBlocks      position={"flex-row"}
                    heading={
                      <div className=" text-4xl  font-semibold text-white ">
                        Unlock Your
                        <Highlightedtext >Coding potential</Highlightedtext> With Our online courses
                      </div>}

                    subHeading={
                    "Our courses are designed and taught by industry experts who have years of experience in coding and are passionate about sharing their knowledge with you."
                    }

                    CTAbtn1={{text : "Try it Yourself",active:true,linkto:"/signup"}}  
                    CTAbtn2={{text:"Learn More", active:false,linkto:"/signup"}}

                    codeblock={`<!DOCTYPE html>\n<html>\n <title>\n Document \n</title>\n <body>\n<h1>My First Heading</h1>\n<h2>Hello world</h2>\n<p>My first paragraph</p>\n<p>Hello World</p> \n</body>\n</html>` }
                    codetextcolor={"text-yellow-200"}      
    />
</div>


  {/* section-1 no 2 */}
  <div className='w-full ' >
   <CodeBlocks      position={"flex-row-reverse"}
                    heading={
                      <div className=" text-4xl  font-semibold text-white ">
                        Unlock Your
                        <Highlightedtext >Coding potential</Highlightedtext> With Our online courses
                      </div>}

                    subHeading={
                    "Our courses are designed and taught by industry experts who have years of experience in coding and are passionate about sharing their knowledge with you."
                    }

                    CTAbtn1={{text : "Try it Yourself",active:true,linkto:"/signup"}}  
                    CTAbtn2={{text:"Learn More", active:false,linkto:"/signup"}}

                    codeblock={`<!DOCTYPE html>\n<html>\n <title>\n Document \n</title>\n <body>\n<h1>My First Heading</h1>\n<h2>Hello world</h2>\n<p>My first paragraph</p>\n<p>Hello World</p> \n</body>\n</html>` }
                    codetextcolor={"text-yellow-200"}      
    />
  </div>  
</div>
{/* Above is completed section 1 */}




{/* section-2 white */}
<div className='w-full h-fit bg-white mx-auto flex items-center'>
  {/* left side */} 
  <div className='w-11/12 mx-auto flex flex-col max-w-maxContent items-center'>
    <div className='w-full flex flex-row justify-between m-24'>
          {/* left  */}
          <div className='w-[45%]'>
          {/* <h1 className='text-4xl text-richblack-900'>Get the Skills you need for a {""} <Highlightedtext>Job that is in demand</Highlightedtext></h1> */}
          <h1 className='text-4xl text-richblack-900 font-bold'>Get the Skills you need for a <span className='text-blue-600 font-bold'>Job that is in demand</span></h1>
          </div>  
          {/* right */}
          <div className="w-[40%] h-fit flex flex-col gap-8" >
          <p className='text-md text-richblack-500 text-center'>The modern study notion is the dictates its own terms. Today to be a competitive specialist requiresmore than professional skills</p>
          <div className='w-fit h-fit'>
          <Button active={true} linkto={"/signup"}>Learn More</Button>
          </div>
          </div> 
    </div>  



    {/* second white section */}
    <div className='w-full item-center'>
      <div>
        <TimelineSection/>
      </div>

      <div className='flex items-center'>
        <LearningLanguageSection/>
      </div>

    </div>

 
  
</div> 
</div>

  
  {/* section 3 */}
  <div className='w-full h-fit bg-richblack-900 items-center'>
  <div className='w-11/12 max-w-maxContent mx-auto items-center justify-between'>
      <InstructorSection/>
  </div>
  <div>
    <h1 className='text-4xl text-white text-center font-bold mt-20 mb-10'>Reviews From other learners</h1>
    <ReviewSlider/>
  </div>
  

  {/* <div>
    <h1>Footer nu component banavi footer ne aa div ma insert karo</h1>
  </div> */}
  
  </div>
</div>
  )
}

