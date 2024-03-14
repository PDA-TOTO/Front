import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: {
    id: "",
    name: "",
    email: "",
    token: "",
  },
  isUser: false,
};


const userSlice = createSlice({
  name: "user",
  initialState: initialState,
  reducers: {},
});

export default userSlice.reducer;
