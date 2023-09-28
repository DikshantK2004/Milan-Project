import React, { useState } from "react";
import { useEffect } from "react";
import "./Product.css";
import Stack from "@mui/joy/Stack";
import Typography from "@mui/joy/Typography";
import CircularProgress from "@mui/joy/CircularProgress";
import ReviewComponent from "./ReviewComponent";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import useAuth from "./useAuth";
import { signOut, getAuth } from "firebase/auth";
import { app } from "./firebase.config";
import Button from "@mui/material/Button";
import Rating from "@mui/material/Rating";
import { useNavigate } from "react-router-dom";



async function dataReturn() {
  const fetchData = await fetch("http://localhost:8000/MacBook Pro", {
    method: "GET",
  });

  const dataRes = await fetchData.json();

  return dataRes;
}

async function checkPosted( laptop){
  const user= getAuth().currentUser;
  console.log(user);
  if(!user) return null;
  const authToken = await user.getIdToken();

    if(!authToken) {console.log("Auth Token couldn't be found"); }

  const response = await fetch("http://localhost:8000/",
  {
    method: "POST",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify({"user_id" : user.uid, "token" : authToken, "laptop" : laptop}),
  });

  const dataRes = await response.json();

  return dataRes;

}
function Product() {

  const navigate = useNavigate();

  const user = useAuth();
  // console.log(user);
  const [review, setReview] = useState("");
    const handler = async (event) => {
      event.preventDefault();
      setReview(event.target.value);
    }

  
  const handleReviewSubmit = async () => {
    if (user) {
      const authToken = await user.getIdToken();

      if(!authToken) console.log("Auth Token couldn't be found");

      const reviewData = {"username" : user.displayName, "user_id": user.uid, "token" : authToken, "review" : review, "laptop" : "MacBook Pro"};
      
    }
    else
    {
        navigate('/login');
    }
    
  }
  
  const [nul, setNul] = useState(0);
  const [posted, setPosted] = useState({});
  const [Data, setData] = useState({ alert: true, positive: [], negative: [] });
  useEffect(() => {
    const fetchData = async () => {
      const response = await dataReturn();
      const response2 = await checkPosted( "MacBook Pro");
      setData(response);
      setPosted(response2);
    };

    fetchData();
  }, []);
  
  return (
    <div className="product">
      <div className="prodfst">
        <img
          className="lappy"
          src={require("./assets/air.png")}
          alt="laptop-img"
        />
        <div className="prodrightmain">
          <h1>Apple Air M1</h1>
          <div className="prodprog">
            <div className="progressCirc">
                <Stack spacing={2}>
                  <CircularProgress
                    size="lg"
                    determinate
                    value={70}
                    color={70>50?"success":"danger"}
                    sx={{ "--CircularProgress-size": "150px" }}
                  >
                    <Typography sx={{ fontSize: "50px", fontWeight: "700",  }}>
                      70%
                    </Typography>
                  </CircularProgress>
                </Stack>
            </div>
          <div className="prodcatr">
            <div className="item4">
              Battery
                <Rating
                  name="read-only"
                  value={3}
                  precision={0.5}
                  size="large"
                  readOnly
                />
            
            </div>
            <div className="item4">
              Processor 
                <Rating
                  name="read-only"
                  value={4}
                  precision={0.5}
                  size="large"
                  readOnly
                />
            
            </div>
            <div className="item4">
              Display
                <Rating
                  name="read-only"
                  value={4.5}
                  precision={0.5}
                  size="large"
                  readOnly
                />
            
            </div>
            <div className="item4">
              Gaming 
                <Rating
                  name="read-only"
                  value={2.5}
                  precision={0.5}
                  size="large"
                  readOnly
                />
            
            </div>
            <div className="item4">
              Sound 
                <Rating
                  name="read-only"
                  value={1}
                  precision={0.5}
                  size="large"
                  readOnly
                />
            
            </div>
          </div>
          </div>
        </div>
      </div>
      <h4 style={{backgroundImage:"linear-gradient(white, rgba(255,255,255,0.7) 50%, rgba(255,255,255,0))", height:"150px", fontWeight:"600"}}>Reviews</h4>
      <div className="prorev">
        <div className="pro-div">
          <h4>Positive</h4>
          <div className="prod-rev">
            {Data.positive.map((item) => (
              <ReviewComponent
                review={item.review}
                score={item.score}
                username={item.username}
                date={item.date}
              />
            ))}
          </div>
        </div>

        <div className="pro-div">
          <h4>Negative</h4>
          <div className="prod-rev">
            {Data.negative.map((item) => (
              <ReviewComponent
                review={item.review}
                score={item.score}
                username={item.username}
                date={item.date}
              />
            ))}
          </div>
        </div>
      </div>
      <div className="inputreview">
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
        <Button variant="outlined" sx={{ color: "black" }} onClick = {handleReviewSubmit}>
          Submit
        </Button>
      </div>
    </div>
  );
}

export default Product;
