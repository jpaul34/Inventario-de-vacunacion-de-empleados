import { useState } from "react";
import moment from 'moment';
import { Button, Col, Container, Form, Modal, Row } from "react-bootstrap";
import "./employee-form-modal.component.scss";
import { getLocalUserData, setLocalUserData } from "../../services/utils/global-functions/user-loca-storage.functions";
import { findLocalEmployeeCI, setLocalNewEmployee, updateLocalEmployeeList } from "../../services/utils/global-functions/employee-list-loca-storage.functions";
import { EmployeeInterface } from "../../services/utils/interfaces/employee.interface";
import { cleanEmployeeData } from "../../services/constans/employee-clean-data.const";
import { generatePasword } from "../../services/utils/global-functions/password-generator";
import { useNavigate } from "react-router-dom";
import { checkCI } from "../../services/utils/global-functions/ci-checker";
import { getEmployeList, saveNewEmployee, updateEmployee } from "../../services/api/api.service";

export const EmployeeFormModal = ({ id, show, onHide, employeeData, formType }: { id: any; show: any; onHide: any; employeeData: any; formType: string }) => {

    const navigate = useNavigate();
    const [validatedForm, setValidatedForm] = useState(true);
    const [enableButton, setEnableButton] = useState(true);
    const [isValidData, setIsValidData] = useState(employeeData !== undefined && employeeData !== null ? true : false);
    const [errorMessage, setErrorMessage] = useState("");
    const [newEmployeeData, setNewEmployeeData] = useState(isValidData ? employeeData : cleanEmployeeData);

    const showMessage = (message: string) => {
        setErrorMessage(message);
    }

    const handleSubmit = (event: any) => {
        const form = event.currentTarget;
        event.preventDefault();

        if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
            setEnableButton(false)
        } else {
            if (newEmployeeData.estaVacunado && (newEmployeeData.numeroDosis <= 0)) {
                showMessage("El numero de dosis debe ser mayor a 0");
            } else {
                if (formType === "update") {
                    // setLocalUserData(newEmployeeData);
                    // window.location.reload();
                    updateEmployee(newEmployeeData).then(
                        (response) => {
                            console.log("update");
                            console.log(response);
                            setLocalUserData(newEmployeeData as EmployeeInterface);
                            updateLocalEmployeeList();
                            getEmployeList();
                            window.location.replace("/");
                        }
                    );
                }

                if (formType === "save") {
                    const unregistered = !findLocalEmployeeCI(newEmployeeData.cedula);
                    if (checkCI(newEmployeeData.cedula) && unregistered)  {
                        newEmployeeData.nombreUsuario = "krugeriano"+newEmployeeData.cedula;
                        newEmployeeData.password = generatePasword();
                        saveNewEmployee(newEmployeeData).then(
                            (response) => {
                                console.log(response);
                                // navigate('/lista-empleados');
                                console.log("save");
                                // setLocalNewEmployee(newEmployeeData as EmployeeInterface);
                                getEmployeList();
                                // window.location.reload();
                                window.location.replace("/lista-empleados");
                            }
                        );
                    } else {
                        showMessage(
                            unregistered ? "Ingrese una cedula Ecuatoriana Valida" : "Cédula ya registrada en el sistema"
                        );
                    }
                }

                if (formType === "update-list") {
                    // updateLocalEmployeeList(newEmployeeData as EmployeeInterface);
                    // window.location.reload();
                    updateEmployee(newEmployeeData).then(
                        (response) => {
                            console.log("update-list");
                            console.log(response);
                            // window.location.reload();
                            getEmployeList();
                            window.location.replace("/lista-empleados");
                        }
                    );
                }

                setIsValidData(false);
            }
        }
        setValidatedForm(true);
    };


    const handleInputChange = (event: any) => {
        let updatedData = {};

        if (event.target.name !== "estaVacunado") {
            updatedData = {
                [event.target.name]: event.target.value
            };
        } else {
            updatedData = event.target.value === "true"
                ? {
                    [event.target.name]: true
                }
                : {
                    [event.target.name]: false,
                    tipoVacuna: "",
                    fechaVacunacion: "",
                    numeroDosis: 0
                };
        }

        setNewEmployeeData({
            ...newEmployeeData,
            ...updatedData
        });
    }

    const updateButtonState = () => {
        return isValidData ? 'Actualizar' : 'Agregar';
    }

    const transforDate = (stringDate: string) => {
        return moment(stringDate !== "" ? new Date(stringDate) : new Date()).format('yyyy-MM-DD');
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
                <b>FORMULARIO DE {formType === "save" ? 'REGISTRO' : 'ACTUALIZACIÓN'}</b>
            </Modal.Title>
        </Modal.Header>

        <Modal.Body >

            <Form noValidate validated={validatedForm} style={{ alignItems: "center" }} onSubmit={handleSubmit} onChange={(e: any) => { setEnableButton(e.target.validity.valid) }}>
                <Form.Group className="mb-3" controlId="formBasicCedula" as={Row}>
                    <Form.Label column sm="3">Cédula *</Form.Label>
                    <Col sm="9" className="align-self-center">
                        <Form.Control type="text" style={{ margin: "auto" }} placeholder="Cedula" onChange={handleInputChange} name="cedula" value={newEmployeeData.cedula} pattern="^[0-9]+$" minLength={10} maxLength={10} required disabled={isValidData} />
                    </Col>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicNombres" as={Row}>
                    <Form.Label column sm="3">Nombres *</Form.Label>
                    <Col sm="9" className="align-self-center">
                        <Form.Control type="text" placeholder="Nombres" onChange={handleInputChange} name="nombres" value={newEmployeeData.nombres} pattern="^[a-zA-Z]+\s?[a-zA-Z]+$" required />
                    </Col>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicApellidos" as={Row}>
                    <Form.Label column sm="3">Apellidos *</Form.Label>
                    <Col sm="9" className="align-self-center">
                        <Form.Control type="text" placeholder="Apellidos" onChange={handleInputChange} name="apellidos" value={newEmployeeData.apellidos} pattern="^[a-zA-Z]+\s?[a-zA-Z]+$" required />
                    </Col>
                </Form.Group>

                <Form.Group className="mb-1" controlId="formBasicEmail" as={Row}>
                    <Form.Label column sm="3">Correo Electrónico *</Form.Label>
                    <Col sm="9" className="align-self-center">
                        <Form.Control type="email" placeholder="Correo Electrónico" onChange={handleInputChange} name="correo" value={newEmployeeData.correo} pattern="^[a-z0-9._-]+@[a-z]+\.[a-z]{2,4}$" required />
                    </Col>
                </Form.Group>

                {
                    formType !== "save"
                        ? <>
                            {
                                formType === "update-list" ?
                                            <Form.Group className="mb-2" controlId="formBasicNombreUsuario" as={Row}>
                                                <Form.Label column sm="3">Rol</Form.Label>
                                                <Col sm="9" className="align-self-center">
                                                    <Form.Select onChange={handleInputChange} value={newEmployeeData.rol} id="rol" name="rol" disabled={getLocalUserData().nombreUsuario === newEmployeeData.nombreUsuario}>
                                                        <option value="Administrador">Administrador</option>
                                                        <option value="Empleado">Empleado</option>
                                                    </Form.Select>
                                                </Col>
                                            </Form.Group>
                                            : <></>
                            }

                            <Form.Group className="mb-2" controlId="formBasicNombreUsuario" as={Row}>
                                <Form.Label column sm="3">Nombre de usuario</Form.Label>
                                <Col sm="9" className="align-self-center">
                                    {
                                        <Form.Control type="text" style={{ margin: "auto" }} placeholder="Nombre de Usuario" onChange={handleInputChange} pattern="^[a-z]+[0-9]+$" name="nombreUsuario" value={newEmployeeData.nombreUsuario} required disabled={isValidData} />
                                    }
                                </Col>
                            </Form.Group>

                            <Form.Group className="mb-2" controlId="formBasicFechaNacimiento" as={Row}>
                                <Form.Label column sm="3">Fecha de Nacimiento</Form.Label>
                                <Col sm="9" className="align-self-center">
                                    <Form.Control type="date" placeholder="Fecha de Nacimiento" onChange={handleInputChange} name="fechaNacimiento" value={transforDate(newEmployeeData.fechaNacimiento)} required />
                                </Col>
                            </Form.Group>

                            <Form.Group className="mb-2" controlId="formBasicDirecion" as={Row}>
                                <Form.Label column sm="3">Dirección</Form.Label>
                                <Col sm="9" className="align-self-center">
                                    <Form.Control type="text" placeholder="Dirección" onChange={handleInputChange} name="direccion" value={newEmployeeData.direccion} required={newEmployeeData.rol === "Administrador"} />
                                </Col>
                            </Form.Group>

                            <Form.Group className="mb-2" controlId="formBasicMovil" as={Row}>
                                <Form.Label column sm="3">Teléfono Movil</Form.Label>
                                <Col sm="9" className="align-self-center">
                                    <Form.Control type="text" placeholder="Teléfono Movil" onChange={handleInputChange} name="movil" value={newEmployeeData.movil} minLength={10} maxLength={10} required={newEmployeeData.rol === "Administrador"} />
                                </Col>
                            </Form.Group>

                            <Form.Group className="mb-2" controlId="formBasicEstaVacunado" as={Row}>
                                <Form.Label column sm="3">¿Está Vacunado?</Form.Label>
                                <Col sm="9" className="align-self-center">
                                    <Form.Select onChange={handleInputChange} value={newEmployeeData.estaVacunado + ""} id="vaccinationStatus" name="estaVacunado" required={newEmployeeData.estaVacunado}>
                                        <option value="false">No Vacunado</option>
                                        <option value="true">Vacunado</option>
                                    </Form.Select>
                                </Col>
                            </Form.Group>

                            {
                                newEmployeeData.estaVacunado ? <Container style={{ background: "#F0F2F5", padding: "16px", paddingBottom: "1px" }}>
                                    <Form.Group className="mb-2" controlId="formBasicTipoVacuna" as={Row}>
                                        <Form.Label column sm="3">Tipo Vacuna</Form.Label>
                                        <Col sm="9" className="align-self-center">
                                            <Form.Select onChange={handleInputChange} value={newEmployeeData.tipoVacuna + ""} name="tipoVacuna" required={newEmployeeData.estaVacunado}>
                                                <option value="">-</option>
                                                <option value="Sputnik">Sputnik</option>
                                                <option value="AstraZeneca">AstraZeneca</option>
                                                <option value="Pfizer">Pfizer</option>
                                                <option value="Jhonson&Jhonson">Jhonson&Jhonson</option>
                                            </Form.Select>
                                        </Col>
                                    </Form.Group>


                                    <Form.Group className="mb-2" controlId="formBasicFachaVacunacion" as={Row}>
                                        <Form.Label column sm="3">Última fecha de Vacunación</Form.Label>
                                        <Col sm="9" className="align-self-center">
                                            <Form.Control type="date" placeholder="Número dosis" onChange={handleInputChange} name="fechaVacunacion" value={newEmployeeData.fechaVacunacion} required={newEmployeeData.estaVacunado} />
                                        </Col>
                                    </Form.Group>

                                    <Form.Group className="mb-2" controlId="formBasicNumeroDosis" as={Row} style={{ marginBottom: "0 !important" }}>
                                        <Form.Label column sm="3">Número de Dosis</Form.Label>
                                        <Col sm="9" className="align-self-center">
                                            <Form.Control type="number" placeholder="Número dosis" onChange={handleInputChange} name="numeroDosis" value={newEmployeeData.numeroDosis} required={newEmployeeData.numeroDosis <= 0} />
                                        </Col>
                                    </Form.Group>
                                </Container>
                                    : <></>
                            }
                        </>
                        : <></>
                }

                <div className="text-center justify-content-center" style={{ paddingTop: "16px" }}>

                    <div style={{ textAlign: 'center', margin: 'auto' }}>
                        {
                            errorMessage !== '' ? <label style={{ color: 'red' }}><i>* {errorMessage}</i><br /><br /></label> : <label>{errorMessage}</label>
                        }
                    </div>
                    <Button variant={formType === "save" ? "success" : "primary"} type="submit" disabled={!enableButton}>
                        {
                            updateButtonState()
                        }
                    </Button>
                </div>
            </Form>

        </Modal.Body>

    </Modal>
}