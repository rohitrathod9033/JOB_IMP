import { Button } from '@mui/material'
import { useNavigate } from 'react-router-dom'

const AdminPreview = () => {
  const navigate = useNavigate();
  const handleAddDoctorByAdmin = () => {
    navigate("/preview/admin/add-doctor");
  }

  const getDoctorByName = () => {
    navigate("/preview/admin/doctor/:id");
  }

  const getAllDoctors = () => {
    navigate("/preview/admin/all-doctors");
  }

  const GetAllAppointments = () => {
    navigate("/preview/admin/getAllAppointments");
  }
  return (
    <>
      <h1>Admin Preview</h1>

      <Button variant='outlined' color='success' onClick={handleAddDoctorByAdmin}>Add Doctor</Button>
      <Button variant='outlined' color='warning' onClick={getDoctorByName}>Search Doctor</Button>
      <Button variant='outlined' color='info' onClick={getAllDoctors}>View All Doctor Details</Button>

      <Button variant='outlined' color='secondary' onClick={GetAllAppointments}>View All Appointment</Button>
    </>
  )
}

export default AdminPreview