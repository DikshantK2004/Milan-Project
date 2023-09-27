import React, { useState } from "react";
import { useEffect } from "react";
import "./Product.css";
import Stack from "@mui/joy/Stack";
import Typography from "@mui/joy/Typography";
import CircularProgress from "@mui/joy/CircularProgress";
import ReviewComponent from "./ReviewComponent";
import { Router } from "react-router-dom";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import useAuth from "./useAuth";
import { signOut, getAuth } from "firebase/auth";
import {app} from './firebase.config'

async function dataReturn() {
  const fetchData = await fetch("http://localhost:8000/MacBook Pro", {"method" : "GET"});

  const dataRes = await fetchData.json();

  return dataRes;
}


function Product() {
  const user = useAuth()
  const auth = getAuth(app)
    const [review, setReview] = useState("")
    const handler = async(event) =>{
        event.preventDefault();
        setReview(event.target.value);
      }
  const [nul, setNul] = useState(0);
  const [Data, setData] = useState({alert:true,positive:[],negative:[]});

  useEffect(() => {
    const fetchData = async () => {
      const response = await dataReturn();
      setData(response);
    };

    fetchData();
  }, []);

  console.log("Data is here", Data.positive);
  
  return(
    
            <div className="product">
            <img
              className="lappy"
              src={require("./assets/air.png")}
              alt="laptop-img"
            />
            <h1>Apple Air M1</h1>
            <h4>Reviews</h4>
            <div className="prorev">
              <div className="pro-div">
                <h4>Positive</h4>
                <div className="prod-rev">{Data.positive.map((item)=>(<ReviewComponent
              review={item.review}
              score={item.score}
              username={item.username}
              date={item.date}
            />))}</div>
            </div>
            <div className="prodprog">
              <Stack spacing={2}>
                <CircularProgress
                  size="lg"
                  determinate
                  value={70}
                  sx={{ "--CircularProgress-size": "150px" }}
                >
                  <Typography sx={{ fontSize: "30px", fontWeight: "700" }}>
                    70%
                  </Typography>
                </CircularProgress>
              </Stack>
              <h4>Users thought this Laptop is a good Buy</h4>
            </div>
            <div className="pro-div">
              <h4>Negative</h4>
              <div className="prod-rev">{Data.negative.map((item)=>(<ReviewComponent
              review={item.review}
              score={item.score}
              username={item.username}
              date={item.date}
            />))}</div>
            </div>
          </div>

          <div className="input">
        <h4>Tell us what you feel about this Laptop?</h4>
        <div className="reviewInput">
          <Box
            component="form"
            sx={{
              "& .MuiTextField-root": { m: 1, width: "100ch" },
            }}
            noValidate
            autoComplete="off"
          >
            <div>
              <TextField
                id="filled-multiline-flexible"
                label="Your Review"
                multiline
                maxRows={4}
                variant="filled"
                value={review}
                onInput={handler}
              />
            </div>
          </Box>
        </div>
      </div>
        </div>)
            
          
}

export default Product;
