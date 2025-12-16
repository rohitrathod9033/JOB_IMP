import { useState } from "react";
import { Box, Button, Typography, Chip, Stack } from "@mui/material";
import axiosInstance from "../../Instance/axiosInstance";
import dayjs from "dayjs";

const UpdateUnavailableDates = () => {
  const [dateInput, setDateInput] = useState("");
  const [dates, setDates] = useState<string[]>([]);

  const addDate = () => {
    if (!dateInput) return;

    const formatted = dayjs(dateInput).format("YYYY-MM-DD");

    if (!dates.includes(formatted)) {
      setDates((prev) => [...prev, formatted]);
    }

    setDateInput("");
  };

  const removeDate = (date: string) => {
    setDates((prev) => prev.filter((d) => d !== date));
  };

  const updateUnavailableDates = async () => {
    try {
      const res = await axiosInstance.put("/doctor/unavailable-dates", {
        dates,
      });

      alert(res.data.message);
    } catch (error: any) {
      alert(error.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <Box p={3} maxWidth={500} mx="auto">
      <Typography variant="h5" gutterBottom>
        Update Unavailable Dates
      </Typography>

      {/* Date Input */}
      <input
        type="date"
        value={dateInput}
        onChange={(e) => setDateInput(e.target.value)}
        style={{
          padding: "10px",
          fontSize: "16px",
          marginTop: "10px",
          marginBottom: "10px",
          borderRadius: "6px",
        }}
      />

      <Button variant="contained" sx={{ ml: 2 }} onClick={addDate} disabled={!dateInput}>
        Add
      </Button>

      {/* Selected Dates Chips */}
      <Stack direction="row" spacing={1} mt={2} flexWrap="wrap">
        {dates.map((date) => (
          <Chip
            key={date}
            label={date}
            onDelete={() => removeDate(date)}
            color="error"
          />
        ))}
      </Stack>

      <Button
        variant="contained"
        color="success"
        fullWidth
        sx={{ mt: 3 }}
        onClick={updateUnavailableDates}
        disabled={dates.length === 0}>
        Update Unavailable Dates
      </Button> 
    </Box>
  );
};

export default UpdateUnavailableDates;