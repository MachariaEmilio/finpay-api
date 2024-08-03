import React, { useEffect, useState } from "react";
import {  useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Button from "../components/button";
import Transactionshistoy from "../components/transactionshistoy";

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
      {/* <p>DASHBOARD</p> */}
      <p>Welcome {details.Fname} {details.Sname} </p>

      <div className=" balance container" id="balance">
        <p>Your available balance</p>      
        <p>KSH  <span className="color">{Balance}</span> </p>
       
      </div>
      <Button onclick={()=>(navigate("/Home/SendMoney"))} name ="send money" src ="../src/assets/send_money_icon.png" classname="send"/>
      <div> <Transactionshistoy/> </div>
   

    </div>
  );}
};

export default Home;
