import env from "react-dotenv";
import axios from "axios";
import { setLocalEmployeeList } from "../utils/global-functions/employee-list-loca-storage.functions";
import { EmployeeInterface } from "../utils/interfaces/employee.interface";

export const loginUser = (name: string, password: string) => {    
    return axios.post(
        env.API_URL + '/login',
        JSON.stringify({
            nombreUsuario: name,
            password: password
        }),
        {
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
        }
    );
}

export const getEmployeList = () => {    
    return axios.get(
        env.API_URL + '/usuarios'
    ).then(
        (response) => {
            console.log(response);
            setLocalEmployeeList(response.data)
        }
    );
}

export const deletEmployee = (userName: string) => {  
    console.log("deletEmployee: " + userName);  
    return axios.delete(
        env.API_URL + '/usuario/'+userName,
        {
            headers: {
                'Access-Control-Allow-Methods': 'DELETE',
                'Access-Control-Allow-Origin': '*',
            },
        }
    );
}

export const saveNewEmployee = (newEmployData: EmployeeInterface) => {    
    return axios.post(
        env.API_URL + '/usuario',
        JSON.stringify(newEmployData),
        {
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
        }
    );
}

export const updateEmployee = (newEmployData: EmployeeInterface) => {    
    return axios.put(
        env.API_URL + '/usuario',
        JSON.stringify(newEmployData),
        {
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
        }
    );
}

