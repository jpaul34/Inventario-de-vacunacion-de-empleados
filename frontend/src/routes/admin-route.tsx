import { Navigate } from 'react-router';
import { EmployeeListPage } from '../pages/employee-list/employee-list.page';
import { getLocalUserData } from '../services/utils/global-functions/user-loca-storage.functions';

export const AdminRoute = () => {

    const isAuth = getLocalUserData();
    const isAdmin = isAuth ? isAuth.rol === "Administrador" ? true : false : false;

    return <>
        {
            isAdmin ? <EmployeeListPage/> : <Navigate to="/" replace/>
        }
    </>
};