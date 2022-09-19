import { useState } from "react";
import { Button, Container, Nav, Navbar, Offcanvas } from "react-bootstrap"
import { useNavigate } from "react-router-dom";
import { clearAllLocalData, getLocalUserData } from "../../services/utils/global-functions/user-loca-storage.functions";
import { EmployeeFormModal } from "../employee-form-modal/employee-form-modal.component";
import "./header.component.scss"

export const HeaderComponent = () => {

  const navigate = useNavigate();
  const isAdmin = getLocalUserData().rol == "Administrador";
  const [employFormModal, setEmployeeFormmodal] = useState(false);

  const showEmployeeFormModal = () => {
    setEmployeeFormmodal(true);
  }

  const closeSession = () => {
    clearAllLocalData();
    navigate("/login")
  }

  return (
    <Navbar key="md" bg="dark" variant="light" expand="md" className="mb-3">
      <Container fluid>
        <Navbar.Brand onClick={() => { navigate("/") }} className="title-link"> <b>INVVAC-KRUG</b> </Navbar.Brand>
        <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-md`} />
        <Navbar.Offcanvas
          id={`offcanvasNavbar-expand-md`}
          aria-labelledby={`offcanvasNavbarLabel-expand-md`}
          placement="end"
        >
          <Offcanvas.Body>
            <Nav className="justify-content-end flex-grow-1 pe-3">
              <Nav.Link onClick={() => { navigate("/") }} className="text-link">Perfil</Nav.Link>
              {
                isAdmin ?
                  <>
                    <Nav.Link className="text-link" onClick={() => { navigate("/lista-empleados") }}>Lista de Empleados</Nav.Link>

                    <Button
                      variant="success"
                      onClick={() => showEmployeeFormModal()}
                      style={{ margin: '0px 4px 0px 8px' }}
                    >
                      Nuevo Empleado
                    </Button>

                    <EmployeeFormModal
                      id={'modal-form'}
                      show={employFormModal}
                      onHide={() => { setEmployeeFormmodal(false); }}
                      employeeData={null}
                      formType="save"
                    />
                  </>
                  : <></>
              }
            </Nav>

            <Button variant="danger" onClick={() => closeSession()}>Cerrar Sesión</Button>

          </Offcanvas.Body>
        </Navbar.Offcanvas>

      </Container>
    </Navbar>
  );
}