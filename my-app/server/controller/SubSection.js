// Import necessary modules
const Section = require("../models/Section")
const SubSection = require("../models/SubSection")
const { uploadImageToCloudinary } = require("../utils/imageUploader")

// Create a new sub-section for a given section
exports.createSubSection = async (req, res) => {
  try {
    // Extract necessary information from the request body
    const { sectionId, title, description, videoUrl } = req.body
    const video = req.files ? req.files.video : null

    // Check if all necessary fields are provided
    if (!sectionId || !title || !description || (!video && !videoUrl)) {
      return res
        .status(404)
        .json({ success: false, message: "All Fields are Required including Video File or Link" })
    }

    let dbVideoUrl = "";
    let timeDuration = "0";

    if (video) {
        // Upload the video file to Cloudinary
        console.log("Video",video);
        const uploadDetails = await uploadImageToCloudinary(
            video,
            process.env.FOLDER_NAME
        )
        console.log("Upload Details:", uploadDetails);
        dbVideoUrl = uploadDetails.secure_url;
        timeDuration = `${uploadDetails.duration}`;
    } else if (videoUrl) {
        // Use external video url (like YouTube)
        console.log("Using external video URL:", videoUrl);
        dbVideoUrl = videoUrl;
        timeDuration = "0"; // Default duration since it's an external link
    }

    // Create a new sub-section with the necessary information
    const SubSectionDetails = await SubSection.create({
      title: title,
      timeDuration: timeDuration,
      description: description,
      videoUrl: dbVideoUrl,
    })

    // Update the corresponding section with the newly created sub-section
    const updatedSection = await Section.findByIdAndUpdate(
      { _id: sectionId },
      { $push: { subSection: SubSectionDetails._id } },
      { new: true }
    ).populate("subSection")

    // Return the updated section in the response
    return res.status(200).json({ success: true, data: updatedSection })
  } catch (error) {
    // Handle any errors that may occur during the process
    console.error("Error creating new sub-section:", error)
    return res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    })
  }
}

exports.updateSubSection = async (req, res) => {
  try {
    const { sectionId, subSectionId, title, description } = req.body
    const subSection = await SubSection.findById(subSectionId)

    if (!subSection) {
      return res.status(404).json({
        success: false,
        message: "SubSection not found",
      })
    }

    if (title !== undefined) {
      subSection.title = title
    }

    if (description !== undefined) {
      subSection.description = description
    }
    
    // Check if new video file is uploaded
    if (req.files && req.files.video !== undefined) {
      const video = req.files.video
      const uploadDetails = await uploadImageToCloudinary(
        video,
        process.env.FOLDER_NAME
      )
      subSection.videoUrl = uploadDetails.secure_url
      subSection.timeDuration = `${uploadDetails.duration}`
    } 
    // Otherwise check if a new external videoUrl (like YouTube) is provided
    else if (req.body.videoUrl !== undefined) {
      subSection.videoUrl = req.body.videoUrl;
      subSection.timeDuration = "0";
    }

    await subSection.save()

    // find updated section and return it
    const updatedSection = await Section.findById(sectionId).populate(
      "subSection"
    )

    console.log("updated section", updatedSection)

    return res.json({
      success: true,
      message: "Section updated successfully",
      data: updatedSection,
    })
  } catch (error) {
    console.error(error)
    return res.status(500).json({
      success: false,
      message: "An error occurred while updating the section",
    })
  }
}

exports.deleteSubSection = async (req, res) => {
  try {
    const { subSectionId, sectionId } = req.body
    await Section.findByIdAndUpdate(
      { _id: sectionId },
      {
        $pull: {
          subSection: subSectionId,
        },
      }
    )
    const subSection = await SubSection.findByIdAndDelete({ _id: subSectionId })

    if (!subSection) {
      return res
        .status(404)
        .json({ success: false, message: "SubSection not found" })
    }

    // find updated section and return it
    const updatedSection = await Section.findById(sectionId).populate(
      "subSection"
    )

    return res.json({
      success: true,
      message: "SubSection deleted successfully",
      data: updatedSection,
    })
  } catch (error) {
    console.error(error)
    return res.status(500).json({
      success: false,
      message: "An error occurred while deleting the SubSection",
    })
  }
}











































































// const { request,response } = require("express");
// const SubSection = require("../models/SubSection");
// const Section = require("../models/Section")
// const {uploadImageToCloudinary} = require("../utils/imageUploader")

// require("dotenv").config();

// // NOTE: je pn model ni ande aapde SubSection no ref store karyo hase te badha mode ne aai import karo...
// //aai aapde khali Section ma j subSection no use karyo hato aathi aai khali course model ne j import karyu che..
// //aam aapde object no ref pass karyo che sSubSection ne Section ni ander..
// //aathi aapde section ni Id (sectionId) fetch kari tema puch karavi devani SubSectionId..by using following syntax

// exports.createSubSection = async(request,response)=>{
//     try{

//         //fetch data from request ki body
//         const {title,timeDuration, description,sectionId} = request.body;

//         //fetch file(for videoUrl)
//         const video = request.files.videoFile;
//         console.log("Video",video);
//         //validation
//         if(!title || !timeDuration || !description || !video  || !sectionId)
//         {
//             return response.status(401).json({
//             success:false,
//             message:"All fields are required",
//             });
//         }

//         //upload video to coludinart
//         const uploadDetails = await uploadImageToCloudinary(video,process.env.FOLFER_NAME)

//         //create subsection
//          const SubSectionDetails = await SubSection.create({
//             title:title,
//             timeDuration:timeDuration,
//             description:description,
//             videoUrl:uploadDetails.secure_url,
//         })

//        //update section with this Subsection
//        const updateSection = await Section.findByIdAndUpdate({_id:sectionId},{
//                                 $push:{
//                                     subSection:SubSectionDetails._id,
//                                 }
//        },{new:true});

//         const updatedSectionShow = await Section.findById(sectionId).populate("subSection") 

//        //return response
//         return response.status(200).json({
//             success:true,
//             message:"Sub-Section Created Successfully",
//             data:updatedSectionShow
//         });
    
//     }
//     catch(error)
//     {
//         return response.status(500).json({
//             success:false,
//             message:"Internal Server Error",
//             error:error.message
//         });
//     }
// }







// //update Subsection
// //aa original code che je vs code ma run thai che.
// // exports.updateSubSection = async(request,response)=>{
// // try{

// //         //fetch data from request ki body
// //         const {title,timeDuration, description,subSectionId} = request.body;
// //         //fetch file
// //         const video = request.files.videoFile;

// //         //upload file to cloudinary
// //         const uploadDetails = await uploadImageToCloudinary(video,process.env.FOLFER_NAME);
// //         //validation
// //         if(!title || !timeDuration || !description || !video || !subSectionId )
// //         {
// //             return response.status(400).json({
// //             success:false,
// //             message:"All fields are required",
// //             });
// //         }

// //         //update SunSection
// //         const subSection = await SubSection.findByIdAndUpdate(subSectionId,{
// //                 title,
// //                 timeDuration,
// //                 description,
// //                 videoUrl: uploadDetails.secure_url,
// //             },{new:true});

// //         //return responce
// //         return response.status(200).json({
// //             success:true,
// //             message:"Sub-Section Updated Successfully",
// //             data:subSection
// //         });
// //     }
// //     catch(error)
// //     {
// //         return response.status(500).json({
// //             success:false,
// //             message:"Something went Wrong",
// //             error:error.message,
// //         });
// //     }    
// // }


// exports.updateSubSection = async (req, res) => {
//   try {
//     const { sectionId, subSectionId, title, description } = req.body
//     const subSection = await SubSection.findById(subSectionId)

//     if (!subSection) {
//       return res.status(404).json({
//         success: false,
//         message: "SubSection not found",
//       })
//     }

//     if (title !== undefined) {
//       subSection.title = title
//     }

//     if (description !== undefined) {
//       subSection.description = description
//     }
//     if (req.files && req.files.video !== undefined) {
//       const video = req.files.video
//       const uploadDetails = await uploadImageToCloudinary(
//         video,
//         process.env.FOLDER_NAME
//       )
//       subSection.videoUrl = uploadDetails.secure_url
//       subSection.timeDuration = `${uploadDetails.duration}`
//     }

//     await subSection.save()

//     // find updated section and return it
//     const updatedSection = await Section.findById(sectionId).populate(
//       "subSection"
//     )

//     console.log("updated section", updatedSection)

//     return res.json({
//       success: true,
//       message: "Section updated successfully",
//       data: updatedSection,
//     })
//   } catch (error) {
//     console.error(error)
//     return res.status(500).json({
//       success: false,
//       message: "An error occurred while updating the section",
//     })
//   }
// }


// //delete SubSection
// //aa original code che je vs code ma run thai che.
// // exports.deleteSubSection = async(request,response)=>{
// //     try{
// //     const {subSectionId} = request.body;

// //     if(!subSectionId)
// //     {
// //          return response.status(400).json({
// //             success:false,
// //             message:"All fields are required",
// //         });
// //     }

// //     //detelte sunSection
// //     const subSection = await SubSection.findByIdAndDelete(subSectionId)

// //     //retuen responce
// //     return response.status(200).json({
// //             success:true,
// //             message:"Sub-Section Deleted Successfully",
    
// //         });
// //     }
// //     catch(error)
// //     {
// //         return response.status(500).json({
// //             success:false,
// //             message:"Something went Wrong",
// //             error:error.message,
// //         });
// //     }    
// // }



// exports.deleteSubSection = async(request,response)=>{
//     try{
//     const {subSectionId,sectionId} = request.body;

//     if(!subSectionId)
//     {
//          return response.status(400).json({
//             success:false,
//             message:"All fields are required",
//         });
//     }

//     //detelte sunSection
//     const subSection = await SubSection.findByIdAndDelete(subSectionId)

//     if(!subSection)
//     {
//         return response.status(404).json(
//             {
//             success:false,
//             message:"SubSection Not Found"
//         })
//     }

//     const updatedSection = await Section.findById(sectionId).populate("subSection")


//     //retuen responce
//     return response.status(200).json({
//             success:true,
//             data:updatedSection,
//             message:"Sub-Section Deleted Successfully"
//         });
//     }
//     catch(error)
//     {
//         return response.status(500).json({
//             success:false,
//             message:"Something went Wrong",
//             error:error.message,
//         });
//     }    
// }


































































































// Import necessary modules
// const Section = require("../models/Section")
// const SubSection = require("../models/SubSection")
// const { uploadImageToCloudinary } = require("../utils/imageUploader")

// // Create a new sub-section for a given section
// // exports.createSubSection = async (req, res) => {
// //   try {
// //     // Extract necessary information from the request body
// //     const { sectionId, title, description } = req.body
// //     const video = req.files.video

// //     // Check if all necessary fields are provided
// //     if (!sectionId || !title || !description || !video) {
// //       return res
// //         .status(404)
// //         .json({ success: false, message: "All Fields are Required" })
// //     }
// //     console.log(video)

// //     // Upload the video file to Cloudinary
// //     const uploadDetails = await uploadImageToCloudinary(
// //       video,
// //       process.env.FOLDER_NAME
// //     )
// //     console.log(uploadDetails)
// //     // Create a new sub-section with the necessary information
// //     const SubSectionDetails = await SubSection.create({
// //       title: title,
// //       timeDuration: `${uploadDetails.duration}`,
// //       description: description,
// //       videoUrl: uploadDetails.secure_url,
// //     })

// //     // Update the corresponding section with the newly created sub-section
// //     const updatedSection = await Section.findByIdAndUpdate(
// //       { _id: sectionId },
// //       { $push: { subSection: SubSectionDetails._id } },
// //       { new: true }
// //     ).populate("subSection")

// //     // Return the updated section in the response
// //     return res.status(200).json({ success: true, data: updatedSection })
// //   } catch (error) {
// //     // Handle any errors that may occur during the process
// //     console.error("Error creating new sub-section:", error)
// //     return res.status(500).json({
// //       success: false,
// //       message: "Internal server error",
// //       error: error.message,
// //     })
// //   }
// // }

// // exports.createSubSection = async(request,response)=>{
// //     try{

// //         //fetch data from request ki body
// //         const {title,timeDuration, description,sectionId} = request.body;

// //         //fetch file(for videoUrl)
// //         const video = request.files.video;
// //         console.log("Video",video);
// //         //validation
// //         if(!title || !timeDuration || !description || !video  || !sectionId)
// //         {
// //             return response.status(401).json({
// //             success:false,
// //             message:"All fields are required",
// //             });
// //         }

// //         //upload video to coludinart
// //         const uploadDetails = await uploadImageToCloudinary(video,process.env.FOLFER_NAME)

// //         //create subsection
// //          const SubSectionDetails = await SubSection.create({
// //             title:title,
// //             timeDuration:timeDuration,
// //             description:description,
// //             videoUrl:uploadDetails.secure_url,
// //         })

// //        //update section with this Subsection
// //        const updateSection = await Section.findByIdAndUpdate({_id:sectionId},{
// //                                 $push:{
// //                                     subSection:SubSectionDetails._id,
// //                                 }
// //        },{new:true});

// //         const updatedSectionShow = await Section.findById(sectionId).populate("subSection") 

// //        //return response
// //         return response.status(200).json({
// //             success:true,
// //             message:"Sub-Section Created Successfully",
// //             data:updatedSectionShow
// //         });
    
// //     }
// //     catch(error)
// //     {
// //         return response.status(500).json({
// //             success:false,
// //             message:"Internal Server Error",
// //             error:error.message
// //         });
// //     }
// // }

// exports.updateSubSection = async (req, res) => {
//   try {
//     const { sectionId, subSectionId, title, description } = req.body
//     const subSection = await SubSection.findById(subSectionId)

//     if (!subSection) {
//       return res.status(404).json({
//         success: false,
//         message: "SubSection not found",
//       })
//     }

//     if (title !== undefined) {
//       subSection.title = title
//     }

//     if (description !== undefined) {
//       subSection.description = description
//     }
//     if (req.files && req.files.video !== undefined) {
//       const video = req.files.video
//       const uploadDetails = await uploadImageToCloudinary(
//         video,
//         process.env.FOLDER_NAME
//       )
//       subSection.videoUrl = uploadDetails.secure_url
//       subSection.timeDuration = `${uploadDetails.duration}`
//     }

//     await subSection.save()

//     // find updated section and return it
//     const updatedSection = await Section.findById(sectionId).populate(
//       "subSection"
//     )

//     console.log("updated section", updatedSection)

//     return res.json({
//       success: true,
//       message: "Section updated successfully",
//       data: updatedSection,
//     })
//   } catch (error) {
//     console.error(error)
//     return res.status(500).json({
//       success: false,
//       message: "An error occurred while updating the section",
//     })
//   }
// }

// exports.deleteSubSection = async (req, res) => {
//   try {
//     const { subSectionId, sectionId } = req.body
//     await Section.findByIdAndUpdate(
//       { _id: sectionId },
//       {
//         $pull: {
//           subSection: subSectionId,
//         },
//       }
//     )
//     const subSection = await SubSection.findByIdAndDelete({ _id: subSectionId })

//     if (!subSection) {
//       return res
//         .status(404)
//         .json({ success: false, message: "SubSection not found" })
//     }

//     // find updated section and return it
//     const updatedSection = await Section.findById(sectionId).populate(
//       "subSection"
//     )

//     return res.json({
//       success: true,
//       message: "SubSection deleted successfully",
//       data: updatedSection,
//     })
//   } catch (error) {
//     console.error(error)
//     return res.status(500).json({
//       success: false,
//       message: "An error occurred while deleting the SubSection",
//     })
//   }
// }
// exports.createSubSection = async (req, res) => {
//   try {
//     // extract data
//     const { sectionId, title, description } = req.body;
//     const video = req.files.video;

//     // Validate data
//     if (!sectionId || !title || !description || !video) {
//       return res.status(404).json({
//         success: false,
//         message: "All fields are required",
//       });
//     }

//     // Upload video to Cloudinary
//     const uploadDetails = await uploadImageToCloudinary(
//       video,
//       process.env.FOLDER_NAME
//     );

//     // Create SubSection in DB
//     const subSectionDetails = await SubSection.create({
//       title,
//       description,
//       videoUrl: uploadDetails.secure_url,
//     });

//     // Add SubSection to Section
//     const updatedSection = await Section.findByIdAndUpdate(
//       sectionId,
//       { $push: { subSection: subSectionDetails._id } },
//       { new: true }
//     ).populate("subSection");

//     return res.status(200).json({
//       success: true,
//       message: "SubSection Created Successfully",
//       data: updatedSection,
//     });

//   } catch (err) {
//     console.error("Error while creating subsection:", err.message);
//     return res.status(500).json({
//       success: false,
//       message: "Internal server error while creating subsection",
//     });
//   }
// };



























