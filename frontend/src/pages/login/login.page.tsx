import { Row, Col, Form, Button, Container, Image } from "react-bootstrap";
import { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import { setLocalUserData } from "../../services/utils/global-functions/user-loca-storage.functions";
import { EmployeeInterface } from "../../services/utils/interfaces/employee.interface";
import { getLocalEmployeeList, setLocalEmployeeList } from "../../services/utils/global-functions/employee-list-loca-storage.functions";
import { listEmployee } from "../../services/constans/test-data";
import "./login.page.scss"

export const LoginPage = () => {
    const navigate = useNavigate();

    const [errorMessage, setErrorMessage] = useState("");
    const [name, setName] = useState("");
    const [password, setPassword] = useState("");
    const [validated, setValidated] = useState(false);
    const [passwordShown, setPasswordShown] = useState(false);
    
    useEffect(
        () => {
            setLocalEmployeeList(listEmployee);
        },
        []
    );

    const togglePassword = () => {
        setPasswordShown(!passwordShown);
    };

    const setLoginData = async () => {
        const responseLogin: {message: string; data?: EmployeeInterface} = validateLogin(name, password);
        if (responseLogin.data) {
            setLocalUserData(responseLogin.data);
            navigate('/');
        } else {
            setErrorMessage(responseLogin.message);
        }
    };

    const validateLogin = (_nombreUsuario: string, _password: string): {message: string; data?: EmployeeInterface} => {
        let response: {message: string; data?: EmployeeInterface} = {
            message: "Usuario no registrado",
        }

        if (getLocalEmployeeList() != null) {
            for (const employee of getLocalEmployeeList()) {
                if (employee.nombreUsuario === _nombreUsuario) {
                    if (employee.password === _password) {
                        return {
                            message: "Cargando...",
                            data: employee
                        };
                    }
                    return {
                        message: "Contraseña incorrecta",
                    };
                }
            }
        }

        return  response;
    }

    const handleSubmit = (event: any) => {
        const form = event.currentTarget;
        event.preventDefault();

        if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
        }
        setValidated(true);
        return setLoginData();
    };

    return <>

        <Container className="login-container">
            <Row className="login-container">
                <Col sm={7} style={{ margin: 'auto', alignItems: 'center' }}>
                    <div className="text-center justify-content-center" style={{ margin: '0px' }}>

                        <h1> INVVAC-KRUG </h1>
                        <h5 style={{ margin: '24px' }}>
                            Sistema para el registro del inventario del estado de vacunación de tus empleados
                        </h5>
                        <Image style={{ width: 'auto', height: '100%', maxHeight: '400px', minWidth: '300px', maxWidth: '700px', margin: "36px 0" }} src="https://corporativo.compensar.com/salud/transacciones/SiteAssets/IconosCovid/Vacuna.png" />
                    </div>
                </Col>

                <Col sm={4} style={{ margin: 'auto', alignItems: 'center' }}>
                    <div style={{ paddingBottom: '48px', width: '100%' }}>
                        <h3 style={{ textAlign: 'center', marginBottom: '36px' }}>
                            INICIAR SESIÓN
                        </h3>
                        <Form validated={validated} onSubmit={handleSubmit} style={{ width: '100%' }}>
                            <Form.Group className="mb-3" controlId="formBasicNombreUsuario">
                                <Form.Label>Nombre de usuario <b>(ej.: krug593)</b></Form.Label>
                                <Form.Control autoComplete="true" onChange={e => { setName(e.target.value); e.preventDefault(); }} value={name || ""} type="text" pattern="^[a-zA-Z]*[0-9]*" placeholder="Ingrese el nombre de usuario" required />
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="formBasicPassword">
                                <Form.Label>Contraseña</Form.Label>
                                <Form.Control autoComplete="true" type={passwordShown ? "text" : "password"} onChange={e => { setPassword(e.target.value); e.preventDefault(); }} value={password || ""} placeholder="Contraseña" required />
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="formBasicCheckbox">
                                <Form.Check type="checkbox" label="Mostrar password" onClick={togglePassword} />
                            </Form.Group>

                            <div style={{ textAlign: 'center', margin: 'auto' }}>
                                {
                                    errorMessage !== '' ? <label style={{ color: 'red' }}><i>* {errorMessage}</i><br /><br /></label> : <label>{errorMessage}</label>
                                }
                            </div>
                            <div className="text-center justify-content-center">
                                <Button variant="success" type="submit">Iniciar Sesión</Button>
                            </div>
                        </Form>
                    </div>
                </Col>
            </Row>
        </Container>
    </>
}