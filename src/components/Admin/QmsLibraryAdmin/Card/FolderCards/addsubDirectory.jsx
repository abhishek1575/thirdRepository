import { ToastContainer, toast } from "react-toastify";

import {
  Box,
  Button,
  Grid,
  IconButton,
  Modal,
  Paper,
  TextField,
  Tooltip,
} from "@mui/material";

import SuperAdminService from "../../../../../Services/superadmin";

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import ArrowBackOutlinedIcon from "@mui/icons-material/ArrowBackOutlined";
import CloseIcon from "@mui/icons-material/Close";

import AddCircleOutlineOutlinedIcon from "@mui/icons-material/AddCircleOutlineOutlined";

const AddSubDirectory = () => {
  // -----------------------------------------------------Add sub Directory to Directory---------------------------------------

  const [openModal, setOpenModal] = useState(false);
  const storedId = sessionStorage.getItem("directoryId");
  const idString = sessionStorage.getItem("UserId"); // Retrieves the UserId as a string
  const CurrentUser = Number(idString);

  const handleOpenModal = () => {
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const [addFolder, setAddFolder] = useState({
    name: "",
    dir: storedId,
    created_by: CurrentUser,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setAddFolder((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };
  const navigates = useNavigate();
  const handleClickNavigateSPage = () => {
    setTimeout(() => {
      navigates(0);
    }, 3000);
  };
  // =====================================================================Code For Add User Form==========================================================================================

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (addFolder.name.trim().length === 0) {
        toast.warning("Please Enter  Folder Name!");
      } else {
        const response = SuperAdminService.createSubDir(addFolder);
        toast.success("Folder added successfully!");

        setAddFolder({
          name: "",
          dir: 0,
          created_by: 0,
        });

        handleCloseModal();
        handleClickNavigateSPage();
      }
    } catch (error) {
      console.error("Error Creating Folder:", error);
      toast.error("Failed to Create Folder!");
    }
  };
  let navigate = useNavigate();
  const navigateRoute = () => {
    navigate(`/afCards`);
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
                  <span>Add New Folder</span>
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
                  label="Folder Name"
                  type="text"
                  name="name"
                  required
                  value={addFolder.name}
                  onChange={handleChange}
                  fullWidth
                  margin="normal"
                />

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
    <Box>
      <Box
        display="flex"
        justifyContent="flex-start"
        alignItems={"center"}
        marginTop={"90px"}
        marginLeft={"290px"}
      >
        <Grid container alignItems={"center"}>
          <Grid item xs="1" sm="1" md="1" lg="1" xl="1">
            <Box>
              <Tooltip title="Back">
                <IconButton onClick={navigateRoute}>
                  <ArrowBackOutlinedIcon
                    variant="outlined"
                    sx={{ color: "black" }}
                  />
                </IconButton>
              </Tooltip>
            </Box>
          </Grid>
          <Grid item xs="11" sm="11" md="5" lg="5" xl="">
            {/* <Box>
              <span style={{ fontWeight: "bold" }}> {dataId.version}</span>
            </Box> */}
          </Grid>
          <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
            <Box display={"flex"} justifyContent={"flex-end"} m={1}>
              <Box>
                <Tooltip title="Add Version">
                  <Button
                    size="small"
                    onClick={handleOpenModal}
                    startIcon={<AddCircleOutlineOutlinedIcon color="black" />}
                    sx={{
                      m: 1,
                      fontSize: "14px",
                      fontWeight: "bold",
                      padding: "10px 20px",
                      backgroundColor: "#d9d9f5",
                      color: "black",
                      boxShadow: 4,
                      // color:"black",
                      "&:hover": {
                        // Apply styles on hover
                        backgroundColor: "#8e93e4",
                        boxShadow: "0 0 10px 5px rgba(255, 255, 255, 0.5)", // Apply box shadow
                      },
                    }}
                  >
                    ADD Folder
                    {/* ADD Directory */}
                  </Button>
                </Tooltip>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Box>
      {AddVersionModal}
      <ToastContainer style={{ zIndex: "1000000" }} />
    </Box>
  );
};
export default AddSubDirectory;
