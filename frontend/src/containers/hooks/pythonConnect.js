import React, { useState } from 'react';

const StringSender = () => {
  const [inputString, setInputString] = useState('');

  const handleInputChange = (e) => {
    setInputString(e.target.value);
  };

  const sendStringToServer = async () => {
    try {
      const response = await fetch('http://localhost:5000/process_string', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ stringToSend: inputString }),
      });
      const data = await response.json();
      console.log(data); // Log the response from the server
    } catch (error) {
      console.error('Error sending string:', error);
    }
  };

  return (
    <div>
      <input type="text" value={inputString} onChange={handleInputChange} />
      <button onClick={sendStringToServer}>Send String</button>
    </div>
  );
}

export default StringSender;