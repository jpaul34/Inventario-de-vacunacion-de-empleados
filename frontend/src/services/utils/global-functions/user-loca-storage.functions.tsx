export function getLocalUserData() {
    const userData = localStorage.getItem('_user');
    return userData ?  JSON.parse(userData) : null;
}

export function setLocalUserData(datosusuario: any) {
    localStorage.setItem('_user', JSON.stringify(datosusuario));
}

export function clearAllLocalData() {
    localStorage.clear();
}