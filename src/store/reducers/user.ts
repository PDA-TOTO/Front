import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { logIn, logOut } from "../../lib/apis/user";

const initialState = {
  user: {
    email: "",

  },
  isUser: false,
};

type Result= {
  success: boolean,
  message: string
}

export const userLogin = createAsyncThunk(
  "user/userLogin",
  async (data:{email: string, password: string}):Promise<Result> => {
      const response = await logIn(data.email,data.password);
      return response.data;
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
      if(!action.payload.success){
        alert(action.payload.message)
        throw Error
      }else{
        state.isUser = true;
      }

    });
    builder.addCase(userLogout.fulfilled,(state)=>{
      state.user.email = "";
      state.isUser = false;
    });
  }
});


export default userSlice.reducer;
