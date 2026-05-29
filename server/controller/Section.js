const Section = require("../models/Section");
const Course = require("../models/Course");
const SubSection = require("../models/SubSection");
// CREATE a new section
exports.createSection = async (req, res) => {
	try {
		// Extract the required properties from the request body
		const { sectionName, courseId } = req.body;

		// Validate the input
		if (!sectionName || !courseId) {
			return res.status(400).json({
				success: false,
				message: "Missing required properties",
			});
		}

		// Create a new section with the given name
		const newSection = await Section.create({ sectionName });

		// Add the new section to the course's content array
		const updatedCourse = await Course.findByIdAndUpdate(
			courseId,
			{
				$push: {
					courseContent: newSection._id,
				},
			},
			{ new: true }
		)
			.populate({
				path: "courseContent",
				populate: {
					path: "subSection",
				},
			})
			.exec();

		// Return the updated course object in the response
		res.status(200).json({
			success: true,
			message: "Section created successfully",
			updatedCourse,
		});
	} catch (error) {
		// Handle errors
		res.status(500).json({
			success: false,
			message: "Internal server error",
			error: error.message,
		});
	}
};

// UPDATE a section
exports.updateSection = async (req, res) => {
	try {
		const { sectionName, sectionId,courseId } = req.body;
		const section = await Section.findByIdAndUpdate(
			sectionId,
			{ sectionName },
			{ new: true }
		);

		const course = await Course.findById(courseId)
		.populate({
			path:"courseContent",
			populate:{
				path:"subSection",
			},
		})
		.exec();

		res.status(200).json({
			success: true,
			message: section,
			data:course,
		});
	} catch (error) {
		console.error("Error updating section:", error);
		res.status(500).json({
			success: false,
			message: "Internal server error",
		});
	}
};

// DELETE a section
exports.deleteSection = async (req, res) => {
	try {

		const { sectionId, courseId }  = req.body;
		await Course.findByIdAndUpdate(courseId, {
			$pull: {
				courseContent: sectionId,
			}
		})
		const section = await Section.findById(sectionId);
		console.log(sectionId, courseId);
		if(!section) {
			return res.status(404).json({
				success:false,
				message:"Section not Found",
			})
		}

		//delete sub section
		await SubSection.deleteMany({_id: {$in: section.subSection}});

		await Section.findByIdAndDelete(sectionId);

		//find the updated course and return 
		const course = await Course.findById(courseId).populate({
			path:"courseContent",
			populate: {
				path: "subSection"
			}
		})
		.exec();

		res.status(200).json({
			success:true,
			message:"Section deleted",
			data:course
		});
	} catch (error) {
		console.error("Error deleting section:", error);
		res.status(500).json({
			success: false,
			message: "Internal server error",
		});
	}
};   

















// //MTMP NOTES Please READ

// // NOTE: je pn model ni ande aapde Section no ref store karyo hase te badha mode ne aai import karo...
// //aai aapde khali Course ma j Section model no use karyo hato aathi aai khali course model ne j import karyu che..
// //aam aapde object no ref pass karyo che Section ne Course ni ander..
// //aathi aapde Course ni Id (courseId) fetch kari tema puch karavi devani SectionId..by using following syntax..le dield mate Section no ref(refarance) store karyo hoi te filled ma sectionId(newSection._id) ne push karo..
// //for example me Course midel ni ander courseContent field ma Section ne as ref(refrance) store karyo che...aathi hu section ni Id pn courseContent vadi field ma push karis..
// // const updateCourseDetaiils = await Course.findByIdAndUpdate(courseId,{
// //         $push:{
// //             courseContent:newSection._id,
// //         }
// //     },{new:true}).populates("Course").exec();



// // CODE Follow to easily understand
// //fetch course id
// // const {sectionName,courseId} = request.body;

//  //create section
//     // const newSection = await Section.create({sectionName})
//     // console.log(newSection)

//   //aai Section hamnaj create karyo che and section create kari newSwction ma store karyo che..
// //   aathi newSection ma j aapda Section ni Id store thase..aathi section ni id fetch karva newSection._id ne push kari che..  




// const Section = require("../models/Section")
// const Course = require("../models/Course")
// const { request, response } = require("express")
// //aa maro original code che je postman ma run thai che...
// exports.createSection = async(request,response)=>{
//    try{
//  //create section
//     // const userId = request.user.id;
//     const {sectionName,courseId} = request.body;

//     if(!sectionName || !courseId)
//     {
//         return response.status(400).json({
//             success:false,
//             message:"All fields are required",
//         });
//     }

//     //create section
//     const newSection = await Section.create({sectionName})
//     console.log(newSection)

//     //update subsection/updateCourse..because subsection is course
//     //update course with section ObjectID
//     const updateCourseDetaiils = await Course.findByIdAndUpdate(courseId,{
//         $push:{
//             courseContent:newSection._id,
//         }
//     },{new:true}).populate({
//         path:"courseContent",
//         populate:
//         {
//             path:"subSection",

//         },}).exec();

//     //line 28:.populates("Course").exec();   aa mari jate lakhyu che jo error aave to tene tame remove kari sako cho
//     //H.W------>use populate to replace section/sub-section both in updatedCourseDetails
    

//     //return responce
//     return response.status(200).json({
//         success:true,
//         message:"Section Created Successfully",
//         data:updateCourseDetaiils,
//     })
//    }
//    catch(error)
//    {
//     return response.status(500).json({
//         success:false,
//         message:"Unable to create Section....Please try again"
//     })
//    }
// }
// // exports.createSection = async (req, res) => {
// // 	try {
// // 		// Extract the required properties from the request body
// // 		const { sectionName, courseId } = req.body;

// // 		// Validate the input
// // 		if (!sectionName || !courseId) {
// // 			return res.status(400).json({
// // 				success: false,
// // 				message: "Missing required properties",
// // 			});
// // 		}

// // 		// Create a new section with the given name
// // 		const newSection = await Section.create({ sectionName });

// // 		// Add the new section to the course's content array
// // 		const updatedCourse = await Course.findByIdAndUpdate(
// // 			courseId,
// // 			{
// // 				$push: {
// // 					courseContent: newSection._id,
// // 				},
// // 			},
// // 			{ new: true }
// // 		)
// // 			.populate({
// // 				path: "courseContent",
// // 				populate: {
// // 					path: "subSection",
// // 				},
// // 			})
// // 			.exec();

// // 		// Return the updated course object in the response
// // 		res.status(200).json({
// // 			success: true,
// // 			message: "Section created successfully",
// // 			updatedCourse,
// // 		});
// // 	} catch (error) {
// // 		// Handle errors
// // 		res.status(500).json({
// // 			success: false,
// // 			message: "Internal server error",
// // 			error: error.message,
// // 		});
// // 	}
// // };

// // exports.createSection = async (request, response) => {
// //   try {
// //     const { sectionName, courseId } = request.body;

// //     // Validate input
// //     if (!sectionName || !courseId) {
// //       return response.status(400).json({
// //         success: false,
// //         message: "All fields are required",
// //       });
// //     }

// //     // Create new section
// //     const newSection = await Section.create({ sectionName });
// //     console.log("NewSection",newSection);

// //     // Update course with the new section
// //     const updateCourseDetaiils = await Course.findByIdAndUpdate(
// //       courseId,
// //       {
// //         $push: {
// //           courseContent: newSection._id,
// //         },
// //       },
// //       { new: true }
// //     )
// //       .populate("courseContent") // Replace with actual field name if different
// //       .exec();

// //     return response.status(200).json({
// //       success: true,
// //       message: "Section Created Successfully",
// //       updateCourseDetaiils,
// //     });
// //   } catch (error) {
// //     console.error("Error creating section:", error);
// //     return response.status(500).json({
// //       success: false,
// //       message: "Unable to create Section....Please try again",
// //     });
// //   }
// // };







// exports.updateSection = async(request,response)=>{
//     try{
//     //fetch data
//     const {sectionName,sectionId,courseId} = request.body;

//     if(!sectionId && !sectionName)
//     {
//         return response.status(401).json({
//             success:false,
//             message:"All fields are required",
//         });  
//     }

//     //upadate Section 
//     const section = await Section.findByIdAndUpdate(sectionId,{sectionName},{new:true});
//     console.log(section)

//     const course = await Course.findById(courseId).populate({
//         path:"courseContent",
//         populate:{
//             path:"SunSection",
//         },
//     })
    
//     //return responce
//     return response.status(500).json({
//         success:false,
//         message:"Section Update Successfully",
//         data:course
//     })

//     }
//     catch(error)
//     {
//         return response.status(500).json({
//             success:false,
//             message:"Something went wrong"
//         })
//     }  
// }






// exports.deleteSection = async(request,response)=>{
//     try{

//         //fetch sectionId
//         const {sectionId} = request.body;
//         // const sectionId = request.params.id;

//         //validation
//         if(!sectionId)
//         {
//         return response.status(401).json({
//             success:false,
//             message:"All fields are required",
//         });
//         }

//         //delete section
//         await Section.findByIdAndDelete(sectionId)
             
//                     //or

//         // const deleteSec = await Section.findByIdAndDelete(sectionId)
//         // console.log(deleteSec);

//         //return responce
//         return response.status(500).json({
//         success:false,
//         message:"Section deleted Successfully"
//         });

        

//     }
//     catch(error)
//     {
//     return response.status(500).json({
//             success:false,
//             message:"Something went wrong",
//             error:error.message,
//         })  
//     }
// }  





































































