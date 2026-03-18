import { Routes, Route } from "react-router-dom";
import Home from "../Pages/Home/Home";
import Booking from "../Pages/Booking/Booking";
import Navbar from "../Main/Navbar/Navbar";
import Footer from "../Main/Footer/Footer";
import ApplicationForm from "../Pages/ApplicationForm/ApplicationForm";
import LandingPage from "../Pages/LandingPage/LandingPage";
import USMockInterview from "../Pages/Products/Interview/USMockInterview";
import Requirements from "../Pages/Products/visaRequirement/Requirements";
import RefundPolicy from "../Pages/Products/Refund/RefundPolicy";

function Router() {
  return (
    <>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/visa/:visaId" element={<Booking />} />
        <Route path="/application-form" element={<ApplicationForm />} />
        <Route path="/interview" element={<USMockInterview />} />
        <Route path="/Requirements" element={<Requirements />} />
        <Route path="/Refund" element={<RefundPolicy />} />
      </Routes>

      <Footer />
    </>
  );
}

export default Router;