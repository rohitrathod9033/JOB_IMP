import React, { useEffect, useState } from "react";
import axiosInstance from "../../Instance/axiosInstance";
import { toast } from "react-toastify";


import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 14,
    },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    '&:last-child td, &:last-child th': {
        border: 0,
    },
}));




const ViewBorrow = () => {
    const [borrowedBooks, setBorrowedBooks] = useState([]);

    const fetchBorrowedBooks = async () => {
        try {
            const borrowRes = await axiosInstance.get("/borrow/all");
            if (borrowRes.data.success) {
                setBorrowedBooks(borrowRes.data.data);
            } else {
                toast.error("Failed to fetch borrow records");
            }
        } catch (error) {
            toast.error(error?.response?.data?.message || "Server Error");
        }
    };

    useEffect(() => {
        fetchBorrowedBooks();
    }, []);







    function createData(name, calories, fat, carbs, protein) {
        return { name, calories, fat, carbs, protein };
    }

    const rows = [
        createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
        createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
        createData('Eclair', 262, 16.0, 24, 6.0),
        createData('Cupcake', 305, 3.7, 67, 4.3),
        createData('Gingerbread', 356, 16.0, 49, 3.9),
    ];


    return (

        <>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 700 }} aria-label="customized table">
                    <TableHead>
                        <TableRow>
                            <StyledTableCell>Book Name</StyledTableCell>
                            <StyledTableCell align="right">User Name</StyledTableCell>
                            <StyledTableCell align="right">Borrow Date</StyledTableCell>
                            <StyledTableCell align="right">Return Date</StyledTableCell>
                            <StyledTableCell align="right">Status</StyledTableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {borrowedBooks.map((row) => (
                            <StyledTableRow key={row._id}>
                                <StyledTableCell component="th" scope="row">
                                    {row.bookId?.title || "Unknown Book"}
                                </StyledTableCell>
                                <StyledTableCell align="right">{row.userId?.name || "Unknown User"}</StyledTableCell>
                                <StyledTableCell align="right">{new Date(row.borrowDate).toLocaleDateString()}</StyledTableCell>
                                <StyledTableCell align="right">{row.returnDate ? new Date(row.returnDate).toLocaleDateString() : "Not Returned"}</StyledTableCell>
                                <StyledTableCell align="right">{row.status === "returned" ? "green" : "red"}{row.status}</StyledTableCell>
                            </StyledTableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

        </>
    );
};

export default ViewBorrow;
