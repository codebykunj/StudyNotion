# Webpack Warning Fix Tracker

Status: Approved plan - Fixing ESLint warnings (cause of webpack compile warnings) + Tailwind conflict + browserslist.

## Completed Steps
- [x] Plan confirmed by user

## Pending Steps
1. [x] Edit my-app/package.json: Remove `@tailwindcss/postcss` dependency
2. [x] Edit my-app/postcss.config.js: Set standard Tailwind v3 config
3. [x] Edit my-app/src/components/core/Dashboard/InstructorCourses/CourseTable.jsx: Remove unused `dispatch` import/use + example input div
4. [ ] Run `npm install` to update deps/lockfile
5. [ ] Run `npx update-browserslist-db@latest`
6. [ ] Test `npm run build` - expect 0 ESLint warnings (or reduced)
7. [ ] Fix remaining ESLint issues (prioritize unused-vars):

   **no-unused-vars:**
   - src/components/core/AboutPage/LearningGrid.jsx: 'Link'
   - src/components/core/Course/CourseDetailsCard.jsx: 'courseId'
   - src/components/core/Dashboard/AddCourse/Upload.jsx: 'course'
   - src/components/core/Dashboard/EnrolledCourses.jsx: 'BiDotsVerticalRounded'
   - src/components/core/Dashboard/InstructorCourses/CourseTable.jsx: 'dispatch' (step 3)
   - src/components/core/Dashboard/Setting/index.jsx: 'UpdatePassword'
   - src/components/core/Dashboard/Sidebar.jsx: 'VscSettingsGear'
   - src/components/core/HomePage/InstructorSection.jsx: alt redundant
   - src/components/core/ViewCourse/VideoDetails.jsx: 'setCompletedLectures', 'AiFillPlayCircle'
   - src/components/core/auth/Template.jsx: 'FcGoogle'
   - src/pages/CourseDetails.jsx: multiple ('paymentLoading', 'totalNoOfLectures', etc.)
   - src/pages/Dashboard.jsx: 'MyProfile'
   - src/services/operations/PageAndComponentData.jsx: 'React'
   - src/services/operations/authAPI.js: 'axios'
   - src/services/operations/profileAPI.js: 'PUT_UPDATEPROFILE'

   **react-hooks/exhaustive-deps:**
   - Several useEffect missing deps (add // eslint-disable-line or fix deps)

   **Other:**
   - jsx-pascal-case, eqeqeq, img-redundant-alt, etc.

## Notes
- Tailwind v3/v4 conflict fixed in steps 1-2.
- After step 6, update checklist.
- Full clean requires editing ~20 files; can do iteratively.
