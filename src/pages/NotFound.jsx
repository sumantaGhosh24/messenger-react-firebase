import React, {useEffect} from "react";
import {Button, Container, Typography} from "@mui/material";
import {Link} from "react-router-dom";

const NotFound = () => {
  useEffect(() => {
    document.title = "Messenger Clone - Page Not Found";
  });

  return (
    <Container maxWidth="lg">
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          height: "100vh",
          flexDirection: "column",
        }}
      >
        <Typography variant="h3" gutterBottom>
          404 || Page Not Found
        </Typography>
        <Button variant="contained" color="primary" size="large">
          <Link to="/" style={{textDecoration: "none", color: "white"}}>
            Back to Home
          </Link>
        </Button>
      </div>
    </Container>
  );
};

export default NotFound;
