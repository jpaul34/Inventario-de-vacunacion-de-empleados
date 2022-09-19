import { Container, Row } from 'react-bootstrap';
import { EmployeeCardComponent } from '../../components/employee-card/employee-card.component';
import { MainLayout } from '../../layouts/main/main.layout';
import { getLocalUserData } from '../../services/utils/global-functions/user-loca-storage.functions';
import { EmployeeInterface } from '../../services/utils/interfaces/employee.interface';
import './home.page.scss';

export const HomePage = () => {

    const employData: EmployeeInterface = getLocalUserData();
    
    return (
        <MainLayout>
            <Container>
                <Row>
                    <EmployeeCardComponent employeeData = {employData} type="card"/>
                </Row>
            </Container>            
        </MainLayout>
    );
}

