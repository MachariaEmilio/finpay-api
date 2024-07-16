import React from 'react'

const   Input = ({type ,placeholder,name,id,onchange,min,max} ) => {
  return (
    <>
   
     <input type={type} placeholder={placeholder} name={name} minLength={min} maxLength={max} id={id} onChange={onchange} required />
    </>
  )
}

export default Input
