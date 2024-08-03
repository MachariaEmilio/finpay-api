import React, { useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Logpage from "./pages/login.jsx";
import Errorpage from "./pages/Errorpage.jsx";
import Home from "./pages/Home.jsx";

import Mainsignup from "./pages/MainSignup.jsx";
import SendMoney from "./pages/transactionPage.jsx";

const App = () => {
  const [authenticated, setauthenticated] = useState(false);
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Logpage />} errorElement={<Errorpage />} />
        <Route
          path="/Login"
          element={
            authenticated ? <Home /> : <Logpage setauth={setauthenticated} />
          }
          errorElement={<Errorpage />}
        />
        <Route path="/Home" element={<Home />} errorElement={<Errorpage />} />
        <Route
          path="/Home/SendMoney"
          element={<SendMoney />}
          errorElement={<Errorpage />}
        />

        <Route path="/SignUp" element={<Mainsignup />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
