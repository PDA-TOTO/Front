import { userInstance } from "./api";

export async function signUp(email:string,password:string){
    return await userInstance.post('/sign-up',{email,password});
}