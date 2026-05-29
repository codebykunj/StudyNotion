import React from 'react'
import {Button} from "../HomePage/Button"
import { TypeAnimation } from "react-type-animation";

export const CodeBlocks  = ({heading,subHeading,CTAbtn1,CTAbtn2,codeblock ,codetextcolor,position}) => {
  return (

    //bija box jode jode aave che animation code vada tene mate gap-10 ni value niche na div ma set karo
    <div className={`w-full flex ${position} gap-10 my-12 justify-between`}>
    {/* first div */}
    <div className= "w-[100%] flex flex-col gap-8">
        <h1>{heading}</h1>

        <div className='text-richblack-300 text-base font-bold w-[60%] -mt-3'>
            {subHeading}
        </div>
        <div className='flex flex-row gap-7 mt-7'>
        <Button active={CTAbtn1.active} linkto={CTAbtn1.linkto}>{CTAbtn1.text}</Button>
        <Button active={CTAbtn2.active} linkto={CTAbtn2.linkto}>{CTAbtn2.text}</Button>
        </div>
    </div>

    {/* section-2 */}
    <div className='w-[100%] flex flex-row h-fit text-[10px]  border border-richblack-400'>
    <div className=' w-[10%] flex flex-col text-center text-richblack-400 font-inter font-bold'>
    <p>1</p>
    <p>2</p>
    <p>3</p>
    <p>4</p>
    <p>5</p>
    <p>6</p>
    <p>7</p>
    <p>8</p>
    <p>9</p>
    <p>10</p>
    <p>11</p>
    <p>12</p>
    <p>13</p>
    <p>14</p>
    </div>

    <div className={`w-[90%] flex flex-col gap-2 font-bold font-mono  ${codetextcolor}`}>
      <TypeAnimation 
        sequence={[codeblock,1000,""]}
        cursor={true}
        repeat={Infinity}
        style={
            {
                whiteSpace:"pre-line",
                display:"block",
            }
        }
        omitDeletionAnimation={true}    
      />  
    </div>     
    </div>

   
    </div>
  )
}
