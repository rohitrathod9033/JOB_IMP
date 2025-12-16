import React from "react";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { Box, Card, CardActions, CardContent, Grid, Typography, Button } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import Loading from "../../Components/Loading";

const AdminPreview = () => {
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setLoading(false);
        }, 300);
        return () => clearTimeout(timer);
    }, []);

    if (loading) {
        return <Loading />;
    }
    return (
        <Box sx={{ p: 10 }}>
            <Typography variant="h4" fontWeight="bold" textAlign="center" mb={4}>
                Admin Home Preview
            </Typography>

            <Grid container spacing={3}>


                {/* Add Book */}
                <Grid item xs={12} sm={6} md={3} lg={3}>
                    <Card sx={{ p: 2, textAlign: "center" }}>
                        <AddIcon sx={{ fontSize: 50 }} color="primary" />
                        <CardContent>
                            <Typography variant="h6">Add Book</Typography>
                            <Typography variant="body2" color="text.secondary">
                                Add new books to the library system.
                            </Typography>
                        </CardContent>
                        <CardActions sx={{ justifyContent: "center" }}>
                            <Link to="/admin/addBook" style={{ textDecoration: "none" }}>
                                <Button variant="outlined" startIcon={<AddIcon />}>Add Book</Button>
                            </Link>
                        </CardActions>
                    </Card>
                </Grid>

                {/* Update Book */}
                <Grid item xs={12} sm={6} md={3} lg={3}>
                    <Card sx={{ p: 2, textAlign: "center" }}>
                        <EditIcon sx={{ fontSize: 50 }} color="primary" />
                        <CardContent>
                            <Typography variant="h6">Update Book</Typography>
                            <Typography variant="body2" color="text.secondary">
                                Modify information of existing books.
                            </Typography>
                        </CardContent>
                        <CardActions sx={{ justifyContent: "center" }}>
                            <Link to="/admin/updateBook" style={{ textDecoration: "none" }}>
                                <Button variant="outlined" startIcon={<EditIcon />}>Update Book</Button>
                            </Link>
                        </CardActions>
                    </Card>
                </Grid>

                {/* All Books */}
                <Grid item xs={12} sm={6} md={3} lg={3}>
                    <Card sx={{ p: 2, textAlign: "center" }}>
                        <MenuBookIcon sx={{ fontSize: 50 }} color="primary" />
                        <CardContent>
                            <Typography variant="h6">All Books</Typography>
                            <Typography variant="body2" color="text.secondary">
                                View available + unavailable books.
                            </Typography>
                        </CardContent>
                        <CardActions sx={{ justifyContent: "center" }}>
                            <Link to="/admin/getAllBooks" style={{ textDecoration: "none" }}>
                                <Button variant="outlined" startIcon={<MenuBookIcon />}>View All</Button>
                            </Link>
                        </CardActions>
                    </Card>
                </Grid>

                {/* Delete Book */}
                <Grid item xs={12} sm={6} md={3} lg={3}>
                    <Card sx={{ p: 2, textAlign: "center" }}>
                        <DeleteIcon sx={{ fontSize: 50 }} color="primary" />
                        <CardContent>
                            <Typography variant="h6">Delete Books</Typography>
                            <Typography variant="body2" color="text.secondary">
                                Delete books from the system.
                            </Typography>
                        </CardContent>
                        <CardActions sx={{ justifyContent: "center" }}>
                            <Link to="/admin/deleteBook" style={{ textDecoration: "none" }}>
                                <Button variant="outlined" startIcon={<DeleteIcon />}>
                                    Delete Book
                                </Button>
                            </Link>
                        </CardActions>
                    </Card>
                </Grid>
            </Grid>
        </Box>
    );
};

export default AdminPreview;
