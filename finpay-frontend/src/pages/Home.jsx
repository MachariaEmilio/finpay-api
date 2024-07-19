import React, { useEffect, useState } from "react";
import {  useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Button from "../components/button";

const Home = () => {
  
const details = JSON.parse(localStorage.getItem("userdetails"))
const [Balance,setBalance]=useState(details.balance)


useEffect(()=>{
  // check balance
  async function checkbalance(){
  const userdetails = await fetch(
    `http://localhost:3000/users/${details.id}`
  ).then((data) => data.json());
  setBalance( userdetails.balance)
 
}
checkbalance()
},[])

const navigate= useNavigate()
if (!details.id){
 return  navigate("/login")
}else{
  return (
    <div className="main">
      <p>DASHBOARD</p>
      <p>Welcome {details.Fname} {details.Sname} </p>

      <div className="main">
        <p>Your available balance</p>      
        <p>KSH   {Balance}</p>
        <Button onclick={()=>(navigate("/Home/SendMoney"))} name ="send money"/>
      </div>
    </div>
  );}
};

export default Home;
