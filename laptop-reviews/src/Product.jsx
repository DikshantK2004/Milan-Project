import React, { useState } from "react";
import { useEffect } from "react";
import Stack from "@mui/joy/Stack";
import Typography from "@mui/joy/Typography";
import CircularProgress from "@mui/joy/CircularProgress";
import ReviewComponent from "./ReviewComponent";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import useAuth from "./useAuth";
import { getAuth } from "firebase/auth";
import Button from "@mui/material/Button";
import Rating from "@mui/material/Rating";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import { styled } from "@mui/material/styles";
import "./Product.css";

async function dataReturn() {
  const fetchData = await fetch("http://127.0.0.1:8000/MacBook Pro", {
    method: "GET",
  });
  const dataRes = await fetchData.json();
  return dataRes;
}

async function checkPosted(laptop) {
  const user = getAuth().currentUser;
  console.log(user);
  if (!user) return null;
  const authToken = await user.getIdToken();

  if (!authToken) {
    console.log("Auth Token couldn't be found");
  }

  const response = await fetch("http://127.0.0.1:8000/", {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify({
      user_id: user.uid,
      token: authToken,
      laptop: laptop,
    }),
  });

  const dataRes = await response.json();
  return dataRes;
}

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

const StyledTabs = styled((props) => (
  <Tabs
    {...props}
    TabIndicatorProps={{ children: <span className="MuiTabs-indicatorSpan" /> }}
  />
))({
  "& .MuiTabs-indicator": {
    display: "flex",
    justifyContent: "center",
    backgroundColor: "transparent",
  },
  "& .MuiTabs-indicatorSpan": {
    maxWidth: 40,
    width: "100%",
    backgroundColor: "#DDBBFF",
  },
});

const StyledTab = styled((props) => <Tab disableRipple {...props} />)(
  ({ theme }) => ({
    textTransform: "none",
    fontWeight: theme.typography.fontWeightRegular,
    fontSize: theme.typography.pxToRem(15),
    marginRight: theme.spacing(1),
    color: "rgba(0, 0, 0, 0.9)",
    "&.Mui-selected": {
      color: "#692AA9",
    },
    "&.Mui-focusVisible": {
      backgroundColor: "#692AA9",
    },
  })
);

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `vertical-tab-${index}`,
    "aria-controls": `vertical-tabpanel-${index}`,
  };
}

function Product() {
  const navigate = useNavigate();
  const user = useAuth();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  // console.log(user);
  const [review, setReview] = useState("");
  const handler = async (event) => {
    event.preventDefault();
    setReview(event.target.value);
  };

  const handleReviewSubmit = async () => {
    if (user) {
      const authToken = await user.getIdToken();

      if (!authToken) console.log("Auth Token couldn't be found");

      const reviewData = {
        username: user.displayName,
        user_id: user.uid,
        token: authToken,
        review: review,
        laptop: "MacBook Pro",
      };
    } else {
      navigate("/login");
    }
  };

  const [nul, setNul] = useState(0);
  const [posted, setPosted] = useState({});
  const [Data, setData] = useState({ alert: true, positive: [], negative: [] });
  useEffect(() => {
    const fetchData = async () => {
      const response = await dataReturn();
      const response2 = await checkPosted("MacBook Pro");
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
                  color={70 > 50 ? "success" : "danger"}
                  sx={{ "--CircularProgress-size": "150px" }}
                >
                  <Typography sx={{ fontSize: "50px", fontWeight: "700" }}>
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
      <h4
        style={{
          backgroundImage:
            "linear-gradient(white, rgba(255,255,255,0.7) 50%, rgba(255,255,255,0))",
          height: "100px",
          fontWeight: "600",
        }}
      >
        Reviews
      </h4>
      <Box
        sx={{
          flexGrow: 1,
          bgcolor: "transparent",
          display: "flex",
          height: "100%",
        }}
      >
        <StyledTabs
          orientation="vertical"
          variant="scrollable"
          value={value}
          onChange={handleChange}
          aria-label="Vertical tabs example"
          sx={{ borderRight: 0, borderColor: "pink" }}
        >
          <StyledTab label="Overall" {...a11yProps(0)} />
          <StyledTab label="Battery" {...a11yProps(1)} />
          <StyledTab label="Processor" {...a11yProps(2)} />
          <StyledTab label="Display" {...a11yProps(3)} />
          <StyledTab label="Gaming" {...a11yProps(4)} />
          <StyledTab label="Sound" {...a11yProps(5)} />
        </StyledTabs>

        <TabPanel value={value} index={0}>
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
        </TabPanel>
        <TabPanel value={value} index={1}>
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
        </TabPanel>
        <TabPanel value={value} index={2}>
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
        </TabPanel>
        <TabPanel value={value} index={3}>
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
        </TabPanel>
        <TabPanel value={value} index={4}>
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
        </TabPanel>
        <TabPanel value={value} index={5}>
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
        </TabPanel>
      </Box>

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
        <Button
          variant="outlined"
          sx={{ color: "black" }}
          onClick={handleReviewSubmit}
        >
          Submit
        </Button>
      </div>
    </div>
  );
}

export default Product;
