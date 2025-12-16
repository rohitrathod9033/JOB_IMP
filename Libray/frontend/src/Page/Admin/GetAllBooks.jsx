import { useEffect, useState } from "react";
import axiosInstance from "../../Instance/axiosInstance";
import { toast } from "react-toastify";

// Material UI
import {
  Box,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  Chip,
  Card,
  CardMedia,
  Grid,
  useMediaQuery
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Loading from "../../Components/Loading";

const GetAllBooks = () => {

  const [limit] = useState(6);
  const [books, setBooks] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  const isMobile = useMediaQuery("(max-width:600px)");

  // Fetch books
  const getAllBooks = async (pageNumber) => {
    if (loading || !hasMore) return;

    try {
      setLoading(true);
      const res = await axiosInstance.get(
        `/books/getData?page=${pageNumber}&limit=${limit}`
      );

      console.log("res from GetAllBooks UI ---> ", res.data);
      const newBooks = res.data.data;
      const total = res.data.totalPages;

      setBooks(prev => [...prev, ...newBooks]);
      setTotalPages(total);

      if (pageNumber >= total) setHasMore(false);

    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to fetch books");
    } finally {
      setLoading(false);
    }
  };

  // Initial Load
  useEffect(() => {
    setTimeout(() => getAllBooks(page), 1000);
  }, [page]);

  // Infinite Scroll Logic
  useEffect(() => {
    const handleScroll = () => {
      const bottom = window.innerHeight + document.documentElement.scrollTop;
      const height = document.documentElement.scrollHeight - 50;

      if (bottom >= height && hasMore && !loading) {
        setPage(prev => prev + 1);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, [loading, hasMore]);

  return (
    <Box sx={{ p: { xs: 2, sm: 3 }, backgroundColor: "whitesmoke", minHeight: "100vh" }}>
      <Typography
        variant={isMobile ? "h5" : "h4"}
        sx={{ mb: 5, fontWeight: 600, textAlign: "center" }}>
        All Books
      </Typography>

      {books.length === 0 ? (
        <Typography variant="h6" sx={{ textAlign: "center", mt: 5, opacity: 0.7 }}>
          No books found
        </Typography>
      ) : (
        <Grid container spacing={3} sx={{ justifyContent: "center" }}>
          {books.map((book) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={book._id}>
              <Card sx={{ borderRadius: 2, width: 350 }}>

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

                <Accordion sx={{ boxShadow: "none" }}>
                  <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                    <Typography sx={{ fontWeight: 600, flex: 1 }}>
                      {book.title}
                    </Typography>
                    <Chip
                      label={book.status}
                      variant="filled"
                      color={book.status === "available" ? "success" : "error"}
                      size="small"
                    />
                  </AccordionSummary>

                  <AccordionDetails>
                    <Typography><b>Author:</b> {book.author}</Typography>
                    <Typography><b>Category:</b> {book.category}</Typography>
                    <Typography><b>Publication Year:</b> {book.publicationYear}</Typography>
                    <Typography><b>Total Copies:</b> {book.totalCopies}</Typography>
                    <Typography><b>Available Copies:</b> {book.availableCopies}</Typography>
                  </AccordionDetails>
                </Accordion>

              </Card>
            </Grid>
          ))}
        </Grid>
      )}

      {/* LOADER indicator */}
      {loading && (
        <Typography sx={{ textAlign: "center", py: 3 }}>
          <Loading />
        </Typography>
      )}
    </Box>
  );
};

export default GetAllBooks;
