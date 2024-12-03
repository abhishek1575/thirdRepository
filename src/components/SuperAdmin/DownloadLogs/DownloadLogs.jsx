import React, { useState, useEffect } from "react";
import {
  Box,
  Select,
  MenuItem,
  FormControl,
  TextField,
  Grid,
  Typography,
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import DownloadService from "../../../Services/DownloadService"; // Ensure this service is correctly defined
import Topbar from "../Topbar";

const DownloadLogList = () => {
  const [rows, setRows] = useState([]);
  const [searchText, setSearchText] = useState("");
  const userid = sessionStorage.getItem("UserId"); // Retrieve userId from session storage

  const columns = [
    { field: "id", headerName: "ID", width: 100 },
    { field: "userid", headerName: "User ID", flex: 1 },
    { field: "username", headerName: "User Name", flex: 2 },
    { field: "filename", headerName: "File Name", flex: 2 },
    { field: "download_date", headerName: "Downloaded At", flex: 2 },
  ];

  // useEffect(() => {
  //   fetchDownloadLogs();
  // }, []); // Fetch logs when component mounts


  useEffect(() => {
    DownloadService.getDownloadLogsByUserId(userid)
        .then((response) => {
          setRows(response.data); // Set rows with the response data
        })
        .catch((error) => {
          console.error("Error fetching download logs:", error);
        });
  }, []);

  // const fetchDownloadLogs = () => {
  //   if (userId) {
  //     DownloadService.getDownloadLogsByUserId(userId)
  //       .then((response) => {
  //         setRows(response.data); // Set rows with the response data
  //       })
  //       .catch((error) => {
  //         console.error("Error fetching download logs:", error);
  //       });
  //   } else {
  //     console.error("User ID not found in session storage.");
  //   }
  // };

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

  return (
    <div className="app" style={{ backgroundColor: "#EEF0F6" }}>
      <main className="content">
        <Topbar />
        <Box marginTop={"75px"} marginLeft={"290px"}>
          <Grid container>
            <Grid item xs={12}>
              <Box sx={{ padding: 2 }}>
                <Box
                  display="flex"
                  justifyContent="space-between"
                  alignItems="center"
                  marginBottom="10px"
                >
                  <FormControl variant="standard" sx={{ minWidth: 120 }}>
                    <Typography sx={{ mr: 1 }}>Search:</Typography>
                    <TextField
                      variant="standard"
                      value={searchText}
                      onChange={handleSearchChange}
                      sx={{ ml: 1 }}
                    />
                  </FormControl>
                </Box>

                <DataGrid
                  rows={filteredRows}
                  columns={columns}
                  autoHeight
                  pageSize={5}
                  rowsPerPageOptions={[5]}
                  sx={{
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
                  }}
                />
              </Box>
            </Grid>
          </Grid>
        </Box>
      </main>
    </div>
  );
};

export default DownloadLogList;
