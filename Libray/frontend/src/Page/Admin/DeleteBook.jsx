import { useForm } from "react-hook-form";
import axiosInstance from "../../Instance/axiosInstance";
import { toast } from "react-toastify";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { Box, Button, TextField, Typography, Paper } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";


const schema = yup.object({
    bookId: yup.string().required("Book ID is required")
});

const DeleteBook = () => {
    const { register, handleSubmit, formState: { errors }, reset } = useForm({
        resolver: yupResolver(schema),
        mode: "onChange"
    });

    const onDelete = async (data) => {
        try {
            const res = await axiosInstance.delete(`/books/delete/${data.bookId}`);

            if (res.data.success) {
                toast.success("Book Deleted Successfully");
                reset();


            } else {
                toast.error("Book Not Found");
            }
        } catch (error) {
            toast.error(error.response?.data?.message || "Delete Failed");
        }
    };

    return (
        <Paper elevation={3} sx={{ p: 3, maxWidth: 400, mx: "auto", mt: 5 }}>
            <Typography variant="h5" align="center" gutterBottom>
                Delete Book
            </Typography>

            <Box component="form" onSubmit={handleSubmit(onDelete)}>

                <TextField
                    fullWidth
                    label="Enter Book ID"
                    variant="outlined"
                    margin="normal"
                    {...register("bookId")}
                    error={!!errors.bookId}
                    helperText={errors.bookId?.message}
                />

                <Button
                    type="submit"
                    variant="contained"
                    color="error"
                    fullWidth
                    startIcon={<DeleteIcon />}
                    sx={{ mt: 1 }}>
                    Delete
                </Button>
            </Box>
        </Paper>
    );
};

export default DeleteBook;
