// App.js
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "bootstrap/dist/css/bootstrap.min.css";
import PublicRoute from "./Components/Routes/PublicRoutes";
import ProtectedRoute from "./Components/Routes/ProtectedRoutes";
//Pages
import HomePage from "./Pages/HomePage";
import InvalidRoute from "./Pages/InvalidRoute";
//  Pages/Auth
import Login from "./Pages/Auth/Login";
import Registration from "./Pages/Auth/Registration";
import OtpVerification from "./Pages/Auth/OtpVerification";
import ForgotPassword from "./Pages/Auth/ForgotPassword";
//  Pages/Notes
import Courses from "./Pages/Notes/Courses";
import Semesters from "./Pages/Notes/Semesters";
import Subjects from "./Pages/Notes/Subjects";
import NotesList from "./Pages/Notes/NotesList";
import ProfilePage from "./Pages/Profile/ProfilePage";
import AdminLogin from "./Pages/Admin/AdminLogin";
import AdminPanel from "./Pages/Admin/AdminPanel";

function App() {
  return (
    <>
      <ToastContainer />
      <Router>
        <Routes>
          {/* Public routes like Login/Register */}
          <Route
            path="/"
            element={
              <PublicRoute>
                <Login />
              </PublicRoute>
            }
          />
          <Route
            path="/register"
            element={
              <PublicRoute>
                <Registration />
              </PublicRoute>
            }
          />
          <Route
            path="/register/otp/otp-verification"
            element={
              <PublicRoute>
                <OtpVerification />
              </PublicRoute>
            }
          />
          <Route
            path="/reset-password"
            element={
              <PublicRoute>
                <ForgotPassword />
              </PublicRoute>
            }
          />
          {/* Protected routes like Home */}
          <Route
            path="/feed"
            element={
              <ProtectedRoute>
                <HomePage />
              </ProtectedRoute>
            }
          />
          {/* Parameterized Routes for Notes */}
          <Route
            path="/notes/courses"
            element={
              <ProtectedRoute>
                <Courses />
              </ProtectedRoute>
            }
          />
          <Route
            path="/notes/courses/:courseId/semesters"
            element={
              <ProtectedRoute>
                <Semesters />
              </ProtectedRoute>
            }
          />
          <Route
            path="/notes/courses/:courseId/semesters/:semesterId/subjects"
            element={
              <ProtectedRoute>
                <Subjects />
              </ProtectedRoute>
            }
          />
          <Route
            path="/notes/courses/:courseId/semesters/:semesterId/subjects/:subjectId/notes"
            element={
              <ProtectedRoute>
                <NotesList />
              </ProtectedRoute>
            }
          />
          <Route
            path="/profile/:profileId"
            element={
              <ProtectedRoute>
                <ProfilePage />
              </ProtectedRoute>
            }
          />

          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin/adminpanel" element={<AdminPanel />} />
          {/* Catch-all Route */}
          <Route path="*" element={<InvalidRoute />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
