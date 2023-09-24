import React, { useState, useEffect } from 'react';

function TextInputArray() {
  const [inputText, setInputText] = useState('');
  const [textArray, setTextArray] = useState<string[]>([]);
  const [isValid, setIsValid] = useState<boolean | null>(null);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputText(event.target.value);
    setIsValid(null);
  };

  const handleAddText = () => {
    const cleanedInput = inputText.trim().toUpperCase();
    setTextArray([...textArray, cleanedInput]);
    setInputText('');
    setIsValid(isValidInput(cleanedInput));
  };

  const isValidInput = (input: string): boolean => {
    const regex = /^C[M-U]-(?!0000)\d{4}-[A-Z]$/;
    return regex.test(input);
  };

  const [currentIndex, setCurrentIndex] = useState(0);
  const [currentText, setCurrentText] = useState<string | null>(null);

  useEffect(() => {
    if (currentIndex < textArray.length) {
      const textToDisplay = textArray[currentIndex];
      let letterIndex = 0;

      const interval = setInterval(() => {
        if (letterIndex < textToDisplay.length) {
          const currentLetter = textToDisplay[letterIndex];
          setCurrentText(currentLetter); // Mostrar solo la letra actual
          setIsValid(isValidInput(currentLetter)); // Validar la letra actual
          letterIndex++;
        } else {
          clearInterval(interval);
          setCurrentText(null); // Borrar la letra
          setCurrentIndex((prevIndex) => prevIndex + 1);
          setTimeout(() => {
            setCurrentText(''); // Reiniciar la letra
          }, 1000); // Esperar un segundo antes de pasar al siguiente elemento
        }
      }, 1000); // Mostrar las letras con un intervalo de 100 ms
    }
  }, [currentIndex, textArray]);

  return (
    <div>
      <input
        type="text"
        placeholder="Ingrese texto"
        value={inputText}
        onChange={handleInputChange}
      />
      <button onClick={handleAddText}>Validar</button>
      {isValid === false && (
        <p style={{ color: 'red' }}>Entrada no válida</p>
      )}
      {isValid === true && textArray.length > 0 && (
        <p style={{ color: 'green' }}>Entrada válida</p>
      )}
      <div>
        {currentText && (
          <p
            style={{
              color: isValidInput(currentText) ? 'green' : 'red',
            }}
          >
            {currentText}
          </p>
        )}
      </div>
    </div>
  );
}

export default TextInputArray;
