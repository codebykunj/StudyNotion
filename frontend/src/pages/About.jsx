import React from 'react'
import { Highlightedtext } from '../components/core/HomePage/Highlightedtext'
import BannerImage1 from "../assets/Images/aboutus1.webp"
import BannerImage2 from "../assets/Images/aboutus2.webp"
import BannerImage3 from "../assets/Images/aboutus3.webp"
import FoundingStory from "../assets/Images/FoundingStory.png"
import { LearningGrid } from '../components/core/AboutPage/LearningGrid'
import ContactFormSection from '../components/core/AboutPage/ContactFormSection'

export const About = () => {
    const data =[
        {
            title:"5K",
            discription:"Active Students"
        },
        {
            title:"10+",
            discription:"Mentors"
        },
        {
            title:"200+",
            discription:"Courses"
        },
        {
            title:"50+",
            discription:"Awards"
        }
    ];
  return (
    <div>
    {/* section-1 */}
    <section className='bg-richblack-700'>
            <div className='w-[11/12]  max-w-maxContent mx-auto flex flex-col items-center justify-center bg-richblack-700 '>
                <header className='w-full'>
                    <h1 className='text-white text-3xl text-center font-bold mt-20'>Driving Innovation in Online Education for a <br/><Highlightedtext>{"Brighter Future"}</Highlightedtext></h1>
                    <p className='w-[70%] mx-auto mt-3 text-center text-base font-medium text-richblack-300 mb-6'>Studynotion is at the forefront of driving innovation in online education. We're passionate about creating a brighter future by offering cutting-edge courses, leveraging emerging technologies, and nurturing a vibrant learning community.</p>
                </header>

                <div className='flex flex-row'>
                    <img src={BannerImage1} alt='BannerImage1' className='m-4'/>
                    <img src={BannerImage2} alt='BannerImage2' className='m-4'/>
                    <img src={BannerImage3} alt='BannerImage3' className='m-4'/> 
                </div>

            </div>        
    </section>

    {/* section-2 */}
    <section className='bg-richblack-900 '>
       <div className='w-[11/12]  max-w-maxContent mx-auto flex flex-col items-center justify-center bg-richblack-900 '>
           <div>
               <h1 className='w-full bg-gradient-to-b from-[#E65C00] to-[#F9D423] bg-clip-text text-transparent text-4xl text-center font-bold mt-14 mb-14'>We are passionate about revolutionizing the way we learn. Our innovative Platform
               <Highlightedtext>{" combines technology, expertise "}</Highlightedtext> , and community to create an <br/>
               <Highlightedtext>{"unparalleled educational experience."}</Highlightedtext>
               </h1>
           </div>
       </div>
    <div className='w-[100%] h-[1px] bg-pure-greys-700'></div>

    </section>

    {/* section-3 */}
    <section className='bg-richblack-900 '>
        <div className='w-[11/12] max-w-maxContent flex items-center justify-center mx-auto mb-52'>
            <div className='w-full flex justify-between mt-20'>
                 {/* left div  */}
                <div className='w-[54%] flex flex-col gap-7'>
                    <h1 className='bg-gradient-to-br from-[#833AB4] via-[#FD1D1D] to-[#FCB045] bg-clip-text text-transparent text-4xl font-bold'>Our Founding Story</h1>
                    <p className="text-base font-medium text-richblack-300 lg:w-[95%]">
                        Our e-learning platform was born out of a shared vision and
                        passion for transforming education. It all began with a group of
                        educators, technologists, and lifelong learners who recognized
                        the need for accessible, flexible, and high-quality learning
                        opportunities in a rapidly evolving digital world.
                    </p>
                    <p className="text-base font-medium text-richblack-300 lg:w-[95%]">
                        As experienced educators ourselves, we witnessed firsthand the
                        limitations and challenges of traditional education systems. We
                        believed that education should not be confined to the walls of a
                        classroom or restricted by geographical boundaries. We
                        envisioned a platform that could bridge these gaps and empower
                        individuals from all walks of life to unlock their full
                        potential.
                    </p>
                </div>

                {/* right div  */}
                <div className='p-1 shadow-[0_0_20px_0] shadow-[#FC6767]'>
                    <img src={FoundingStory} alt='FoundingStoryImage'/>
                </div>
            </div>
        </div>

        <div className='w-[11/12] max-w-maxContent flex items-center justify-center mx-auto mb-14 '>
            <div className='w-full flex justify-between'>
                {/* left  */}
                <div className='flex flex-col w-[40%] gap-7'>
                    <h1 className='text-4xl bg-gradient-to-b from-[#FD1D1D] via-[#FCB045] to-[#215410] text-transparent bg-clip-text font-bold'>Our vision</h1>
                    <p className="text-base font-medium text-richblack-300 lg:w-[95%]">
                       With this vision in mind, we set out on a journey to create an
                       e-learning platform that would revolutionize the way people
                       learn. Our team of dedicated experts worked tirelessly to
                       develop a robust and intuitive platform that combines
                       cutting-edge technology with engaging content, fostering a
                       dynamic and interactive learning experience.
                    </p>
                </div>

                {/* right  */}
                <div className='flex flex-col w-[40%] gap-7'>
                    <h1 className='text-4xl font-bold bg-gradient-to-b from-[#1FA2FF] via-[#12D8FA] to-[#A6FFCB] bg-clip-text text-transparent'>Our Mission</h1>
                    <p className="text-base font-medium text-richblack-300 lg:w-[95%]">
                       Our mission goes beyond just delivering courses online. We wanted to create a vibrant community of learners, where individuals can connect, collaborate, and learn from one another. We believe that knowledge thrives in an environment of sharing and dialogue, and we foster this spirit of collaboration through forums, live sessions, and networking opportunities.
                    </p>
                </div>
            </div> 
        </div>
    </section>

    <section className='bg-richblack-700 w-full p-10'>
        <div className='w-[11/12] max-w-maxContent flex items-center mx-auto justify-evenly'>
            {
                data.map((content,index)=>{
                    return(
                        <div key={index} className='flex flex-col gap-1 items-center'>
                           <p className='font-bold text-3xl text-white'>{content.title}</p>
                           <p className='font-bold text-xl text-richblack-500'>{content.discription}</p>
                        </div>
                    )
                })
            } 
        </div>
    </section>

    {/* section-3  */}
    <section className='bg-richblack-900'>
        <div className='w-[11/12] max-w-maxContent flex flex-col items-center justify-center mx-auto mt-32 mb-10'>
          <LearningGrid/>
          <ContactFormSection/>
        </div>
    </section>

    {/* section-4 --->Add Footer*/}
    <section>

    </section>
    </div>
  )
}
