export function getLocalEmployeeList() {
    const employeeList = localStorage.getItem('_employeeList');
    return employeeList ?  JSON.parse(employeeList) : null;
}

export function setLocalEmployeeList(employeeList: any[]) {
    localStorage.setItem('_employeeList', JSON.stringify(employeeList));
}

export function setLocalNewEmployee(newEmployeeData: any) {
    const employeeList = localStorage.getItem('_employeeList');
    const newEmployeeList = employeeList ?  [...JSON.parse(employeeList), newEmployeeData] : [newEmployeeData];
    localStorage.setItem('_employeeList', JSON.stringify(newEmployeeList));
}

// export function clearAllLocalStorage() {
//     localStorage.clear();
// }
