import { useState, useEffect } from "react";
import {
  Box,
  Card,
  CardContent,
  Typography,
  Button,
  TextField,
  Modal,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import axiosInstance from "../../Instance/axiosInstance";
import type { Slot } from "../../Types/types";

const style = {
  position: "absolute",
  top: "53%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "35%",
  maxHeight: "400px",
  overflow: "auto",
  backgroundColor: "whitesmoke",
  borderRadius: "10px",
  padding: "20px",
};

const BookAppointment = () => {
  const [slotsModal, setSlotsModal] = useState(false);
  const [availableSlots, setAvailableSlots] = useState<Slot[]>([]);
  const [doctorId, setDoctorId] = useState("");
  const [date, setDate] = useState("");
  const [booking, setBooking] = useState(false);
  const [doctors, setDoctors] = useState<{ _id: string; name: string }[]>([]);

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const res = await axiosInstance.get("/patient/get-all-doctors");
        setDoctors(res.data.doctors || []);
      } catch (err) {
        console.log("Error fetching doctors", err);
      }
    };

    fetchDoctors();
  }, []);

  // Fetch Available Slots
  const fetchSlots = async () => {
    try {
      const res = await axiosInstance.post("/patient/available-slots", {
        doctorId,
        date,
      });

      console.log("Slots Response:", res.data);
      setAvailableSlots(res.data.availableSlots || []);
    } catch (err) {
      console.log("Error fetching slots", err);
    }
  };

  const handleOpenSlots = () => {
    if (!doctorId || !date) {
      alert("Please select Doctor & Date");
      return;
    }

    fetchSlots();
    setSlotsModal(true);
  };

  const handleClose = () => setSlotsModal(false);

  const bookAppointment = async (slot: Slot) => {
    setBooking(true);
    try {
      const res = await axiosInstance.post("/patient/bookAppointment", {
        doctorId,
        date,
        startTime: slot.startTime,
        endTime: slot.endTime,
      });

      if (res.data.success) {
        alert("Appointment Booked Successfully!");
        fetchSlots();
      } else {
        alert(res.data.message);
      }
    } catch (err: any) {
      alert(err?.response?.data?.message || "Booking Failed");
    }
    setBooking(false);
  };

  return (
    <Box className="p-4">
      <Typography variant="h1" fontSize={26} fontWeight={700}>
        Book Appointment
      </Typography>

      {/* INPUT CARD */}
      <Card className="mt-4">
        <CardContent>
          <Typography variant="h6" fontWeight={600} sx={{ mb: "30px" }}>
            Enter Details
          </Typography>

          <Box className="flex flex-col gap-4 mt-4">

            {/* Select  */}
            <FormControl fullWidth>
              <InputLabel>Select Doctor</InputLabel>
              <Select
                value={doctorId}
                label="Select Doctor"
                onChange={(e) => setDoctorId(e.target.value)}
              >
                {doctors.map((doc) => (
                  <MenuItem key={doc._id} value={doc._id}>
                    {doc.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            {/* DATE INPUT */}
            <TextField
              label="Date"
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              fullWidth
            />

            <Button variant="contained" onClick={handleOpenSlots}>
              View Available Slots
            </Button>
          </Box>
        </CardContent>
      </Card>

      <Modal open={slotsModal} onClose={handleClose}>
        <Box sx={style}>
          <Typography variant="h6" fontWeight={700} sx={{ mb: 2 }}>
            Available Slots
          </Typography>

          {availableSlots.length === 0 ? (
            <Typography>No Slots Found</Typography>
          ) : (
            <Box sx={{ display: "flex", flexWrap: "wrap", gap: 2 }}>
              {availableSlots.map((slot, index) => (
                <Button
                  key={index}
                  variant="outlined"
                  sx={{
                    width: "48%",
                    p: 2,
                    textTransform: "none",
                    fontSize: "16px",
                  }}
                  disabled={booking}
                  onClick={() => bookAppointment(slot)}
                >
                  {slot.startTime} - {slot.endTime}
                </Button>
              ))}
            </Box>
          )}
        </Box>
      </Modal>
    </Box>
  );
};

export default BookAppointment;
