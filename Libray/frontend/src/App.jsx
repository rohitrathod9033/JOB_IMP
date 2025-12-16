import { Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Home from "./Page/User/Home";
import Navbar from "./Components/Navbar";

// User
import Login from "./Page/User/Login";
import Register from "./Page/User/Register";

// Admin + User Preview
import AdminPreview from "./Page/Admin/AdminPreview";
import UserPreview from "./Page/User/UserPreview";

// Dashboard 
import AdminDashboard from "./Dashboard/AdminDashboard";
import UserDashboard from "./Dashboard/UserDashboard";

// Admin + Books Pages
import AddBook from "./Page/Admin/AddBook";
import GetAllBooks from "./Page/Admin/GetAllBooks";
import UpdateBook from "./Page/Admin/UpdateBook";
import DeleteBook from "./Page/Admin/DeleteBook";

// User + Books
import UserBorrow from "./Page/User/UserBorrow";
import UserReturn from "./Page/User/UserReturn";
import MyBorrowList from "./Page/User/MyBorrowList";
import AvailableBooks from "./Page/User/AvailableBooks";

import ViewBorrow from "./Page/Admin/ViewBorrow";
import Footer from "./Components/Footer";

// Protected Routes
import AdminProtected from "./Page/Admin/AdminProtected";
import UserProtected from "./Page/User/UserProtected";


export default function App() {
  return (
    <>
      <ToastContainer />
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Admin Protected Routes ------------------------------------------------*/}
        <Route
          path="/admin"
          element={
            <AdminProtected>
              <AdminPreview />
            </AdminProtected>
          } />

        <Route
          path="/admin/dashboard"
          element={
            <AdminProtected>
              <AdminDashboard />
            </AdminProtected>
          } />

        <Route
          path="/admin/dashboard/GetAllBorrowedData"
          element={
            <AdminProtected>
              <ViewBorrow />
            </AdminProtected>
          } />

        <Route
          path="/admin/addBook"
          element={
            <AdminProtected>
              <AddBook />
            </AdminProtected>
          }
        />

        <Route
          path="/admin/getAllBooks"
          element={
            <AdminProtected>
              <GetAllBooks />
            </AdminProtected>
          }
        />

        <Route
          path="/admin/updateBook/:id?"
          element={
            <AdminProtected>
              <UpdateBook />
            </AdminProtected>
          }
        />

        <Route
          path="/admin/deleteBook/:id?"
          element={
            <AdminProtected>
              <DeleteBook />
            </AdminProtected>
          }
        />


        {/* User Protected Routes ------------------------------------------------------*/}
        <Route
          path="/user"
          element={
            <UserProtected>
              <UserPreview />
            </UserProtected>
          } />

        <Route
          path="/user/dashboard/"
          element={
            <UserProtected>
              <UserDashboard />
            </UserProtected>
          } />

        <Route
          path="/user/borrowBook"
          element={
            <UserProtected>
              <UserBorrow />
            </UserProtected>
          }
        />

        <Route
          path="/user/returnBook"
          element={
            <UserProtected>
              <UserReturn />
            </UserProtected>
          }
        />

        <Route
          path="/user/my-borrows"
          element={
            <UserProtected>
              <MyBorrowList />
            </UserProtected>
          }
        />

        <Route
          path="/user/dashboard/GetAvailableBooks"
          element={
            <UserProtected>
              <AvailableBooks />
            </UserProtected>
          }
        />
        {/* --------------------------------------------------------------------------------------  */}


        {/* Books + Admin*/}
        <Route path="/admin/addBook" element={<AddBook />} />
        <Route path="/admin/getAllBooks" element={<GetAllBooks />} />
        <Route path="/admin/updateBook/:id?" element={<UpdateBook />} />
        <Route path="/admin/deleteBook/:id?" element={<DeleteBook />} />

        {/* Books + User*/}
        <Route path="/user/borrowBook" element={<UserBorrow />} />
        <Route path="/user/returnBook" element={<UserReturn />} />
        <Route path="/user/my-borrows" element={<MyBorrowList />} />

        // User Dashboard
        <Route path="/user/dashboard" element={<UserDashboard />} />
        <Route path="/user/dashboard/GetAvailableBooks" element={<AvailableBooks />} />

        // Admin Dashboard
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
        <Route path="/admin/dashboard/GetAllBorrowedData" element={<ViewBorrow />} />


      </Routes>
      <Footer />
    </>
  );
}
