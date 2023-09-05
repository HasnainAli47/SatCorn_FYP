import React, { useState, useEffect } from "react";
import HowToRegSharpIcon from "@mui/icons-material/HowToRegSharp";
import { Link } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./OtpPage.css"; // Create a new CSS file for OTP page styles
import {
  Box,
  Button,
  TextField,
  Typography,
} from "@mui/material";

const OtpPage = () => {
  const navigate = useNavigate();
  const [otp, setOtp] = useState("");
  const [email, setEmail] = useState("");
  const [errorMessage, setErrorMessage] = useState("Please check your mail for OTP");
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    // Clear both error and success messages after 5 seconds
    if (errorMessage) {
      const timer = setTimeout(() => {
        setErrorMessage("");
        // setSuccessMessage("");
      }, 5000); // 5000 milliseconds (5 seconds)
      
      // Clear the timer when the component unmounts or when errorMessage or successMessage changes
      return () => clearTimeout(timer);
    }
  }, [errorMessage]);

  const handleChange = (e) => {
    if (e.target.name === "otp") {
      setOtp(e.target.value);
    } else if (e.target.name === "email") {
      setEmail(e.target.value);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      // Send a POST request to verify OTP
      const response = await axios.post('http://127.0.0.1:8000/api/verify-otp', {
        email: email,
        otp: otp,
      }, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      setErrorMessage(response.data.message);
      if(response.data.status == 200){
        // Redirect to the vlogin route using navigate
        navigate("/login");
      }
      // Redirect to success page or do something else on success
    } catch (error) {
      console.log(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <Box
          display="flex"
          flexDirection={"column"}
          maxWidth={400}
          alignItems="center"
          justifyContent="center"
          margin={"auto"}
          marginTop={5}
          padding={3}
          borderRadius={2}
          boxShadow={
            "5px 5px 20px rgba(28, 87, 57, 0.2), -5px -5px 20px rgba(28, 87, 57, 0.1)"
          }
          sx={{
            ":hover": {
              boxShadow:
                "10px 10px 30px rgba(28, 87, 57, 0.2), -10px -10px 30px rgba(28, 87, 57, 0.2)",
            },
            backgroundColor: "#fff",
          }}
        >
          <Typography
            variant="h3"
            padding={3}
            textAlign={"center"}
            color={"#397d5a"}
          >
            OTP Verification
          </Typography>
          {errorMessage && (
            <Typography
              variant="body1"
              color="error"
              style={{ backgroundColor: 'red', padding: '8px', borderRadius: '4px', color: 'white' }}
            >
              {errorMessage}
            </Typography>
          )}
          <TextField
            required
            onChange={handleChange}
            value={email}
            name="email"
            margin="normal"
            type="email"
            placeholder="Enter Email"
            variant="outlined"
            sx={{ width: "80%" }}
            className="custom-textfield"
          />
          <TextField
            required
            onChange={handleChange}
            value={otp}
            name="otp"
            margin="normal"
            type="text"
            placeholder="Enter OTP"
            variant="outlined"
            sx={{ width: "80%" }}
            className="custom-textfield"
          />
          
          <Button
            endIcon={<HowToRegSharpIcon />}
            type="submit"
            disabled={isSubmitting}
            sx={{
              marginTop: 3,
              backgroundColor: "#1C5739",
              color: "#fff",
              "&:hover": {
                backgroundColor: "#397D5A",
              },
            }}
            variant="contained"
          >
            Verify OTP
          </Button>
          <Link to="/signup">
            <Button
              sx={{
                marginTop: 3,
                backgroundColor: "#F8F7FF",
                color: "#3A5A40",
              }}
            >
              Back to Signup
            </Button>
          </Link>
        </Box>
      </form>
    </div>
  );
};

export default OtpPage;
