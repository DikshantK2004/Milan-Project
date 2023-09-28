import React from "react";
import { experimentalStyled as styled } from "@mui/material/styles";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import "./LaptopNames.css";
import { Link } from "react-router-dom";

function LaptopNames() {
  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
    ...theme.typography.body2,
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary,
  }));

  return (
    <div className="infographics paddings">
      <h4>Laptops We Have</h4>
      <Box sx={{ flexGrow: 1 }}>
        <Grid
          container
          sx={{display:"flex", justifyContent:"center"}}
          spacing={{ xs: 2, md: 3 }}
          columns={{ xs: 4, sm: 8, md: 12 }}
        >
          <Grid item xs={2} sm={4} md={4}>
            <Item><Link to={"/laptop/macbook"}>Macbook Air M1</Link></Item>
          </Grid>
          <Grid item xs={2} sm={4} md={4}>
            <Item><Link to={"/laptop/acrl"}>Acer Aspire Lite</Link></Item>
          </Grid>
          <Grid item xs={2} sm={4} md={4}>
            <Item><Link to={"/laptop"}>Macbook Air M1</Link></Item>
          </Grid>
          <Grid item xs={2} sm={4} md={4}>
            <Item><Link to={"/laptop"}>Macbook Air M1</Link></Item>
          </Grid>
          <Grid item xs={2} sm={4} md={4}>
            <Item><Link to={"/laptop"}>Macbook Air M1</Link></Item>
          </Grid>
          <Grid item xs={2} sm={4} md={4}>
            <Item><Link to={"/laptop"}>Macbook Air M1</Link></Item>
          </Grid>
          <Grid item xs={2} sm={4} md={4}>
            <Item><Link to={"/laptop"}>Macbook Air M1</Link></Item>
          </Grid>
          <Grid item xs={2} sm={4} md={4}>
            <Item><Link to={"/laptop"}>Macbook Air M1</Link></Item>
          </Grid>
          <Grid item xs={2} sm={4} md={4}>
            <Item><Link to={"/laptop"}>Macbook Air M1</Link></Item>
          </Grid>
          <Grid item xs={2} sm={4} md={4}>
            <Item><Link to={"/laptop"}>Macbook Air M1</Link></Item>
          </Grid>
          <Grid item xs={2} sm={4} md={4}>
            <Item><Link to={"/laptop"}>Macbook Air M1</Link></Item>
          </Grid>
        </Grid>
      </Box>
    </div>
  );
}

export default LaptopNames;
