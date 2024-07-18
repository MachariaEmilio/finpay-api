import React from 'react'

const Label = ({ style,htmlfor ,label_name,classname ,id}) => {
  return (
    <>
      <label style={style} className={classname}  htmlFor={htmlfor} id={id}>{label_name} </label>
 
    </>
  )
}

export default Label
