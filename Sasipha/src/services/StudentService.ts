import axios from 'axios'
import type { AxiosInstance, AxiosResponse } from 'axios'
import type { StudentItem } from '@/type'
const apiClient: AxiosInstance = axios.create({
    baseURL : 'https://dv-student-backend-2019.appspot.com',
    withCredentials: false,
    headers: {
        Accept: 'application/json',
        'content-Type' : 'application/json'
    }
})

export default{
    getStudents(): Promise<AxiosResponse<StudentItem[]>>{
        return apiClient.get<StudentItem[]>('/students')
    }
}