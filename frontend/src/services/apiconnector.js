import axios from "axios"

export const axiosInstance = axios.create({withCredentials: true, });

export const apiconnector = (method, url, bodyData, headers, params) => {
//   console.log(`Making API call to: ${url}`); // અહીં લોગ ઉમેરો
    return axiosInstance({
        method:`${method}`,
        url:`${url}`,
        data: bodyData ? bodyData : null,
        headers: headers ? headers: null,
        params: params ? params : null,
    });
}

// // src/services/apiconnector.js
// import axios from "axios";

// // Create axios instance
// export const axiosInstance = axios.create({
//   baseURL: process.env.REACT_APP_BASE_URL || "http://localhost:4000/api/v1", // Fallback if env is missing
// });

// // apiconnector function
// export const apiconnector = async (
//   method,
//   url,
//   bodyData = null,
//   headers = {},
//   params = {}
// ) => {
//   try {
//     // ✅ Validate URL
//     if (!url || typeof url !== "string") {
//       throw new Error(`Invalid URL passed to apiconnector: ${url}`);
//     }

//     // ✅ Make request
//     const response = await axiosInstance({
//       method,
//       url,
//       data: bodyData,
//       headers: {
//         "Content-Type": "application/json",
//         ...headers,
//       },
//       params,
//     });

//     return response;
//   } catch (error) {
//     console.error("❌ API Connector Error:", error);
//     throw error;
//   }
// };






































































































