import React, {useEffect} from "react";
import {Container, Typography} from "@mui/material";

import {CreateGroup, JoinGroup, Navbar} from "../components";

const Home = () => {
  useEffect(() => {
    document.title = "Messenger Clone - Home";
  });

  return (
    <div className="home">
      <Navbar />
      <Container maxWidth="xl" sx={{marginTop: "20px"}}>
        <Typography variant="h6" sx={{fontWeight: "bold"}}>
          Your Group
        </Typography>
        <Typography variant="h6" sx={{fontWeight: "bold"}}>
          Active Group
        </Typography>
        <Typography variant="h6" sx={{fontWeight: "bold"}}>
          Request Pending Group
        </Typography>
        <Typography variant="h6" sx={{fontWeight: "bold"}}>
          Leave Group
        </Typography>
        <JoinGroup />
        <CreateGroup />
      </Container>
    </div>
  );
};

export default Home;
