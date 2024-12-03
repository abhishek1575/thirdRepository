
import { Box,  IconButton,Tooltip } from "@mui/material";
import Card from "./FolderCard";
import Grid from "@mui/material/Grid";
import Topbar from "../../../Topbar"
import SuperAdminService from "../../../../../Services/superadmin"
import { useContext, useEffect, useState,  } from "react";

import ArrowBackOutlinedIcon from '@mui/icons-material/ArrowBackOutlined';

import { DataContext } from "../../../../../DataContext";
import { useNavigate } from "react-router-dom";
const FolderCards = () => {
  // const location = useLocation();


  const { dataId } = useContext(DataContext);
   const [getallDir, setGetallDir] = useState([]);
  //  const [isLoading, setIsLoading] = useState(false);
  const { setData } = useContext(DataContext);
  useEffect(() => {
    // setIsLoading(true);
    const storedId = sessionStorage.getItem('versionId');
    if (storedId) {
      setData({ id: storedId, version: sessionStorage.getItem('versionName') });
    }
    SuperAdminService.getDir(dataId.id)
    .then((response) => {
      setGetallDir(response.data);
      console.log("id",response.data.id)

    })
    .catch((error) => {
      console.error('Error fetching Model List:', error);
      // setIsLoading(false);
    });
   
  }, [dataId.id,]);



 
  
  
  
  let navigate = useNavigate();
const navigateRoute =() =>{
  navigate('/uQmsLibrary')
}

  
  return (
    <div className="app" style={{ backgroundColor: "#EEF0F6" }}>
    <main className="content">
      <Topbar />

      <Box display="flex"  justifyContent="flex-start" alignItems={"center"} marginTop={"90px"} marginLeft={"290px"}>
        <Grid container alignItems={"center"}>
          <Grid item xs="1" sm="1" md="1" lg="1" xl="1">
          <Box>
        <Tooltip title="Back">
          <IconButton 
          onClick={navigateRoute}
          >
                   <ArrowBackOutlinedIcon variant="outlined" sx={{color:"black"}} />
                  
          </IconButton>
          </Tooltip>
          </Box>
          </Grid>
          <Grid item xs="11" sm="11" md="5" lg="5" xl="">
          <Box >
            {/* <span style={{fontWeight:"bold"}} > {dataId.version}</span> */}
         
        </Box>

</Grid>

        </Grid>
        
         
         
        </Box>
       
    <Box marginLeft={"290px"}>
          
      <Grid container spacing={0.2} >
        {getallDir.map((card, id) => (
          <Grid key={id} item xs={12} sm={6} md={4} lg={4} xl={3}>
            <Card
            dirId={card.id}
            name={card.name}
            
            
            />
          </Grid>
        ))}
      </Grid>
      
    </Box>
   
    </main>
    
    </div>
    
  );

};

export default FolderCards;
