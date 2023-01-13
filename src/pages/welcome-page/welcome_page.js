import { Button } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";

function WelcomePage() {
  let navigate = useNavigate();

  return (
    <div>
      <h1>Welcome Page</h1>
      <Button
        variant="contained"
        color="primary"
        onClick={() => {
          navigate("/app");
        }}
      >
        Home Page
      </Button>
    </div>
  );
}

export default WelcomePage;
