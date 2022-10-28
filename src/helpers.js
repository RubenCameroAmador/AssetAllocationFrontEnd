function capitalizarPrimeraLetra (str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}
export function validateEmpty (data) {
    const errores = {}
    const keys = Object.keys(data)
    keys.forEach(key => {
        if (data[key] === '' || data[key] === undefined) {
            errores[key] = capitalizarPrimeraLetra(`${key} es obligatorio`)
        }
    })
    return errores
}

export function saveInLocalStorage (key, value) {
    localStorage.setItem(key, JSON.stringify(value))
}
export function getLocalStorage (key) {
    const data = localStorage.getItem(key)
    return data != null ? JSON.parse(data) : null;
}