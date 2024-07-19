import { createSlice } from "@reduxjs/toolkit";

const dataslice = createSlice({
  name: "userdetails",
  initialState: {
   userdetails: null
  },
  reducers: {
    updatedetails: (data,actions) => {
      data.userdetails= actions.payload
    },
   
  },
});
export const  {updatedetails} = dataslice.actions
export default dataslice.reducer