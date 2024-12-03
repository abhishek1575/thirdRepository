import React, { useState } from "react";
import {
  Button,
  Typography,
  Box,
  TextField,
  IconButton,
  InputAdornment,
  Grid,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ceinsysLogo from "../../images/Ceinsys.jpg";
import AuthService from "../../Services/AuthService";

const ForgotPassword = () => {
  let navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const [confirmPassword, setConfirmPassword] = useState("");
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
 

  

  const onChangeUsername = (e) => {
    const email = e.target.value;
    setEmail(email);
  };

  const onChangePassword = (e) => {
    const password = e.target.value;
    setPassword(password);
  };

  const onChangeConfirmPassword = (e) => {
    const password = e.target.value;
    setConfirmPassword(password);
  };
  const handleTogglePasswordVisibility = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };
  const handleToggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword((prevShowPassword) => !prevShowPassword);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    try {
      if (email.trim().length === 0 && password.trim().length === 0) {
        toast.warning("Please Enter Credentials !");
      } else if (email.trim().length === 0) {
        toast.warning("Please Enter Username!");
      } else if (password.trim().length === 0) {
        toast.warning("Please Enter Password!");
      }else if (confirmPassword.trim().length === 0) {
        toast.warning("Please Enter Confirm Password!");
      } else if (password !== confirmPassword) {
        toast.warning("Both Password must be the same!");
      } else {
        const response = AuthService.forgetPassword(email,password);
        toast.success("Password changed Successfuly");
        setTimeout(()=>{
          navigate("/login");
        },2000)
      
      }
    } catch (error) {
      console.error("Error adding user:", error);
      toast.error("Failed to change password!");
    }
  };
  return (
    <Box className="app" sx={{ borderRadius: '0px',
    backdropFilter: 'blur(10px)',
    background: 'linear-gradient(135deg, #3095f0,  #b6bced,#fdf9fd)',backgroundSize: 'cover',
    backgroundPosition: 'center',
    height: '100%',
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',}}>
      <Grid container spacing={0} sx={{overflowY:"auto"}}>
        <Grid item xs={false} md={3} lg={3} xl={3} />
        <Grid
          item
          xs={12}
          md={6}
          lg={6}
          xl={6}
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Box
            sx={{
              bgcolor: "white",
              // border: '2px solid #000',
              boxShadow: 24,
              p: 4,
              width: "100%",
              maxWidth: 400,
              position: "relative",
              // Center the form in the middle of the page on mobile
              "@media (max-width:400px)": {
                position: "static",
                transform: "none",
                mx: "auto",
              },
            }}
          >
          

            {/* Logo */}
            <div style={{ margin: "8px", textAlign: "center" }}>
              <img
                src={ceinsysLogo}
                alt="Logo"
                style={{
                  width: "200px",
                  height: "80px",
                  display: "inline-block",
                }}
              />
            </div>

            <Typography variant="h5" component="h1" textAlign="center">
              Forgot Password?
            </Typography>

            <Box
              component="form"
              noValidate
              onSubmit={handleSubmit}
              sx={{ mt: 1 }}
            >
              <TextField
                margin="normal"
                required
                fullWidth
                label="Email"
                name="email"
                value={email}
                onChange={onChangeUsername}
                autoFocus
                id="email"
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type={showPassword ? "text" : "password"}
                id="password"
                value={password}
                onChange={onChangePassword}
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
          
          <TextField
                  margin="normal"
                  required
                  fullWidth
                  name="confirmPassword"
                  label="confirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  id="confirmPassword"
                  value={confirmPassword}
                  onChange={onChangeConfirmPassword}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={handleToggleConfirmPasswordVisibility}
                          edge="end"
                        >
                          {showConfirmPassword ? (
                            <VisibilityOff />
                          ) : (
                            <Visibility />
                          )}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Button
                  // onClick={handleSubmit}
                  type="submit"
                  variant="contained"
                  sx={{
                    mt: 1,
                    "&:hover": {
                      boxShadow: "0 0 10px 5px rgba(255, 255, 255, 0.5)",
                    },
                  }}
                >
                 Submit
                </Button>
                <ToastContainer />
              </div>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default ForgotPassword;
