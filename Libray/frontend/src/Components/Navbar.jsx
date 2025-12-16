import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import useMediaQuery from "@mui/material/useMediaQuery";

export default function Navbar() {
    const [role, setRole] = useState(null);
    const navigate = useNavigate();
    const isMobile = useMediaQuery("(max-width:600px)");
    const [openDrawer, setOpenDrawer] = useState(false);

    useEffect(() => {
        const updateRole = () => setRole(localStorage.getItem("role"));
        window.addEventListener("roleChanged", updateRole);
        updateRole();
        return () => window.removeEventListener("roleChanged", updateRole);
    }, []);

    const logout = () => {
        localStorage.removeItem("role");
        window.dispatchEvent(new Event("roleChanged"));
        navigate("/");
        toast.success("Logout Successfully", { position: "top-right", autoClose: 2000 });
    };

    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="sticky">
                <Toolbar>

                    {/* Desktop Preview  */}
                    {/* Before Login  */}
                    {!isMobile ? role === null && (
                        <>
                            <Typography variant="h6" sx={{ flexGrow: 1 }}>
                                Library Management System
                            </Typography>
                            <Link to="/login" style={{ textDecoration: "none", color: "white" }}>
                                <Button size="small" sx={{ mr: 2, color: "white" }}>Login</Button>
                            </Link>

                            <Link to="/register" style={{ textDecoration: "none", color: "white" }}>
                                <Button size="small" sx={{ mr: 2, color: "white" }}>Register</Button>
                            </Link>
                        </>
                    ) : ""}

                    {/* After Login  */}
                    {/* Login + Member + Desktop  */}
                    {!isMobile && role === "member" && (
                        <>
                            <Typography variant="h6" sx={{ flexGrow: 1 }}>
                                Library Management System
                            </Typography>

                            <Link to="/user/dashboard" style={{ textDecoration: "none", color: "white" }}>
                                <Button size="small" sx={{ mr: 2, color: "white" }}>User Dashboard</Button>
                            </Link>

                            <Button size="small" color="error" variant="contained" onClick={logout}>
                                Logout
                            </Button>
                        </>
                    )}

                    {/* Login + Admin + Desktop  */}

                    {!isMobile && role === "admin" && (
                        <>
                            <Typography variant="h6" sx={{ flexGrow: 1 }}>
                                Library Management System
                            </Typography>

                            <Link to="/admin/dashboard" style={{ textDecoration: "none", color: "white" }}>
                                <Button size="small" sx={{ mr: 2, color: "white" }}>Admin Dashboard</Button>
                            </Link>

                            <Button size="small" color="error" variant="contained" onClick={logout}>
                                Logout
                            </Button>
                        </>
                    )}



                    {/* ------------- Mobile Preview -------------  */}
                    {/* Before Login  */}

                    {isMobile && role === null && (
                        <>
                            <IconButton
                                size="large"
                                edge="start"
                                color="inherit"
                                sx={{ mr: 1 }}
                                onClick={() => setOpenDrawer(true)}>
                                <MenuIcon />
                            </IconButton>

                            {/* Left + Right  */}
                            {isMobile && <Box sx={{ flexGrow: 1 }} />}


                            <Link to="/login" style={{ textDecoration: "none", color: "white" }}>
                                <Button size="small" sx={{ mr: 2, color: "white" }}>Login</Button>
                            </Link>

                            <Link to="/register" style={{ textDecoration: "none", color: "white" }}>
                                <Button size="small" sx={{ mr: 2, color: "white" }}>Register</Button>
                            </Link>
                        </>
                    )}


                    {/* After Login  */}
                    {/* if User Login  */}

                    {isMobile && role === "member" && (
                        <>
                            <IconButton
                                size="large"
                                edge="start"
                                color="inherit"
                                sx={{ mr: 1 }}
                                onClick={() => setOpenDrawer(true)}
                            >
                                <MenuIcon />
                            </IconButton>

                            {/* Left + Right  */}
                            {isMobile && <Box sx={{ flexGrow: 1 }} />}


                            <Link to="/user" style={{ textDecoration: "none", color: "white" }}>
                                <Button size="small" sx={{ mr: 2, color: "white" }}>User Dashboard</Button>
                            </Link>

                            <Button size="small" color="error" variant="contained" onClick={logout}>
                                Logout
                            </Button>
                        </>
                    )}

                    {/* if Admin Login  */}

                    {isMobile && role === "admin" && (
                        <>
                            <IconButton
                                size="large"
                                edge="start"
                                color="inherit"
                                sx={{ mr: 1 }}
                                onClick={() => setOpenDrawer(true)}
                            >
                                <MenuIcon />
                            </IconButton>

                            {/* Left + Right  */}
                            {isMobile && <Box sx={{ flexGrow: 1 }} />}


                            <Link to="/admin" style={{ textDecoration: "none", color: "white" }}>
                                <Button size="small" sx={{ mr: 2, color: "white" }}>Admin Dashboard</Button>
                            </Link>

                            <Button size="small" color="error" variant="contained" onClick={logout}>
                                Logout
                            </Button>
                        </>
                    )}


                </Toolbar>
            </AppBar>



            {/* MOBILE DRAWER */}
            <Drawer anchor="left" open={openDrawer} onClose={() => setOpenDrawer(false)}>
                <Box sx={{ width: 250 }}>
                    <List>

                        <ListItem disablePadding>
                            <ListItemButton component={Link} to="/" onClick={() => setOpenDrawer(false)}>
                                <ListItemText primary="Home" />
                            </ListItemButton>
                        </ListItem>

                        {!role && (
                            <>
                                <ListItem disablePadding>
                                    <ListItemButton component={Link} to="/login" onClick={() => setOpenDrawer(false)}>
                                        <ListItemText primary="Login" />
                                    </ListItemButton>
                                </ListItem>

                                <ListItem disablePadding>
                                    <ListItemButton component={Link} to="/register" onClick={() => setOpenDrawer(false)}>
                                        <ListItemText primary="Register" />
                                    </ListItemButton>
                                </ListItem>
                            </>
                        )}

                        {role === "admin" && (
                            <ListItem disablePadding>
                                <ListItemButton component={Link} to="/admin" onClick={() => setOpenDrawer(false)}>
                                    <ListItemText primary="Admin Dashboard" />
                                </ListItemButton>
                            </ListItem>
                        )}

                        {role === "member" && (
                            <ListItem disablePadding>
                                <ListItemButton component={Link} to="/user" onClick={() => setOpenDrawer(false)}>
                                    <ListItemText primary="User Dashboard" />
                                </ListItemButton>
                            </ListItem>
                        )}

                        {role && (
                            <ListItem disablePadding>
                                <ListItemButton onClick={() => { setOpenDrawer(false); logout(); }}>
                                    <ListItemText primary="Logout" />
                                </ListItemButton>
                            </ListItem>
                        )}
                    </List>
                </Box>
            </Drawer>


        </Box>
    );
}
