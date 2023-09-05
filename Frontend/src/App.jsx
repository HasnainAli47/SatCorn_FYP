import { useState } from "react";
import "./App.css";
// import LoginSignUp from "./LoginSignUp";
import Login from "./Component/Login";
import SignUp from "./Component/SignUp";
import OtpPage from "./Component/OtpPage";
import Home from "./Component/Home";
import Mapps from "./Component/Mapps";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";



function App() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <Router>
        <Routes>
          {/* <Route exact path="/loginSignUp" element={<LoginSignUp />} /> */}
          <Route path="/login" element={<Login />} />
          <Route path="/signUp" element={<SignUp />} />
          <Route path="/verify-otp" element={<OtpPage />} />
          <Route path="/home" element={<Home />} />
          <Route path="/" element={<Login />} />
          <Route path="/mapps" element={<Mapps />} />"
        </Routes>
      </Router>
    </div>
  );
}

export default App;
