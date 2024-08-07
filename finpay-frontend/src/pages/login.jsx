import { useState } from "react";
import { json, useNavigate } from "react-router-dom";
import Button from "../components/button";
import Input from "../components/input";
import Label from "../components/label";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { updatedetails } from "../feature/detais.mjs";

export default function Logpage() {
  const navigate = useNavigate();
  const [input_val, setinput_value] = useState(null);

  const [errormessage, seterrormessage] = useState("");
  const dispatch = useDispatch();

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
          seterrormessage({success:"login successful ✅✅"});


          const userdetails = await fetch(
            `http://localhost:3000/users/${input_val.id}`
          ).then((data) => data.json());

          localStorage.setItem("userdetails" , JSON.stringify(userdetails))

          dispatch(updatedetails(userdetails));
          setTimeout(() => {
           
            navigate("/Home");
          }, 1000);
        } else {
          seterrormessage({error:"Invalid Credentials❌❌"});
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
    seterrormessage("")
  };

  return (
    <>
      <div className="main">
        <p className="descri">Welcome back to Finpay Api</p>
        <Label label_name="Login " classname="descri" />
        <Label style={{color :"green",alignSelf:"center"}} htmlfor="id" label_name={errormessage.success} />
        <form action="" onSubmit={handleSubmit}>
          <Label label_name="Enter your details" />

          <Label style={{color :"red",alignSelf:"center"}} htmlfor="id" label_name={errormessage.error} />
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

          <Button name="submit" type="submit" />
        </form>
        <div className=" accounts">
          <Label label_name="Don't have an account? " />
          <Link to="/Signup" className="links">
            Sign Up
          </Link>
        </div>
      </div>
    </>
  );
}
