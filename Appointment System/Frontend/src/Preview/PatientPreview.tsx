import { Button, Typography } from '@mui/material'
import { useNavigate } from 'react-router-dom'


const PatientPreview = () => {
    const navigate = useNavigate();
    const handleBookSlot = () => {
        navigate("/preview/patient/book-appointment");
    }

    const handleView = () => {
        navigate("/preview/patient/view-my-appointment");
    }


    return (
        <>
            <Typography variant='h1'>Patient Preview</Typography>
            <Button variant='outlined' color='success' onClick={handleBookSlot}>Book Appointment</Button>
            <Button variant='outlined' color='secondary' onClick={handleView}>View My Appointment</Button>
        </>
    )
}

export default PatientPreview