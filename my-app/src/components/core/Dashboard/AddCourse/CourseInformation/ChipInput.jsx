// import React, { useEffect, useState } from 'react';
// import { useSelector } from 'react-redux';
// import { MdClose } from 'react-icons/md';

// export const ChipInput = ({
//   label,
//   name,
//   placeholder,
//   setValue,
//   register,
//   errors,
// }) => {
//   const { editCourse, course } = useSelector((state) => state.course);
//   const [chips, setChips] = useState([]);

//   // Register and prefill chips in edit mode
//   useEffect(() => {
//     register(name, { required: true, validate: (value) => value.length > 0 });

//     if (editCourse && course?.tag?.length > 0) {
//       setChips(course.tag);
//       setValue(name, course.tag);
//     }
//   }, [editCourse, course, name, register, setValue]);

//   // Sync form value on every chip change
//   useEffect(() => {
//     setValue(name, chips);
//   }, [chips, name, setValue]);

//   // Handle Enter / , key press
//   const handleKeyDown = (event) => {
//     if (event.key === 'Enter' || event.key === ',') {
//       event.preventDefault();
//       const value = event.target.value.trim();
//       if (value && !chips.includes(value)) {
//         setChips((prev) => [...prev, value]);
//         event.target.value = '';
//       }
//     }
//   };

//   const handleDeleteChip = (index) => {
//     const updated = chips.filter((_, i) => i !== index);
//     setChips(updated);
//   };

//   return (
//     <div className="flex flex-col space-y-2">
//       {label && (
//         <label htmlFor={name} className="text-sm text-richblack-5">
//           {label} <sup className="text-pink-200">*</sup>
//         </label>
//       )}

//       {/* Chips display */}
//       <div className="flex w-full flex-wrap gap-2">
//         {chips.map((chip, index) => (
//           <div
//             key={index}
//             className="flex items-center bg-yellow-400 text-richblack-5 px-2 py-1 rounded-full text-sm m-1"
//           >
//             {chip}
//             <button
//               type="button"
//               className="ml-2 focus:outline-none"
//               onClick={() => handleDeleteChip(index)}
//             >
//               <MdClose className="text-sm" />
//             </button>
//           </div>
//         ))}
//       </div>

//       {/* Input for new chip */}
//       <input
//         type="text"
//         id={name}
//         name={name}
//         placeholder={placeholder || 'Enter tag and press Enter'}
//         onKeyDown={handleKeyDown}
//         className="form-style w-full px-3 py-2 mt-1 rounded-md bg-richblack-800 text-white outline-none"
//       />

//       {/* Error message */}
//       {errors[name] && (
//         <span className="ml-2 text-xs tracking-wide text-pink-200">
//           {label} is required
//         </span>
//       )}
//     </div>
//   );
// };


import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { MdClose } from 'react-icons/md';

export const ChipInput = ({
  label,
  name,
  placeholder,
  setValue,
  register,
  errors,
}) => {
  const { editCourse, course } = useSelector((state) => state.course);
  const [chips, setChips] = useState([]);

  // Register and prefill chips in edit mode
  useEffect(() => {
    register(name, { required: true, validate: (value) => value.length > 0 });

    if (editCourse && course?.tag?.length > 0) {
      setChips(course.tag);
      setValue(name, course.tag);
    }
  }, [editCourse, course, name, register, setValue]);

  // Sync form value on every chip change
  useEffect(() => {
    setValue(name, chips);
  }, [chips, name, setValue]);

  // Handle Enter / , key press
  const handleKeyDown = (event) => {
    if (event.key === 'Enter' || event.key === ',') {
      event.preventDefault();
      const value = event.target.value.trim();
      if (value && !chips.includes(value)) {
        setChips((prev) => [...prev, value]);
        event.target.value = '';
      }
    }
  };

  const handleDeleteChip = (index) => {
    const updated = chips.filter((_, i) => i !== index);
    setChips(updated);
  };

  return (
    <div className="flex flex-col space-y-2">
      {label && (
        <label htmlFor={name} className="text-sm text-richblack-5">
          {label} <sup className="text-pink-200">*</sup>
        </label>
      )}

      {/* Chips display */}
      <div className="flex w-full flex-wrap gap-2">
        {chips.map((chip, index) => (
          <div
            key={index}
            className="flex items-center bg-yellow-400 text-richblack-5 px-2 py-1 rounded-full text-sm m-1"
          >
            {chip}
            <button
              type="button"
              className="ml-2 focus:outline-none"
              onClick={() => handleDeleteChip(index)}
            >
              <MdClose className="text-sm" />
            </button>
          </div>
        ))}
      </div>

      {/* Input for new chip */}
      <input
        type="text"
        id={name}
        name={name}
        placeholder={placeholder || 'Enter tag and press Enter'}
        onKeyDown={handleKeyDown}
        className="form-style w-full px-3 py-2 mt-1 rounded-md bg-richblack-800 text-white border border-richblack-300 focus:outline-none focus:ring-2 focus:ring-yellow-300 focus:border-yellow-300"
      />

      {/* Error message */}
      {errors[name] && (
        <span className="ml-2 text-xs tracking-wide text-pink-200">
          {label} is required
        </span>
      )}
    </div>
  );
};
