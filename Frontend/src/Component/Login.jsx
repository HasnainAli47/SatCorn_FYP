import React, { useState, useEffect } from "react";
import LoginIcon from "@mui/icons-material/Login";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { Link } from "react-router-dom"; // Import useHistory
import Email from "@mui/icons-material/Email";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import "./Login.css";

import {
  Box,
  Button,
  IconButton,
  InputAdornment,
  TextField,
  Typography,
} from "@mui/material";

const Login = () => {
  const navigate = useNavigate();
  const { register, handleSubmit, reset } = useForm(); // Use useForm
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("Please enter your password and mail");

  useEffect(() => {
    // Clear both error and success messages after 5 seconds
    if (errorMessage || successMessage) {
      const timer = setTimeout(() => {
        setErrorMessage("");
        setSuccessMessage("");
      }, 5000); // 5000 milliseconds (5 seconds)
      
      // Clear the timer when the component unmounts or when errorMessage or successMessage changes
      return () => clearTimeout(timer);
    }
  }, [errorMessage, successMessage]);


  const handlePasswordVisibilityToggle = () => {
    setShowPassword(!showPassword);
  };








  const onSubmit = async (data, e) => {
    e.preventDefault();
  
    try {
      const response = await fetch('http://127.0.0.1:8000/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include', // Include cookies with the request
        body: JSON.stringify({
          email: data.email,
          password: data.password,
        }),
      });
  
      if (response.ok) {
        setSuccessMessage("Successfully logged in");
        
        // Redirect to the verify-otp route using navigate
        navigate("/mapps");
        
        const responseData = await response.json();
        console.log(responseData);
        // Add your login logic here
      } else {
        const errorData = await response.json();
        setErrorMessage(errorData.detail);
        console.log(errorData.detail);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  
    // Clear the form data after submission
    reset();
  };
  















  // const onSubmit = async (data, e) => {
  //   e.preventDefault();
    
  //   try {
  //     // Send a POST request using Axios
  //     const res = await axios.post('http://127.0.0.1:8000/api/login', {
  //       email: data.email,
  //       password: data.password,
  //     }, {
  //       headers: {
  //         'Content-Type': 'application/json',
  //       },
  //       'withCredentials': 'include'
  //     });
      
  //     setSuccessMessage("Succfully logged in");
  //     console.log(res);
  
  //     // Add your login logic here
  //   } catch (error) {
  //     // console.log("Error", error.response.data.detail);
  //     setErrorMessage(error.response.data.detail);
  //     // console.log(errorMessage);
  //   }
  
  //   // Clear the form data after submission
  //   reset();
  // };

  return (
    <div>
      {/* {errorMessage && (
        <Typography variant="body1" color="error">
          {errorMessage} In
        </Typography>
      )} */}
      <form onSubmit={handleSubmit(onSubmit)}>
      
        <Box
          display="flex"
          flexDirection={"column"}
          maxWidth={400}
          alignItems="center"
          justifyContent="center"
          margin={"auto"}
          marginTop={15}
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
            LOGIN
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
          {successMessage && (
            <Typography
              variant="body1"
              color="error"
              style={{ backgroundColor: 'green', padding: '8px', borderRadius: '4px', color: 'white' }}
            >
              {successMessage}
            </Typography>
          )}

          <TextField
            required
            {...register("email")}
            margin="normal"
            type="email"
            placeholder="Enter Email"
            variant="outlined"
            sx={{ width: "80%" }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Email />
                </InputAdornment>
              ),
            }}
            className="custom-textfield" // class name
          />
          <TextField
            required
            {...register("password")}
            margin="normal"
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            variant="outlined"
            sx={{ width: "80%" }}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={handlePasswordVisibilityToggle}>
                    {showPassword ? <Visibility /> : <VisibilityOff />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
            className="custom-textfield" // class name
          />
          <Button
            endIcon={<LoginIcon />}
            type="submit"
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
            LOGIN
          </Button>

          <Link to="/signUp">
            <Button
              sx={{
                marginTop: 3,
                backgroundColor: "#F8F7FF",
                color: "#3A5A40",
              }}
            >
              CHANGE TO SIGNUP
            </Button>
          </Link>
        </Box>
      </form>
    </div>
  );
};

export default Login;
