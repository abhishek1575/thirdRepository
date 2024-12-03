import {
  Box,
  Button,
  FormControl,
  Grid,
  IconButton,
  InputLabel,
  MenuItem,
  Modal,
  Paper,
  Select,
  TextField,

} from "@mui/material";
import Topbar from "../Topbar";
import Cards from "./Card";

import CloseIcon from "@mui/icons-material/Close";
import { ToastContainer, toast } from "react-toastify";
import { useState } from "react";
import SuperAdminService from "../../../Services/superadmin";

const QmsLibrary = () => {
 
  const [openModal, setOpenModal] = useState(false);

  const username = sessionStorage.getItem("Name");
  const idString = sessionStorage.getItem("UserId"); // Retrieves the UserId as a string
  const  CurrentUser = Number(idString);
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December"
];

const years=["2024","2025","2026","2027","2028","2029","2030",];
  
  const handleOpenModal = () => {
    setOpenModal(true);

  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const [addVersions, setAddVersion] = useState({
    version: "",
    month: "",
    year: "",
    created_by:CurrentUser,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
   
    setAddVersion((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };

  // =====================================================================Code For Add User Form==========================================================================================

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (addVersions.version.trim().length === 0) {
        toast.warning("Please Enter  Version Name!");
      } else if (addVersions.month.trim().length === 0) {
        toast.warning("Please Enter Month!");
      } else if (addVersions.year.trim().length === 0) {
        toast.warning("Please Enter Year!");
      } else {
        SuperAdminService.addVersion(addVersions).then((resp) => {
          
        })
        
        toast.success("Version added successfully!");
        

        setAddVersion({
          version: "",
          month: "",
          year: "",
          created_by:CurrentUser,
        });

        handleCloseModal();
        
      }
    } catch (error) {
      console.error("Error adding Version:", error);
      toast.error("Failed to add Version!");
    }
  };

  // ============================================================================Code For  Add User Component===============================================================

  const AddVersionModal = (
    <Modal
      open={openModal}
      onClose={handleCloseModal}
      aria-labelledby="add-user-modal"
      aria-describedby="modal-to-add-new-user"
      sx={{ zIndex: 999991 }}
    >
      <Grid
        container
        alignItems="flex-start"
        sx={{
          height: "100%",
          width: "100%",
          justifyContent: "center",
          alignItems: "center",
          overflowY: "auto",
        }}
      >
        <Grid item xs={11} sm={11} md={8} lg={5} xl={5}>
          <Paper
            elevation={3}
            style={{
              width: "100%",
              // padding: "20px",
              justifyContent: "center",
              alignItems: "center",
              overflowY: "auto",
              border: "4px solid #579aef",
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
                // sx={{
                //   backgroundColor: "#CDF0EA",
                //   boxShadow: 5,
                // }}
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
                  <span>ADD VERSION</span>
                </Box>
                <Box>
                  <IconButton
                    sx={{ color: "#1C1678", padding: "20px" }}
                    onClick={handleCloseModal}
                  >
                    <CloseIcon />
                  </IconButton>
                </Box>
              </Box>
              <Box sx={{ padding: "20px" }}>
                <TextField
                  label="Version"
                  type="text"
                  name="version"
                  required
                  value={addVersions.version}
                  onChange={handleChange}
                  fullWidth
                  margin="normal"
                />
               <FormControl fullWidth margin="normal">
      <InputLabel id="month-select-label">Month</InputLabel>
      <Select
        labelId="month-select-label"
        id="month-select"
        name="month"
        value={addVersions.month}
        onChange={handleChange}
        label="Month"
        fullWidth
        MenuProps={{ style: { zIndex: 999991 } }}
        sx={{
          fontSize: {
            xl: "1.1rem",
            xs: "0.8rem",
            sm: "0.9rem",
            md: "1rem",
          },
        }}
      >
        {months.map((month) => (
          <MenuItem
            key={month}
            value={month}
            
            onChange={handleChange}
          >
            {month}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
                

<FormControl fullWidth margin="normal">
      <InputLabel id="year-select-label">Year</InputLabel>
      <Select
        labelId="year-select-label"
        id="year-select"
        name="year"
        value={addVersions.year}
        onChange={handleChange}
        label="Year"
        fullWidth
        MenuProps={{ style: { zIndex: 999991 } }}
        sx={{
          fontSize: {
            xl: "1.1rem",
            xs: "0.8rem",
            sm: "0.9rem",
            md: "1rem",
          },
        }}
      >
        {years.map((year) => (
          <MenuItem
            key={year}
            value={year}
            
            onChange={handleChange}
          >
            {year}
          </MenuItem>
        ))}
      </Select>
    </FormControl>

                <Button
                  type="submit"
                  size="small"
                  sx={{
                    mt: 1,
                    backgroundColor: "#d1d2f2",
                    color: "black",
                    "&:hover": {
                      // Apply styles on hover
                      backgroundColor: "#8e93e4",
                      boxShadow: "0 0 10px 5px rgba(255, 255, 255, 0.5)", // Apply box shadow
                    },
                    margin: "0 auto", // Center the button horizontally
                  }}
                >
                  Submit
                </Button>
              </Box>
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </Modal>
  );
  return (
    <div className="app" style={{ backgroundColor: "#EEF0F6" }}>
      <main className="content">
        <Topbar />
        <Box marginTop={"75px"} marginLeft={"290px"}>
          <Grid container>
            <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
              <Box display={"flex"} justifyContent={"flex-start"}>
                <h3 >Welcome {username} !!</h3>
                
              </Box>
            </Grid>
          
          </Grid>
          
          <Box>
          <Cards />
          </Box>
           
        </Box>
        {AddVersionModal}
      </main>
      
      <ToastContainer style={{ zIndex: "1000000" }} />
    </div>
  );
};

export default QmsLibrary;
