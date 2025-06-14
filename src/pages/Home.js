import React from "react";
import { Button } from "@mui/material";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>Welcome to Bollywood App!</h1>
      <p>Manage Bollywood Producers, Oscars, and more!</p>
      <div style={{ marginTop: "20px" }}>
        <Button variant="contained" color="primary" style={{ margin: "10px" }}>
          <Link to="/game" style={{ textDecoration: "none", color: "white" }}>
            Start Game
          </Link>
        </Button>
        <Button variant="contained" color="secondary" style={{ margin: "10px" }}>
          <Link to="/producers" style={{ textDecoration: "none", color: "white" }}>
            Producers
          </Link>
        </Button>
        <Button variant="contained" style={{ margin: "10px", backgroundColor: "#ff9100", color: "white" }}>
          <Link to="/news" style={{ textDecoration: "none", color: "white" }}>
            News
          </Link>
        </Button>
        <Button variant="contained" style={{ margin: "10px", backgroundColor: "#43a047", color: "white" }}>
          <Link to="/oscars/winners" style={{ textDecoration: "none", color: "white" }}>
            Oscar Winners
          </Link>
        </Button>
      </div>
    </div>
  );
};

export default Home;
