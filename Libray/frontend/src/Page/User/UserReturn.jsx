import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import axiosInstance from "../../Instance/axiosInstance";
import { toast } from "react-toastify";

import { Box, Paper, Typography, FormControl, InputLabel, Select, MenuItem, Button, FormHelperText } from "@mui/material";

const UserReturn = () => {
  const [borrowList, setBorrowList] = useState([]);

  const { register, handleSubmit, formState: { errors }, reset, } = useForm({
    defaultValues: {
      borrowId: "",
    },
  });

  // get my borrow list
  const fetchBorrowedBooks = async () => {
    try {
      const res = await axiosInstance.get("/borrow/my-borrows");
      if (res.data.success) {
        setBorrowList(res.data.data);
      }
    } catch (error) {
      toast.error("Failed to fetch borrowed books");
    }
  };

  useEffect(() => {
    fetchBorrowedBooks();
  }, []);

  const onSubmit = async (data) => {
    try {
      const response = await axiosInstance.post("/borrow/return", data);

      if (response?.data?.success) {
        toast.success("Book Returned Successfully");
        reset();
      } else {
        toast.error(response?.data?.message || "Return Failed");
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <Box
      sx={{
        maxWidth: 500,
        margin: "auto",
        mt: 5,
      }}
    >
      <Paper elevation={1} sx={{ p: 4, borderRadius: 1 }}>
        <Typography variant="h5" fontWeight="bold" mb={3} textAlign="center">
          Return Book
        </Typography>

        <form onSubmit={handleSubmit(onSubmit)}>
          {/* Select Borrow Record */}
          <FormControl fullWidth margin="normal" error={!!errors.borrowId}>
            <InputLabel>Select Borrow Record</InputLabel>

            <Select
              label="Select Borrow Record"
              defaultValue=""
              {...register("borrowId", {
                required: "Please select a borrowed book",
              })}
            >
              <MenuItem value="">
                <em>-- Select Borrowed Book --</em>
              </MenuItem>

              {borrowList.map((borrow) => (
                <MenuItem key={borrow._id} value={borrow._id}>
                  {borrow.bookId?.title}
                </MenuItem>
              ))}
            </Select>

            {errors.borrowId && (
              <FormHelperText>{errors.borrowId.message}</FormHelperText>
            )}
          </FormControl>

          {/* Submit Button */}
          <Button
            type="submit"
            variant="contained"
            fullWidth
            sx={{ mt: 3, py: 1 }}
          >
            Return
          </Button>
        </form>
      </Paper>
    </Box>
  );
};

export default UserReturn;
