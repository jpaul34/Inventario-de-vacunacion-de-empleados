import { Modal } from "react-bootstrap";
import { EmployeeCardComponent } from "../employee-card/employee-card.component";
import "./employee-profile-modal.component.scss";

export const EmployeeProfileModal = ({ id, show, onHide, employeeData, type }: { id: string; show: any; onHide: any; employeeData: any; type: string;}) => {

    return <Modal
        id={id}
        show={show}
        onHide={onHide}
        aria-labelledby="contained-modal-title-center"
        centered
        style={{width: "100%"}}
    >
        <Modal.Header style={{ textAlign: 'center' }} closeButton>
            <Modal.Title style={{ textAlign: 'center', width: '100%' }}>
                <b>PERFIL EMPLEADO</b>
            </Modal.Title>
        </Modal.Header>

         <Modal.Body >
            <EmployeeCardComponent employeeData = {employeeData} type={type} />
         </Modal.Body>

    </Modal>
}