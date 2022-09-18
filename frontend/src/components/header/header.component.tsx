import { Button, Container, Nav, Navbar, Offcanvas } from "react-bootstrap"
import { useNavigate } from "react-router-dom";
import "./header.component.scss"

export const HeaderComponent = () => {

  const navigate = useNavigate();
  const isAdmin = false;

  return (
    <Navbar key="md" bg="dark" variant="light" expand="md" className="mb-3">
      <Container fluid>
        <Navbar.Brand onClick={() => {navigate("/")}} className="title-link"> <b>INVVAC-KRUG</b> </Navbar.Brand>
        <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-md`} />
        <Navbar.Offcanvas
          id={`offcanvasNavbar-expand-md`}
          aria-labelledby={`offcanvasNavbarLabel-expand-md`}
          placement="end"
        >
          <Offcanvas.Body>
            <Nav className="justify-content-end flex-grow-1 pe-3">
              <Nav.Link onClick={() => {navigate("/")}} className="text-link">Perfil</Nav.Link>
              {
                isAdmin ? <Nav.Link className="text-link" onClick={() => {navigate("/lista-empleados")}}>Lista de Empleados</Nav.Link> : <></>
              }
            </Nav>
            <Button
              variant="success"
              onClick={() => {alert("Mostrar formulario nuevo empleado")}}
              style={{ margin: '0px 24px 0px 8px' }}
            >
              Nuevo Empleado
            </Button>
            <Button variant="danger" onClick={() => {alert("Sesión cerrada"); navigate("/login")}}>Cerrar Sesión</Button>

          </Offcanvas.Body>
        </Navbar.Offcanvas>
      </Container>
    </Navbar>
  );
}