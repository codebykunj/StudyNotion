import React from 'react';
import Logo1 from "../../../assets/TimeLineLogo/Logo1.svg";
import Logo2 from "../../../assets/TimeLineLogo/Logo2.svg";
import Logo3 from "../../../assets/TimeLineLogo/Logo3.svg";
import Logo4 from "../../../assets/TimeLineLogo/Logo4.svg";
import TimeLineImage from "../../../assets/Images/TimelineImage.png";

const Timeline = [
  {
    Logo: Logo1,
    Heading: "Leadership",
    Description: "Fully committed to the success company",
  },
  {
    Logo: Logo2,
    Heading: "Responsibility",
    Description: "Fully committed to the success company",
  },
  {
    Logo: Logo3,
    Heading: "Flexibility",
    Description: "Fully committed to the success company",
  },
  {
    Logo: Logo4,
    Heading: "Solve the Problem",
    Description: "Fully committed to the success company",
  },
];

export const TimelineSection = () => {
  return (
    <div className='flex flex-row w-11/12 max-w-maxContent justify-between items-start'>
      {/* Left Timeline */}
      <div className='flex flex-col gap-y-10'>
        {Timeline.map((element, index) => (
          <div key={index} className='flex flex-row gap-4'>
            <div className='flex flex-col justify-center items-center shadow-[0_0_62px_0_#00000012]'>
              <img src={element.Logo} alt={element.Heading} className='w-[52px] h-[52px] bg-white rounded-full ' />
              {/* <div className={`block ${Timeline.length-1 === index ? "hidden":"block"} w-[1px] h-[80px] border border-richblack-200 mt-14 `}></div> */}
              
                {/* <div
                  className={`hidden ${
                    Timeline.length - 1 === index ? "hidden" : "lg:block"
                  }  h-14 border-dotted border border-richblack-100 bg-richblack-400/0 w-[1px] mt-2 items-center`}
                ></div> */}

                <div className={`block ${Timeline.length-1 === index ? "hidden" :"block"} h-14 border-dotted border border-richblack-100 first-letter:first-line:marker:w-[1px] mt-4 items-cen`}></div>
              
            </div>
            <div>
              <p className='font-semibold text-[18px]'>{element.Heading}</p>
              <p className='text-base'>{element.Description}</p>
            </div>
          </div>
          
        ))}
      </div>

      {/* Right Image and Stats */}
      <div className='h-fit relative'>
        <img
          src={TimeLineImage}
          alt='Timeline visual'
          className='w-fit h-fit bg-no-repeat'
        />

        <div className='w-[600px] h-[50px] bg-caribbeangreen-600 rounded-lg flex flex-row justify-between items-center px-4 mt-4 text-white font-semibold absolute top-[435px] right-14 p-20'>
          <div className='flex flex-row items-center'>
            <span className='text-4xl text-white font-bold m-10'>10</span>

            {/* <div className='flex flex-col'></div> */}
            <span className='w-[20%] text-caribbeangreen-5  uppercase text-xl'>Years Experience</span>
            <div className='w-[1px] h-[70px] border border-pure-greys-100 ml-10'></div>
            <span className='text-4xl text-white font-bold m-10' >250</span>
            <span className='w-[20%] text-caribbeangreen-5  uppercase text-xl'>Types of Courses</span>
          </div>
        </div>
      </div>
    </div>
  );
};
