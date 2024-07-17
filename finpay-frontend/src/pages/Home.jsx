import React from 'react'
import {  useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'


const Home = () => {
  const id_value = useSelector((data)=>data.userdetails.userid)  
 

  
  return (
    <div className="main">
      <p>this is the home page  </p>

      <div className="main"> 
        <p>the available balance</p>
        <p>id is {id_value}</p>
        <p>KSH 30,000.00</p>
        
      </div>
    </div>
  )
}

export default Home
