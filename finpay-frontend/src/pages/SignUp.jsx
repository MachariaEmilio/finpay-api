import React, { useState } from "react";
import Label from "../components/label";
import Input from "../components/input";
import Button from "../components/button";
import { Link } from "react-router-dom";
// import { send_email } from "../helper funtions/emailsender.mjs";

const SignUp = ({ inputdata, setinput_value, setCompletedsignup }) => {
  const [errorPassMessage, seterrorPassMessage] = useState("");
  const handleSubmit = async (event) => {
    event.preventDefault();
    if (inputdata.pass !== inputdata.password) {
      seterrorPassMessage({ passworderror: "The password  do not match" });
    } else {
      // we need to check if the user and the phone number exists
      const detailsStatus = await await fetch(
        `http://localhost:3000/checkdetails/${inputdata.id}/${inputdata.phone}`
      );
      const data = await detailsStatus.json();
      if (!detailsStatus.ok) {
        console.log(data);
        seterrorPassMessage({ detailserror: data.error });
      } else {
        setCompletedsignup(true);
        seterrorPassMessage({ detailserror: "login succesful✅✅✅" });
      }
    }
  };
  const handleChange = (event) => {
    const { name, value } = event.target;

    if (name !== "id") {
      setinput_value((prev) => ({
        ...prev,
        [name]: value,
      }));
    } else {
      setinput_value((prev) => ({
        ...prev,
        [name]: parseInt(value),
      }));
    }
  };
  console.log(inputdata);
  return (
    <>
      <div className="main">
        <p>Welcome to Finpay Api</p>
        <Label label_name="Signup page" />
        <form action="" onSubmit={handleSubmit}>
          <Label label_name="Enter your details" />
          <Label htmlfor="id" label_name={errorPassMessage.detailserror} />

          <Label htmlfor="id" label_name="Id *" />
          <Input type="number" name="id" id="id" onchange={handleChange} />

          <Label htmlfor="phone" label_name="Phone number*" />
          <Input
            type="number"
            name="phone"
            id="phone"
            min="9"
            max="20"
            onchange={handleChange}
          />

          <Label htmlfor="Fname" label_name="First name *" />
          <Input type="text" name="Fname" id="Fname" onchange={handleChange} />

          <Label htmlfor="Sname" label_name="Second name *" />
          <Input type="text" name="Sname" id="Sname" onchange={handleChange} />

          <Label htmlfor="email" label_name="Email*" />
          <Input type="email" name="email" id="email" onchange={handleChange} />

          <Label htmlfor="PNumber" label_name="Password *" />
          <Input
            type="password"
            name="pass"
            id="PNumber"
            min="6"
            max="20"
            onchange={handleChange}
          />
          <Label htmlfor="id" label_name={errorPassMessage.passworderror} />

          <Label htmlfor="CPNumber" label_name="Confirm Password *" />
          <Input
            type="Password"
            name="password"
            id="CPNumber"
            min="6"
            max="20"
            onchange={handleChange}
          />

          <Button name="submit" type="submit" />

          <label htmlFor="">Already have an account </label>
          <Link to="/Login">Login</Link>
        </form>
      </div>
    </>
  );
};

export default SignUp;
