import React from "react";
import "./Product.css";
import Box from "@mui/material/Box";
import Rating from "@mui/material/Rating";
import StarIcon from "@mui/icons-material/Star";
import Stack from "@mui/joy/Stack";
import Typography from "@mui/joy/Typography";
import CircularProgress from "@mui/joy/CircularProgress";

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
                    value={value}
                    readOnly
                    precision={0.5}
                    emptyIcon={
                      <StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />
                    }
                  />
                  <Box sx={{ ml: 2 }}>{labels[value]}</Box>
                </Box>
              </div>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Animi, ut
              ullam. Corrupti autem, ratione laudantium quidem fuga possimus
              voluptas deserunt atque nostrum aperiam pariatur esse reiciendis
              velit nulla, numquam quas dolorum dicta nesciunt maxime explicabo
              asperiores tempore! Aspernatur possimus illo eum corporis rerum in
              ex consectetur aut fuga vero? Sunt, maiores? Minus delectus
              inventore laborum laudantium alias eaque minima asperiores.
              <br />
              <span>
                <span style={{ textAlign: "center", fontSize: "13px" }}>
                  - Jcube
                </span>
                <br />
                <span style={{ textAlign: "center", fontSize: "13px" }}>
                  24/09/23 1775 hrs
                </span>
              </span>
            </div>
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
                    value={value}
                    readOnly
                    precision={0.5}
                    emptyIcon={
                      <StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />
                    }
                  />
                  <Box sx={{ ml: 2 }}>{labels[value]}</Box>
                </Box>
              </div>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Animi, ut
              ullam. Corrupti autem, ratione laudantium quidem fuga possimus
              voluptas deserunt atque nostrum aperiam pariatur esse reiciendis
              velit nulla, numquam quas dolorum dicta nesciunt maxime explicabo
              asperiores tempore! Aspernatur possimus illo eum corporis rerum in
              ex consectetur aut fuga vero? Sunt, maiores? Minus delectus
              inventore laborum laudantium alias eaque minima asperiores.
              <br />
              <span>
                <span style={{ textAlign: "center", fontSize: "13px" }}>
                  - Jcube
                </span>
                <br />
                <span style={{ textAlign: "center", fontSize: "13px" }}>
                  24/09/23 1775 hrs
                </span>
              </span>
            </div>
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
                    value={value}
                    readOnly
                    precision={0.5}
                    emptyIcon={
                      <StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />
                    }
                  />
                  <Box sx={{ ml: 2 }}>{labels[value]}</Box>
                </Box>
              </div>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Animi, ut
              ullam. Corrupti autem, ratione laudantium quidem fuga possimus
              voluptas deserunt atque nostrum aperiam pariatur esse reiciendis
              velit nulla, numquam quas dolorum dicta nesciunt maxime explicabo
              asperiores tempore! Aspernatur possimus illo eum corporis rerum in
              ex consectetur aut fuga vero? Sunt, maiores? Minus delectus
              inventore laborum laudantium alias eaque minima asperiores.
              <br />
              <span>
                <span style={{ textAlign: "center", fontSize: "13px" }}>
                  - Jcube
                </span>
                <br />
                <span style={{ textAlign: "center", fontSize: "13px" }}>
                  24/09/23 1775 hrs
                </span>
              </span>
            </div>
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
                    value={value}
                    readOnly
                    precision={0.5}
                    emptyIcon={
                      <StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />
                    }
                  />
                  <Box sx={{ ml: 2 }}>{labels[value]}</Box>
                </Box>
              </div>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Animi, ut
              ullam. Corrupti autem, ratione laudantium quidem fuga possimus
              voluptas deserunt atque nostrum aperiam pariatur esse reiciendis
              velit nulla, numquam quas dolorum dicta nesciunt maxime explicabo
              asperiores tempore! Aspernatur possimus illo eum corporis rerum in
              ex consectetur aut fuga vero? Sunt, maiores? Minus delectus
              inventore laborum laudantium alias eaque minima asperiores.
              <br />
              <span>
                <span style={{ textAlign: "center", fontSize: "13px" }}>
                  - Jcube
                </span>
                <br />
                <span style={{ textAlign: "center", fontSize: "13px" }}>
                  24/09/23 1775 hrs
                </span>
              </span>
            </div>
            <button></button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Product;
