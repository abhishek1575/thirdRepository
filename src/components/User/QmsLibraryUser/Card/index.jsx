
import { Box } from "@mui/material";
import Card from "./Card";
import Grid from "@mui/material/Grid";

import SuperAdminService from "../../../../Services/superadmin"
import { useEffect, useState } from "react";
// import CircularLoading from "../../../global/Circularloading";
const Cards = () => {
  
   const [getallVersions, setGetallVersions] = useState([]);
  //  const [isLoading, setIsLoading] = useState(false);
   
  useEffect(() => {
    // setIsLoading(true);
    SuperAdminService.getlaunchedVersions()
    .then((response) => {
      setGetallVersions(response.data);
      // setIsLoading(false);

    })
    .catch((error) => {
      console.error('Error fetching Model List:', error);
      // setIsLoading(false);
    });
   
  }, []);

  
  return (
    <div >
    {/* <CircularLoading isLoading={isLoading} /> */}
    <Box m={2}>
          
      <Grid container spacing={0.5} >
        {getallVersions.map((card, id) => (
          <Grid key={id} item xs={12} sm={6} md={4} lg={4} xl={3}>
            <Card
             id={card.id}
             version={card.version}
             month={card.month}
             year={card.year}
             launch={card.launch}
             created_by={card.created_by}
            />
          </Grid>
        ))}
      </Grid>
       
    </Box>
    </div>
  );

};

export default Cards;
