import { useEffect, useState } from "react";
import Button from "../components/button";
import Input from "../components/input";
import Label from "../components/label";
import { Link } from "react-router-dom";

export default function Logpage({ setauth }) {
  const [input_val, setinput_value] = useState(null);
  const [userdata, setuserdata] = useState(null);
  const [errormessage, seterrormessage] = useState("");

  useEffect(() => {
    const login = async () => {
      try {
        if (input_val) {
         
          const response = await fetch(`http://localhost:3000/login/${input_val.id}/${input_val.password}`)
  

          if (!response.ok) {
            throw new Error(`Error: ${response.status}`);
          } else {
            const data = await response.json();

            setuserdata(data);
            if (data.status === 200) {
              seterrormessage("login successful");
              setTimeout(() => {
                setauth(true);
              }, 4000);
            } else {
              seterrormessage("Invalid Credentials");
            }
          }
        }
      } catch (error) {
        console.error("Login failed:", error);
      }
    };
    async function runlogin() {
      await login();
    }
    runlogin();
   
  }, [input_val]);

  console.log("data", userdata);

  console.log("input", input_val);

  const handleSubmit = (event) => {
    event.preventDefault();
    const inputpasword = document.getElementById("password").value;
    const inputid = document.getElementById("id_number").value;
    console.log(inputid, inputpasword);
    setinput_value({ id: inputid, password: inputpasword });
  };

  return (
    <>
      <div className="main">
        <p>Welcome to Finpay Api</p>
        <Label label_name="Login page" />
        <form action="" onSubmit={handleSubmit}>
          <Label label_name="Enter your details" />
          <Label htmlfor="id" label_name={errormessage} />
          <Label htmlfor="id" label_name="Id *" />

          <Input type="number" name="id" id="id_number" />
          <Label htmlfor="id" label_name="Password *" />

          <Input type="password" id="password" />

          <Button name="submit" type="submit" />

          <label htmlFor="">Don't have  an account </label>
          <Link to="/Signup">Sign Up</Link>
        </form>
      </div>
    </>
  );
}
