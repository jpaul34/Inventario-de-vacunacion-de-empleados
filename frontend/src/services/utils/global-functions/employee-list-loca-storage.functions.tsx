import { getEmployeList } from "../../api/api.service";
import { EmployeeInterface } from "../interfaces/employee.interface";

export function getLocalEmployeeList() {
    const employeeList = localStorage.getItem('_employeeList');
    const employeListObject = JSON.parse(employeeList? employeeList : '[]');
    return employeeList ? employeListObject : [];
}

export function setLocalEmployeeList(employeeList: any[]) {
    localStorage.setItem('_employeeList', JSON.stringify([]));
    localStorage.setItem('_employeeList', JSON.stringify(employeeList));
}

export function setLocalNewEmployee(newEmployeeData: EmployeeInterface) {
    const employeeList = localStorage.getItem('_employeeList');
    const newEmployeeList = employeeList ?  [...JSON.parse(employeeList), newEmployeeData] : [newEmployeeData];
    localStorage.setItem('_employeeList', JSON.stringify(newEmployeeList));
}

export function updateLocalEmployeeList() {
    getEmployeList();

    // const employeeList = getLocalEmployeeList();
    // const employeeLlistObject = employeeList;
    // const newEmployeeLlist = employeeLlistObject?.map(
    //     (employe: EmployeeInterface) => {
    //         return employe.cedula === newEmployeeData.cedula ? newEmployeeData : employe;
    //     }
    // );
    // localStorage.setItem(
    //                 '_employeeList',
    //                 JSON.stringify(
    //                     newEmployeeLlist
    //                 )
    //             );
}

export function deleteLocalEmployee(userNameByDelete: string) {
    const employeeList = getLocalEmployeeList();
    const newEmploteeList = employeeList.filter( (employee: EmployeeInterface) =>{ return employee.nombreUsuario !== userNameByDelete});
    return localStorage.setItem('_employeeList', JSON.stringify(newEmploteeList));
}

export function findLocalEmployeeCI(cedula: string) {
    const employeeList = getLocalEmployeeList();
    return employeeList?.find((employee: EmployeeInterface) => { return employee.cedula === cedula});
}

