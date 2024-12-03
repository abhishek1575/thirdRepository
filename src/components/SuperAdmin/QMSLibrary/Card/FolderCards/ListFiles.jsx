import { ToastContainer, toast } from "react-toastify";
import Topbar from "../../../Topbar";
import { Box, FormControl, IconButton, Paper, TextField, Tooltip, Typography } from "@mui/material";

import { DataGrid, GridActionsCellItem } from "@mui/x-data-grid";
import SuperAdminService from "../../../../../Services/superadmin";
import DownloadOutlinedIcon from "@mui/icons-material/DownloadOutlined";

import { useContext, useEffect, useState } from "react";

import ArrowBackOutlinedIcon from "@mui/icons-material/ArrowBackOutlined";

import { DataContext } from "../../../../../DataContext";
import { useNavigate } from "react-router-dom";
import AddSubDirectory from "./addsubDirectory";
import DirectoryCards from "./addFoldertoDir";
const ListFiles = (props) => {
  const [rows, setRows] = useState([]);

  const { setDirId } = useContext(DataContext);
  const { dirId } = useContext(DataContext);
  const UserId = sessionStorage.getItem("UserId");
  useEffect(() => {
    // Fetch files based on directory ID
    const storedId = sessionStorage.getItem("directoryId");
    setDirId(storedId);
    SuperAdminService.getFilesByDirId(dirId)
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
  }, [dirId]);

  const handleDownload = (id) => {
    SuperAdminService.downloadFile(id,UserId)
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

  let navigate = useNavigate();
  const handleNavigate = () => {
    navigate(`/fCards`);
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
        ];
      },
    },
  ];
  return (
    <div className="app" style={{ backgroundColor: "#EEF0F6" }}>
      <main className="content">
        <Topbar />
        <Box  marginRight="15px">
          <Box marginTop={"100px"} marginLeft="290px">
            <Tooltip title="Back">
              <IconButton onClick={handleNavigate}>
                <ArrowBackOutlinedIcon
                  variant="outlined"
                  sx={{ color: "black" }}
                />
              </IconButton>
            </Tooltip>
          </Box>
        {/* <Box>
          <AddSubDirectory />
        </Box> */}
        <Box>
          <DirectoryCards />
        </Box>
        <Box  marginLeft="290px">
          <Box>
                   {/* Search TextField */}
                   <FormControl
                        variant="standard"
                        sx={{ m: 1, minWidth: 100 }}
                      >
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
                            "& .MuiInput-underline:hover:not(.Mui-disabled):before":
                              {
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
             
            >
              <Box style={{ height: `calc(100vh - 240px)` }}>
                <DataGrid rows={filteredRows} columns={columns} stickyHeader  sx={{
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
                    }}/>
              </Box>
            </Box>
            </Box>
        </Box>
      </main>

      <ToastContainer style={{ zIndex: "1000000" }} />
    </div>
  );
};

export default ListFiles;
