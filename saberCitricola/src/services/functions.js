export function formatearNumero(numero, cantidadDecimales = 2) {
    // Asegurarse de que sea un número válido
    if (isNaN(Number(numero))) {
        return ""
        //throw new Error("El valor ingresado no es un número válido");
    }

    // Redondear el número a 2 decimales
    const numeroRedondeado = Number(numero).toFixed(cantidadDecimales);

    // Dividir la parte entera y la parte decimal
    const [parteEntera, parteDecimal] = numeroRedondeado.split('.');

    // Formatear la parte entera con separadores de miles
    const parteEnteraFormateada = parteEntera.replace(/\B(?=(\d{3})+(?!\d))/g, '.');

    // Devolver el número formateado con 2 decimales
    return `${parteEnteraFormateada},${parteDecimal}`;
}

export const obtenerFechaYHoraActual = () => {
    const fecha = new Date();
    const dia = fecha.getDate();
    const mes = fecha.getMonth() + 1; // Los meses empiezan desde 0
    const año = fecha.getFullYear();

    const horas = fecha.getHours();
    const minutos = fecha.getMinutes();
    const segundos = fecha.getSeconds();

    const fechaFormateada = `${año}-${mes.toString().padStart(2, '0')}-${dia.toString().padStart(2, '0')}`;
    const horaFormateada = `${horas.toString().padStart(2, '0')}:${minutos.toString().padStart(2, '0')}:${segundos.toString().padStart(2, '0')}`;

    return `${fechaFormateada}-${horaFormateada}`;
}