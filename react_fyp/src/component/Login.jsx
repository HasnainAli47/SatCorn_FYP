import React from "react";
import { useForm } from "react-hook-form";
import { Box, TextField, Button, styled, Typography } from "@mui/material";
import FacebookOutlinedIcon from "@mui/icons-material/FacebookOutlined";
import TwitterIcon from "@mui/icons-material/Twitter";
import GoogleIcon from "@mui/icons-material/Google";
import { InputAdornment } from '@mui/material';
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import AccountCircle from "@mui/icons-material/AccountCircle";
import log from "./log.svg";
const Component = styled(Box)`
  width: 100%;
  display: flex;
  flex-direction: row;
  background-color: #fff;
  min-height: 100vh;
  overflow: hidden;
`;

const LeftBox = styled(Box)`
  width: 50%;
  border-bottom-right-radius: 600px;
  background-color: #238fef;
  display: flex;
  flex-direction: column;
  align-item: center;
  text-align: center;
`;
const RightBox = styled(Box)`
  width: 50%;
  width: 400px;
  margin: auto;
  //   border: 2px solid grey;
  //   box-shadow: 2px 1px 1px 2px rgb(0 0 0 / 0.4);
  text-align: center;
`;

const OuterBox = styled(Box)`
  background-color: #ffffff;

  display: flex;
  flex-direction: column;

  // we apply the css on the child element through &>(yaha pr us child element ka original tag aya ga qk hum material ui me name change hoty ha na is liya)
  & > div,
  & > p {
    margin-top: 10px;
    width: 400px;
    border-radius: 30px;
  }
  & > button {
    width: 120px;
    margin-top: 10px;
    text-align: center;
    align-item: center;
  }
`;
const SignButton = styled(Button)`
  text-transform: none;
  height: 40px;
  width: 120px;
  border: 1px solid white;
  color: white;
  border-radius: 24px;
  display: flex;
  justify-content: center;
  align-item: center;
`;
const Text = styled(TextField)`
  border-radius: 4px;
  color: grey;
  width: 200px;
  background-color: lightgrey;
  padding: 10px;
`;
function Login() {
  const { register, handleSubmit } = useForm();

  const onSubmit = (data) => {
    console.log(data);
  };
  return (
    <Component>
      <LeftBox>
        <h2
          style={{
            color: "white",
            marginTop: "100px",
            paddingBottom: "0px",
            marginBottom: "0px",
          }}
        >
          New here?
        </h2>
        <p style={{ color: "white" }}>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit.
          <br />
          sit amet consectetur adipisicing elit.
        </p>

        <SignButton
          variant="outlined"
          href="#outlined-buttons"
          style={{ margin: "0 auto", display: "flex" }}
        >
          SIGN UP
        </SignButton>
        <img
          src={log}
          alt="My image"
          style={{
            height: "200px",
            marginTop: "100px",
            marginLeft: "200px",
          }}
        />
      </LeftBox>
      <RightBox>
        <OuterBox>
          <h1
            style={{
              textAlign: "center",
              fontSize: "2.2rem",
              color: "#444",
              marginBottom: "10px",
            }}
          >
            Sign In
          </h1>

          <Text
            InputProps={{
              disableUnderline: true,
              //   startAdornment: (
              //     <InputAdornment position="start">
              //       <AccountCircle />
              //     </InputAdornment>
              //   ),
            }}
            id="standard-basic"
            placeholder="Email"
            variant="standard"
            name="email"
            {...register("email")}
            style={{ paddingLeft: "25px" }}
            //   onChange={(e) => OnValueChange(e)}
          />
          <Text
            InputProps={{ disableUnderline: true }}
            id="standard-basic"
            placeholder="Password"
            variant="standard"
            name="password"
            {...register("password")}
            style={{ paddingLeft: "15px" }}
            //   onChange={(e) => OnValueChange(e)}
          />

          <SignButton
            variant="contained"
            size="large"
            style={{ margin: "0 auto", display: "flex", marginTop: "10px" }}
            onClick={handleSubmit(onSubmit)}
          >
            LOGIN
          </SignButton>
          <h4>Or Sign in with social platforms</h4>

          <Box
            style={{
              display: "inline-block",
              paddingLeft: 0,
            }}
          >
            <FacebookOutlinedIcon style={{ paddingLeft: "15px" }} />
            <TwitterIcon style={{ paddingLeft: "15px" }} />
            <GoogleIcon style={{ paddingLeft: "15px" }} />
            <LinkedInIcon style={{ paddingLeft: "15px" }} />
          </Box>
        </OuterBox>
      </RightBox>
    </Component>
  );
}

export default Login;
