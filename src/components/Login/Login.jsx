import React, { useState } from "react";
import {
  Button,
  Typography,
  Box,
  TextField,
  Paper,
  Modal,
  Grid,
  InputAdornment,IconButton
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import CeinsysLogo from "../../images/Ceinsys.jpg"; // Main logo
import SignInLogo from "../../images/ceinsysLogo.png"; // Sign-in logo
import BackgroundImage from "../../images/BackgroundImage.png";
import AuthService from "../../Services/AuthService";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    setEmail("");
    setPassword("");
  };

  const onChangeEmail = (e) => setEmail(e.target.value);
  const onChangePassword = (e) => setPassword(e.target.value);
  const handleTogglePasswordVisibility = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };
  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!email.trim() || !password.trim()) {
      toast.warning("Please enter credentials!");
      return;
    }

    try {
      await AuthService.login(email, password);
      const role = sessionStorage.getItem("Role");

      switch (role) {
        case "SUPER_ADMIN":
          navigate("/qmsLibrary");
          break;
        case "ADMIN":
          navigate("/aQmsLibrary");
          break;
        case "USER":
          navigate("/uQmsLibrary");
          break;
        default:
          toast.error("Invalid Role!");
      }
      handleClose(); // Close modal after successful login
    } catch (error) {
      console.error("Login error:", error);
      toast.error("Invalid Credentials!");
    }
  };

  return (
    <Grid container sx={{ height: '100vh', overflow: 'hidden' }}>
      {/* Background Image */}
      <Grid
        item
        xs={12}
        sx={{
          backgroundImage: `url(${BackgroundImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          height: '100%',
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          zIndex: 1,
        }}
      />

      {/* Centered Logo and Button */}
      <Box
        sx={{
          position: 'fixed',
          zIndex: 3,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'space-evenly',

          height: '100%',
          left:"45%",
          marginTop:'1.5%'
        }}
      >
        <img
          src={CeinsysLogo}
          alt="Ceinsys Logo"
          style={{ width: '140px', maxWidth: '100%' }}
        />
        <Button
          variant="contained"
          onClick={handleOpen}
          sx={{
            backgroundColor: "#fcfcfd",
            color: "#000000",
            zIndex: 1,
          
            border: "2px solid rgba(255, 255, 255, 0.3)",
            fontSize: { xs: '0.7rem', sm: '0.8.rem', md: '1rem' }, // Responsive font size
            padding: { xs: '10px 20px', sm: '12px 24px', md: '10px 18px' }, // Responsive padding
            '&:hover': {
              backgroundColor: "rgba(255, 255, 255, 0.3)",
              color: "#ffffff",
              borderColor: "rgba(255, 255, 255, 0.4)",
            },
          }}
        >
          SIGN IN
        </Button>
      </Box>

      {/* Modal for Sign-In */}
      <Modal open={open} onClose={handleClose} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <Paper
          elevation={6}
          sx={{
            width: { xs: '90%', sm: '80%', md: '60%', lg: '50%' },
            maxWidth: '410px',
            padding: 4,
            borderRadius: '0px',
            backdropFilter: 'blur(10px)',
            background: 'linear-gradient(135deg, #3095f0,  #b6bced,#fdf9fd)',
            boxShadow: "0 12px 24px rgba(0, 0, 0, 0.3)",
            border: '1px solid rgba(255, 255, 255, 0.5)',
          }}
        >
          <Box textAlign="center" mb={2}>
            <img src={SignInLogo} alt="Sign In Logo" style={{ width: '80%', maxWidth: '300px' }} />
          </Box>
          <Typography variant="h4" fontWeight="bold" color="#00000" textAlign="center" mb={1}>
            SIGN IN
          </Typography>

          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ width: '100%',  }}>
            <TextField
              margin="normal"
              required
              fullWidth
              label="Email"
              name="email"
              value={email}
              onChange={onChangeEmail}
              autoFocus
              variant="standard"
              sx={textFieldStyles}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={onChangePassword}
              variant="standard"
              sx={textFieldStyles}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleTogglePasswordVisibility}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
            <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center", mt: 3 }}>
              <Button type="submit" variant="contained" sx={buttonStyles}>
                SIGN IN
              </Button>
            </Box>

            <Box>
              <a href="/forgotPassword">Forgot Pasword?</a>
            </Box>
          </Box>
        </Paper>
      </Modal>
      <ToastContainer />
    </Grid>
  );
};

// Styles for TextField
const textFieldStyles = {
  mb: 2,
  '& .MuiInput-underline:before': {
    borderBottomColor: '#5da8e9',
  },
  '&:hover .MuiInput-underline:before': {
    borderBottomColor: '#3a8ad4',
  },
  '& .MuiInput-underline:after': {
    borderBottomColor: '#1a5f8b',
  },
  '& input': {
    color: "black",
  },
};

// Styles for Button
const buttonStyles = {
  backgroundColor: "#569bef",
  color: "#ffffff",
  border: "2px solid rgba(255, 255, 255, 0.5)",
  borderRadius: '0px',
  boxShadow: "none",
  transition: 'all 0.3s ease',
  '&:hover': {
    backgroundColor: "rgba(255, 255, 255, 0.5)",
    borderColor: "rgba(255, 255, 255, 0.7)",
  },
};

export default Login;
