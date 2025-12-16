import { useEffect, useState } from "react";
import axiosInstance from "../../Instance/axiosInstance";
import { toast } from "react-toastify";
// Material UI
import { Box, Accordion, AccordionSummary, AccordionDetails, Typography, Chip, Card, CardMedia, Grid, useMediaQuery } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
// Pagination 
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';

const AvailableBooks = () => {
  const [books, setBooks] = useState([]);
  const isMobile = useMediaQuery("(max-width:600px)");

  const [page, setPage] = useState(1);
  const [limit] = useState(6);
  const [totalPages, setTotalPages] = useState(1);

  const getAvailableBooks = async (pageNumber) => {
    try {
      const res = await axiosInstance.get(
        `/books/AvailableData?page=${pageNumber}&limit=${limit}`
      );
      console.log("res from AvailableBooks ---> ", res.data);
      setBooks(res.data.data);
      setTotalPages(res.data.totalPages);
      setPage(res.data.currentPage);

      toast.success("Fetched available books successfully");
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to fetch books");
    }
  };

  useEffect(() => {
    getAvailableBooks(page);
  }, [page]);

  return (
    <>
      <Box sx={{ p: { xs: 2, sm: 3 }, backgroundColor: "whitesmoke", minHeight: "100vh" }}>
        <Typography
          variant={isMobile ? "h5" : "h4"}
          sx={{
            mb: 5,
            fontWeight: 600,
            textAlign: "center",
            fontSize: { xs: "1.75rem", sm: "2.125rem", md: "2.5rem" }
          }}
        >
          Available Books
        </Typography>

        {books.length === 0 ? (
          <Typography
            variant="h6"
            sx={{
              textAlign: "center",
              mt: 5,
              opacity: 0.7
            }}
          >
            No books found
          </Typography>
        ) : (
          <Grid container spacing={3} sx={{ justifyContent: "center" }}>
            {books.map((book) => (
              <Grid item xs={12} sm={6} md={4} lg={3} key={book._id}>
                <Card
                  sx={{
                    borderRadius: 2,
                    width: 350,
                  }}
                >
                  {/* Book Image */}
                  <CardMedia
                    component="img"
                    height="350"
                    image={
                      book.thumbnail
                        ? `http://localhost:3000/${book.thumbnail.replace("\\", "/")}`
                        : "/default-book.jpg"
                    }
                    alt={book.title}
                    sx={{ objectFit: "cover", width: "100%" }}
                  />

                  {/* Accordion Section */}
                  <Accordion
                    sx={{
                      boxShadow: "none",
                      "&:before": { display: "none" },
                      "&.Mui-expanded": { margin: 0 }
                    }}
                  >
                    <AccordionSummary
                      expandIcon={<ExpandMoreIcon />}
                      sx={{
                        minHeight: "60px",
                        "& .MuiAccordionSummary-content": {
                          alignItems: "center",
                          gap: 1,
                          flexWrap: "wrap"
                        }
                      }}
                    >
                      <Typography
                        sx={{
                          fontWeight: 600,
                          fontSize: { xs: "0.9rem", sm: "1rem" },
                          flex: 1,
                          mr: 1
                        }}
                      >
                        {book.title}
                      </Typography>

                      <Chip
                        label="Available"
                        color="success"
                        size="small"
                        sx={{ fontSize: "0.75rem" }}
                      />
                    </AccordionSummary>

                    <AccordionDetails sx={{ pt: 1, pb: 2 }}>
                      <Typography sx={{ mb: 1 }}>
                        <b>Author:</b> {book.author}
                      </Typography>
                      <Typography sx={{ mb: 1 }}>
                        <b>Category:</b> {book.category}
                      </Typography>
                      <Typography sx={{ mb: 1 }}>
                        <b>Publication Year:</b> {book.publicationYear}
                      </Typography>
                      <Typography sx={{ mb: 1 }}>
                        <b>Total Copies:</b> {book.totalCopies}
                      </Typography>
                      <Typography>
                        <b>Available Copies:</b> {book.availableCopies}
                      </Typography>
                    </AccordionDetails>
                  </Accordion>
                </Card>
              </Grid>
            ))}
          </Grid>
        )}
      </Box>

      {/* Pagination */}
      <Stack sx={{ alignItems: "center", backgroundColor: "whitesmoke", py: 3 }}>
        <Pagination
          count={totalPages}
          page={page}
          onChange={(e, value) => setPage(value)}
          color="primary"
          size="large"
          siblingCount={1}
          boundaryCount={1}
        />
      </Stack>
    </>
  );
};

export default AvailableBooks;
