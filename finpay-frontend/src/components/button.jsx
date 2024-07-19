import React from 'react'

function Button({style,classname,type,name, onclick}) {
  return (
    <>
     <button style={style} type={type} onClick={onclick} className={classname}> {name}</button> 
    </>
  )
}

export default Button
