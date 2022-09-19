import { EmployeeInterface } from "../utils/interfaces/employee.interface";

export const listEmployee: EmployeeInterface[] = [
    {
        cedula: "1734567890",
        nombres: "Nombreuno Nombredos",
        apellidos: "Apellidouno Apelidodos",
        correo: "correo@mail.com",
        fechaNacimiento: "01/01/2000",
        direccion: "Calle 7892, OE-593",
        movil: "0991234567",
        estaVacunado: false,
        nombreUsuario: "krugeriano1734567890",
        password: "qwerty593",
        rol: "Empleado",
        tipoVacuna: "",
        fechaVacunacion: "",
        numeroDosis: 0
    },
    {
        cedula: "1734567891",
        nombres: "Nombreuno Nombredos",
        apellidos: "Apellidouno Apelidodos",
        correo: "correo@mail.com",
        fechaNacimiento: "01/01/2000",
        direccion: "Calle 7892, OE-593",
        movil: "0991234567",
        estaVacunado: true,
        nombreUsuario: "krugeriano1734567891",
        password: "qwerty593",
        rol: "Administrador",
        tipoVacuna: "Pfizer",
        fechaVacunacion: "2022-01-01",
        numeroDosis: 2
    }
];