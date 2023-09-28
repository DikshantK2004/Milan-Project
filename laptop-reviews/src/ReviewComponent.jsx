import React from "react";
import Box from "@mui/material/Box";
import Rating from "@mui/material/Rating";
import StarIcon from "@mui/icons-material/Star";

const labels = {
    0.5: "Useless",
    1: "Useless+",
    1.5: "Poor",
    2: "Poor+",
    2.5: "Ok",
    3: "Ok+",
    3.5: "Good",
    4: "Good+",
    4.5: "Excellent",
    5: "Excellent+",
  };
  
  const value = 4.5;

function ReviewComponent(props) {



  return (
    <div>
      <div className="item3">
        <div className="boxdiv">
          <Box
            sx={{
              width: 200,
              display: "flex",
              alignItems: "center",
            }}
          >
            <Rating
              name="text-feedback"
              value={props.score}
              readOnly
              precision={0.5}
              size="large"
              emptyIcon={
                <StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />
              }
            />
            <Box sx={{ ml: 2 }}>{labels[props.score]}</Box>
          </Box>
        </div>
        {props.review}
        <br />
        <span>
          <span style={ { textAlign: "center", fontSize: "13px" }}>- {props.username}</span>
          <br />
          <span style={{ textAlign: "center", fontSize: "13px" }}>
            {props.date}
          </span>
        </span>
      </div>
    </div>
  );
}

export default ReviewComponent;
