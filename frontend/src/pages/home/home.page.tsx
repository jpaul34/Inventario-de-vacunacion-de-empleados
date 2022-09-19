import { Container, Row } from 'react-bootstrap';
import { EmployeeCardComponent } from '../../components/employee-card/employee-card.component';
import { MainLayout } from '../../layouts/main/main.layout';
import { getLocalUserData } from '../../services/utils/global-functions/user-loca-storage.functions';
import { EmployeeInterface } from '../../services/utils/interfaces/employee.interface';
import './home.page.scss';

export const HomePage = () => {

    // const employData: EmployeeInterface = {
    //     cedula: "123456789",
    //     nombres: "Nombreuno Nombredos ",
    //     apellidos: "Apellidouno Apelidodos",
    //     correo: "correo@mail.com",
    //     fechaNacimiento: "01/01/2000",
    //     direccion: "Calle 7892, OE-593",
    //     movil: "0991234567",
    //     estaVacunado: false,
    //     nombreUsuario: "krugeriano123456789",
    //     password: "qwerty593",
    //     rol: "Administrador",
    //     tipoVacuna: "",
    //     fechaVacunacion: "",
    //     numeroDosis: 0
    // }

    const employData: EmployeeInterface = getLocalUserData();

    return (
        <MainLayout>
            <Container>
                <Row>
                    <EmployeeCardComponent employeeData = {employData}/>
                </Row>
            </Container>            
        </MainLayout>
    );
}

