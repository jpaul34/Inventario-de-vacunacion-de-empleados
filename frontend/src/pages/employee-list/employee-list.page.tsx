import { EmployeeListComponent } from '../../components/employee-list/employee-list.component';
import { MainLayout } from '../../layouts/main/main.layout';
import './employee-list.page.scss';

export const EmployeeListPage = () => {
    return (
        <>
            <MainLayout>
                <EmployeeListComponent />
            </MainLayout>
        </>
    );
}



