import React, { useState } from "react";
import { Confirmdetails } from "./confirmemaildetails";
import SignUp from "./SignUp";

const Mainsignup = () => {
  const [completedSignup, setCompletedsignup] = useState(false);
  const [inputdata, setinput_value] = useState({ balance: 500 });

  return (
    <>
      {completedSignup ? (
        <Confirmdetails inputdata={inputdata} />
      ) : (
        <SignUp
          inputdata={inputdata}
          setinput_value={setinput_value}
          setCompletedsignup={setCompletedsignup}
        />
      )}
    </>
  );
};

export default Mainsignup;
