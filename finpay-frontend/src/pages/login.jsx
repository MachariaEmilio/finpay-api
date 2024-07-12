import { useEffect, useState } from "react";
import Button from "../components/button";
import Input from "../components/input";
import Label from "../components/label";
import { Link } from "react-router-dom";

export default function Logpage({ setauth }) {
  const [input_val, setinput_value] = useState(null);
  const [userdata, setuserdata] = useState(null);
  const [errormessage, seterrormessage] = useState("");

  console.log("data", userdata);

  console.log("input", input_val);

  const handleSubmit = async (event) => {
    event.preventDefault();
   
    try {
      const response = await fetch(
        `http://localhost:3000/login/${input_val.id}/${input_val.password}`
      );

      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      } else {
        const data = await response.json();

        setuserdata(data);
        if (data.status === 200) {
          seterrormessage("login successful");
          setTimeout(() => {
            setauth(true);
          }, 2000);
        } else {
          seterrormessage("Invalid Credentials");
        }
      }
    } catch (error) {
      console.error("Login failed:", error);
    }
  };
  const handleChange = (event) => {
    const { name, value } = event.target;
    setinput_value((prev) => ({
    ...prev,
    [name]: value,
    }));
    };
  return (
    <>
      <div className="main">
        <p>Welcome back to Finpay Api</p>
        <Label label_name="Login page" />
        <form action="" onSubmit={handleSubmit}>
          <Label label_name="Enter your details" />
          <Label htmlfor="id" label_name={errormessage} />
          <Label htmlfor="id" label_name="Id *" />

          <Input type="number" name="id" id="id_number" onchange={handleChange}/>
          <Label htmlfor="id" label_name="Password *" />

          <Input type="password" name="password" id="password" onchange={handleChange} />

          <Button name="submit" type="submit" />

          <label htmlFor="">Don't have an account </label>
          <Link to="/Signup">Sign Up</Link>
        </form>
      </div>
    </>
  );
}
