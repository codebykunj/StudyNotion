import React, { useEffect, useMemo, useState } from "react"
import { AiOutlineSearch } from "react-icons/ai"
import { useNavigate } from "react-router-dom"
import { apiconnector } from "../services/apiconnector"
import { courseEndpoints } from "../services/apis"
import { Course_Card as CourseCard } from "../components/core/Catalog/Course_Card"
import { Swiper, SwiperSlide } from "swiper/react"
import { Autoplay, Pagination } from "swiper"
import "swiper/css"
import "swiper/css/pagination"

const suggestedCourses = [
  "Web Development",
  "Data Science",
  "Artificial Intelligence",
  "UI/UX Designer",
  "Machine Learning",
  "Cyber Security",
]

export const SearchCourses = () => {
  const navigate = useNavigate()
  const [query, setQuery] = useState("")
  const [publishedCourses, setPublishedCourses] = useState([])
  const [loading, setLoading] = useState(false)

  const trimmedQuery = useMemo(() => query.trim(), [query])
  const shouldAutoSlide = publishedCourses.length > 3

  useEffect(() => {
    let isMounted = true

    const requestWithTimeout = async (url, timeoutMs = 10000) => {
      return Promise.race([
        apiconnector("GET", url),
        new Promise((_, reject) =>
          setTimeout(() => reject(new Error("Request timeout")), timeoutMs)
        ),
      ])
    }

    const fetchPublishedCourses = async () => {
      if (isMounted) setLoading(true)

      const endpointsToTry = [
        courseEndpoints.GET_ALL_COURSE_API,
        courseEndpoints.GET_ALL_COURSE_API.replace("getAllCourses", "showAllCourse"),
      ]

      try {
        let allCourses = []
        let success = false

        for (const endpoint of endpointsToTry) {
          try {
            const response = await requestWithTimeout(endpoint)
            const extracted = response?.data?.allCourse || response?.data?.data || []

            if (Array.isArray(extracted)) {
              allCourses = extracted
              success = true
              break
            }
          } catch (err) {
            console.log("SEARCH_PAGE_ENDPOINT_FAILED", endpoint, err?.message || err)
          }
        }

        if (!success) {
          throw new Error("Unable to fetch course list from available endpoints")
        }

        const onlyPublished = (Array.isArray(allCourses) ? allCourses : []).filter(
          (course) => String(course?.status || "").toLowerCase() === "published"
        )

        if (isMounted) {
          setPublishedCourses(onlyPublished)
        }
      } catch (error) {
        console.log("SEARCH_PAGE_PUBLISHED_COURSES_ERROR", error)
        if (isMounted) setPublishedCourses([])
      } finally {
        if (isMounted) setLoading(false)
      }
    }

    fetchPublishedCourses()

    return () => {
      isMounted = false
    }
  }, [])

  const goToCatalog = (value) => {
    const slug = value.trim().split(" ").join("-").toLowerCase()
    if (!slug) return
    navigate(`/catalog/${slug}`)
  }

  const onSubmit = (e) => {
    e.preventDefault()
    if (!trimmedQuery) return
    goToCatalog(trimmedQuery)
  }

  return (
    <div className="min-h-[calc(100vh-3.5rem)] w-full bg-richblack-900">
      <div className="mx-auto flex w-11/12 max-w-maxContent flex-col gap-8 py-12">
        <div className="space-y-3">
          <h1 className="text-3xl font-bold text-richblack-5">Search Courses</h1>
          <p className="text-richblack-200">
            Find the course you want quickly.
          </p>
        </div>

        <form
          onSubmit={onSubmit}
          className="flex w-full max-w-2xl items-center gap-3 rounded-xl border border-richblack-700 bg-richblack-800 p-3"
        >
          <AiOutlineSearch className="text-2xl text-richblack-200" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search for a course..."
            className="w-full bg-transparent text-richblack-5 outline-none placeholder:text-richblack-400"
          />
          <button
            type="submit"
            className="rounded-lg bg-yellow-50 px-4 py-2 text-sm font-semibold text-richblack-900"
          >
            Search
          </button>
        </form>

        <div className="space-y-3">
          <p className="text-sm font-semibold uppercase tracking-wide text-richblack-300">
            Suggested courses
          </p>
          <div className="flex flex-wrap gap-3">
            {suggestedCourses.map((name) => (
              <button
                key={name}
                onClick={() => goToCatalog(name)}
                className="rounded-full border border-richblack-600 bg-richblack-800 px-4 py-2 text-sm font-medium text-richblack-50 transition-all hover:border-yellow-200 hover:text-yellow-50"
              >
                {name}
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-4">
          <p className="text-sm font-semibold uppercase tracking-wide text-richblack-300">
            Published courses
          </p>

          {loading ? (
            <div className="grid min-h-[180px] place-items-center rounded-xl border border-richblack-700 bg-richblack-800 p-6">
              <div className="spinner" />
            </div>
          ) : publishedCourses.length > 0 ? (
            <Swiper
              slidesPerView={1}
              spaceBetween={24}
              loop={shouldAutoSlide}
              autoplay={
                shouldAutoSlide
                  ? { delay: 5000, disableOnInteraction: false }
                  : false
              }
              pagination={{ clickable: true }}
              modules={[Pagination, Autoplay]}
              breakpoints={{
                768: { slidesPerView: 2 },
                1024: { slidesPerView: 3 },
              }}
              className="w-full"
            >
              {publishedCourses.map((course) => (
                <SwiperSlide key={course?._id}>
                  <CourseCard course={course} Height="h-[220px]" />
                </SwiperSlide>
              ))}
            </Swiper>
          ) : (
            <div className="rounded-xl border border-richblack-700 bg-richblack-800 p-6 text-richblack-200">
              No published courses available right now.
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

