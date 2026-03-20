import { Routes, Route, Navigate } from "react-router-dom";
import Home from "../Pages/Home/Home";
import Booking from "../Pages/Booking/Booking";
import Navbar from "../Main/Navbar/Navbar";
import Footer from "../Main/Footer/Footer";
import ApplicationForm from "../Pages/ApplicationForm/ApplicationForm";
import Login from "../Pages/Users/Login";
import Profile from "../Pages/Users/Profile";

import USMockInterview from "../Pages/Products/Interview/USMockInterview";
import Requirements from "../Pages/Products/visaRequirement/Requirements";
import RefundPolicy from "../Pages/Products/Refund/RefundPolicy";

import { getSession } from "../Pages/Users/Auth";

// 🔐 Protected Route Component
function ProtectedRoute({ children }) {
  const user = getSession();
  return user ? children : <Navigate to="/login" />;
}

function Router() {
  return (
    <>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/visa/:visaId" element={<Booking />} />
        <Route path="/application-form" element={<ApplicationForm />} />
        <Route path="/interview" element={<USMockInterview />} />
        <Route path="/requirements" element={<Requirements />} />
        <Route path="/refund" element={<RefundPolicy />} />

        {/* Auth Routes */}
        <Route path="/login" element={<Login />} />

        {/* Protected Profile */}
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />
      </Routes>

      <Footer />
    </>
  );
}

export default Router;