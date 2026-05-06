const { request, response } = require("express");
const Contact = require("../models/Contact");


exports.createContact = async(request,response)=>{
try{
const {firstname , lastname , email,mobileNo,message}= request.body;

if(!firstname ||!lastname || !email || !mobileNo || !message )
{
    return response.status(400).json({
        success:false,
        message:"All fields are required",
    })
}

const createContact = await Contact.create({
    firstname:firstname,
    lastname:lastname,
    mobileNo:mobileNo,
    email:email,
    message:message,
})

console.log("Response",createContact);

return response.status(200).json({
    success:true,
    message:"Contact create Successfully"
})
}
catch(erro){
return response.status(500).json({
    success:false,
    error:erro.message,
    message:"All fields are required"
})
}
}


// const { request, response } = require("express");
// const Contact = require("../models/Contact");

// exports.createContact = async (request, response) => {
//   try {
//     const { firstname, lastname, email, mobileNo, message } = request.body;

//     // ✅ Basic Validation
//     if (!firstname || !lastname || !email || !mobileNo || !message) {
//       return response.status(400).json({
//         success: false,
//         message: "All fields are required",
//       });
//     }

//     // ✅ Create contact entry in MongoDB
//     const createContact = await Contact.create({
//       firstname,
//       lastname,
//       email,
//       mobileNo,
//       message,
//     });

//     console.log("Contact Created:", createContact);

//     return response.status(200).json({
//       success: true,
//       message: "Contact created successfully",
//       data: createContact, // Optional: return created object
//     });
//   } catch (error) {
//     console.error("Error creating contact:", error);

//     return response.status(500).json({
//       success: false,
//       message: "Something went wrong while creating contact",
//       error: error.message,
//     });
//   }
// };
