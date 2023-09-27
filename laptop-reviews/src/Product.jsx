import React from "react";
import "./Product.css";
import Stack from "@mui/joy/Stack";
import Typography from "@mui/joy/Typography";
import CircularProgress from "@mui/joy/CircularProgress";
import ReviewComponent from "./ReviewComponent";

function Product() {
  return (
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
          <div className="prod-rev">
            <ReviewComponent
              review="Lorem ipsum dolor sit amet consectetur, adipisicing elit. Modi est exercitationem dolores, libero mollitia quis alias minima tempore in ullam, temporibus consequuntur esse laudantium optio deleniti blanditiis ab voluptatum dolorem! Neque repellat, fugiat modi beatae mollitia fugit maxime laudantium molestiae ut dolores cupiditate accusantium officia totam id possimus unde ipsam fuga nemo dicta. Sint, eaque nihil. Harum voluptates perspiciatis distinctio?
            "
              score="4.5"
              username="Jcube"
              date="17/09/23"
            />
          </div>
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
          <div className="prod-rev">
            <button></button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Product;
