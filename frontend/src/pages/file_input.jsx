import { Link } from 'wouter';
import axios from 'axios';
import React, { useState } from 'react';
function Input() {
    const handleFileInput = (event) => {
      const file = event.target.files[0];
      if (file) {
        console.log('Selected file:', file);
        // You can perform any additional actions with the selected file here.
      }
    };
  
    const handleAnalyzeButtonClick = async (event) => {
      event.preventDefault();
      const fileInput = document.getElementById('fileInput');
      const file = fileInput.files[0];
    
      if (file) {
        const formData = new FormData();
        formData.append('name', file.name);
        formData.append('mp3_file', file);
      
        try {
          const response = await fetch('http://localhost:8000/upload/', {
            method: 'POST',
            body: formData,
          });
          console.log(response)
    
          // Handle the response from the server if needed
        } catch (error) {
          console.error('Error uploading file:', error);
        }
      };
    };
    
  
    return (
      <div className="min-h-screen flex flex-col items-center justify-start pt-20">
        <div className="w-full max-w-sm p-6 bg-white rounded shadow-md">
          <label htmlFor="fileInput" className="block text-gray-700 font-bold mb-2">
            Choose a file:
          </label>
          

          <input
            type="file"
            id="fileInput"
            className="block w-full bg-gray-200 text-gray-700 border rounded py-2 px-3 leading-tight focus:outline-none focus:bg-white"
            onChange={handleFileInput}
          />
        </div>
  
        <button
          onClick={handleAnalyzeButtonClick}
          className="mt-4 w-full max-w-sm bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Analyze
        </button>
            
          </div>
            
      
    );
  }

  export default Input;
