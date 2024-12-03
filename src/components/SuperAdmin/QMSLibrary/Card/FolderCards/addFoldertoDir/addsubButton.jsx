


import { Box,  Grid, IconButton, Tooltip,} from "@mui/material";

import {  useNavigate } from "react-router-dom";
import ArrowBackOutlinedIcon from '@mui/icons-material/ArrowBackOutlined';




const AddSubDirectory =() =>{


  
  let navigate = useNavigate();
  const  navigateRoute =()=>{
    
    navigate(`/fLists`);
   
   }
 


    return(
        <Box>
        <Box
        display="flex"
        justifyContent="flex-start"
        alignItems={"center"}
        marginTop={"90px"}
        marginLeft={"290px"}
      >
        <Grid container alignItems={"center"}>
          <Grid item xs="1" sm="1" md="1" lg="1" xl="1">
            <Box>
              <Tooltip title="Back">
                <IconButton 
                 onClick={navigateRoute}
                >
                  <ArrowBackOutlinedIcon
                    variant="outlined"
                    sx={{ color: "black" }}
                  />
                </IconButton>
              </Tooltip>
            </Box>
          </Grid>
         
        </Grid>
      
      </Box>
   
       
      </Box>
      
    );

}
export default AddSubDirectory;