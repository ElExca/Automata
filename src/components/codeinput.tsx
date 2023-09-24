import React, { useState } from 'react';

function TextInputArray() {
  const [inputText, setInputText] = useState('');
  const [textArray, setTextArray] = useState<string[]>([]);
  const [isValid, setIsValid] = useState(true);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputText(event.target.value);
    setIsValid(true);
  };

  const handleAddText = () => {
    const regex = /^C[M-U]-(?!0000)\d{4}-[A-Z]$/;
    if (regex.test(inputText.trim().toUpperCase())) {
      setTextArray([...textArray, inputText.trim().toUpperCase()]);
      setInputText('');
      setIsValid(true);
    } else {
      setIsValid(false);
    }
  };

  console.log(textArray);

  return (
    <div>
      <input
        type="text"
        placeholder="Ingrese texto"
        value={inputText}
        onChange={handleInputChange}
      />
      <button onClick={handleAddText}>Validar</button>
      {!isValid && <p style={{ color: 'red' }}>Entrada no válida</p>}
      {isValid && textArray.length > 0 && (
        <p style={{ color: 'green' }}>Entrada válida</p>
      )}
      <ul>
        {textArray.map((text, index) => (
          <li key={index}>{text}</li>
        ))}
      </ul>
    </div>
  );
}

export default TextInputArray;
