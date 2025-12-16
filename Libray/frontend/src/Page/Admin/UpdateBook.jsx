import { useState } from "react";
import axiosInstance from "../../Instance/axiosInstance";
import { toast } from "react-toastify";
import BookForm from "../../Components/BookForm";
import { useForm, FormProvider } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { bookValidation } from "../../Validation/Validation";
import { useNavigate } from "react-router-dom";
import Loading from "../../Components/Loading";
import {
    Container, Paper, TextField, Button, Box,
    Typography, Grid, Card, CardContent
} from "@mui/material";

const UpdateBook = () => {
    const navigate = useNavigate();
    const [bookId, setBookId] = useState("");
    const [bookForm, setBookForm] = useState(null);
    const [loading, setLoading] = useState(false);

    const method = useForm({
        resolver: yupResolver(bookValidation),
        mode: "onChange"
    })
    const { handleSubmit, reset } = method

    // Step 1: Get Book ID
    const getBookById = async () => {
        if (!bookId.trim()) {
            toast.error("Please enter Book ID");
            return;
        }

        setLoading(true);
        try {
            const res = await axiosInstance.get(`/books/get/${bookId}`);
            console.log("Book ID : ", res.data.data._id);

            if (res.data.success) {
                setBookForm(res.data.data);
                reset(res.data.data);
                toast.success("Book fetched successfully");
                navigate(`/admin/updateBook/${res.data.data._id}`);

            } else {
                toast.error("Book not found");
            }
        } catch (error) {
            toast.error("Invalid Book ID or Server Error");
        } finally {
            setLoading(false);
        }
    };

    // Step 2: Update Book
    const onSubmit = async (data) => {
        setLoading(true);
        try {
            const res = await axiosInstance.put(`/books/update/${bookId}`, data);
            if (res.data.success) {
                toast.success("Book updated successfully");
            } else {
                toast.error("Update failed");
            }
        } catch (error) {
            toast.error("Server error");
        } finally {
            setLoading(false);
        }
    };

    const handleReset = () => {
        setBookForm(null);
        setBookId("");
        reset();
    };

    if (loading) {
        return (
            <Container maxWidth="sm" sx={{ py: 10 }}>
                <Loading />
            </Container>
        );
    }


    return (
        <Container maxWidth="sm" sx={{ py: 5 }}>
            <Typography variant="h4" component="h1" gutterBottom align="center" sx={{ mb: 4 }}>
                Update Book
            </Typography>

            <Grid container spacing={3} justifyContent="center">
                {/* STEP 1: Get Book by ID */}
                {!bookForm && (
                    <Grid item xs={12} md={6}>
                        <Card elevation={3}>
                            <CardContent sx={{ p: 4 }}>
                                <Typography variant="h5" component="h2" gutterBottom align="center">
                                    Find Book to Update
                                </Typography>
                                <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }} align="center">
                                    Enter the Book ID to retrieve book details
                                </Typography>

                                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                                    <TextField
                                        fullWidth
                                        label="Book ID"
                                        value={bookId}
                                        onChange={(e) => setBookId(e.target.value)}
                                        placeholder="Enter Book ID"
                                        variant="outlined"
                                    />
                                    <Button
                                        variant="contained"
                                        onClick={getBookById}
                                        disabled={loading || !bookId.trim()}
                                        size="large"
                                    >
                                        {loading ? "Searching..." : "Get Book"}
                                    </Button>
                                </Box>
                            </CardContent>
                        </Card>
                    </Grid>
                )}

                {/* STEP 2: Show Book Form */}
                {bookForm && (
                    <Grid item xs={12} md={8}>
                        <Paper elevation={3} sx={{ p: 4 }}>
                            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
                                <Typography variant="h5" component="h2">
                                    Update Book Details
                                </Typography>
                                <Button
                                    variant="outlined"
                                    onClick={handleReset}
                                    disabled={loading}
                                >
                                    Back to Search
                                </Button>
                            </Box>

                            <FormProvider {...method}>
                                <BookForm
                                    handleSubmit={handleSubmit(onSubmit)}
                                    isUpdate={true}
                                />
                            </FormProvider>
                        </Paper>
                    </Grid>
                )}
            </Grid>
        </Container>
    );
};

export default UpdateBook;