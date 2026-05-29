import './App.css';
import { Route, Routes } from 'react-router-dom';
import { Home } from './pages/Home';
import Navbar from './components/common/Navbar';
import Settings from "./components/core/Dashboard/Setting/index"

import Login from './pages/Login';
import Signup from './pages/Signup';
import { ForgotPassword } from './pages/ForgotPassword';
import { UpdatePassword } from './pages/UpdatePassword';
import { VerifyEmail } from './pages/VerifyEmail';
import { About } from './pages/About';
import { Contact } from './pages/Contact';
import  MyProfile  from './components/core/Dashboard/MyProfile';
import { Dashboard } from './pages/Dashboard';
import { PrivateRoute } from './components/core/auth/PrivateRoute';
import { Error } from './pages/Error';

import  EnrolledCourses  from './components/core/Dashboard/EnrolledCourses';

import Cart from './components/core/Dashboard/Cart';
import { ACCOUNT_TYPE } from './utils/constants';
import AddCourse from './components/core/Dashboard/AddCourse';


import { useSelector } from 'react-redux';
import { MyCourses } from './components/core/Dashboard/MyCourses';
import  {Catalog}  from './pages/Catalog';
import { SearchCourses } from './pages/SearchCourses';
import { CourseDetails } from './pages/CourseDetails';
import { ViewCourse } from './pages/ViewCourse';
import  {VideoDetails}  from './components/core/ViewCourse/VideoDetails';
import  Instructor from './components/core/Dashboard/instructorDashboard/Instructor';
import EditCourse from './components/core/Dashboard/EditCourse/EditCourse';
import ErrorBoundary from "./components/common/ErrorBoundary";
import AdminOverview from './components/core/Dashboard/AdminPanel/AdminOverview';
import PendingInstructors from './components/core/Dashboard/AdminPanel/PendingInstructors';
import ManageUsers from './components/core/Dashboard/AdminPanel/ManageUsers';
import ManageCourses from './components/core/Dashboard/AdminPanel/ManageCourses';
import AIChatbot from './components/common/AIChatbot/AIChatbot';


function App() {
  const { user } = useSelector((state) => state.profile);

  return (
    <div className="w-full min-h-screen h-fit bg-richblack-900">
      <Navbar />
      <ErrorBoundary>
        <Routes>
        <Route path="catalog/:catalogName" element={<Catalog/>}/>
        <Route path="/search" element={<SearchCourses/>}/>
        <Route path='courses/:courseId' element={<CourseDetails/>}/>

        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="forgot-password" element={<ForgotPassword />} />
        <Route path="update-password/:token" element={<UpdatePassword />} />
        <Route path="verify-email" element={<VerifyEmail />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
      <Route path="dashboard/Settings" element={<Settings />} />


        {/* Protected Dashboard Routes */}
        <Route path="dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>}>
          <Route path="my-profile" element={<MyProfile />} />
          <Route path="enrolled-courses" element={<EnrolledCourses />} />
          <Route path="cart" element={<Cart />} />

          {/* Instructor Only Routes */}
          {
            user?.accountType === ACCOUNT_TYPE.INSTRUCTOR && (
              <>
              <Route path="add-course" element={<AddCourse/>} />
              <Route path='my-courses' element={<MyCourses/>}/>
              <Route path='/dashboard/instructor' element={<Instructor/>}/>
              <Route path='edit-course/:courseId' element={<EditCourse/>}/>
              </>
            )
          }

          {/* Admin Only Routes */}
          {
            user?.accountType === ACCOUNT_TYPE.ADMIN && (
              <>
              <Route path="admin" element={<AdminOverview />} />
              <Route path="admin/pending-instructors" element={<PendingInstructors />} />
              <Route path="admin/users" element={<ManageUsers />} />
              <Route path="admin/courses" element={<ManageCourses />} />
              </>
            )
          }



        </Route>

        
        <Route element={<PrivateRoute><ViewCourse/></PrivateRoute>}>
          <Route 
            path='view-course/:courseId/section/:sectionId/sub-section/:subSectionId'
            element={<VideoDetails/>}
          />
        </Route>
        



        
        {/* Catch-all route */}
        <Route path="*" element={<Error />} />
        </Routes>
      </ErrorBoundary>
      {/* AI Chatbot — available to all logged-in users */}
      <AIChatbot />
    </div>
  );
}

export default App;
