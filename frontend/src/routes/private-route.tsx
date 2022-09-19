import { Navigate } from 'react-router';
import { HomePage } from '../pages/home/home.page';
import { getLocalUserData } from '../services/utils/global-functions/user-loca-storage.functions';

export const PrivateRoute = () => {

    const isAuth = getLocalUserData();

    return <>
        {
            !isAuth ? <Navigate to="/login"/> : <HomePage/>
        }
    </>
};

