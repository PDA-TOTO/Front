import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getMyInfo, logIn, logOut} from "../../lib/apis/user";

export type Account = {
  account : string,
  amount : number,
  id : number
}

export type VisibleUser = {
  id: number;
  account: Account
  email: string;
  tendency: number|null,
  experience: number;
  createdAt: Date; 
};

const initialState = {
  user: {
    id: 0,
    account:{
      account: "",
      amount: 0,
      id: 1
    } as Account,
    email: "",
    experience: 0,
    tendency: null,
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

export const userGetinfo = createAsyncThunk(
  "user/getInfo",
  async ():Promise<Result> => {
      const response = await getMyInfo();
      return response.data
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
      state.user.experience = 0,
      state.user.account = {
        account : "",
        amount : 0,
        id: 0
      }
      state.user.createdAt = new Date(),
      state.isUser = false;
      state.user.tendency = null;
    });
    builder.addCase(userGetinfo.fulfilled,(state, action)=>{
      state.user = action.payload.result
    });
  }
});


export default userSlice.reducer;
