import { useEffect, useState } from 'react';
import { Button, Col, Container, FloatingLabel, Form, InputGroup, Row } from 'react-bootstrap';
import { cleanEmployeeData } from '../../services/constans/employee-clean-data.const';
import { getLocalEmployeeList } from '../../services/utils/global-functions/employee-list-loca-storage.functions';
import { EmployeeInterface } from '../../services/utils/interfaces/employee.interface';
import { EmployeeDeleteModal } from '../employee-delete-modal copy/employee-delete-modal.component';
import { EmployeeFormModal } from '../employee-form-modal/employee-form-modal.component';
import { EmployeeProfileModal } from '../employee-profile-modal/employee-profile-modal.component';
import './employee-list.component.scss';

export const EmployeeListComponent = () => {

    const [data, setData] = useState([]);
    const [currentEmployeeData, setCurrentEmployeeData] = useState(cleanEmployeeData);
    const [showEmployeCard, setShowEmployeCard] = useState(false);
    const [showUpdateModal, setShowUpdateModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [optionsFilter] = useState({
        vaccinationStatus: "",
        vaccineType: "",
        initialVaccinationDate: "",
        finalVaccinationDate: ""
    });

    useEffect(
        () => { setData(
                getLocalEmployeeList()
            );
        }, []
    );

    const openEmployeeProfileCard = (employeDataSelected: EmployeeInterface) => {
        setCurrentEmployeeData(employeDataSelected);
        setShowEmployeCard(true);
    }

    const openUpdateEmployeeModal = (employeDataSelected: EmployeeInterface) => {
        setCurrentEmployeeData(employeDataSelected);
        setShowUpdateModal(true);
    }

    const openDelateEmployeeModal = (employeDataSelected: EmployeeInterface) => {
        setCurrentEmployeeData(employeDataSelected);
        setShowDeleteModal(true);
    }

    const disbleVaccinationStatus = (isEnable: boolean) => {
        (document.getElementById("vaccinationStatus") as HTMLButtonElement).disabled = isEnable;
    }

    const disbleVaccineType = (isEnable: boolean) => {
        (document.getElementById("vaccineType") as HTMLButtonElement).disabled = isEnable;
    }

    const disbleInitialVaccinationDate = (isEnable: boolean) => {
        (document.getElementById("initialVaccinationDate") as HTMLButtonElement).disabled = isEnable;
    }

    const disbleFinalVaccinationDate = (isEnable: boolean) => {
        (document.getElementById("finalVaccinationDate") as HTMLButtonElement).disabled = isEnable;
    }
       
    const showPassword = (idPassword: string) => {
        const passwordElement =  (document.getElementById(idPassword) as HTMLElement);
        const passwordButtonElement =  (document.getElementById(idPassword + "-button") as HTMLButtonElement )
        passwordElement.className = passwordElement.className === "item-employee" ? "item-employee hide-text" : "item-employee";
        passwordButtonElement.innerText = passwordElement?.className === "item-employee" ? "Ocultar Password" : "Ver Password";
    }

    const setVaccinationStatus = (value: string) => {
        optionsFilter.vaccinationStatus = value + "";
        const isDisabled = value === "false";

        disbleVaccineType(isDisabled);
        disbleInitialVaccinationDate(isDisabled);
        disbleFinalVaccinationDate(isDisabled);
    };

    const setVaccineType = (value: string) => {
        optionsFilter.vaccineType = value + "";
        disbleVaccinationStatus(value !== "");
    };

    const setInitialVaccinationDate = (value: string) => {
        optionsFilter.initialVaccinationDate = value + "";
        disbleVaccinationStatus(value !== "");
    };

    const setFinalVaccinationDate = (value: string) => {
        optionsFilter.finalVaccinationDate = value + "";
        disbleVaccinationStatus(value !== "");
    };

    const filtrarDatos = () => {
        const filteredList = getLocalEmployeeList().filter(
            (data: EmployeeInterface) => {
                const haveVaccinationStatus = optionsFilter.vaccinationStatus !== "";
                const haveVaccineType = optionsFilter.vaccineType !== "";
                const haveInitialDateRange = optionsFilter.initialVaccinationDate !== "";
                const haveFinalDateRange = optionsFilter.finalVaccinationDate !== "";

                if (!haveVaccinationStatus && !haveVaccineType && !haveVaccineType && !haveInitialDateRange && !haveFinalDateRange) {
                    return true
                }

                const initialDate = haveInitialDateRange ? new Date(optionsFilter.initialVaccinationDate).toISOString() : new Date("01/01/2019").toISOString();
                const finalDate = haveFinalDateRange ? new Date(optionsFilter.finalVaccinationDate).toISOString() : new Date().toISOString();

                const keepByVaccinationStatus = haveVaccinationStatus ?
                    (("" + data.estaVacunado) === optionsFilter.vaccinationStatus ? true : false)
                    : false;

                if (!data.estaVacunado) {
                    return keepByVaccinationStatus
                }

                const keepByVaccineType = haveVaccineType ?
                    (data.tipoVacuna === optionsFilter.vaccineType ? true : false)
                    : true;

                const keepByRangeDate = validateRangeDate(
                    initialDate,
                    finalDate,
                    data.fechaVacunacion
                )

                const keepData = haveVaccinationStatus ?
                    (keepByVaccinationStatus && keepByVaccineType && keepByRangeDate)
                    : (keepByVaccineType && keepByRangeDate);

                // haveVaccinationStatus ? console.log(keepByVaccinationStatus + " && " + keepByVaccineType + " && " + keepByRangeDate) : console.log( keepByVaccineType + " && " + keepByRangeDate);
                return keepData;
            }
        );

        setData(filteredList);
    }

    const validateRangeDate = (_startDate: string, _endDate: string, _currentDate: string): boolean => {
        const startDate = new Date(_startDate + "").getTime();
        const endDate = new Date(_endDate + "").getTime();
        const vaccinationDate = new Date(_currentDate).getTime();

        return vaccinationDate >= startDate && vaccinationDate <= endDate;
    }

    return (
        <div className='page-container'>
            <h3 className="text-center justify-content-center">Lista de Empleados</h3>
            <Container>
                <Row>
                    <b style={{ textAlign: "justify" }}> Filtrar por: </b> <br /> <br />
                    <Col sm="4" style={{ margin: "auto" }}>
                        <fieldset>
                            <legend style={{ fontSize: "14px" }}><b>Estado de Vacunación:</b></legend>
                            <FloatingLabel
                                controlId="floatingSelectGrid"
                                label="Estado de Vacunación"
                            >
                                <Form.Select onChange={(e) => { setVaccinationStatus(e.target.value) }} id="vaccinationStatus">
                                    <option value="">-</option>
                                    <option value="false">No Vacunado</option>
                                    <option value="true">Vacunado</option>
                                </Form.Select>
                            </FloatingLabel>
                        </fieldset>
                    </Col>
                    <Col sm="4" style={{ margin: "auto" }}>

                        <fieldset>
                            <legend style={{ fontSize: "14px" }}><b>Rango de fecha de vacunacion:</b></legend>
                            <FloatingLabel
                                controlId="floatingSelectGrid"
                                label="Tipo de Vacuna"
                            >
                                <Form.Select onChange={(e) => { setVaccineType(e.target.value) }} id="vaccineType">
                                    <option value="">-</option>
                                    <option value="Sputnik">Sputnik</option>
                                    <option value="AstraZeneca">AstraZeneca</option>
                                    <option value="Pfizer">Pfizer</option>
                                    <option value="Jhonson&Jhonson">Jhonson&Jhonson</option>
                                </Form.Select>
                            </FloatingLabel>
                        </fieldset>
                    </Col>
                    <Col sm="4" style={{ margin: "auto" }}>
                        <fieldset>
                            <legend style={{ fontSize: "14px" }}><b>Rango de fecha de vacunacion:</b></legend>
                            <InputGroup>
                                <FloatingLabel
                                    controlId="floatingSelectGrid"
                                    label="Fecha de inicio"
                                >
                                    <input className="form-control" placeholder="Fecha de inicio" type='date' onChange={(e) => { setInitialVaccinationDate(e.target.value) }} id="initialVaccinationDate" />
                                </FloatingLabel>

                                <FloatingLabel
                                    controlId="floatingSelectGrid"
                                    label="Fecha final"
                                >
                                    <input className="form-control" placeholder="Fecha final" type='date' onChange={(e) => { setFinalVaccinationDate(e.target.value) }} id="finalVaccinationDate" />
                                </FloatingLabel>
                            </InputGroup>

                        </fieldset>

                    </Col>

                    <Row style={{ maxWidth: "250px", margin: "24px auto 8px auto" }}>
                        <Button variant="primary" type="button" style={{ margin: '8px 0px' }} onClick={() => { filtrarDatos() }}>
                            Filtrar
                        </Button>
                    </Row>
                </Row>
            </Container>
            <br />
            <div className='table-employe'>
                <div className='table-container'>
                    <table key={'lista-empleadoss'} className="table table-striped">
                        <thead style={{ width: "100px" }}>
                            <tr style={{ textAlign: 'center', }}>
                                <th className='table-title'>#</th>
                                <th className='table-title'>Cédula</th>
                                <th className='table-title'>Nombres</th>
                                <th className='table-title'>Apellidos</th>
                                <th className='table-title'>Correo electrónico</th>
                                <th className='table-title'>Fecha<br />Nacimiento</th>
                                <th className='table-title'>Dirección</th>
                                <th className='table-title'>Telefono</th>
                                <th className='table-title'>¿Está<br />Vacunado?</th>
                                <th className='table-title'>Tipo Vacuna</th>
                                <th className='table-title'>Facha<br />Vacunación</th>
                                <th className='table-title'>Número<br />de Dosis</th>
                                <th className='table-title'>Rol</th>
                                <th className='table-title'>Nombre Usuario</th>
                                <th className='table-title'>Password</th>
                                <th className='table-title'>Opciones</th>
                            </tr>
                        </thead>
                        <tbody key={'lista-empleadoss-body'} >
                            {data.map((employee: any, index: number) => (
                                <tr className='row-not-select' style={{ textAlign: 'center' }} key={'prod-ad' + index} id={"tr-" + employee.cedula} >
                                    <td className='item-employee'>{index + 1}</td>
                                    <td className='item-employee'>{employee.cedula}</td>
                                    <td className='item-employee'>{employee.nombres}</td>
                                    <td className='item-employee'>{employee.apellidos}</td>
                                    <td className='item-employee'>{employee.correo}</td>
                                    <td className='item-employee'>{employee.fechaNacimiento}</td>
                                    <td className='item-employee'>{employee.direccion}</td>
                                    <td className='item-employee'>{employee.movil}</td>
                                    <td className='item-employee'>{employee.estaVacunado ? "Sí" : "No"}</td>
                                    <td className='item-employee'>{employee.estaVacunado ? employee.tipoVacuna : "-"}</td>
                                    <td className='item-employee'>{employee.estaVacunado ? employee.fechaVacunacion : "-"}</td>
                                    <td className='item-employee'>{employee.estaVacunado ? parseInt(employee.numeroDosis) : "-"}</td>
                                    <td className='item-employee'>{employee.rol}</td>
                                    <td className='item-employee'>{employee.nombreUsuario}</td>
                                    <td className='item-employee hide-text' id={"password" + employee.cedula}>{employee.password}</td>
                                    <td style={{ textAlign: 'center' }}>
                                        <Button
                                            id={'ver-' + employee.cedula}
                                            variant="outline-info" type="button"
                                            style={{ margin: '8px 0px' }}
                                            onClick={() => openEmployeeProfileCard(employee)}
                                        >
                                            Ver Perfil
                                        </Button>
                                        <br />
                                        <Button
                                            variant="outline-success"
                                            type="submit"
                                            style={{ margin: '8px 0px' }}
                                            onClick={() => openUpdateEmployeeModal(employee)}
                                        >
                                            Actualizar
                                        </Button>
                                        <br />
                                        <Button
                                            id={'button-editar-' + employee.cedula}
                                            variant="outline-danger"
                                            type="button"
                                            style={{ margin: '8px 0px' }}
                                            onClick={() => openDelateEmployeeModal(employee)}
                                        >
                                            Eliminar
                                        </Button>
                                        <br />
                                        <Button
                                            id={'password' + employee.cedula + '-button'}
                                            variant="outline-dark"
                                            type="button"
                                            style={{ margin: '8px 0px' }}
                                            onClick={() => showPassword("password" + employee.cedula)}
                                        >
                                            Ver Password
                                        </Button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            <EmployeeProfileModal
                id={'profile-modal-' + currentEmployeeData.nombreUsuario}
                show={showEmployeCard}
                onHide={() => setShowEmployeCard(false)}
                employeeData={currentEmployeeData}
                type="modal"
            />
            {
                showUpdateModal ?
                    <EmployeeFormModal
                        id={'update-modal-' + currentEmployeeData.cedula}
                        show={showUpdateModal}
                        onHide={() => setShowUpdateModal(false)}
                        employeeData={currentEmployeeData}
                        formType="update-list"
                    /> : <></>
            }
            <EmployeeDeleteModal
                id={'delete-modal-' + currentEmployeeData.cedula}
                show={showDeleteModal}
                onHide={() => setShowDeleteModal(false)}
                employeeData={currentEmployeeData}
            />
        </div>
    );
}