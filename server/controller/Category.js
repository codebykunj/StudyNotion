const { request, response } = require("express");
const Category = require("../models/Category")

//create tag
exports.createCategory = async(request,response) =>{
try{
//fetch data from request ki body
    const {name,description}= request.body;

//validation
    if(!name || !description)
        {
            return response.status(400).json({
            success:false,
            message:"All fields are required"
       });
    }

//create tag in database
    const tagDetails = await Category.create({
        // name,description
           //or
        name:name,
        description:description,       
    });
    console.log(tagDetails)

//return responce
    return response.status(200).json({
        success:true,
        message:"Category created Successfully"
    })
    }

catch(error)
{
console.log(error);
return response.status(500).json({
    success:false,
    message:"Something went wrong"
});
}
}

//get allTags handeler function
exports.getAllCategory = async(request,response)=>{
    try{

    //get all tag
        // const getTags = await Tag.find({});
                        //or
        // const allTags = await Category.find({},name=true,description=true);
        const allTags = await Category.find({}, { name: 1, description: 1 });


    //return respone 
        response.status(200).json({
            success:true,
            message:"All tags find/returned Successfully",
            allTags
        })    

    }


    catch(error)
    {
    console.log(error);
    return response.status(500).json({
    success:false,
    message:"Something went wrong"
    });    
    }
}

function getRandomInt(max) {
    return Math.floor(Math.random() * max)
  }
exports.categoryPageDetails = async (req, res) => {
    try {
      const { categoryId } = req.body
      console.log("PRINTING CATEGORY ID: ", categoryId);
      // Get courses for the specified category
      const selectedCategory = await Category.findById(categoryId)
        .populate({
          path: "courses",
          match: { status: "Published" },
          populate: "ratingAndReviews",
        })
        .exec()
  
      //console.log("SELECTED COURSE", selectedCategory)
      // Handle the case when the category is not found
      if (!selectedCategory) {
        console.log("Category not found.")
        return res
          .status(404)
          .json({ success: false, message: "Category not found" })
      }
      // Handle the case when there are no courses
      if (selectedCategory.courses.length === 0) {
        console.log("No courses found for the selected category.")
        return res.status(404).json({
          success: false,
          message: "No courses found for the selected category.",
        })
      }
  
      // Get courses for other categories
      const categoriesExceptSelected = await Category.find({
        _id: { $ne: categoryId },
      })
      let differentCategory = await Category.findOne(
        categoriesExceptSelected[getRandomInt(categoriesExceptSelected.length)]
          ._id
      )
        .populate({
          path: "courses",
          match: { status: "Published" },
        })
        .exec()
        //console.log("Different COURSE", differentCategory)
      // Get top-selling courses across all categories
      const allCategories = await Category.find()
        .populate({
          path: "courses",
          match: { status: "Published" },
          populate: {
            path: "instructor",
        },
        })
        .exec()
      const allCourses = allCategories.flatMap((category) => category.courses)
      const mostSellingCourses = allCourses
        .sort((a, b) => b.sold - a.sold)
        .slice(0, 10)
       // console.log("mostSellingCourses COURSE", mostSellingCourses)
      res.status(200).json({
        success: true,
        data: {
          selectedCategory,
          differentCategory,
          mostSellingCourses,
        },
      })
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: "Internal server error",
        error: error.message,
      })
    }
  }

// exports.showAllCategories = async (req, res) => {
// 	try {
//         console.log("INSIDE SHOW ALL CATEGORIES");
// 		const allCategorys = await Category.find({});
// 		res.status(200).json({
// 			success: true,
// 			data: allCategorys,
// 		});
// 	} catch (error) {
// 		return res.status(500).json({
// 			success: false,
// 			message: error.message,
// 		});
// 	}
// };

// const Category = require("../models/Category")
// const Course = require("../models/Course") // Import Course model to update category's courses

// //create tag
// exports.createCategory = async (req, res) => {
//     try {
//         const { name, description } = req.body;

//         if (!name || !description) {
//             return res.status(400).json({
//                 success: false,
//                 message: "All fields are required"
//             });
//         }

//         const tagDetails = await Category.create({ name, description }); // Using shorthand for object properties
//         console.log(tagDetails)

//         return res.status(200).json({
//             success: true,
//             message: "Category created Successfully", // Renamed from Tag to Category
//             category: tagDetails, // Return the created category
//         })
//     } catch (error) {
//         console.error(error);
//         return res.status(500).json({
//             success: false,
//             message: "Something went wrong while creating category"
//         });
//     }
// }

// //get allCategories handler function
// exports.getAllCategory = async (req, res) => {
//     try {
//         const allCategories = await Category.find({}); // Fetch all categories, not just name and description projection as it's default

//         return res.status(200).json({
//             success: true,
//             message: "All categories retrieved Successfully", // Renamed from tags to categories
//             allCategories
//         })
//     } catch (error) {
//         console.error(error);
//         return res.status(500).json({
//             success: false,
//             message: "Something went wrong while fetching categories"
//         });
//     }
// }

// //categoryPageDetails
// exports.categoryPageDetails = async (req, res) => { // Changed response to res
//     try {
//         const { categoryId } = req.body;

//         const selectedCategory = await Category.findById(categoryId)
//             .populate({
//                 path: "courses",
//                 match: { status: "Published" },
//                 populate: {
//                     path: "ratingAndReviews", // Populate ratings/reviews of courses
//                     path: "instructor", // Populate instructor of courses
//                 },
//             })
//             .exec();

//         if (!selectedCategory) {
//             console.log("Category not found.");
//             return res.status(404).json({
//                 success: false,
//                 message: "Category not found/Data not found"
//             });
//         }

//         if (selectedCategory.courses.length === 0) {
//             console.log("No courses found for the selected category.");
//             // You might still want to return other categories even if this one has no courses
//         }

//         // Get courses for different categories
//         const differentCategories = await Category.find({
//             _id: { $ne: categoryId },
//         })
//             .populate("courses")
//             .exec();

//         // TODO: HW - Get top selling Course (Example logic below, uncomment to use)
//         // const topSellingCourses = await Course.find({})
//         //     .sort({ studentsEnrolled: -1 }) // Assuming you track 'sold' or 'studentsEnrolled' to determine top selling
//         //     .limit(10) // Get top 10
//         //     .populate("instructor")
//         //     .exec();

//         return res.status(200).json({
//             success: true,
//             selectedCategory,
//             differentCategories,
//             // topSellingCourses, // Add if you implement
//         });
//     } catch (error) {
//         console.error(error);
//         return res.status(500).json({
//             success: false,
//             message: "Internal server error",
//             error: error.message,
//         });
//     }
// }

