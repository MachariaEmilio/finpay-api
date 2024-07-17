import { createSlice } from "@reduxjs/toolkit";

const dataslice = createSlice({
  name: "userdetails",
  initialState: {
   userid: null,
  },
  reducers: {
    updatedetails: (data,actions) => {
      data.userid= actions.payload
    },
  },
});
export const  {updatedetails} = dataslice.actions
export default dataslice.reducer