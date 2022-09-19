export const checkCI = (cedula: string) => {
    let total = 0;
    for (let i = 0; i < 9; i++) {
        if (i % 2 === 0) {
            let aux = parseInt(cedula.charAt(i)) * 2;
            if (aux > 9) {
                aux -= 9;
            } 
            total += aux;
        } else {
            total += parseInt(cedula.charAt(i));
        }
    }

    total = total % 10 ? 10 - total % 10 : 0;

    if (cedula.charAt(9) == (total+"")) {
        return true;
    } else {
        return false;
    }
}