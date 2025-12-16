import axiosInstance from "../../Instance/axiosInstance";
import { toast } from "react-toastify";
import BookForm from "../../Components/BookForm";
import { FormProvider, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { bookValidation } from "../../Validation/Validation";
import { Container, Paper, Typography, Box } from "@mui/material";
import { useNavigate } from "react-router-dom";

const AddBook = () => {
    const navigate = useNavigate();

    const method = useForm({
        resolver: yupResolver(bookValidation),
        mode: "onChange"
    });
    const { handleSubmit, reset } = method;

    const onSubmit = async (data) => {
        try {
            const res = await axiosInstance.post("/books/add", data);
            console.log("Added Data", res);
            toast.success("Book Added Successfully");

            reset();
            navigate("/");
        } catch (error) {
            toast.error(error.response?.data?.message || "Book Not Added");
        }
    };

    return (
        <Container maxWidth="sm" sx={{ py: 4 }}>
            <Paper elevation={1} sx={{ p: 4 }}>
                <Box sx={{ mb: 3 }}>
                    <Typography variant="h4" component="h1" gutterBottom align="center">
                        Add New Book
                    </Typography>
                    <Typography variant="body1" color="text.secondary" align="center">
                        Fill in the details below to add a new book to the library
                    </Typography>
                </Box>

                <FormProvider {...method}>
                    <BookForm
                        handleSubmit={handleSubmit(onSubmit)}
                        isUpdate={false}
                    />
                </FormProvider>
            </Paper>
        </Container>
    );
};

export default AddBook;