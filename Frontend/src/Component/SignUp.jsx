import React, { useState, useEffect } from "react";
import HowToRegSharpIcon from "@mui/icons-material/HowToRegSharp";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

import axios from "axios";

import AccountCircle from "@mui/icons-material/AccountCircle"; // Icon for name
import Email from "@mui/icons-material/Email"; // Icon for email
import "./SignUp.css";
import {
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  FormGroup,
  IconButton,
  InputAdornment,
  TextField,
  Typography,
} from "@mui/material";

const SignUp = () => {
  const navigate = useNavigate();
  const { register, handleSubmit, reset } = useForm();
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [inputs, setInputs] = useState({
    name: "",
    email: "",
    password: "",
    agree: false,
  });
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    setInputs((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

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
    
    setIsSubmitting(true);
    try {
      // Send a POST request using Axios
      await axios.post('http://127.0.0.1:8000/api/register', {
        name: data.name,
        email: data.email,
        password: data.password,
      }, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      
      setSuccessMessage("Please Check your mail for verification OTP");

      // Redirect to the verify-otp route using navigate
      navigate("/verify-otp");
  
      // Add your login logic here
    } catch (error) {
      setErrorMessage(error.response.data.email[0]);
      // console.log(errorMessage);
    }finally {
      setIsSubmitting(false); // Reset isSubmitting to false after form submission
      resetState();
    }
  };
  

  const resetState = () => {
    // Reset the form fields and state
    setInputs({ name: "", email: "", password: "", agree: false });
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
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
            SIGNUP
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
            {...register("name")}
            onChange={handleChange}
            value={inputs.name}
            name="name"
            margin="normal"
            type="text"
            placeholder="Enter Name"
            variant="outlined"
            sx={{ width: "80%" }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <AccountCircle />
                </InputAdornment>
              ),
            }}
            className="custom-textfield" // class name
          />
          <TextField
            required
            {...register("email")}
            onChange={handleChange}
            value={inputs.email}
            name="email"
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
            onChange={handleChange}
            value={inputs.password}
            name="password"
            margin="normal"
            type={showPassword ? "text" : "password"} // Update the type
            placeholder="Create Password"
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
          <FormGroup>
            <FormControlLabel
              required
              control={
                <Checkbox
                  {...register("agree")}
                  onChange={() =>
                    setInputs((prev) => ({
                      ...prev,
                      agree: !inputs.agree,
                    }))
                  }
                  className="custom-checkbox"
                />
              }
              label="Agree to Terms and Conditions"
              sx={{
                marginTop: 3,
                color: "#3A5A40",
              }}
            />
          </FormGroup>
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
            SIGNUP
          </Button>
          <Link to="/login">
            <Button
              onClick={resetState}
              sx={{
                marginTop: 3,
                backgroundColor: "#F8F7FF",
                color: "#3A5A40",
              }}
            >
              CHANGE TO LOGIN
            </Button>
          </Link>
        </Box>
      </form>
    </div>
  );
};

export default SignUp;
