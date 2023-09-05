import React, { useState } from "react";
import LoginIcon from "@mui/icons-material/Login";
import HowToRegSharpIcon from "@mui/icons-material/HowToRegSharp";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import AccountCircle from "@mui/icons-material/AccountCircle"; // Icon for name
import Email from "@mui/icons-material/Email"; // Icon for email
import "./App.css";
import { Link } from "react-router-dom";
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

const LoginSignUp = () => {
  console.log("LoginSignUp component rendered");

  const [isSignup, setIsSignup] = useState(false);
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

  const handlePasswordVisibilityToggle = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(inputs);
  };

  const resetState = () => {
    setIsSignup(!isSignup);
    setInputs({ name: "", email: "", password: "", agree: false });
  };

  return (
    <div
    //   className="background-image-class"
    //   style={{
    //     height: "100vh",
    //   }}
    >
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
          borderRadius={3}
          boxShadow={"5px 5px 10px #ccc"}
          sx={{
            ":hover": { boxShadow: "10px 10px 20px #ccc" },
            backgroundColor: "#fff", // Set background color here
          }}
        >
          <Typography
            variant="h3"
            padding={3}
            textAlign={"center"}
            color={"#758467"}
          >
            {isSignup ? "SIGNUP" : "LOGIN"}
          </Typography>
          {isSignup && (
            <TextField
              required
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
            />
          )}
          <TextField
            required
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
          />
          <TextField
            required
            onChange={handleChange}
            value={inputs.password}
            name="password"
            margin="normal"
            type={showPassword ? "text" : "password"} // Update the type
            placeholder={isSignup ? "Create Password" : "Password"}
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
          />

          {isSignup && (
            <FormGroup>
              <FormControlLabel
                required
                control={
                  <Checkbox
                    onChange={() =>
                      setInputs((prev) => ({
                        ...prev,
                        agree: !inputs.agree,
                      }))
                    }
                  />
                }
                label="Agree to Terms and Conditions"
                sx={{
                  marginTop: 3,
                  color: "#3A5A40",
                }}
              />
            </FormGroup>
          )}

          <Link to="/loginSignUp">
            <Button
              endIcon={isSignup ? <HowToRegSharpIcon /> : <LoginIcon />}
              type="submit"
              sx={{
                marginTop: 3,
                backgroundColor: "#45503B",
                color: "#fff",
                "&:hover": {
                  backgroundColor: "#6b725f",
                },
              }}
              variant="contained"
            >
              {isSignup ? "signup" : "login"}
            </Button>
          </Link>
          <Button
            onClick={resetState}
            sx={{ marginTop: 3, backgroundColor: "#F8F7FF", color: "#3A5A40" }}
          >
            CHANGE TO {isSignup ? "LOGIN" : "SIGNUP"}
          </Button>
        </Box>
      </form>
    </div>
  );
};

export default LoginSignUp;
