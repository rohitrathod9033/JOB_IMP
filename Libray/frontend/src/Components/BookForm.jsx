import React from "react";
import { useFormContext } from "react-hook-form";
import {
  Box,
  TextField,
  MenuItem,
  Button,
  Grid,
} from "@mui/material";

const BookForm = ({ handleSubmit, isUpdate }) => {
  const { register, setValue, formState: { errors } } = useFormContext();

  const statusOptions = [
    { value: "available", label: "Available" },
    { value: "unavailable", label: "Unavailable" }
  ];


  // Upload Handller 
  const handleImageUpload = async (e) => {
    console.log(" e.target.files ", e.target.files);
    const file = e.target.files[0];
    if (!file) return;

    const uploadImage = new FormData();
    uploadImage.append("file", file);

    const res = await fetch("http://localhost:3000/api/ImageThumbnail", {
      method: "POST",
      body: uploadImage
    });

    const data = await res.json();
    console.log("Uploaded Image Thumbnail:", data);

    // Path Store in Form
    setValue("thumbnail", data.path);
  };

  return (
    <Box component="form" onSubmit={handleSubmit} noValidate>
      <Grid container spacing={1.5}>
        <Grid item size={12} xs={12}>
          <TextField
            fullWidth
            label="Book Title"
            {...register("title")}
            error={!!errors.title}
            helperText={errors.title?.message}
            variant="outlined"
          />
        </Grid>

        <Grid item size={12} xs={12} md={6}>
          <TextField
            fullWidth
            label="Author Name"
            {...register("author")}
            error={!!errors.author}
            helperText={errors.author?.message}
            variant="outlined"
          />
        </Grid>

        <Grid item size={12} xs={12} md={6}>
          <TextField
            fullWidth
            label="Category"
            {...register("category")}
            error={!!errors.category}
            helperText={errors.category?.message}
            variant="outlined"
          />
        </Grid>

        <Grid item size={12} xs={12} md={6}>
          <TextField
            fullWidth
            label="Publication Year"
            type="number"
            {...register("publicationYear")}
            error={!!errors.publicationYear}
            helperText={errors.publicationYear?.message}
            variant="outlined"
          />
        </Grid>

        <Grid item size={12} xs={12} md={6}>
          <TextField
            fullWidth
            label="Total Copies"
            type="number"
            {...register("totalCopies")}
            error={!!errors.totalCopies}
            helperText={errors.totalCopies?.message}
            variant="outlined"
          />
        </Grid>

        <Grid item size={12} xs={12} md={6}>
          <TextField
            fullWidth
            label="Available Copies"
            type="number"
            {...register("availableCopies")}
            error={!!errors.availableCopies}
            helperText={errors.availableCopies?.message}
            variant="outlined"
          />
        </Grid>

        {/* File Upload  */}
        <Grid item xs={12}>
          <input type="file" accept="image/*" onChange={handleImageUpload} />
        </Grid>

        {/* Hidden field for thumbnail path */}
        <input type="hidden" {...register("thumbnail")} />

        {/* ------  */}


        <Grid item size={8} xs={12} md={6}>
          <TextField
            fullWidth
            select
            label="Status"
            {...register("status")}
            defaultValue="available"
            variant="outlined"
          >
            {statusOptions.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>
        </Grid>

        <Grid item size={4} xs={12}>
          <Box sx={{ display: 'flex', gap: 2, justifyContent: 'flex-end' }}>
            <Button
              type="submit"
              variant="contained"
              size="large"
              sx={{ minWidth: 120 }}
            >
              {isUpdate ? "Update Book" : "Add Book"}
            </Button>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default BookForm;