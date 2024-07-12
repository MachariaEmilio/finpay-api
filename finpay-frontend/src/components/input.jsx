import React from 'react'

const   Input = ({type ,placeholder,name,id,onchange} ) => {
  return (
    <>
   
     <input type={type} placeholder={placeholder} name={name} id={id} onChange={onchange} required />
    </>
  )
}

export default Input
