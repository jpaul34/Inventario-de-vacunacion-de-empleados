import { Modal, Row, Button } from "react-bootstrap";
import { deletEmployee, getEmployeList } from "../../services/api/api.service";
import { deleteLocalEmployee } from "../../services/utils/global-functions/employee-list-loca-storage.functions";
import { getLocalUserData } from "../../services/utils/global-functions/user-loca-storage.functions";
import { EmployeeInterface } from "../../services/utils/interfaces/employee.interface";
import "./employee-delete-modal.component.scss";

export const EmployeeDeleteModal = ({ id, show, onHide, employeeData }: { id: any; show: any; onHide: any; employeeData: EmployeeInterface; }) => {

    const deleteEmploye = (usernameByDelete: string) => {

        deletEmployee(usernameByDelete).then(
            async (response) => {
                if (response.data.eliminado) {
                    deleteLocalEmployee(usernameByDelete);
                    getEmployeList();
                }
            }
        );
    };

    return <Modal
        id={id}
        show={show}
        onHide={onHide}
        aria-labelledby="contained-modal-title-center"
        centered
        style={{ width: "100%" }}
    >
        <Modal.Header style={{ textAlign: 'center' }} closeButton>
            <Modal.Title style={{ textAlign: 'center', width: '100%' }}>
                <b>Eliminar el empleado <b>{employeeData.nombreUsuario}</b></b>

            </Modal.Title>
        </Modal.Header>


        <Modal.Body >
            <Row >
                <span style={{ textAlign: 'center', width: '100%', marginTop: '20px' }}>
                    {
                        getLocalUserData().nombreUsuario !== employeeData.nombreUsuario ? 
                                <>            
                                    Se eliminarán todos los datos del empleado <b>{employeeData.nombreUsuario}</b>.<br/><br/>
                                    Una vez eliminado el empleado no podrá recuperar su información.<br/><br/>
                                    <h5>¿Seguro quiere eliminarlo?</h5>
                                </>
                                : <>
                                    <h5>Este empleado solo puede ser eliminado por otro administrador.</h5>
                                    <br/><br/> 
                                    El empleado <b>{employeeData.nombreUsuario} </b>es el administrador actual de esta sesión.<br/><br/>
                                </>
                    }

                </span>
            </Row>
        </Modal.Body>

        <Modal.Footer >
            {
                getLocalUserData().nombreUsuario !== employeeData.nombreUsuario ? 
                        <Button variant="outline-danger" onClick={
                            () => {
                                deleteEmploye(employeeData.nombreUsuario);
                            }
                        }>
                            Eliminar
                        </Button>
                        : <></>
            }
            <Button variant="outline-success" onClick={onHide}>
                Cancelar
            </Button>
        </Modal.Footer>

    </Modal>
}