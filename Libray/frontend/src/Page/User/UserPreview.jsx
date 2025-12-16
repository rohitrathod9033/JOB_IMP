import React from "react";
import { Link } from "react-router-dom";
import { Box, Grid, Card, CardContent, CardActions, Typography, Button } from "@mui/material";

const UserPreview = () => {
    return (
        <Box sx={{ p: 6 }}>
            <Typography variant="h4" textAlign="center" gutterBottom>User Home Preview</Typography>

            <Grid container spacing={2}>
                <Grid item xs={12} sm={6} md={4}>
                    <Card sx={{ textAlign: "center", p: 2 }}>
                        <Typography variant="h3">📘</Typography>
                        <CardContent>
                            <Typography variant="h6">Borrow Books</Typography>
                            <Typography color="text.secondary">Browse available books and borrow instantly.</Typography>
                        </CardContent>
                        <CardActions sx={{ justifyContent: "center" }}>
                            <Button variant="outlined" component={Link} to="/user/borrowBook">Borrow Book</Button>
                        </CardActions>
                    </Card>
                </Grid>

                <Grid item xs={12} sm={6} md={4}>
                    <Card sx={{ textAlign: "center", p: 2 }}>
                        <Typography variant="h3">🔄</Typography>
                        <CardContent>
                            <Typography variant="h6">Return Book</Typography>
                            <Typography color="text.secondary">Return your borrowed books here.</Typography>
                        </CardContent>
                        <CardActions sx={{ justifyContent: "center" }}>
                            <Button variant="outlined" color="secondary" component={Link} to="/user/returnBook">Return Book</Button>
                        </CardActions>
                    </Card>
                </Grid>

                <Grid item xs={12} sm={6} md={4}>
                    <Card sx={{ textAlign: "center", p: 2 }}>
                        <Typography variant="h3">📕</Typography>
                        <CardContent>
                            <Typography variant="h6">My Borrowed Books</Typography>
                            <Typography color="text.secondary">Books you have borrowed and not yet returned.</Typography>
                        </CardContent>
                        <CardActions sx={{ justifyContent: "center" }}>
                            <Button variant="outlined" color="success" component={Link} to="/user/my-borrows">View My Borrowed Books</Button>
                        </CardActions>
                    </Card>
                </Grid>
            </Grid>
        </Box>
    );
};

export default UserPreview;
