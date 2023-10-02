import React, { useState } from 'react';

// Define los tipos para las transiciones
type Transiciones = {
    [estado: string]: {
        [caracter: string]: string | undefined;
    };
};

const transiciones: Transiciones = {
    '0': { 'C': '1' },
    '1': { 'M': '2', 'N': '2', 'O': '2', 'P': '2', 'Q': '2', 'R': '2', 'S': '2', 'T': '2',
        'U': '2'},
    '2': { '-': '3' },
    '3': { '0': '4', "1": '10', "2": '10', "3": '10', "4": '10', "5": '10', "6": '10', "7": '10', "8": '10', "9": '10'
},
    '4': { '0': '5', "1": '11', "2": '11', "3": '11', "4": '11', "5": '11', "6": '11', "7": '11', "8": '11', "9": '11' },
    '5': { '0': '6', "1": '12', "2": '12', "3": '12', "4": '12', "5": '12', "6": '12', "7": '12', "8": '12', "9": '12' },
    '6': { "1": '7', "2": '7', "3": '7', "4": '7', "5": '7', "6": '7', "7": '7', "8": '7', "9": '7' },
    '10': { '0': '11', "1": '11', "2": '11', "3": '11', "4": '11', "5": '11', "6": '11', "7": '11', "8": '11', "9": '11' },
    '11': { '0': '12', "1": '12', "2": '12', "3": '12', "4": '12', "5": '12', "6": '12', "7": '12', "8": '12', "9": '12' },
    '12': { '0': '7', "1": '7', "2": '7', "3": '7', "4": '7', "5": '7', "6": '7', "7": '7', "8": '7', "9": '7' },
    '7': { '-': '8' },
    '8': { 'A': '9', 'B': '9', 'C': '9', 'D': '9', 'E': '9', 'F': '9', 'G': '9', 'H': '9', 'I': '9', 'J': '9',
      'K': '9', 'L': '9', 'M': '9', 'N': '9', 'O': '9', 'P': '9', 'Q': '9', 'R': '9', 'S': '9', 'T': '9',
      'U': '9', 'V': '9', 'W': '9', 'X': '9', 'Y': '9', 'Z': '9'
 },
    '9': {},
};

// Define los caracteres válidos
const caracteresValidos = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789-';

const validarCadena = (cadena: string): boolean => {
    let estadoActual = '0';

    for (const caracter of cadena) {
        if (!caracteresValidos.includes(caracter)) {
            return false;
        }

        const transicion = transiciones[estadoActual][caracter];

        if (transicion !== undefined) {
            estadoActual = transicion;
        } else {
            return false;
        }
    }

    return estadoActual === '9';
};

const App: React.FC = () => {
    const [cadena, setCadena] = useState<string>('');
    const [mensaje, setMensaje] = useState<string[]>([]);
    const [transicionesMensaje, setTransicionesMensaje] = useState<string>('');

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const inputCadena = event.target.value;
        setCadena(inputCadena);
    };

    const handleValidar = () => {
        if (cadena.length < 9) {
            setMensaje(['La cadena debe tener al menos 9 caracteres.']);
            setTransicionesMensaje('');
            return;
        }

        const esValida = validarCadena(cadena);

        if (esValida) {
            setMensaje(['¡La entrada es válida!']);
        } else {
            setMensaje(['La entrada no es válida.']);
        }

        setTransicionesMensaje(generarTransiciones(cadena));
    };

    const generarTransiciones = (cadena: string): string => {
        let estadoActual = '0';
        let transicionesMensaje = '';

        for (const caracter of cadena) {
            if (transiciones[estadoActual]) {
                const transicion = transiciones[estadoActual][caracter];
                if (transicion !== undefined) {
                    transicionesMensaje += `Estado ${estadoActual} -> Estado ${transicion}: '${caracter}'\n`;
                    estadoActual = transicion;
                } else {
                    transicionesMensaje += `Estado ${estadoActual} -> Error: '${caracter}'\n`;
                    break;
                }
            } else {
                transicionesMensaje += `Error: Estado ${estadoActual} no existe.\n`;
                break;
            }
        }

        return transicionesMensaje;
    };

    return (
        <div>
            <label>Ingresa la cadena:</label>
            <input type="text" value={cadena} onChange={handleChange} />
            <button onClick={handleValidar}>Validar</button>
            {mensaje.map((mensaje, index) => (
                <div key={index}>{mensaje}</div>
            ))}
            {transicionesMensaje && (
                <div>
                    <h3>Transiciones:</h3>
                    <pre>{transicionesMensaje}</pre>
                </div>
            )}
        </div>
    );
};

export default App;
