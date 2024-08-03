import React from 'react'

function Button({style,classname,type,name, onclick ,src ,alt}) {
  return (
    <>
     <button style={style} type={type} onClick={onclick} className={classname}> <img src={src} alt="" /> {name}</button> 
    </>
  )
}

export default Button
