import { Box, Grid, IconButton } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import "./Card.css";

import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { useNavigate } from "react-router-dom";

import folderImage from "../../../../images/folder.png";

import { DataContext } from "../../../../DataContext";
import SuperAdminService from "../../../../Services/superadmin";
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

  let navigate = useNavigate();
  const handleNavigate = (id, version) => {
    sessionStorage.setItem("versionId", id);
    sessionStorage.setItem("versionName", version);
    setData({ id, version });
    navigate(`/fCards`);
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
              <Box display="flex" justifyContent="center" alignContent="center">
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
                    <b>{param.version} </b>
                  </span>
                  <br />
                  <span>
                    <b>
                      {param.month} {param.year}
                    </b>
                  </span>
                  <br />
                  <span style={{fontSize:'0.8rem',color:"blue"}}>Created By: {getUser.name}</span>
                </Box>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};
export default Card;
