import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { logIn, logOut } from "../../lib/apis/user";


export type VisibleUser = {
  id: number;
  email: string;
  exp: number;
  createdAt: Date;
};

const initialState = {
  user: {
    id: 0,
    email: "",
    exp: 0,
    createdAt: new Date(),
  } as VisibleUser,
  isUser: false,
};

type Result= {
  success: boolean,
  message: string,
  result: VisibleUser
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
        state.user = action.payload.result
        state.isUser = true;
      }

    });
    builder.addCase(userLogout.fulfilled,(state)=>{
      state.user.id =  0;
      state.user.email = "";
      state.user.exp = 0,
      state.user.createdAt = new Date(),
      state.isUser = false;
    });
  }
});


export default userSlice.reducer;
