import './App.css';
import { useState } from 'react';

function App() {
    const [cadena, setCadena] = useState('');
    const [mensaje, setMensaje] = useState([]);

    const validarCadena = (cadena) => {
        const validaciones = [];

        // Función para agregar un mensaje de validación
        const agregarValidacion = (caracter, valido) => {
            validaciones.push({
                caracter,
                valido,
            });
        };

        // Convertir la cadena ingresada a minúsculas
        const cadenaMinusculas = cadena.toLowerCase();

        // Verificar la longitud de la cadena
        if (cadenaMinusculas.length !== 9) {
            agregarValidacion(cadena[0], false);
            return validaciones;
        }

        // Verificar el primer carácter
        if (cadenaMinusculas[0] !== 'c') {
            agregarValidacion(cadena[0], false);
            return validaciones;
        } else {
            agregarValidacion(cadena[0], true);
        }

        // Verificar el segundo carácter
        if (cadenaMinusculas[1] < 'm' || cadenaMinusculas[1] > 'u') {
            agregarValidacion(cadena[1], false);
            return validaciones;
        } else {
            agregarValidacion(cadena[1], true);
        }

        // Verificar el tercer carácter
        if (cadenaMinusculas[2] !== '-') {
            agregarValidacion(cadena[2], false);
            return validaciones;
        } else {
            agregarValidacion(cadena[2], true);
        }

        // Verificar los siguientes 4 caracteres
        const numero = Number(cadenaMinusculas.substring(3, 7));
        if (isNaN(numero) || numero < 1 || numero > 9999 || numero === 0) {
            // Agregar cada uno de los caracteres como válidos
            for (let i = 3; i < 7; i++) {
                agregarValidacion(cadena[i], i === 6 ? false : true);
            }
            return validaciones;
        } else {
            // Agregar cada uno de los caracteres como válidos
            for (let i = 3; i < 7; i++) {
                agregarValidacion(cadena[i], true);
            }
        }

        // Verificar el octavo carácter
        if (cadenaMinusculas[7] !== '-') {
            agregarValidacion(cadena[7], false);
            return validaciones;
        } else {
            agregarValidacion(cadena[7], true);
        }

        // Verificar el noveno carácter
        if (cadenaMinusculas[8] < 'a' || cadenaMinusculas[8] > 'z') {
            agregarValidacion(cadena[8], false);
            return validaciones;
        } else {
            agregarValidacion(cadena[8], true);
        }

        return validaciones;
    };

    const handleChange = (event) => {
        const inputCadena = event.target.value;
        setCadena(inputCadena);
    };

    const handleValidar = () => {
        const validaciones = validarCadena(cadena);

        // Convertir las validaciones a mayúsculas
        const validacionesMayusculas = validaciones.map((validacion) => ({
            caracter: validacion.caracter.toUpperCase(),
            valido: validacion.valido,
        }));

        // Mostrar las validaciones en forma de lista
        const listaValidaciones = validacionesMayusculas.map((validacion, index) => (
            <div key={index}>
                {index + 1}. "{validacion.caracter}" - {validacion.valido ? 'VÁLIDO' : 'INVÁLIDO'}
            </div>
        ));

        setMensaje(listaValidaciones);
    };

    return (
        <div>
            <label>Ingresa la cadena:</label>
            <input type="text" value={cadena} onChange={handleChange} />
            <button onClick={handleValidar}>Validar</button>
            {mensaje && <div>{mensaje}</div>}
        </div>
    );
}

export default App;
