import {
  Box,
  Select,
  MenuItem,
  FormControl,
  TextField,
  Paper,
  Grid,
  Typography,
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { useState, useEffect } from "react";
import SuperAdminService from "../../../Services/superadmin";
import Topbar from "../Topbar";

const UserList = () => {
  const [rows, setRows] = useState([]);
  const [filterRole, setFilterRole] = useState("All");
  const [searchText, setSearchText] = useState("");

  const columns = [
    { field: "id", headerName: "ID", width: 100 },
    {
      field: "name",
      headerName: "Name",
      flex: 1,
      cellClassName: "name-column--cell",
    },
    { field: "email", headerName: "Email", flex: 2 },
    {
      field: "role",
      headerName: "Role",
      flex: 1,
      renderCell: ({ value: role }) => (
        <Box width="60%" p="5px" borderRadius="4px">
          <span>{role}</span>
        </Box>
      ),
    },
  ];

  useEffect(() => {
    SuperAdminService.getAllUsers()
      .then((response) => {
        setRows(response.data);
      })
      .catch((error) => {
        console.error("Error fetching users:", error);
      });
  }, []);

  const filteredRows = rows.filter((row) => {
    if (filterRole !== "All" && row.role !== filterRole) {
      return false;
    }
    if (
      searchText &&
      Object.values(row).some((value) =>
        value.toString().toLowerCase().includes(searchText.toLowerCase())
      )
    ) {
      return true;
    }
    return !searchText;
  });

  const handleFilterChange = (event) => {
    setFilterRole(event.target.value);
  };

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
              {/* <Paper elevation={2} sx={{ margin: "1%", marginTop: 0 }}> */}
                <Box sx={{ padding: 2 }}>
                  <Box
                    display="flex"
                    justifyContent="flex-start"
                    alignItems="center"
                    marginBottom="10px"
                  >
                    <FormControl variant="standard" sx={{ minWidth: 120 }}>
                      <Typography sx={{ mr: 1 }}>Role:</Typography>
                      <Select
                        value={filterRole}
                        onChange={handleFilterChange}
                        sx={{ ml: 1 }}
                      >
                        <MenuItem value="All">All</MenuItem>
                        <MenuItem value="USER">USER</MenuItem>
                        <MenuItem value="ADMIN">ADMIN</MenuItem>
                        <MenuItem value="SUPER_ADMIN">SUPER_ADMIN</MenuItem>
                      </Select>
                    </FormControl>

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
              {/* </Paper> */}
            </Grid>
          </Grid>
        </Box>
      </main>
    </div>
  );
};

export default UserList;
