import React from 'react'
import toast from 'react-hot-toast';
import { apiconnector } from '../apiconnector';
import {catalogData} from "../apis"

//aa backend ae /getCategoryPagedetails vada path no function/catalogPageDetails vada funcion ne call karse
export const getCatalogPageData = async(categoryId) => {
    //another wat to generate toast
    const toastId = toast.loading("Loading..")
    let result = [];
    try{
        //call function from backend
        //Fist way----> const response = await apiconnector("POST",CATALOGPAGEDATA_API,{categoryId:categoryId,});
        //second way--->niche ni line
        const response = await apiconnector("POST",catalogData.CATALOGPAGEDATA_API,{categoryId:categoryId,});
        console.log("Responce",response);
        // responce sucessful na made/response na data ma sucess na made to error throw kari do 
        if(!response?.data?.success)
        {
            throw new Error("Could not fetch category page data");
        }
        //aage response sucessfully madi jai to response ni ander data field ma aapda data/response show karo
        result = response?.data;

    }
    catch(error)
    {
        console.log("CATALOG PAGE DATA API ERROR...",error);
        // toast.error(error.message);
        toast.error(error?.response?.data?.message || "Something went wrong");

        result=error.response?.data
    }
    toast.dismiss(toastId)
    return result;
}
