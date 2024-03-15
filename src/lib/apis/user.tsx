import { userInstance } from "./api";

export async function signUp(email:string,password:string){
    return await userInstance.post('/sign-up',{email,password});
}

export async function logIn(email:string,password:string){
    return await userInstance.post('/log-in',{email,password});
}

export async function logOut(){
    return await userInstance.post("/log-out");
}