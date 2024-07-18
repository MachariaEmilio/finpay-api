import React from "react";
import Input from "../components/input";
import Label from "../components/label";
import Button from "../components/button";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { updatedetails } from "../feature/detais.mjs";

const SendMoney = () => {
    const navigate= useNavigate()
    const dispatch= useDispatch()
    const senderid= useSelector(
        (data)=> data.userdetails.userdetails.id
    )
   
  const [inputData, SetInputData] = useState({sender_id:senderid});

  async function handleSubmit(e) {
    e.preventDefault();
const createTransaction = await fetch("http://localhost:3000/transactions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(inputData),
  })
  const data= await createTransaction.json();

if (data.status!==200){
alert ("Something happened.The transaction is not complete .Please check the message sent to you ")
}else{
    alert ("You have successfully sent .Wait for confirmation message ")

    const userdetails = 
    await fetch(`http://localhost:3000/users/${inputData.sender_id}`)
  .then ((data)=>(data.json()))

dispatch(updatedetails(userdetails))
}

    navigate("/Home")


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
  };

  return (
    <div className="main">
      <form action="receiver_id" onSubmit={handleSubmit}>
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
        <Label htmlfor="password" label_name="Enter your password" />
        <Input
          type="password"
          name="password"
          id="password"
       
        />
        <Button type="submit" name="submit" />
      </form>
    </div>
  );
};

export default SendMoney;
