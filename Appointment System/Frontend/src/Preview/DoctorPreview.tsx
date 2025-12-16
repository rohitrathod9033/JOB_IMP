import { Button } from '@mui/material'
import { useNavigate } from 'react-router-dom'

const DoctorPreview = () => {
  const navigate = useNavigate();

  const handleView = () => {
    navigate("/preview/doctor/view-my-appointment");
  }

  const handleUnavailable = () => {
    navigate("/preview/doctor/unavailable-dates");
  }
  return (
    <>
      <Button variant='outlined' color='secondary' onClick={handleView}>Doctor Preview</Button>
      <Button variant='outlined' color='error' onClick={handleUnavailable}>Unavailable Date</Button>
    </>
  )
}

export default DoctorPreview