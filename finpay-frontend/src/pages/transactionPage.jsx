import React from "react";
import Input from "../components/input";
import Label from "../components/label";
import Button from "../components/button";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { updatedetails } from "../feature/detais.mjs";

const SendMoney = () => {
  const navigate = useNavigate();
  const [message,setmessage]= useState("")

  // const senderid = useSelector((data) => data.userdetails.userdetails.id);
  const senderid = JSON.parse(localStorage.getItem("userdetails"))

  const [inputData, SetInputData] = useState({ sender_id: senderid.id });
  console.log(inputData);
  async function handleSubmit(e) {
    e.preventDefault();
    if(inputData.amount <=0){
      setmessage("The minimum amount for transaction 1")
    }else{
    console.log("object input data:", inputData);
    const createTransaction = await fetch(
      "http://localhost:3000/transactions",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(inputData),
      }
    );
    if(!createTransaction.ok){
      alert(
        "Something happened.The transaction is not complete .Please check the message sent to you "
      );
      navigate("/Home")
    }
    else{
    const data = await createTransaction.json();
    console.log(data);
    if (data.status !== 200) {
      alert(
        "Something happened.The transaction is not complete .Please check the message sent to you "
      );
    } else {
      alert("You have successfully sent .Wait for confirmation message ");

   
      navigate("/Home");
    }}
  }
  }
  const handleChange = (event) => {
    const { name, value } = event.target;
    if (name !== "password") {
      SetInputData((prev) => ({
        ...prev,
        [name]: parseInt(value),
      }));
    } else {
      SetInputData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
    setmessage("")
  };

  return (
    <div className="main">
      <Button classname="backbutton"    onclick={()=>navigate("/Home")} name="Back"/>
      
      <p className="descri transact"> Send money</p>
      
      <form action="receiver_id" onSubmit={handleSubmit} className="transactionform">
        <Label htmlFor="receiver_id" label_name="Enter the receiver id " />
        <Input
          name="receiver_id"
          type="number"
          id="receiver_id"
          onchange={handleChange}
        />
        <Label htmlfor="amount" label_name="enter the amount" />
        <Input
          type="number"
          name="amount"
          id="amount"
          onchange={handleChange}
        />
        <Label style={{color:"red",fontSize:"17px"}} label_name={message}/>
        <Label htmlfor="password" label_name="Enter your password" />
        <Input type="password" name="password" id="password"  onchange={handleChange} />
        <Button type="submit" name="submit" />
      </form>
    </div>
  );
};

export default SendMoney;
