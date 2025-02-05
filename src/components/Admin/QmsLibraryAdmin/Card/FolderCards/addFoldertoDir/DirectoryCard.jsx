import {
  Box,
  Button,
  Dialog,
  DialogActions,
  Grid,
  IconButton,
  Modal,
  Paper,
  Tooltip,
  Typography,
} from "@mui/material";
import { useState, useContext } from "react";
import "./DirectoryCard.css";

import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { useNavigate } from "react-router-dom";
import DeleteIcon from "@mui/icons-material/Delete";
import UploadFileIcon from "@mui/icons-material/UploadFile";
import folderImage from "../../../../../../images/folder.png";
import { ToastContainer, toast } from "react-toastify";
import SuperAdminService from "../../../../../../Services/superadmin";
import CloseIcon from "@mui/icons-material/Close";
import { DataContext } from "../../../../../../DataContext";
import FolderUpload from "../../../../../../images/FolderUpload.png";
const DirecotoryCard = (props) => {
  const param = props;

  const { setSubDirId } = useContext(DataContext);

  const navigate = useNavigate();
  const toggleTable = (dirId) => {
    sessionStorage.setItem("subDirectoryId", dirId);
    setSubDirId(dirId);
    navigate("/aSubfLists");
  };
  const navigates = useNavigate();
  const handleClickNavigateSPage = () => {
    setTimeout(() => {
      navigates(0);
    }, 3000);
  };
  const extractFilesFromFolder = async (item, fileList) => {
    if (item.kind === "file") {
      fileList.push(item.getAsFile());
    } else if (item.kind === "folder") {
      const directory = item.webkitGetAsEntry();
      if (directory.isDirectory) {
        const reader = directory.createReader();
        reader.readEntries((entries) => {
          entries.forEach((entry) => {
            extractFilesFromFolder(entry, fileList);
          });
        });
      }
    }
  };

  const [DialogOpen, setDialogOpen] = useState(false);

  const [dirId, setFId] = useState(false);
  const DeletehandleClose = () => {
    setDialogOpen(false);
  };
  const DeleteHandleOpen = (dId) => {
    setFId(dId);
    setDialogOpen(true);
  };

  const handleDelete = () => {
    SuperAdminService.deleteDir(param.subDirId)
      .then((response) => {
        toast.success("Directory Deleted Successfully");
        setDialogOpen(false);
        handleClickNavigateSPage();
      })
      .catch((error) => {
        console.error("Error Deleting Directory:", error);
        toast.error("Failed to Delete Directory");
      });
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
                Do you want to Empty this Directory?
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
  const [openModal, setOpenModal] = useState(false);
  const [getVid, setVid] = useState(0);

  const handleOpenModal = (dirId) => {
    setVid(dirId);
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const [files, setFiles] = useState([]);

  const handleFileChange = (event) => {
    const selectedFiles = Array.from(event.target.files);
    if (selectedFiles.length) {
      setFiles(selectedFiles);
    }
  };

  const handleDrop = (event) => {
    event.preventDefault();
    event.stopPropagation();
    const items = event.dataTransfer.items;
    const fileList = [];

    for (let i = 0; i < items.length; i++) {
      const item = items[i];
      if (item.kind === "file") {
        fileList.push(item.getAsFile());
      } else if (item.kind === "folder") {
        extractFilesFromFolder(item, fileList);
      }
    }

    Promise.all(fileList).then((filesArray) => {
      if (filesArray.length) {
        setFiles(filesArray);
      }
    });
  };

  const handleDragOver = (event) => {
    event.preventDefault();
  };

  const handleSubmit = () => {
    if (!files.length) return;

    const formData = new FormData();
    files.forEach((file) => formData.append("files", file));
    formData.append("dirId", getVid);

    SuperAdminService.uploadBulkFiles(formData)
      .then((response) => {
        toast.success("Files Uploaded successfully!");
      })
      .catch((error) => {
        console.error("Error uploading files:", error);
        toast.error("Failed to upload Files!");
      });

    handleCloseModal();
    setFiles([]);
  };

  const handleCancel = () => {
    setFiles([]);
  };

  const FileUploadModal = (
    <Modal
      open={openModal}
      onClose={handleCloseModal}
      aria-labelledby="add-user-modal"
      aria-describedby="modal-to-add-new-user"
      sx={{ zIndex: 999991 }}
    >
      <Grid
        container
        sx={{
          height: "100%",
          width: "100%",
          display: "flex",
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

              overflowY: "auto",
              border: "4px solid #579aef",
            }}
          >
            <Box display={"flex"} justifyContent={"flex-end"}>
              <IconButton onClick={handleCloseModal}>
                <CloseIcon />
              </IconButton>
            </Box>

            <Box sx={{ padding: "20px" }}>
              <div
                onDrop={handleDrop}
                onDragOver={handleDragOver}
                style={{
                  border: "2px dashed #cccccc",
                  borderRadius: "4px",
                  padding: "20px",
                  textAlign: "center",
                  cursor: "pointer",
                  marginBottom: "20px",
                  backgroundImage: { FolderUpload },
                }}
              >
                <img
                  src={FolderUpload}
                  alt="Upload"
                  height={"100vh"}
                  style={{ opacity: "0.5" }}
                />
                <p style={{ opacity: "0.3" }}>
                  Drag & drop files here, or click to select files
                </p>
                <input
                  type="file"
                  accept="*/*"
                  onChange={handleFileChange}
                  style={{ display: "none" }}
                  id="file-input"
                  multiple
                />
                <Box
                  component="label"
                  htmlFor="file-input"
                  sx={{
                    cursor: "pointer",
                    display: "inline-block",
                    padding: "10px 20px",
                    border: "2px solid #cccccc",
                    borderRadius: "4px",
                    textAlign: "center",
                    transition: "background-color 0.3s, color 0.3s",
                    ":hover": {
                      backgroundColor: "#8e93e4",
                      color: "black",
                    },
                  }}
                >
                  <b>Select Files</b>
                </Box>
              </div>

              <div>
                <Grid container spacing={0.5}>
                  <Grid item xs="3" sm="3" md="3" lg="3" xl="3">
                    <Button
                      onClick={handleSubmit}
                      sx={{
                        width: "100%",
                        marginRight: "10px",
                        fontSize: {
                          xl: "14px",
                          lg: "13px",
                          md: "12px",
                          sm: "11px",
                          xs: "10px",
                        },
                        fontWeight: "bold",
                        padding: "10px 20px",
                        backgroundColor: "#d1d2f2",
                        color: "black",
                        boxShadow: 2,
                        // color:"black",
                        "&:hover": {
                          // Apply styles on hover
                          backgroundColor: "#8e93e4",
                          boxShadow: "0 0 10px 5px rgba(255, 255, 255, 0.5)", // Apply box shadow
                        },
                      }}
                    >
                      Submit
                    </Button>
                  </Grid>
                  <Grid item xs="3" sm="3" md="3" lg="3" xl="3">
                    <Button
                      sx={{
                        width: "100%",
                        // marginRight: '10px' ,
                        fontSize: {
                          xl: "14px",
                          lg: "13px",
                          md: "12px",
                          sm: "11px",
                          xs: "10px",
                        },
                        fontWeight: "bold",
                        padding: "10px 20px",
                        backgroundColor: "#F5A4A0",
                        color: "black",
                        boxShadow: 2,
                        // color:"black",
                        "&:hover": {
                          // Apply styles on hover
                          backgroundColor: "#A4BCDB",
                          boxShadow: "0 0 10px 5px rgba(255, 255, 255, 0.5)", // Apply box shadow
                        },
                      }}
                      onClick={handleCancel}
                    >
                      Cancel
                    </Button>
                  </Grid>
                </Grid>
              </div>
              <Box sx={{ marginBottom: "20px" }}>
                {files.length > 0 ? (
                  <ul>
                    {files.map((file, index) => (
                      <li key={index}>{file.name}</li>
                    ))}
                  </ul>
                ) : (
                  <p>No files selected</p>
                )}
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
        className="compactCard"
        m={1}
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
                  // height: "170px",
                  height: {
                    xl: "160px",
                    lg: "150px",
                    md: "140px",
                    sm: "120px",
                    xs: "110px",
                  },
                  
                  opacity: 0.3,
                  // paddingLeft: "20px"
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
                          onClick={() => DeleteHandleOpen(param.subDirId)}
                          sx={{
                            fontSize: {
                              xl: "2rem",
                              lg:"1.8rem",
                             
                              md: "1.6rem",
                              sm: "1.4rem",
                              xs:"1.2rem"
                            }, // Increased sizes
                            color: "#F5A4A0",
                            cursor: "pointer",
                            "&:hover": {
                              color: "#d50000",
                            },
                            // Space between icons
                          }}
                        />
                      </Tooltip>
                      <Tooltip title="Upload">
                        <UploadFileIcon
                          onClick={() => handleOpenModal(param.subDirId)}
                          sx={{
                            fontSize: {
                              xl: "2rem",
                              lg:"1.8rem",
                             
                              md: "1.6rem",
                              sm: "1.4rem",
                              xs:"1.2rem"
                            },// Increased sizes
                            color: "#afade1",
                            cursor: "pointer",
                            "&:hover": {
                              color: "#a5a5e0",
                            },
                          }}
                        />
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
                <IconButton onClick={() => toggleTable(param.subDirId)}>
                  <ArrowForwardIcon
                    variant="outlined"
                    sx={{ color: "black" }}
                  />
                </IconButton>
              </Box>
              <Box display="flex" justifyContent="center" alignContent="center">
                <Box
                  sx={{
                    // color: colors.grey[100],
                    fontSize: {
                      xl: "0.9rem",
                      sm: "0.8rem",
                      md: "0.9rem",
                      xs:"0.7rem"
                    },
                  }}
                >
                  <span>
                    <b>{param.name} </b>
                  </span>
                  <br />
                </Box>
              </Box>
              
            </Box>
          </Grid>
        </Grid>
      </Box>

      {FileUploadModal}
      {DeleteDialog}
      <ToastContainer style={{ zIndex: 9999991 }} />
    </Box>
  );
};
export default DirecotoryCard;
