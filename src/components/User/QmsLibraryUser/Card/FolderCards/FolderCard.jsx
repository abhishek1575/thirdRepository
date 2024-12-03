import { Box, Grid, IconButton } from "@mui/material";
import { useContext } from "react";
import "./FolderCard.css";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

import folderImage from "../../../../../images/folder.png";

import { ToastContainer } from "react-toastify";

import { useNavigate } from "react-router-dom";
import { DataContext } from "../../../../../DataContext";
const FolderCard = (props) => {
  const param = props;

  const { setDirId } = useContext(DataContext);

  const navigate = useNavigate();
  const toggleTable = (dirId) => {
    sessionStorage.setItem("directoryId", dirId);
    setDirId(dirId);
    navigate(`/ufLists`);
  };

  return (
    <Box >
      <Box
        className="compactCard"
        sx={{
          background: "white",
          display: "flex",
          flexDirection: "row",
          boxShadow: 4,
          "&:hover": {},
        }}
      >
        <Grid container>
          <Grid
            item
            xs="5"
            sm="5"
            md="5"
            lg="5"
            xl="5"
            sx={{
              display: "flex",

              alignItems: "center",
            }}
          >
            <Box>
              <img
                src={folderImage}
                alt="Folder"
                style={{
                  width: "100%",
                  // height: "170px",
                  height: {
                    xl: "170px",
                    lg: "160px",
                    md: "140px",
                    sm: "120px",
                    xs: "110px",
                  },
                  display: "inline-block",
                  opacity: 0.3,
                  // paddingLeft: "20px"
                }}
              />
            </Box>
          </Grid>
          <Grid
            item
            xs="7"
            sm="7"
            md="7"
            lg="7"
            xl="7"
            display="flex"
            flexDirection="column"
            
          >
            <Box>
              <Box display="flex" justifyContent="flex-end" >
                <IconButton onClick={() => toggleTable(param.dirId)}>
                  <ArrowForwardIcon
                    variant="outlined"
                    sx={{ color: "black" }}
                  />
                </IconButton>
              </Box>
              <Box display="flex" justifyContent="center" alignContent="center" >
                <Box
                  sx={{
                    // color: colors.grey[100],
                    fontSize: {
                      xs: "1rem",
                      sm: "0.8rem",
                      md: "1rem",
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

      <ToastContainer style={{ zIndex: 9999991 }} />
    </Box>
  );
};
export default FolderCard;
