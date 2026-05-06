
//final correct code je run pn thai che 
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { apiconnector } from '../services/apiconnector';
import { categories } from '../services/apis';
import { getCatalogPageData } from '../services/operations/PageAndComponentData';
import { CourseSlider } from '../components/core/Catalog/CourseSlider';

export const Catalog = () => {
  // URL mathi catalog/category no name medvava mate useParams no upyog
  const { catalogName } = useParams();

  const [catalogPageData, setCatalogPageData] = useState(null);

  // koi category pr click kariye to tenu id medvava mate state
  const [categoryId, setCategoryId] = useState("");

  // useEffect: jayare catalogName (URL param) change thay tyare call thase
  // ahiya apde sagli categories fetch kariye che ane URL pr thi mali category name sathe match kariye che
  useEffect(() => {
    const getCategories = async () => {
      try {
        const res = await apiconnector("GET", categories.CATEGORIES_API);
        console.log("All Categories API Response:", res);

        // URL ma je category name che (e.g., "web-development"), te sathe match thavani try
        const category = res?.data?.allTags?.find(
          (ct) => ct.name.split(" ").join("-").toLowerCase() === catalogName
        );

        // joiye ke category mali ke nahi, pachhi j ID set karvi
        if (category) {
          setCategoryId(category._id);
        } else {
          console.error("Category not found for URL:", catalogName);
        }

      } catch (error) {
        console.error("Failed to fetch categories:", error);
      }
    };
    getCategories();
  }, [catalogName]);

  // jayare categoryId set thay tyare aa effect call thase
  // aa main API che je course detail fetch kare che
  useEffect(() => {
    const getCategoryPageDetails = async () => {
      if (categoryId) {
        try {
          console.log("Fetching catalog page data for categoryId:", categoryId);
          const res = await getCatalogPageData(categoryId);
          console.log("CATALOG PAGE DATA RESPONSE:", res);
          setCatalogPageData(res);
        } catch (error) {
          console.error("Failed to fetch catalog page details:", error);
        }
      }
    };
    getCategoryPageDetails();
  }, [categoryId]);

  const categoryName = catalogPageData?.data?.selectedCategory?.name || catalogName?.split("-").join(" ")
  const categoryCourses = catalogPageData?.data?.selectedCategory?.courses || []

  return (
    <div className='min-h-[calc(100vh-3.5rem)] w-full bg-richblack-900 text-white'>
      <div className='mx-auto w-11/12 max-w-maxContent py-10'>
        <div className='mb-8'>
          <p className='text-sm uppercase tracking-wide text-richblack-300'>Search Results</p>
          <h1 className='mt-2 text-3xl font-bold text-richblack-5 capitalize'>{categoryName}</h1>
          <p className='mt-2 text-richblack-200'>
            {categoryCourses.length} course{categoryCourses.length === 1 ? "" : "s"} found
          </p>
        </div>

        {categoryCourses.length > 0 ? (
          <CourseSlider Courses={categoryCourses} />
        ) : (
          <div className='rounded-xl border border-richblack-700 bg-richblack-800 p-10 text-center'>
            <p className='text-xl font-semibold text-richblack-5'>No courses found</p>
            <p className='mt-2 text-richblack-300'>
              Try another search keyword like Web Development, Data Science, or AI.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};