import React from "react";
import Label from "../components/label";
import Input from "../components/input";
import Button from "../components/button";
import { Link } from "react-router-dom";
const handleSubmit = async () => {};
const SignUp = () => {
  return (
    <>
      <div className="main">
        <p>Welcome to Finpay Api</p>
        <Label label_name="Login page" />
        <form action="" onSubmit={handleSubmit}>
          <Label label_name="Enter your details" />
          {/* <Label htmlfor="id" label_name={errormessage} /> */}
          <Label htmlfor="id" label_name="Id *" />
          <Input type="number"  id="id_number" /> 
          
          <Label htmlfor="id" label_name="Id *" />
          <Input type="number"  id="id_number" />

          <Label htmlfor="Fname" label_name="First name *" />
          <Input type="text" id="Fname" />

          <Label htmlfor="Sname" label_name="Second name *" />
          <Input type="text" id="Sname" />

          <Label htmlfor="email" label_name="Email*" />
          <Input type="email" id="email" />

          <Label htmlfor="Password" label_name="Password *" />
          <Input type="number" id="PNumber" />
          <Label htmlfor="Password" label_name="Confirm Password *" />
          <Input type="number" id="PNumber" />

          <Button name="submit" type="submit" />

          <label htmlFor="">Already have an account </label>
          <Link to="/Login">Login</Link>
        </form>
      </div>
    </>
  );
};

export default SignUp;
