import { useEffect, useState } from "react";
import { Box, Card, CardContent, Typography, Button, Chip } from "@mui/material";
import axiosInstance from "../../Instance/axiosInstance";
import type { IAppointment } from "../../Types/types";

const ViewMyAppointments = () => {
  const [appointments, setAppointments] = useState<IAppointment[]>([]);

  useEffect(() => {
    myAppointments();
  }, []);

  const myAppointments = async () => {
    try {
      const res = await axiosInstance.get("/patient/myAppointments");
      setAppointments(res.data.appointments || []);
    } catch (err: any) {
      console.log(err);
    }
  };



  // cancel appointment 
  const cancelAppointment = async (id: string) => {
    console.log("Cancel function called with ID:", id);
    const oldList = [...appointments];
    // console.log("Old List: ", oldList);

    setAppointments((prev) =>
      prev.map((a) => (a._id === id ? { ...a, cancelled: true } : a))
    );

    try {
      const res = await axiosInstance.put(`/patient/appointment/cancel/${id}`);
      console.log("Cancelled Appointment Repsonse ", res.data);
    } catch (err) {
      setAppointments(oldList);
    }
  };

  const formatDate = (d?: string | Date) => {
    if (!d) return "-";
    return new Date(d).toLocaleDateString();
  };

  return (
    <Box p={2}>
      <Typography variant="h5" mb={2} fontWeight={600}>
        My Appointments
      </Typography>

      {appointments.length === 0 ? (
        <Typography color="text.secondary">
          No appointments found.
        </Typography>
      ) : (
        appointments.map((appt: any) => (
          <Card
            key={appt._id}
            sx={{
              mb: 2,
              borderRadius: 2,
              background: "#f8fafc",
              border: "1px solid #e2e8f0",
            }}
          >
            <CardContent>
              <Typography variant="h6">
                {appt.doctorId?.name || "Doctor"}
              </Typography>
              <Typography color="text.secondary">
                {appt.doctorId?.speciality || "Speciality N/A"}
              </Typography>

              <Typography mt={1}>Date: {formatDate(appt.date)}</Typography>
              <Typography>
                Time: {appt.startTime} - {appt.endTime}
              </Typography>

              <Box mt={1}>
                {appt.cancelled ? (
                  <Chip label="Cancelled" color="error" />
                ) : appt.approved ? (
                  <Chip label="Approved" color="success" />
                ) : (
                  <Chip label="Pending" color="warning" />
                )}
              </Box>

              <Box mt={2}>
                <Button
                  variant="contained"
                  color="error"
                  size="small"
                  disabled={appt.cancelled}
                  onClick={() => cancelAppointment(appt._id)}
                >
                  {appt.cancelled ? "Cancelled" : "Cancel Appointment"}
                </Button>
              </Box>
            </CardContent>
          </Card>
        ))
      )}
    </Box>
  );
};

export default ViewMyAppointments;
