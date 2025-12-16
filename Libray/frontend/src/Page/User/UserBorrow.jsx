import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import axiosInstance from "../../Instance/axiosInstance";
import { toast } from "react-toastify";

import { Box, Typography, FormControl, InputLabel, Select, MenuItem, Button, FormHelperText } from "@mui/material";

function UserBorrow() {
  const [books, setBooks] = useState([]);

  const { register, handleSubmit, formState: { errors }, reset } = useForm({
    defaultValues: {
      bookId: "",
    },
  });

  const fetchBooks = async () => {
    try {
      const res = await axiosInstance.get("/books/AvailableData");
      console.log("res from userBorrow ---> ",res.data);
      if (res.data.success) {
        setBooks(res.data.data);
      }
    } catch (error) {
      toast.error("Failed to load books");
    }
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  const onSubmit = async (data) => {
    try {
      const response = await axiosInstance.post("/borrow/borrow", data);

      if (response?.data?.success) {
        toast.success("Book Borrowed Successfully");
        reset();
      } else {
        toast.error(response?.data?.message || "Borrow Failed");
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <Box
      sx={{ maxWidth: 450, mx: "auto", mt: 5, p: 4, borderRadius: 2, boxShadow: 3, backgroundColor: "#fff", }}>

      <Typography variant="h5" sx={{ textAlign: "center", fontWeight: "bold", mb: 3 }}>
        Borrow Book
      </Typography>

      <Box component="form" onSubmit={handleSubmit(onSubmit)}>
        <FormControl fullWidth sx={{ mt: 2 }} error={!!errors.bookId}>
          <InputLabel id="book-select-label">Select Book</InputLabel>

          <Select labelId="book-select-label" id="book-select" label="Select Book" defaultValue="" {...register("bookId", { required: "Please select a book" })} >

            <MenuItem value="">
              <em>-- Select Book --</em>
            </MenuItem>

            {books.map((book) => (
              <MenuItem key={book._id} value={book._id}>
                {book.title} (ID: {book._id})
              </MenuItem>
            ))}
          </Select>

          {errors.bookId && (
            <FormHelperText>{errors.bookId.message}</FormHelperText>
          )}
        </FormControl>

        <Button variant="contained" fullWidth color="primary" type="submit" sx={{ mt: 3, py: 1 }} >
          Borrow
        </Button>
      </Box>
    </Box>
  );
}

export default UserBorrow;
