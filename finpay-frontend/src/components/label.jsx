import React from 'react'

const Label = ({htmlfor ,label_name,classname}) => {
  return (
    <>
      <label className={classname}  htmlFor={htmlfor}>{label_name}</label>
 
    </>
  )
}

export default Label
