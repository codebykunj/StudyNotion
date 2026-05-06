// import React, { Children } from 'react'
// import { useSelector } from 'react-redux'
// import { Navigate } from 'react-router-dom';

// export const PrivateRoute = () => {
//     //PrivateRoute ma aapde aevi condition apply karvani ke je user Longin hase
//     //te j aa PrivateRoute ni ander rahelo component access kari sakse...

//     //OpenRoue ni ander rahelo component non-Login user pn access kari sakse...
//     const {token} = useSelector((state)=>state.auth);

//     if(token != null)
//         return Children
//     else
//         return <Navigate to="/login"/> 

  
// }
import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

export const PrivateRoute = ({ children }) => {
    const { token } = useSelector((state) => state.auth);

    if (token != null) {
        return children;  // children render karo, React elements
    } else {
        return <Navigate to="/login" />;
    }
};
