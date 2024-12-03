import { ToastContainer, toast } from "react-toastify";
import Topbar from "../../../../Topbar";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  FormControl,
  Grid,
  IconButton,
  Modal,
  Paper,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import { DataGrid, GridActionsCellItem } from "@mui/x-data-grid";
import SuperAdminService from "../../../../../../Services/superadmin";
import DownloadOutlinedIcon from "@mui/icons-material/DownloadOutlined";
import DeleteIcon from "@mui/icons-material/DeleteOutlined";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ArrowBackOutlinedIcon from "@mui/icons-material/ArrowBackOutlined";
import CloseIcon from "@mui/icons-material/Close";
import { DataContext } from "../../../../../.././DataContext";
import AddSubDirectory from "./addsubButton";
import DirectoryCards from "./index";

const ListFiles = (props) => {
  const [rows, setRows] = useState([]);

  const { setSubDirId } = useContext(DataContext);
  const { subDirId } = useContext(DataContext);
  const UserId = sessionStorage.getItem("UserId");
  useEffect(() => {
    // Fetch files based on directory ID
    const storedId = sessionStorage.getItem("subDirectoryId");
    setSubDirId(storedId);
    SuperAdminService.getFilesByDirId(storedId)
      .then((response) => {
        // Map rows to include serial numbers
        const rowsWithSerialNumbers = response.data.map((row, index) => ({
          ...row,
          serialNumber: index + 1, // 1-based serial number
        }));
        setRows(rowsWithSerialNumbers);
      })
      .catch((error) => {
        console.error("Error fetching files:", error);
      });
  }, []);

  let navigate = useNavigate();
  const handleNavigate = () => {
    navigate(`/fLists`);
  };
  const handleDownload = (id) => {
    SuperAdminService.downloadFile(id, UserId)
      .then((response) => {
        // Get Content-Disposition header
        const contentDisposition = response.headers.get("content-disposition");
        let filename = "downloaded-file"; // Default filename if not specified

        if (contentDisposition) {
          // Extract filename from Content-Disposition header
          const filenameRegex = /filename[^;=\n]*=[\'"]?([^\'";\n]*)[\'"]?/;
          const matches = filenameRegex.exec(contentDisposition);
          if (matches != null && matches[1]) {
            filename = decodeURIComponent(matches[1]); // Decode and use the filename
          }
        }

        // Create a Blob object with the correct Content-Type
        const blob = new Blob([response.data], {
          type: response.headers.get("content-type"),
        });
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", filename); // Use the extracted filename
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        window.URL.revokeObjectURL(url); // Clean up the URL object

        toast.success("File downloaded successfully");
      })
      .catch((error) => {
        toast.error("File download failed");
        console.error("Error downloading file:", error);
      });
  };

  const [DialogOpen, setDialogOpen] = useState(false);

  const [fId, setFId] = useState(false);
  const DeletehandleClose = () => {
    setDialogOpen(false);
  };
  const DeleteHandleOpen = (id) => {
    setFId(id);
    setDialogOpen(true);
  };
  const handleDelete = () => {
    SuperAdminService.deleteFile(fId)
      .then((response) => {
        toast.success("File Deleted Successfully");
        SuperAdminService.getFilesByDirId(subDirId)
          .then((response) => {
            // Map rows to include serial numbers
            const rowsWithSerialNumbers = response.data.map((row, index) => ({
              ...row,
              serialNumber: index + 1, // 1-based serial number
            }));
            setRows(rowsWithSerialNumbers);
          })
          .catch((error) => {
            console.error("Error fetching files:", error);
          });
        setDialogOpen(false);
      })
      .catch((error) => {
        console.error("Error deleting File:", error);
        toast.error("Failed to Delete File");
      });
  };

  // -----------------------------------------------------------------Search Functionality----------------------------------------------------------------------------
  const [searchText, setSearchText] = useState("");

  const filteredRows = rows.filter((row) => {
    if (
      searchText &&
      Object.values(row).some(
        (value) =>
          value &&
          value.toString().toLowerCase().includes(searchText.toLowerCase())
      )
    ) {
      return true;
    }
    return !searchText;
  });

  const handleSearchChange = (event) => {
    setSearchText(event.target.value);
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
              <Typography
                variant="body2"
                // color={colors.redAccent[700]}
                fontWeight={"bold"}
                paddingTop={1}
              >
                Do you want to Delete this File?
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
  const columns = [
    {
      field: "serialNumber",
      headerName: "Sr. No.",
      width: 150,
    },

    {
      field: "name",
      headerName: "Name",
      flex: 1,
      cellClassName: "name-column--cell",
    },
    {
      field: "actions",
      type: "actions",
      headerName: "Actions",
      width: 150,
      cellClassName: "actions",
      getActions: ({ row }) => {
        return [
          <GridActionsCellItem
            icon={
              <DownloadOutlinedIcon
                variant="outlined"
                color="primary"
                size="small"
              />
            }
            label="Edit"
            className="textPrimary"
            onClick={() => handleDownload(row.id)}
            color="inherit"
          />,
          // <GridActionsCellItem
          //   icon={
          //     <DeleteIcon variant="outlined" color="secondary" size="small" />
          //   }
          //   label="Delete"
          //   onClick={() => DeleteHandleOpen(row.id)}
          //   color="inherit"
          // />,
        ];
      },
    },
  ];

  
  return (
    <div className="app" style={{ backgroundColor: "#EEF0F6" }}>
      <main className="content">
        <Topbar />
        <Box marginTop={"90px"} >
        <Box>
          <AddSubDirectory />
          </Box>
          {/* <Box >
          
            <DirectoryCards />
          
          </Box> */}
          
         <Box marginLeft={"280px"}>
            <Box>
              {/* Search TextField */}
              <FormControl variant="standard" sx={{ m: 1, minWidth: 100 }}>
                <Typography sx={{ mr: 1 }}>Search:</Typography>
                <TextField
                  variant="standard"
                  value={searchText}
                  onChange={handleSearchChange}
                  sx={{
                    ml: 1,
                    "& .MuiInputBase-root": {
                      color: "inherit", // Maintain text color
                    },
                    "& .MuiInput-underline:before": {
                      borderBottomColor: "currentColor", // Maintain underline color
                    },
                    "& .MuiInput-underline:hover:not(.Mui-disabled):before": {
                      borderBottomColor: "currentColor", // Maintain underline color on hover
                    },
                    "& .MuiInput-underline:after": {
                      borderBottomColor: "currentColor", // Maintain underline color after typing
                    },
                  }}
                />
              </FormControl>
            </Box>
            <Box
            
              sx={{mr: 1 ,
                
              }}
            >
              <Box style={{ height: `calc(100vh - 240px)` }}>
                <DataGrid rows={filteredRows} columns={columns} stickyHeader sx={{
                      "& .MuiDataGrid-root": {
                        border: "none",
                      },
                      "& .MuiDataGrid-columnHeaders": {
                        backgroundColor: "#F0EBE3 !important",
                        borderBottom: "none",
                      },
                      "& .MuiDataGrid-footerContainer": {
                        borderTop: "none",
                      },
                    }} />
              </Box>
            </Box>
            </Box>
        </Box>
      </main>
      {DeleteDialog}
     
      <ToastContainer style={{ zIndex: "1000000" }} />
    </div>
  );
};

export default ListFiles;
