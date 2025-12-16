import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import MenuIcon from '@mui/icons-material/Menu';
import { useMediaQuery } from '@mui/material';
import { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { toast } from 'react-toastify';

export default function SearchAppBar() {
  const navigate = useNavigate();
  const [role, setRole] = useState<string | null>(null);
  const isMobile = useMediaQuery("(max-width:600px)");

  useEffect(() => {
    const updateRole = () => setRole(localStorage.getItem("role"));
    window.addEventListener("roleChanged", updateRole);
    updateRole();
    return () => window.removeEventListener("roleChanged", updateRole);
  }, []);

  const logout = () => {
    localStorage.removeItem("role");
    window.dispatchEvent(new Event("roleChanged"));
    toast.success("Logout Successfully", { autoClose: 2000 });
    navigate("/");
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>

          {/* Desktop = Before Login + Left Side  */}
          <IconButton size="large" edge="start" color="inherit" aria-label="menu" sx={{ mr: 2 }}>
            <MenuIcon />
          </IconButton>

          {!isMobile && (
            <Typography variant="h6" noWrap>
              Health Care
            </Typography>
          )}

          {/* Desktop = Before Login + Right Side  */}
          <Box sx={{ ml: "auto", display: "flex", gap: 1 }}>
            {!role && (
              <>
                <Button color="inherit" component={Link} to="/user/login">
                  Login
                </Button>
                <Button color="inherit" component={Link} to="/user/register">
                  Register
                </Button>
              </>
            )}

            {/* Login After  */}
            {role && (
              <Button color="inherit" onClick={logout}>
                Logout
              </Button>
            )}
          </Box>

        </Toolbar>
      </AppBar>
    </Box>
  );
}
