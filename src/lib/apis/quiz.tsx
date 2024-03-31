import { quizInstance } from './api';

export async function getTest() {
    return await quizInstance.get('/test');
}

export async function getLevelTest() {
    return await quizInstance.get('/level');
}

export async function updateExperience(experience: number){
    return await quizInstance.post('/experience',{experience});
}