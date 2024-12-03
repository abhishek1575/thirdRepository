import {
  Badge,
  Box,
  Button,
  Divider,
  Grid,
  IconButton,
  InputAdornment,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  MenuList,
  Modal,
  Paper,
  TextField,
  Tooltip,
  Typography,
  Drawer,
  List,
  ListItem,
} from "@mui/material";
import PeopleAltOutlinedIcon from '@mui/icons-material/PeopleAltOutlined';
import DescriptionIcon from '@mui/icons-material/Description';
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import MailOutlineIcon from '@mui/icons-material/MailOutline'; // Import the Mail icon
import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import ceinsysLogo from "../../images/Ceinsys.jpg";
import { Link, useLocation, useNavigate } from "react-router-dom";
import DownloadIcon from '@mui/icons-material/Download';
import LogoutIcon from "@mui/icons-material/Logout";
import ManageAccountsOutlinedIcon from "@mui/icons-material/ManageAccountsOutlined";
import React, { useEffect, useState } from "react";
import AuthService from "../../Services/AuthService";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import CloseIcon from "@mui/icons-material/Close";
import SuperAdminService from "../../Services/superadmin";
import { toast } from "react-toastify";
import NotificationService from "../../Services/NotificationService";
import HistoryOutlinedIcon from "@mui/icons-material/HistoryOutlined";
import ArrowBackOutlinedIcon from "@mui/icons-material/ArrowBackOutlined";
const Topbar = () => {
  const [menuAnchor, setMenuAnchor] = useState(null);
  const [openModal, setOpenModal] = useState(false);
  const [oldPassword, setPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [openDrawer, setOpenDrawer] = useState(false);
  const location = useLocation();
  let navigate = useNavigate();

  const [count, setCount] = useState(0);

  //State for NotificationAcchor
  const [notiAnchor, setNotiAnchor] = useState(null);

  //Notifications
  const [data, setData] = useState([]);

  //History
  const [history, setHistory] = useState([]);

  useEffect(() => {
    NotificationService.unReadCount(id)
      .then((response) => {
        // Now you can use the count value
        setCount(response.data);
        console.log("Unread notification count:", count);
      })
      .catch((error) => {
        console.error("Error fetching notification count:", error);
      });
  }, [notiAnchor]);
  const toggleDrawer = (open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    setOpenDrawer(open);
  };

  const [expanded, setExpanded] = useState(false);

  const toggleExpanded = () => {
    setExpanded(!expanded);
  };
  // Function to open the menu

  const handleMenuOpen = (event) => {
    setMenuAnchor(event.currentTarget);
  };

  // Function to close the menu
  const handleMenuClose = () => {
    setMenuAnchor(null);
  };
  const handleLogout = () => {
    console.log("Logged out");
    AuthService.logout().then(() => {
      navigate("/");
    });
  };
  const idString = sessionStorage.getItem("UserId"); // Retrieves the UserId as a string
  const id = Number(idString);
  var fullname = sessionStorage.getItem("Name");
  var email = sessionStorage.getItem("Email");
  var Role = sessionStorage.getItem("Role");

  const handleOpenModal = () => {
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const onChangePassword = (e) => {
    const password = e.target.value;
    setPassword(password);
  };
  const onChangeNewPassword = (e) => {
    const password = e.target.value;
    setNewPassword(password);
  };

  const onChangeConfirmPassword = (e) => {
    const password = e.target.value;
    setConfirmPassword(password);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (oldPassword.trim().length === 0 && newPassword.trim().length === 0) {
        toast.warning("Please Enter passwords !");
      } else if (oldPassword.trim().length === 0) {
        toast.warning("Please Enter Old Password!");
      } else if (newPassword.trim().length === 0) {
        toast.warning("Please Enter New Password!");
      } else if (confirmPassword.trim().length === 0) {
        toast.warning("Please Enter Confirm Password!");
      } else if (newPassword !== confirmPassword) {
        toast.warning("Both Password must be the same!");
      } else {
        const response = SuperAdminService.changePassword(
          id,
          oldPassword,
          newPassword
        );
        // We have to check the staus code for ailed request.
        console.log("status code", (await response).status);
        if ((await response).status === 200) {
          toast.success("User password changed successfully!");
          handleCloseModal();
        } else {
          toast.error(
            `Failed to change password: ${
              (await response).data || "Unknown error"
            }`
          );
        }
        handleCloseModal();
      }
    } catch (error) {
      console.error("Error  Change Password:", error);
      toast.error("Failed to change Password!");
    }
  };

  const handleTogglePasswordVisibility = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  const handleToggleNewPasswordVisibility = () => {
    setShowNewPassword((prevShowPassword) => !prevShowPassword);
  };

  const handleToggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword((prevShowPassword) => !prevShowPassword);
  };
  const ChangePasswordModal = (
    <Modal
      open={openModal}
      onClose={handleCloseModal}
      aria-labelledby="add-user-modal"
      aria-describedby="modal-to-add-new-user"
      sx={{ zIndex: 999991 }}
    >
      <Grid
        container
        // alignItems="flex-start"
        sx={{
          height: "100%",
          width: "100%",
          justifyContent: "center",
          alignItems: "center",
          overflowY: "auto",
        }}
      >
        <Grid item xs={8} sm={6} md={5} lg={4} xl={4}>
          <Paper
            elevation={3}
            style={{
              width: "100%",
              border: "4px solid #579aef",
              justifyContent: "center",
              alignItems: "center",
              overflowY: "auto",
            }}
          >
            <Box
              component="form"
              noValidate
              onSubmit={handleSubmit}
              sx={{ alignItems: "center" }}
            >
              <Box
                display={"flex"}
                flexDirection={"row"}
                justifyContent={"space-between"}
                // backgroundColor={"#CDF0EA"}
                // boxShadow={5}
              >
                <Box
                  className="textname"
                  sx={{
                    padding: "20px",
                    fontSize: {
                      xs: "16px",
                      sm: "24px",
                      md: "28px",
                      xl: "30px",
                    },
                  }}
                >
                  <span>Do you want to change password?</span>
                </Box>
                <Box>
                  <IconButton onClick={handleCloseModal}>
                    <CloseIcon />
                  </IconButton>
                </Box>
              </Box>
              <Box sx={{ padding: "20px" }}>
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  name="oldPassword"
                  label="Old Password"
                  type={showPassword ? "text" : "password"}
                  id="oldPassword"
                  value={oldPassword}
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
                  name="newPassword"
                  label="newPassword"
                  type={showNewPassword ? "text" : "password"}
                  id="newPassword"
                  value={newPassword}
                  onChange={onChangeNewPassword}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={handleToggleNewPasswordVisibility}
                          edge="end"
                        >
                          {showNewPassword ? <VisibilityOff /> : <Visibility />}
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

                <Button
                  type="submit"
                  variant="contained"
                  sx={{
                    mt: 1,
                    backgroundColor: "#d1d2f2",
                    color: "Black",
                    "&:hover": {
                     backgroundColor: "#d9d9f5", // Apply box shadow
                    },
                    margin: "0 auto", // Center the button horizontally
                  }}
                >
                  Reset
                </Button>
              </Box>
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </Modal>
  );

  const truncateText = (text, maxLength) => {
    if (text.length > maxLength) {
      return text.substring(0, maxLength - 3) + "..."; // Truncate text and add ellipsis
    } else {
      return text;
    }
  };

  // Function to open the NotificationAcchor
  const handleNotificationOpen = (event) => {
    NotificationService.unReadNotification(id)
      .then((response) => {
        setData(response.data);
        console.log(data);
      })
      .catch((error) => {
        console.error("Error fetching users:", error);
      });

    NotificationService.getHistory(id)
      .then((response) => {
        setHistory(response.data);
        console.log(history);
      })
      .catch((error) => {
        console.error("Error fetching users:", error);
      });

    setNotiAnchor(event.currentTarget);
  };

  // Function to close the NotificationAcchor
  const handleNotificationClose = () => {
    setNotiAnchor(null);
  };

  const renderMenuItems = () => {
    if (data === null || data.length === 0) {
      return (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100%",
          }}
        >
          <Typography>No Records Available</Typography>
        </Box>
      ); // Return null when there are no records
    }

    return data.map((item, index) => (
      <React.Fragment key={index}>
        <MenuItem onClick={toggleExpanded}>
          <ListItemText
            primary={
              <Typography
                variant="body2"
                sx={{
                  whiteSpace: "pre-line",
                  maxHeight: expanded ? "none" : 80,
                  overflowY: "auto",
                }} // Allow scrolling if expanded
                dangerouslySetInnerHTML={{
                  __html: expanded
                    ? item.message.replace(/\n/g, "<br>")
                    : truncateText(item.message.replace(/\n/g, "<br>"), 50),
                }} // Replace \n with <br> and apply HTML dangerously
              />
            }
            secondary={
              <Typography variant="caption">
                {new Date(item.Date).toLocaleString()}
              </Typography>
            }
          />
        </MenuItem>
        {index < data.length - 1 && <Divider />}
      </React.Fragment>
    ));
  };

  const renderHistoryItems = () => {
    // Placeholder logic to render history items
    if (history === null || history.length === 0) {
      return (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100%",
          }}
        >
          <Typography>No Records Available</Typography>
        </Box>
      ); // Return null when there are no records
    }

    return history.map((item, index) => (
      <React.Fragment key={index}>
        <MenuItem onClick={toggleExpanded}>
          <ListItemText
            primary={
              <Typography
                variant="body2"
                sx={{
                  whiteSpace: "pre-line",
                  maxHeight: expanded ? "none" : 80,
                  overflowY: "auto",
                }} // Allow scrolling if expanded
                dangerouslySetInnerHTML={{
                  __html: expanded
                    ? item.message.replace(/\n/g, "<br>")
                    : truncateText(item.message.replace(/\n/g, "<br>"), 50),
                }} // Replace \n with <br> and apply HTML dangerously
              />
            }
            secondary={
              <Typography variant="caption">
                {new Date(item.Date).toLocaleString()}
              </Typography>
            }
          />
        </MenuItem>
        {index < history.length - 1 && <Divider />}
      </React.Fragment>
    ));
  };

  const [showHistory, setShowHistory] = useState(false);

  const handleHistoryClick = () => {
    setShowHistory(true);
  };

  const handleBackClick = () => {
    setShowHistory(false);
  };

  // ======================================================================Activate Button=======================================================================

  
  const [selected, setSelected] = useState('');
  
  const Item = ({ title, to, icon, selected, setSelected }) => {
    const location = useLocation();
    const isSelected = location.pathname === to;
  
    const handleClick = () => {
      if (selected !== title) {
        setSelected(title);
      }
    };
  
    return (
      <Tooltip title={title} placement="right">
        <ListItem
          button
          component={Link}
          to={to}
          onClick={handleClick}
          style={{
            color: isSelected ? "#3b82f6" : "black",
          }}
        >
          <ListItemIcon>{icon}</ListItemIcon>
          <ListItemText primary={
            <Typography style={{ fontWeight: 'bold', fontSize: '16px' }}>
              {title}
            </Typography>
          } />
        </ListItem>
      </Tooltip>
    );
  };
  
  return (
    <div>
    <Grid container spacing={0}>
      <Grid item xs={12}>
        {/* Sidebar Navigation */}
      <Box
            component="nav"
            sx={{
              zIndex: 99991,
              display: 'flex',
              flexDirection: 'column',
              background: 'linear-gradient(45deg,#5a9cef ,#fdf9fd)',
              width: '270px',
              height: '100%',
              position: 'fixed',
              top: '0',
              left: '0',
              // padding: '20px 0', // Added padding for the sidebar
            }}
          >
            <img
              src={ceinsysLogo}
              alt="Logo"
              style={{
                width: '100%',
                height: '72.5px',
                display: 'block',
                // marginTop: '0px',
                marginBottom: '20px', // Spacing below logo
              }}
            />

<List>
      <Item 
        title="QMS Artefact" 
        to="/aQmsLibrary" 
        icon={<DescriptionIcon sx={{ fontSize: 24 }} />} 
        selected={selected} 
        setSelected={setSelected} 
      />
      <Divider />
      <Item 
        title="User List" 
        to="/auserlist" 
        icon={<PeopleAltOutlinedIcon sx={{ fontSize: 24 }} />} 
        selected={selected} 
        setSelected={setSelected} 
      />
      <Divider />
      <Item 
        title="Download Logs" 
        to="/adownloadlogs" 
        icon={<DownloadIcon sx={{ fontSize: 24 }} />} 
        selected={selected} 
        setSelected={setSelected} 
      />
      <Divider />
      <Item 
        title="Help Desk" 
        to="/ahelpdesk" 
        icon={<HelpOutlineIcon sx={{ fontSize: 24 }} />} 
        selected={selected} 
        setSelected={setSelected} 
      />
      <Divider />
      {/* Add more menu items here as needed */}
    </List>
           
            <Box sx={{ padding: '20px', marginTop: 'auto', textAlign: 'center' }}>
    <Typography variant="body2" sx={{ fontWeight: 'bold' }}>
      Contact Us:
    </Typography>
    <Box display="flex" justifyContent="center" alignItems="center">
      <MailOutlineIcon sx={{ marginRight: '5px', color: '#333' }} /> {/* Icon added here */}
      <Typography variant="body2" sx={{ color: '#333' }}>
        <a 
          href="mailto:QMS_Release@ceinsys.com" 
          style={{ textDecoration: 'none', color: '#333' }}
        >
          QMS_Release@ceinsys.com
        </a>
      </Typography>
    </Box>
  </Box>
          </Box>
          <Box
  display="flex"
  justifyContent="flex-end"
  width="100%"
  height="60px"
  position="fixed"
  sx={{
    background: 'linear-gradient(135deg, #3095f0, #b6bced, #fdf9fd)',
    paddingTop: 0.8,
    paddingBottom: 0.8,
    zIndex: 999991,
    marginLeft: '270px', // Keep margin for sidebar
    boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)', // Add a box shadow to make the element more visible
  }}
>
  <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center' }}>
    <Box sx={{ marginRight: 35}}>
      {/* Notifications */}
      <Tooltip title="Notification" PopperProps={{ sx: { zIndex: 999999 } }}>
        <IconButton>
          <Badge badgeContent={count} color="secondary">
            <NotificationsOutlinedIcon
              variant="outlined"
              sx={{ color: 'black' }}
              onClick={handleNotificationOpen}
              size="small"
            />
          </Badge>
        </IconButton>
      </Tooltip>

      {/* Notification Menu */}
      <Menu
        anchorEl={notiAnchor}
        open={Boolean(notiAnchor)}
        onClose={handleNotificationClose}
        sx={{ marginTop: '35px', zIndex: 100000 }}
      >
        <Paper sx={{ width: 520, maxWidth: '100%' }}>
          <MenuItem
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
            onClick={showHistory ? handleBackClick : handleHistoryClick}
          >
            {showHistory ? (
              <>
                <ListItemIcon>
                  <ArrowBackOutlinedIcon />
                </ListItemIcon>
                Back to Notifications
              </>
            ) : (
              <>
                <ListItemIcon>
                  <HistoryOutlinedIcon />
                </ListItemIcon>
                History
              </>
            )}
          </MenuItem>
          <Divider />
          <MenuList>
            {showHistory ? renderHistoryItems() : renderMenuItems()}
          </MenuList>
        </Paper>
      </Menu>

      {/* Profile Menu */}
      <Tooltip title="Profile" PopperProps={{ sx: { zIndex: 999999 } }}>
        <IconButton>
          <PersonOutlinedIcon
            onClick={handleMenuOpen}
            variant="outlined"
            sx={{ color: 'black' }}
            size="small"
          />
        </IconButton>
      </Tooltip>

      <Menu
        anchorEl={menuAnchor}
        open={Boolean(menuAnchor)}
        onClose={handleMenuClose}
        sx={{ marginTop: '35px', zIndex: 100000 }}
      >
        <Box sx={{ p: 1 }}>
          <Typography variant="subtitle2" component="p" onClick={handleMenuClose}>
            Name: {fullname}
          </Typography>
          <Typography variant="subtitle2" component="p" onClick={handleMenuClose}>
            Email: {email}
          </Typography>
          <Typography variant="subtitle2" component="p" onClick={handleMenuClose}>
            Role: {Role}
          </Typography>
        </Box>
        <Divider sx={{ my: 1 }} />
        <MenuItem onClick={handleLogout}>
          <ListItemIcon>
            <LogoutIcon />
          </ListItemIcon>
          Logout
        </MenuItem>
        <MenuItem onClick={handleOpenModal}>
          <ListItemIcon>
            <ManageAccountsOutlinedIcon />
          </ListItemIcon>
          Change Password
        </MenuItem>
      </Menu>
    </Box>
  </Grid>
</Box>
      </Grid>
    </Grid>
    {ChangePasswordModal}
  </div>
  
  );
};

export default Topbar;


