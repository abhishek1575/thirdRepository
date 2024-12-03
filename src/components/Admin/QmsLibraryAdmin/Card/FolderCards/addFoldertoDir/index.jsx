import { Box } from "@mui/material";
import Card from "./DirectoryCard";
import Grid from "@mui/material/Grid";

import SuperAdminService from "../../../../../../Services/superadmin";
import { useEffect, useState } from "react";

// import CircularLoading from "../../../global/Circularloading";
const DirectoryCards = () => {
  const [getAllSubDir, setGetAllSubDir] = useState([]);
  //  const [isLoading, setIsLoading] = useState(false);

  const storedId = sessionStorage.getItem("directoryId");
  useEffect(() => {
    // setIsLoading(true);

    SuperAdminService.getSubDir(storedId)
      .then((response) => {
        setGetAllSubDir(response.data);
        // setIsLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching Model List:", error);
        // setIsLoading(false);
      });
  }, []);

  return (
    <div>
      {/* <CircularLoading isLoading={isLoading} /> */}

      <Box marginLeft={"280px"}>
        <Grid container spacing={0.5}>
          {getAllSubDir.map((card, id) => (
            <Grid key={id} item xs={12} sm={6} md={4} lg={4} xl={3}>
              <Card subDirId={card.id} name={card.name} />
            </Grid>
          ))}
        </Grid>
      </Box>
    </div>
  );
};

export default DirectoryCards;
