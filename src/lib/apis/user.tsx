import { userInstance } from './api';

export async function signUp(email: string, password: string) {
    return await userInstance.post('/sign-up', { email, password });
}

export async function logIn(email: string, password: string) {
    return await userInstance.post('/log-in', { email, password });
}

export async function logOut(){
    return await userInstance.post("/log-out",{});
}

export async function tendency(point:number){
    return await userInstance.post("/tendency", {point})
}

export async function getMyInfo(){
    return await userInstance.get("/my-info")
}
