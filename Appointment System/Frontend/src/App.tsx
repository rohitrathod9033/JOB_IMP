import { Routes, Route } from "react-router-dom"
import Navbar from "./Components/Navbar"
import Login from "./Components/Login"
import Register from "./Components/Register"
import { ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css";

// Preview 
import Preview from "./Preview/Preview"
import AdminPreview from "./Preview/AdminPreview"
import PatientPreview from "./Preview/PatientPreview"
import DoctorPreview from "./Preview/DoctorPreview"

import Home from "./Components/Home"

// Patient
import BookAppointment from "./Pages/Patient/BookAppointment"
import ViewMyAppointment from "./Pages/Patient/ViewMyAppointment"

// Doctor
import DoctorViewAppointmentList from "./Pages/Doctor/DoctorViewAppointmentList"
import DoctorUnavailableDate from "./Pages/Doctor/DoctorUnavailableDate"

// Admin
import AddDoctorByAdmin from "./Pages/Admin/AddDoctorByAdmin"
import DeleteDoctorByAdmin from "./Pages/Admin/DeleteDoctorByAdmin"
import GetAllAppointmentsByAdmin from "./Pages/Admin/GetAllAppointmentsByAdmin"
import UpdateDoctorByAdmin from "./Pages/Admin/UpdateDoctorByAdmin"
import GetDoctorByName from "./Pages/Admin/GetDoctorByName"
import DoctorList from "./Pages/Admin/DoctorList"

// Protected Routes 
import PatientProtected from "./Private/patientProtected"
import AdminProtected from "./Private/AdminProtected"
import DoctorProtected from "./Private/DoctorProtected"

const App = () => {




  return (
    <>
      <ToastContainer />
      <Navbar />
      <Routes>

        {/* User Auth + Public Route  -------------------------------------------- */}
        <Route path="/" element={<Home />} />
        <Route path="/user/login" element={<Login />} />
        <Route path="/user/register" element={<Register />} />

        {/* Patient Protected ---------------------------------------------- */}

        <Route
          path="/preview/patient/book-appointment"
          element={
            <PatientProtected>
              <BookAppointment />
            </PatientProtected>
          } />

        <Route
          path="/preview/patient/view-my-appointment"
          element={
            <PatientProtected>
              <ViewMyAppointment />
            </PatientProtected>
          } />

        {/* Doctor Protected ---------------------------------------------- */}
        <Route
          path="/preview/doctor/view-my-appointment"
          element={
            <DoctorProtected>
              <DoctorViewAppointmentList />
            </DoctorProtected>
          } />

        <Route
          path="/preview/doctor/unavailable-dates"
          element={
            <DoctorProtected>
              <DoctorUnavailableDate />
            </DoctorProtected>
          } />


        {/* Admin Protected ---------------------------------------------- */}
        <Route
          path="/preview/admin/add-doctor"
          element={
            <AdminProtected>
              <AddDoctorByAdmin />
            </AdminProtected>
          } />

        <Route
          path="/preview/admin/delete-doctor"
          element={
            <AdminProtected>
              <DeleteDoctorByAdmin />
            </AdminProtected>
          } />

        <Route
          path="/preview/admin/getAllAppointments"
          element={
            <AdminProtected>
              <GetAllAppointmentsByAdmin />
            </AdminProtected>
          } />

        <Route
          path="/preview/admin/update-doctor/:id"
          element={
            <AdminProtected>
              <UpdateDoctorByAdmin />
            </AdminProtected>
          } />

        <Route
          path="/preview/admin/doctor/:id"
          element={
            <AdminProtected>
              <GetDoctorByName />
            </AdminProtected>
          } />

        <Route
          path="/preview/admin/doctor-list"
          element={
            <AdminProtected>
              <DoctorList />
            </AdminProtected>
          } />

        {/* ----------------------- End ---------------------------------  */}

        {/* Login Preview  */}
        <Route path="/preview" element={<Preview />} />
        <Route path="/preview/admin" element={<AdminPreview />} />
        <Route path="/preview/patient" element={<PatientPreview />} />
        <Route path="/preview/doctor" element={<DoctorPreview />} />

        {/* Patient  */}
        <Route path="/preview/patient/book-appointment" element={<BookAppointment />} />
        <Route path="/preview/patient/view-my-appointment" element={<ViewMyAppointment />} />

        {/* Doctor  */}
        <Route path="/preview/doctor/view-my-appointment" element={<DoctorViewAppointmentList />} />
        <Route path="/preview/doctor/unavailable-dates" element={<DoctorUnavailableDate />} />

        {/* Admin  */}
        <Route path="/preview/admin/add-doctor" element={<AddDoctorByAdmin />} />
        <Route path="/preview/admin/delete-doctor" element={<DeleteDoctorByAdmin />} />
        <Route path="/preview/admin/getAllAppointments" element={<GetAllAppointmentsByAdmin />} />
        <Route path="/preview/admin/update-doctor/:id" element={<UpdateDoctorByAdmin />} />
        <Route path="/preview/admin/doctor/:id" element={<GetDoctorByName />} />
        <Route path="/preview/admin/all-doctors" element={<DoctorList />} />

      </Routes>
    </>
  )
}

export default App