import React, { useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Logpage from "./pages/login";
import Errorpage from "./pages/Errorpage";
import Home from "./pages/Home.jsx";
import SignUp from "./pages/SignUp.jsx";

const App = () => {
  const [authenticated, setauthenticated] = useState(false);
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            authenticated ? <Home /> : <Logpage setauth={setauthenticated} />
          }
          errorElement={<Errorpage />}
        />
        <Route path="/Home" element={<Home />} errorElement={<Errorpage />} />
        <Route path="/Login" element={<Logpage />} />
        <Route path="/SignUp" element={<SignUp />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
