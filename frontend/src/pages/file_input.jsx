import React, { useState } from 'react';
//import { getSummary } from './api'; // Assuming you have the getSummary function in a separate file

function Input() {
  const [file, setFile] = useState(null);
  const [result, setResult] = useState('');

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    setFile(selectedFile);
  };

  const handleUpload = async () => {
    if (!file) {
      alert('Please select an mp3 file');
      return;
    }

    try {
      const summary = await getSummary(file);
      setResult(summary);
    } catch (error) {
      console.error('Error uploading mp3:', error);
      setResult('Error uploading mp3');
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <div className="w-full max-w-sm p-6 bg-white rounded shadow-md">
        <h2 className="text-2xl font-bold mb-4">Insert an MP3 file here:</h2>
        
        <input
          type="file"
          id="fileInput"
          className="block w-full bg-gray-200 text-gray-700 border rounded py-2 px-3 leading-tight focus:outline-none focus:bg-white"
          onChange={handleFileChange}
        />
        <button
          onClick={handleUpload}
          className="mt-4 w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Upload
        </button>
      </div>
      <div className="mt-4">
        <h2 className="text-xl font-bold">Summary Result:</h2>
        <p className="text-gray-700">{result}</p>
      </div>
    </div>
  );
}

export default Input;
