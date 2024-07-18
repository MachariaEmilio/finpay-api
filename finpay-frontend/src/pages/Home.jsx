import React, { useEffect } from "react";
import {  useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Button from "../components/button";

const Home = () => {
  const userdetails = useSelector((data) => data.userdetails.userdetails);

const navigate= useNavigate()
if (!userdetails.id){
  navigate("/login")
}else{
  return (
    <div className="main">
      <p>DASHBOARD</p>
      <p>Welcome {userdetails.Fname} {userdetails.Sname} </p>

      <div className="main">
        <p>Your available balance</p>
      
        <p>KSH   {userdetails.balance}</p>
        <Button onclick={()=>(navigate("/Home/SendMoney"))} name ="send money"/>
      </div>
    </div>
  );}
};

export default Home;
