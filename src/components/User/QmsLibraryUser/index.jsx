import { Box, Grid } from "@mui/material";
import Topbar from "../Topbar";
import Cards from "./Card";

import { ToastContainer } from "react-toastify";

const QmsLibrary = () => {

  const username = sessionStorage.getItem("Name");
  const idString = sessionStorage.getItem("UserId"); // Retrieves the UserId as a string
  const CurrentUser = Number(idString);

  return (
    <div className="app" style={{ backgroundColor: "#EEF0F6" }}>
      <main className="content">
        <Topbar />
        <Box marginTop={"75px"} marginLeft={"290px"}>
          <Grid container>
            <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
              <Box display={"flex"} justifyContent={"flex-start"}>
                <h3>Welcome {username} !!</h3>
              </Box>
            </Grid>
          </Grid>

          <Box>
            <Cards />
          </Box>
        </Box>
      </main>

      <ToastContainer style={{ zIndex: "1000000" }} />
    </div>
  );
};

export default QmsLibrary;
