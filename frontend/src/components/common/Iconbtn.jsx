// import React, { Children } from 'react'

// export const Iconbtn = ({text,onClick,children,disabled,outline=false,customClasses,type}) => {
//   return (
//     <div>
//         <button disabled={disabled} onClick={onclick} type={type}>
//             {
//                 //aagar childeren hoi/true hoi to koi action perform thase and chidren false hoi to pn koi action perform thase
//                 children ? (
//                 <>
//                    <span>
//                        {text}
//                    </span>
//                    {Children}
//                 </>) : (text)
//             }
//         </button>
//     </div>
//   )
// }


export const Iconbtn = ({
  text,
  onClick,
  children,
  disabled,
  outline = false,
  customClasses = "",
  type = "button",
}) => {
  return (
    <button
      disabled={disabled}
      onClick={onClick}
      className={`flex items-center ${
        outline ? "border border-yellow-50 bg-transparent" : "bg-yellow-50"
      } cursor-pointer gap-x-2 rounded-md py-2 px-5 font-semibold text-richblack-900 ${customClasses}`}
      type={type}
    >
      {children ? (
        <>
          <span className={`${outline ? "text-yellow-50" : ""}`}>{text}</span>
          {children}
        </>
      ) : (
        text
      )}
    </button>
  );
};
