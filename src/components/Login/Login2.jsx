// gradient code

// import React, { useState } from "react";
// import {
//   Button,
//   Typography,
//   Box,
//   TextField,
//   IconButton,
//   InputAdornment,
//   Grid,
// } from "@mui/material";
// import { Visibility, VisibilityOff } from "@mui/icons-material";
// import { useNavigate } from "react-router-dom";
// import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";

// import ceinsysLogo from "../../images/ceinsysLogo.png";
// import BackgroundImage from "../../images/BackgroundImage.png";
// import Hello_sign from "../../images/wave.gif";
// import AuthService from "../../Services/AuthService";

// const Login = () => {
//   const navigate = useNavigate();

//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [showPassword, setShowPassword] = useState(false);

//   const onChangeUsername = (e) => setEmail(e.target.value);
//   const onChangePassword = (e) => setPassword(e.target.value);
//   const handleTogglePasswordVisibility = () => setShowPassword((prev) => !prev);

//   const handleSubmit = (event) => {
//     event.preventDefault();

//     if (!email.trim() || !password.trim()) {
//       toast.warning("Please enter credentials!");
//       return;
//     }

//     AuthService.login(email, password)
//       .then(() => {
//         const role = sessionStorage.getItem("Role");
//         switch (role) {
//           case "SUPER_ADMIN":
//             navigate("/qmsLibrary");
//             break;
//           case "ADMIN":
//             navigate("/aQmsLibrary");
//             break;
//           case "USER":
//             navigate("/uQmsLibrary");
//             break;
//           default:
//             toast.error("Invalid Role!");
//         }
//       })
//       .catch((error) => {
//         console.error("Login error:", error);
//         toast.error("Invalid Credentials!");
//       });
//   };

//   return (
//     <Grid container sx={{ height: '100vh' }}>
//       {/* Left side with background image */}
//       <Grid 
//         item 
//         xs={false} 
//         sm={7}
//         md={8} 
//         lg={9}
//         xl={9}
//         sx={{
//           backgroundImage: `url(${BackgroundImage})`,
//           backgroundSize: 'cover',
//           backgroundPosition: 'center',
//           filter: 'brightness(100%)',
//           height: '100%',
//           position: 'relative',
//         }}
//       /> 
      
//       {/* Right side with login form */}
//       <Grid 
//         item 
//         xs={12} 
//         sm={5}
//         md={4} 
//         lg={3}
//         xl={3}
//         alignItems="center" 
//         justifyContent="center" 
//         sx={{ 
//           p: 5, 
//           background: 'linear-gradient(to bottom, #3095f0, #fdf9fd, #b6bced)', 
//           borderRadius: '8px', 
//         }}
//       >
//         <Grid container>
//           <Grid item xs={12} sx={{ display: "flex", flexDirection: "column", justifyContent: "center" }}>
//             <Box textAlign={"center"} mb={5}>
//               <img src={ceinsysLogo} alt="Logo" style={{ width: '100%' }} />
//             </Box>

//             <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '32px' }}>
//               <Typography variant="h4" component="h1" fontWeight="bold" color="#5da8e9">
//                 Welcome!!
//               </Typography>
//               <img alt="User" src={Hello_sign} style={{ width: '48px', height: '48px' }} />
//             </Box>

//             <Typography variant="h5" component="h1" textAlign="center" fontWeight="bold" mb={5}>
//               Sign In
//             </Typography>
            
//             <Box component="form" noValidate onSubmit={handleSubmit}>
//               <TextField
//                 margin="normal"
//                 required
//                 fullWidth
//                 label="Email"
//                 name="email"
//                 value={email}
//                 onChange={onChangeUsername}
//                 autoFocus
//                 id="email"
//               />
//               <TextField
//                 margin="normal"
//                 required
//                 fullWidth
//                 name="password"
//                 label="Password"
//                 type={showPassword ? "text" : "password"}
//                 id="password"
//                 value={password}
//                 onChange={onChangePassword}
//                 InputProps={{
//                   endAdornment: (
//                     <InputAdornment position="end">
//                       <IconButton
//                         aria-label="toggle password visibility"
//                         onClick={handleTogglePasswordVisibility}
//                         edge="end"
//                       >
//                         {showPassword ? <VisibilityOff /> : <Visibility />}
//                       </IconButton>
//                     </InputAdornment>
//                   ),
//                 }}
//               />
              
//               <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center" }} marginTop={5}>
//                 <Button
//                   type="submit"
//                   variant="contained"
//                   sx={{
//                     backgroundColor: "#a386c5",
//                     color: "black",
//                     "&:hover": {
//                       backgroundColor: "#a386c5",
//                       boxShadow: "0 0 10px 5px rgba(255, 255, 255, 0.5)",
//                     },
//                   }}
//                 >
//                   Sign In
//                 </Button>
//               </Box>
              
//               <ToastContainer />
//             </Box>
//           </Grid>
//         </Grid>
//       </Grid> 
//     </Grid>
//   );
// };

// export default Login;


// Blur background //

import React, { useState } from "react";
import {
  Button,
  Typography,
  Box,
  TextField,
  IconButton,
  InputAdornment,
  Grid,
  Paper,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import ceinsysLogo from "../../images/ceinsysLogo.png";
import BackgroundImage from "../../images/BackgroundImage.png";
import AuthService from "../../Services/AuthService";

const Login2 = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const onChangeUsername = (e) => setEmail(e.target.value);
  const onChangePassword = (e) => setPassword(e.target.value);
  const handleTogglePasswordVisibility = () => setShowPassword((prev) => !prev);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (email.trim().length === 0 && password.trim().length === 0) {
      toast.warning("Please Enter Credentials!");
      return;
    }
    if (email.trim().length === 0) {
      toast.warning("Please Enter Username!");
      return;
    }
    if (password.trim().length === 0) {
      toast.warning("Please Enter Password!");
      return;
    }

    try {
      await AuthService.login(email, password);
      const role = sessionStorage.getItem("Role");

      if (role === "SUPER_ADMIN") {
        navigate("/qmsLibrary");
      } else if (role === "ADMIN") {
        navigate("/aQmsLibrary");
      } else if (role === "USER") {
        navigate("/uQmsLibrary");
      } else {
        toast.error("Invalid Role!");
      }
    } catch (error) {
      console.error("Login error:", error);
      toast.error("Invalid Credentials!");
    }
  };

  return (
    <Grid container sx={{ height: '100vh', overflow: 'hidden' }}>
      {/* Background with blur effect */}
      <Grid
        item
        xs={12}
        sx={{
          backgroundImage: `url(${BackgroundImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          filter: 'blur(8px)',
          height: '100%',
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          zIndex: 1,
        }}
      >
        {/* Dark overlay */}
        <Box
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            zIndex: 2,
          }}
        />
      </Grid>

      {/* Centered Sign-In Box */}
      <Grid
        item
        xs={12}
        container
        alignItems="center"
        justifyContent="center"
        sx={{ position: 'relative', zIndex: 3 }}
      >
        <Paper
          elevation={6}
          sx={{
            width: { xs: '90%', sm: '80%', md: '60%', lg: '50%' },
            maxWidth: '400px',
            height: 'auto',
            maxHeight: '90vh',
            overflow: 'hidden',
            padding: 4,
            borderRadius: '0px',
            background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.3), rgba(0, 0, 0, 0.3))',
            backdropFilter: 'blur(10px)',
            boxShadow: "0 12px 24px rgba(0, 0, 0, 0.3)",
            border: '1px solid rgba(255, 255, 255, 0.5)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            position: 'relative',
            mx: { xs: 2, sm: 3, md: 4 },
            my: { xs: 3, sm: 4, md: 5 },
          }}
        >
          <Box textAlign="center" mb={2}>
            <img
              src={ceinsysLogo}
              alt="Logo"
              style={{ width: '80%', maxWidth: '300px' }}
            />
          </Box>
          <Typography 
            variant="h4" 
            component="h1" 
            fontWeight="bold" 
            color="#ffffff"
            fontFamily="'Times New Roman', serif"
            textAlign="center" 
            mb={2}
            sx={{ fontSize: { xs: '1.8rem', sm: '2.2rem', md: '2.5rem' } }}
          >
            WELCOME!
          </Typography>
          <Typography 
            variant="h5" 
            component="h1" 
            textAlign="center" 
            fontWeight="bold" 
            mb={3} 
            color="#ffffff"
            fontFamily="'Times New Roman', serif"
            sx={{ fontSize: { xs: '1.5rem', sm: '1.8rem', md: '2rem' } }}
          >
            SIGN IN
          </Typography>
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ width: '100%', px: 2 }}>
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
              variant="standard"
              sx={{
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
                  fontFamily: "'Times New Roman', serif",
                  fontSize: { xs: '1rem', sm: '1.1rem', md: '1.2rem' },
                },
                '& .MuiInputBase-input': {
                  backgroundColor: 'transparent',
                },
              }}
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
              variant="standard"
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleTogglePasswordVisibility}
                      edge="end"
                      sx={{ 
                        p: 0, 
                        ml: 1,  // Add margin to the left to ensure it doesn't overlap
                        '&:hover': { 
                          backgroundColor: 'transparent',
                        } 
                      }}
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              sx={{
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
                  fontFamily: "'Times New Roman', serif",
                  fontSize: { xs: '1rem', sm: '1.1rem', md: '1.2rem' },
                  pr: '3rem',  // Ensure enough padding to accommodate the visibility icon
                },
                '& .MuiInputBase-input': {
                  backgroundColor: 'transparent',
                },
              }}
            />
            <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center", mt: 3 }}>
              <Button
                type="submit"
                variant="contained"
                sx={{
                  backgroundColor: "rgba(255, 255, 255, 0.2)",
                  color: "#d0d0d0",
                  border: "2px solid rgba(255, 255, 255, 0.3)",
                  borderRadius: '0px',
                  boxShadow: "none",
                  transition: 'all 0.3s ease',
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
          </Box>
        </Paper>
      </Grid>
      <ToastContainer />
    </Grid>
  );
};

export default Login2;

// import React, { useState } from "react";
// import {
//   Button,
//   Typography,
//   Box,
//   TextField,
//   IconButton,
//   InputAdornment,
//   Grid,
//   Paper,
//   Modal,
// } from "@mui/material";
// import { Visibility, VisibilityOff } from "@mui/icons-material";
// import { useNavigate } from "react-router-dom";
// import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";

// import CeinsysLogo from "../../images/Ceinsys.jpg"; // Main logo
// import SignInLogo from "../../images/ceinsysLogo.png"; // Sign-in logo
// import BackgroundImage from "../../images/BackgroundImage.png";
// import AuthService from "../../Services/AuthService";

// const Login = () => {
//   const navigate = useNavigate();
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [showPassword, setShowPassword] = useState(false);
//   const [open, setOpen] = useState(false);

//   const handleOpen = () => setOpen(true);
//   const handleClose = () => {
//     setOpen(false);
//     setEmail("");
//     setPassword("");
//   };

//   const onChangeEmail = (e) => setEmail(e.target.value);
//   const onChangePassword = (e) => setPassword(e.target.value);
//   const handleTogglePasswordVisibility = () => setShowPassword((prev) => !prev);

//   const handleSubmit = async (event) => {
//     event.preventDefault();

//     if (!email.trim() || !password.trim()) {
//       toast.warning("Please enter credentials!");
//       return;
//     }

//     try {
//       await AuthService.login(email, password);
//       const role = sessionStorage.getItem("Role");

//       switch (role) {
//         case "SUPER_ADMIN":
//           navigate("/qmsLibrary");
//           break;
//         case "ADMIN":
//           navigate("/aQmsLibrary");
//           break;
//         case "USER":
//           navigate("/uQmsLibrary");
//           break;
//         default:
//           toast.error("Invalid Role!");
//       }
//       handleClose(); // Close modal after successful login
//     } catch (error) {
//       console.error("Login error:", error);
//       toast.error("Invalid Credentials!");
//     }
//   };

//   return (
//     <Grid container sx={{ height: '100vh', overflow: 'hidden' }}>
//       {/* Background Image */}
//       <Grid
//         item
//         xs={12}
//         sx={{
//           backgroundImage: `url(${BackgroundImage})`,
//           backgroundSize: 'cover',
//           backgroundPosition: 'center',
//           height: '100%',
//           position: 'absolute',
//           top: 0,
//           left: 0,
//           width: '100%',
//           zIndex: 1,
//         }}
//       />

//       {/* Logo and Welcome Text */}
//       <Box sx={{ position: 'absolute', top: '300px', left: '0', right: '0', textAlign: 'center', zIndex: 3 }}>
//         <img src={CeinsysLogo} alt="Ceinsys Logo" style={{ width: '150px', marginBottom: '30px' }} />
//       </Box>

//       {/* Centered Sign-In Button */}
//       <Grid
//         item
//         xs={12}
//         container
//         alignItems="center"
//         justifyContent="center"
//         sx={{ position: 'relative', zIndex: 3, marginTop: '400px' }} // Increased marginTop for the button
//       >
//         <Button
//           variant="contained"
//           onClick={handleOpen}
//           sx={{
//             backgroundColor: "rgba(255, 255, 255, 0.2)",
//             color: "#d0d0d0",
//             border: "2px solid rgba(255, 255, 255, 0.3)",
//             borderRadius: '0px',
//             boxShadow: "none",
//             transition: 'all 0.3s ease',
//             padding: '1px 20px',
//             minWidth: '200px',
//             fontSize: { xs: '0.9rem', sm: '1.0rem', md: '1.4rem' },
//             '&:hover': {
//               backgroundColor: "rgba(255, 255, 255, 0.3)",
//               color: "#ffffff",
//               borderColor: "rgba(255, 255, 255, 0.4)",
//             },
//           }}
//         >
//           SIGN IN
//         </Button>
//       </Grid>

//       {/* Modal for Sign-In */}
//       <Modal open={open} onClose={handleClose} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
//         <Paper
//           elevation={6}
//           sx={{
//             width: { xs: '90%', sm: '80%', md: '60%', lg: '50%' },
//             maxWidth: '400px',
//             padding: 4,
//             borderRadius: '0px',
//             backdropFilter: 'blur(8px)',
//             backgroundColor: '#78c1d1',
//             boxShadow: "0 12px 24px rgba(0, 0, 0, 0.3)",
//             border: '1px solid rgba(255, 255, 255, 0.5)',
//           }}
//         >
//           <Box textAlign="center" mb={2}>
//             <img src={SignInLogo} alt="Sign In Logo" style={{ width: '80%', maxWidth: '300px' }} />
//           </Box>

//           <Typography variant="h5" textAlign="center" fontWeight="bold" mb={1} color="#ffffff">
//             QMS PORTAL
//           </Typography>
//           <Typography variant="h5" textAlign="center" fontWeight="bold" mb={3} color="#ffffff">
//             Process Asset Library
//           </Typography>
//           <Typography variant="h4" fontWeight="bold" color="#ffffff" textAlign="center" mb={1}>
//             SIGN IN
//           </Typography>

//           <Box component="form" noValidate onSubmit={handleSubmit} sx={{ width: '100%', px: 2 }}>
//             <TextField
//               margin="normal"
//               required
//               fullWidth
//               label="Email"
//               name="email"
//               value={email}
//               onChange={onChangeEmail}
//               autoFocus
//               variant="standard"
//               sx={textFieldStyles}
//             />
//             <TextField
//               margin="normal"
//               required
//               fullWidth
//               name="password"
//               label="Password"
//               type={showPassword ? "text" : "password"}
//               value={password}
//               onChange={onChangePassword}
//               variant="standard"
//               InputProps={{
//                 endAdornment: (
//                   <InputAdornment position="end">
//                     <IconButton
//                       aria-label="toggle password visibility"
//                       onClick={handleTogglePasswordVisibility}
//                       edge="end"
//                     >
//                       {showPassword ? <VisibilityOff /> : <Visibility />}
//                     </IconButton>
//                   </InputAdornment>
//                 ),
//               }}
//               sx={textFieldStyles}
//             />
//             <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center", mt: 3 }}>
//               <Button type="submit" variant="contained" sx={buttonStyles}>
//                 SIGN IN
//               </Button>
//             </Box>
//           </Box>
//         </Paper>
//       </Modal>
//       <ToastContainer />
//     </Grid>
//   );
// };

// // Styles for TextField
// const textFieldStyles = {
//   mb: 2,
//   '& .MuiInput-underline:before': {
//     borderBottomColor: '#5da8e9',
//   },
//   '&:hover .MuiInput-underline:before': {
//     borderBottomColor: '#3a8ad4',
//   },
//   '& .MuiInput-underline:after': {
//     borderBottomColor: '#1a5f8b',
//   },
//   '& input': {
//     fontFamily: "'Times New Roman', serif",
//     color: "#ffffff",
//   },
// };

// // Styles for Button
// const buttonStyles = {
//   backgroundColor: "rgba(255, 255, 255, 0.3)",
//   color: "#ffffff",
//   border: "2px solid rgba(255, 255, 255, 0.5)",
//   borderRadius: '0px',
//   boxShadow: "none",
//   transition: 'all 0.3s ease',
//   '&:hover': {
//     backgroundColor: "rgba(255, 255, 255, 0.5)",
//     borderColor: "rgba(255, 255, 255, 0.7)",
//   },
// };

// export default Login;









