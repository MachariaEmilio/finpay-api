import React, { useState } from "react";
import { Confirmdetails } from "./confirmemaildetails";
import SignUp from "./SignUp";

const Mainsignup = () => {
  const [completedSignup, setCompletedsignup] = useState(false);
  const [inputdata, setinput_value] = useState({ balance: 90500 });
  const[sentotp,setsentotp]=useState(null)

  return (
    <>
      {completedSignup ? (
        <Confirmdetails inputdata={inputdata} sentotp={sentotp} />
      ) : (
        <SignUp
          inputdata={inputdata}
          setinput_value={setinput_value}
          setCompletedsignup={setCompletedsignup}
          setsentotp={setsentotp}
        />
      )}
    </>
  );
};

export default Mainsignup;
