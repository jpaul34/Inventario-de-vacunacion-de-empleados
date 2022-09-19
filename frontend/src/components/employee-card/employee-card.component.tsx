import { useState } from "react";
import { Button, Card, Container } from "react-bootstrap"
import { EmployeeInterface } from "../../services/utils/interfaces/employee.interface";
import { EmployeeFormModal } from "../employee-form-modal/employee-form-modal.component";
import './employee-card.component.scss';

export const EmployeeCardComponent = ({ employeeData }: { employeeData: EmployeeInterface }) => {

    const [modalActualizar, setModalActualizar] = useState(false);

    const mostrarActualizarempleados = () => {
        setModalActualizar(true);
    }

    return (
        <Card key={employeeData.cedula} style={{ width: "100%", marginTop: "24px" }} >
            <Card.Body>
                <Container style={{ margin: "12px 0 16px" }}>

                    <Card.Title style={{ textAlign: 'center', marginBottom: "24px" }}> <b>PERFIL DE {employeeData.rol === "Administrador" ? "ADMINISTRADOR" : "EMPLEADO"}</b></Card.Title>
                    <Card.Text>
                        <b>Cédula: </b>{employeeData.cedula} <br />
                    </Card.Text>
                    <Card.Text>
                        <b>Nombres: </b>{employeeData.nombres} <br />
                    </Card.Text>
                    <Card.Text>
                        <b>Apellidos: </b>{employeeData.apellidos} <br />
                    </Card.Text>
                    <Card.Text>
                        <b>Correo: </b>{employeeData.correo} <br />
                    </Card.Text>
                    <Card.Text>
                        <b>Rol: </b>{employeeData.rol} <br />
                    </Card.Text>
                    <Card.Text>
                        <b>Nombre de usuario: </b>{employeeData.nombreUsuario} <br />
                    </Card.Text>
                    <Card.Text>
                        <b>Fecha de Nacimiento: </b>{employeeData.fechaNacimiento} <br />
                    </Card.Text>
                    <Card.Text>
                        <b>Direccion: </b>{employeeData.direccion} <br />
                    </Card.Text>
                    <Card.Text>
                        <b>Telefono Movil: </b>{employeeData.movil} <br />
                    </Card.Text>
                    <Card.Footer>
                        <Card.Body>
                            <Card.Title style={{ textAlign: 'center' }}>
                                <b>{employeeData.estaVacunado ? "Vacunado" : "No Vacunado"}</b>
                            </Card.Title>
                            {
                                employeeData.estaVacunado ?  <>
                                    <Card.Text>
                                        <b>Tipo de vacuna: </b> {employeeData.tipoVacuna}
                                    </Card.Text>

                                    <Card.Text>
                                        <b>Última Fecha de vacunación: </b> {employeeData.fechaVacunacion}
                                    </Card.Text>
                                    <Card.Text>
                                        <b>Numero de dosis: </b> {employeeData.numeroDosis}
                                    </Card.Text>
                                </> : <></>
                            }
                        </Card.Body>
                    </Card.Footer>

                    <Container style={{ margin: "24px auto 0 auto"}} className="text-center" >
                        <Button
                            variant="outline-primary"
                            type="submit"
                            onClick={() => mostrarActualizarempleados()}
                        >
                            Actualizar
                        </Button>
                    </Container>
                    
                    <EmployeeFormModal
                        id={'modal-' + employeeData.cedula}
                        show={modalActualizar}
                        onHide={() => setModalActualizar(false)}
                        employeeData={employeeData}
                        formType="update"
                    />

                </Container>
            </Card.Body>
        </Card>
    );
}