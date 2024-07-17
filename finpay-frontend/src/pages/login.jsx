import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../components/button";
import Input from "../components/input";
import Label from "../components/label";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { updatedetails } from "../feature/detais.mjs";


export default function Logpage({ setauth }) {
  const navigate = useNavigate();
  const [input_val, setinput_value] = useState(null);

  const [errormessage, seterrormessage] = useState("");
  const dispatch = useDispatch()

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

        if (data.status === 200) {
          seterrormessage("login successful");
          setTimeout(() => {
            setauth(true);
            navigate("/Home");
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
          <Label htmlfor="id_number" label_name="Id *" />

          <Input
            type="number"
            name="id"
            id="id_number"
            onchange={handleChange}
          />
          <Label htmlfor="password" label_name="Password *" />

          <Input
            type="password"
            name="password"
            id="password"
            min="5"
            max="20"
            onchange={handleChange}
          />

          <Button onclick={()=>dispatch(updatedetails(input_val.id))}  name="submit" type="submit" />

          <label htmlFor="">Don't have an account </label>
          <Link to="/Signup">Sign Up</Link>
        </form>
      </div>
    </>
  );
}
