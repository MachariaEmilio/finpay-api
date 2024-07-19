import React, { useState } from "react";

import Label from "../components/label";
import Input from "../components/input";
import Button from "../components/button";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { updatedetails } from "../feature/detais.mjs";

export const Confirmdetails = ({ inputdata,sentotp }) => {
  const navigate = useNavigate();
  const [otp, setotp] = useState(null);
  const [error, setmessage] = useState(null);
  const dispatch= useDispatch()
  async function handlesubmit(event) {
    event.preventDefault();
  


    if (otp !== sentotp) {
      setmessage("invalid code ");
    } else {
      const { pass, ...postdetails } = inputdata;
      const response = await fetch(`http://localhost:3000/users`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(postdetails),
      });
      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      } else {
        setmessage("you have successfully logged in ");
        alert("you have successfully logged in ");


        const userdetails = 
        await fetch(`http://localhost:3000/users/${inputdata.id}`)
      .then ((data)=>(data.json()))

      localStorage.setItem("userdetails" , JSON.stringify(userdetails))

  
    dispatch(updatedetails(userdetails))
console.log(userdetails)
        
      
          navigate("/Home");
      
      }
    }
  }
  const handleChange = (event) => {
    const { name, value } = event.target;
    setotp(parseInt(value));
  };


  return (
    <div className="main">
      <p>This is the last phase</p>
      <form action="" onSubmit={handlesubmit}>
        <Label
          label_name={`please input the code sent to ${inputdata.email}`}
        />
        <Input type="number" name="Otp" onchange={handleChange} />
        <Label label_name={error} />

        <Button  name="submit" type="submit" />
      </form>
    </div>
  );
};
