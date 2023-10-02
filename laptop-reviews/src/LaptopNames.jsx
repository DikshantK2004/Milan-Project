import React from "react";
import { experimentalStyled as styled } from "@mui/material/styles";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import "./LaptopNames.css";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

async function getLaptops()
{
  const fetchData = await fetch('http://localhost:8000/getLaptop');
  const Data = await fetchData.json();
  return Data;
}
function LaptopNames() {

  const [laptops, setLaptops] = useState([]);

  useEffect( () =>
  {
     const fetchData =  async () => { const laptopResponse = await getLaptops();
      setLaptops(laptopResponse);
     }

     fetchData();


  }, []);
  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
    ...theme.typography.body2,
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary,
  }));
  console.log(laptops);

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
          {laptops.map((item) => {
            return (
              <Grid item xs={2} sm={4} md={4}>
            <Item><Link to={`/laptop/${item}`}> {item}</Link></Item>
          </Grid>
            )
          })}
          {/* <Grid item xs={2} sm={4} md={4}>
            <Item><Link to={"/laptop/macbook"}>Macbook Air M1</Link></Item>
          </Grid>
          <Grid item xs={2} sm={4} md={4}>
            <Item><Link to={"/laptop/acasl"}>Acer Aspire LITE</Link></Item>
          </Grid>
          <Grid item xs={2} sm={4} md={4}>
            <Item><Link to={"/laptop/acas5"}>Acer Aspire 5</Link></Item>
          </Grid>
          <Grid item xs={2} sm={4} md={4}>
            <Item><Link to={"/laptop/asusvi"}>ASUS Vivobook</Link></Item>
          </Grid>
          <Grid item xs={2} sm={4} md={4}>
            <Item><Link to={"/laptop/hpvic"}>HP Victus</Link></Item>
          </Grid>
          <Grid item xs={2} sm={4} md={4}>
            <Item><Link to={"/laptop/insp15"}>Dell Inspiron 15</Link></Item>
          </Grid>
          <Grid item xs={2} sm={4} md={4}>
            <Item><Link to={"/laptop/lenip3l"}>Lenovo Ideapad 3 Lite</Link></Item>
          </Grid>
          <Grid item xs={2} sm={4} md={4}>
            <Item><Link to={"/laptop/lenfle5"}>Lenovo Flex 5</Link></Item>
          </Grid>
          <Grid item xs={2} sm={4} md={4}>
            <Item><Link to={"/laptop/msi"}>MSI</Link></Item>
          </Grid>
          <Grid item xs={2} sm={4} md={4}>
            <Item><Link to={"/laptop/pav15"}>HP Pavillion 15</Link></Item>
          </Grid>
          <Grid item xs={2} sm={4} md={4}>
            <Item><Link to={"/laptop/mssurgo"}>Microsoft Surface Go</Link></Item>
          </Grid> */}
        </Grid>
      </Box>
    </div>
  );
}

export default LaptopNames;
