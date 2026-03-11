import { Routes, Route } from "react-router-dom";
import Home from "../Pages/Home/Home";
import Booking from "../Pages/Booking/Booking";
import Navbar from "../Main/Navbar/Navbar";
import Footer from "../Main/Footer/Footer";
import ApplicationForm from "../Pages/ApplicationForm/ApplicationForm";
import LandingPage from "../Pages/LandingPage/LandingPage";



function Router() {
  return (
    <>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/visa/:visaId" element={<Booking />} />
        <Route path="/application-form" element={<ApplicationForm />} />
      </Routes>

      <Footer />
    </>
  );
}

export default Router;