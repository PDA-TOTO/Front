import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { logIn, logOut } from "../../lib/apis/user";

const initialState = {
  user: {
    email: "",
  },
  isUser: false,
};



export const userLogin = createAsyncThunk(
  "user/userLogin",
  async (data:{email: string, password: string}) => {
    const response = await logIn(data.email,data.password);
    return response;
  }
)

export const userLogout = createAsyncThunk(
  "user/userLogout",
  async () => {
    const response = await logOut();
    return response;
  }
)


const userSlice = createSlice({
  name: "user",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) =>{
    builder.addCase(userLogin.fulfilled,(state, action)=>{
      state.user.email = action.payload.data.email;
      state.isUser = true;
    });
    builder.addCase(userLogout.fulfilled,(state)=>{
      state.user.email = "";
      state.isUser = false;
    })
  }
});


export default userSlice.reducer;
