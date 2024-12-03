import {
  Box,
  Button,
  Dialog,
  DialogActions,
  Grid,
  IconButton,
  Tooltip,
  Typography,
} from "@mui/material";
import { useState, useContext, useEffect } from "react";
import "./Card.css";

import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { useNavigate } from "react-router-dom";
import RocketLaunchIcon from "@mui/icons-material/RocketLaunch";
import DeleteIcon from "@mui/icons-material/Delete";
import folderImage from "../../../../images/folder.png";
import { toast } from "react-toastify";
import SuperAdminService from "../../../../Services/superadmin";
import CloseIcon from "@mui/icons-material/Close";
import { DataContext } from "../../../../DataContext";
const Card = (props) => {
  const param = props;

  const { setData } = useContext(DataContext);
  const [getUser, setUser] = useState({});
  //  const [isLoading, setIsLoading] = useState(false);
   
  useEffect(() => {
    // setIsLoading(true);
    SuperAdminService.getUserById(param.created_by)
    .then((response) => {
      setUser(response.data);
      // setIsLoading(false);

    })
    .catch((error) => {
      console.error('Error fetching Model List:', error);
      // setIsLoading(false);
    });
   
  }, []);

  const userId = sessionStorage.getItem("UserId");
  const userid = Number(userId);
  const [isLaunched, setIsLaunched] = useState(param.launch);

  let navigate = useNavigate();
  const handleNavigate = (id, version) => {
    sessionStorage.setItem("versionId", id);
    sessionStorage.setItem("versionName", version);
    setData({ id, version });
    navigate(`/afCards`);
  };

  const navigates = useNavigate();
  const handleClickNavigateSPage = () => {
    setTimeout(() => {
      navigates(0);
    }, 3000);
  };

  const [DialogOpen, setDialogOpen] = useState(false);
  

  const [vid, setFId] = useState(false);
  const DeletehandleClose = () => {
    setDialogOpen(false);
  };
  const DeleteHandleOpen = (vId) => {
    setFId(vId);
    setDialogOpen(true);
  };
  const handleDelete = () => {
    SuperAdminService.deleteVersion(vid)
      .then((response) => {
        toast.success("Version Deleted Successfully");
        setDialogOpen(false);
      })
      .catch((error) => {
        console.error("Error deleting Version:", error);
        toast.error("Failed to Delete Version");
      });
    handleClickNavigateSPage();
  };

  const DeleteDialog = (
    <Dialog
      open={DialogOpen}
      onClose={() => setDialogOpen(false)}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      sx={{
        zIndex: 999991,
      }}
    >
      <DialogActions>
        <Grid container spacing={1}>
          <Grid item xl="12" lg="12" md="12" sm="12" xs="12">
            <Box display={"flex"} justifyContent={"space-between"}>
              <Typography variant="body2" fontWeight={"bold"} paddingTop={1}>
                Do you want to Delete this Version?
              </Typography>

              <IconButton aria-label="close" onClick={DeletehandleClose}>
                <CloseIcon />
              </IconButton>
            </Box>
          </Grid>
          <Grid item xl="12" lg="12" md="12" sm="12" xs="12">
            <Box>
              <Button
                sx={{
                  fontSize: {
                    xl: "14px",
                    lg: "13px",
                    md: "12px",
                    sm: "11px",
                    xs: "10px",
                  },
                  fontWeight: "bold",
                  padding: "5px 10px",
                  backgroundColor: "#F5A4A0",
                  color: "black",
                  boxShadow: 2,
                  "&:hover": {
                    boxShadow: "0 0 10px 5px rgba(255, 255, 255, 0.5)", // Apply box shadow
                  },
                }}
                onClick={handleDelete}
                color="primary"
              >
                OK
              </Button>
            </Box>
          </Grid>
        </Grid>
      </DialogActions>
    </Dialog>
  );
  const handleLaunch = (vid) => {
    SuperAdminService.versionlaunch(vid, userid)
      .then((response) => {
        toast.success("Version Launched Successfully");
        setIsLaunched(true);
        handleClickNavigateSPage();
      })
      .catch((error) => {
        console.error("Error when Launching Version:", error);
        toast.error("Failed to Launch Version");
      });
  };
  return (
    <Box>
      {/* <CircularLoading isLoading={isLoading} /> */}
      <Box
        className="compactCard"
        sx={{
          background: "white",
          display: "flex",
          flexDirection: "row",
          boxShadow: 4,
        }}
      >
        <Grid container spacing={1}>
          <Grid
            item
            xs="4"
            sm="4"
            md="4"
            lg="4"
            xl="4"
            sx={{
              display: "flex",

              alignItems: "center",
            }}
          >
            <Box display={"flex"} flexDirection={"column"} alignContent={"space-between"}>
            <Box>
              <img
                src={folderImage}
                alt="Folder"
                style={{
                  width: "100%",

                  height: {
                    xl: "160px",
                    lg: "150px",
                    md: "140px",
                    sm: "120px",
                    xs: "110px",
                  },
                  
                  opacity: 0.3,
                }}
              />
            </Box>
            <Box
                      display="flex"
                      justifyContent="space-evenly"
                      alignItems="center"
                     
                     
                    >
                      <Tooltip title="Delete">
                        <DeleteIcon
                          onClick={() => DeleteHandleOpen(param.id)}
                          sx={{
                            fontSize: {
                              xl: "2rem",
                              lg:"1.8rem",
                             
                              md: "1.6rem",
                              sm: "1.4rem",
                              xs:"1.2rem"
                            }, // Further increased icon size
                            color: "#F5A4A0",
                            cursor: "pointer",
                            "&:hover": {
                              color: "#d50000",
                            },
                            
                          }}
                        />
                      </Tooltip>

                      <Tooltip title="Launch">
                        <IconButton
                          onClick={() => handleLaunch(param.id)}
                          disabled={param.launch}
                        >
                          <RocketLaunchIcon
                            sx={{
                              fontSize: {
                                xl: "2rem",
                                lg:"1.8rem",
                               
                                md: "1.6rem",
                                sm: "1.4rem",
                                xs:"1.2rem"
                              }, // Further increased icon size
                              color: param.launch ? "lightgrey" : "#a5a5e0",
                              cursor: param.launch ? "not-allowed" : "pointer",
                              "&:hover": {
                                backgroundColor: param.launch
                                  ? "transparent"
                                  : "#A4BCDB",
                                boxShadow:
                                  "0 0 10px 5px rgba(255, 255, 255, 0.5)",
                              },
                              "&:disabled": {
                                color: "#afade1",
                              },
                            }}
                          />
                        </IconButton>
                      </Tooltip>
                    </Box>
                    </Box>
          </Grid>
          <Grid
            item
            xs="8"
            sm="8"
            md="8"
            lg="8"
            xl="8"
            display="flex"
            flexDirection="column"
          >
            <Box>
              <Box display="flex" justifyContent="flex-end">
                <IconButton
                  onClick={() => handleNavigate(param.id, param.version)}
                >
                  <ArrowForwardIcon
                    variant="outlined"
                    sx={{ color: "black" }}
                  />
                </IconButton>
              </Box>
              <Box display="flex" justifyContent="center" alignItems={"center"}>
                <Box
                  sx={{
                    fontSize: {
                      xl: "0.9rem",
                      sm: "0.8rem",
                      md: "0.9rem",
                      xs:"0.7rem"
                    },
                  }}
                >
                  <span>
                    <b>{param.version} </b>
                  </span>
                  <br />
                  <span>
                    <b>
                      {param.month} {param.year}
                    </b>
                  </span><br/>
                  <span style={{fontSize:'0.8rem',color:"blue"}}>Created By: {getUser.name}</span>
                </Box>
              </Box>
             
            </Box>
          </Grid>
        </Grid>
      </Box>
      {DeleteDialog}
    </Box>
  );
};
export default Card;
