import React from 'react'

function Button({type,name, onclick}) {
  return (
    <>
     <button type={type} onClick={onclick}> {name}</button> 
    </>
  )
}

export default Button
