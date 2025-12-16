import React, { useEffect, useState } from "react";
import axiosInstance from "../../Instance/axiosInstance";

import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Chip from "@mui/material/Chip";

// Styled Components
const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.common.white,
    fontWeight: "bold",
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

const MyReturnList = () => {
  const [borrows, setBorrows] = useState([]);

  const fetchBorrowedBooks = async () => {
    try {
      const res = await axiosInstance.get("/borrow/my-borrows");

      if (res.data.success) {
        setBorrows(res.data.data);
      } else {
        console.error("Failed:", res.data.message);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchBorrowedBooks();
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <h2>My Borrowed Books</h2>
      <h3>Total Borrowed Books: {borrows.length}</h3>

      {borrows.length === 0 ? (
        <p>You have not borrowed any books.</p>
      ) : (
        <TableContainer component={Paper} sx={{ marginTop: 2 }}>
          <Table sx={{ minWidth: 700 }} aria-label="borrowed books table">
            <TableHead>
              <TableRow>
                <StyledTableCell>Book ID</StyledTableCell>
                <StyledTableCell>Book Name</StyledTableCell>
                <StyledTableCell>Borrow Date</StyledTableCell>
                <StyledTableCell>Return Date</StyledTableCell>
                <StyledTableCell>Status</StyledTableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {borrows.map((item) => (
                <StyledTableRow key={item._id}>
                  <StyledTableCell>
                    {item.bookId?._id || item.bookId}
                  </StyledTableCell>

                  <StyledTableCell>
                    {item.bookId?.title || item.bookTitle || "Unknown"}
                  </StyledTableCell>

                  <StyledTableCell>
                    {new Date(item.borrowDate).toLocaleDateString()}
                  </StyledTableCell>

                  <StyledTableCell>
                    {item.returnDate
                      ? new Date(item.returnDate).toLocaleDateString()
                      : "Not Returned"}
                  </StyledTableCell>

                  <StyledTableCell>
                    <Chip
                      label={item.returnDate ? "Returned" : "Borrowed"}
                      color={item.returnDate ? "success" : "error"}
                      size="small"
                    />
                  </StyledTableCell>
                </StyledTableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </div>
  );
};

export default MyReturnList;