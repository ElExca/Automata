import './App.css';
import { useState } from 'react';

function App() {
    const [cadena, setCadena] = useState('');
    const [mensaje, setMensaje] = useState([]);

    const cadenaMinusculas = cadena.toLowerCase();

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
        

        if (cadenaMinusculas.length < 9) {
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
        if (cadenaMinusculas[3] >= '1' && cadenaMinusculas[3] <= '9') {
            agregarValidacion(cadena[3], true);
        } else {
            agregarValidacion(cadena[3], false);
        }
 


        if (cadenaMinusculas === '0000') {
            validaciones[7].valido = false// Marcar el último "0" como inválido
            
        }

        return validaciones;
    };

    const handleChange = (event) => {
        const inputCadena = event.target.value;
        setCadena(inputCadena);
    };
    const handleValidar = () => {
        if (cadena.length < 9) {
            setMensaje(['La cadena debe tener al menos 9 caracteres.']);
            return;
        }
    
        const validaciones = validarCadena(cadena);
    
        const mensajesValidados = [];
        let caracteresValidos = true;
    
        for (let i = 0; i < validaciones.length; i++) {
            const caracter = cadena[i];
            let mensaje = `Q${i + 1} - ${caracter} - ${validaciones[i].valido ? 'VÁLIDO' : 'INVÁLIDO'}`;
    
            if (i === 3 && cadenaMinusculas[3] === '0') {
                if (cadenaMinusculas[7] >= '1' && cadenaMinusculas[7] <= '9') {
                    mensaje = `Q7 - ${caracter} - VÁLIDO`;
                }
            }

    
            if (i === 4 && cadenaMinusculas[0] >= '1' && cadenaMinusculas[0] <= '9' && cadenaMinusculas[4] === '0') {
                mensaje = `Q10 - ${caracter} - VÁLIDO`;
            }
    
            if (i === 3 && cadenaMinusculas[3] === '0' && cadenaMinusculas[4] >= '1' && cadenaMinusculas[4] <= '9') {
                mensaje = `Q4 - ${caracter} - VÁLIDO`;
            }
    
            if (i === 5 && cadenaMinusculas[3] === '0' && cadenaMinusculas[4] === '0' && cadenaMinusculas[5] >= '1' && cadenaMinusculas[5] <= '9') {
                mensaje = `Q12 - ${caracter} - VÁLIDO`;
            }
    
            mensajesValidados.push(mensaje);
    
            if (!validaciones[i].valido) {
                caracteresValidos = false;
                break;
            }
        }
    
        // Eliminar los mensajes no válidos si los caracteres no son válidos
        if (!caracteresValidos) {
            mensajesValidados.splice(validaciones.length);
        }
    
        setMensaje(mensajesValidados);
    };
    
    
    
    
    
    
    

    return (
        <div>
            <label>Ingresa la cadena:</label>
            <input type="text" value={cadena} onChange={handleChange} />
            <button onClick={handleValidar}>Validar</button>
            {mensaje.map((mensaje, index) => (
                <div key={index}>{mensaje}</div>
            ))}
        </div>
    );
}

export default App;





