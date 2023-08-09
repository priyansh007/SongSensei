import React, { useState } from 'react';
import { useAccessToken } from '../AccessTokenContext'; // Import the hook
import axios from 'axios';

function Input() {
  const [responseData, setResponseData] = useState(null);
  const { accessToken } = useAccessToken();

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

        const fetchedsimilarids = [];
        if (response.ok) {
          const data = await response.json();
          console.log('Server response:', data);
          for (const id of data.spotify_ids) {
            const spotify_ids_details = await fetch_song_details(id, accessToken);
            fetchedsimilarids.push(spotify_ids_details);
            console.log(fetchedsimilarids)
          }
          setResponseData(fetchedsimilarids); // Store the response data in state
        } else {
          console.error('Server responded with status:', response.status);
        }
      } catch (error) {
        console.error('Error uploading file:', error);
      }
    }
  };

  const fetch_song_details = async (trackId, accessToken) => {
    try {
      const response = await axios.post(
        'http://localhost:8000/get_track_info/', // Replace with the URL of your Django backend function
        {
          trackId: trackId,
          accessToken: accessToken,
        }
      );
      console.log(trackId)
      console.log(accessToken)

      // The response object will contain the information sent back from the backend
      // You can access the data returned by the backend using response.data
      console.log('Response from backend:', response.data);

      // Assuming the backend returns the song details in response.data, you can now use the song details
      // For example, if the backend returns a JSON object with song details, you can access them like this:
      const fetchedsongdetails = response.data;
      return fetchedsongdetails;
      // Now you can use the songDetails object to display information about the song in your frontend.

    } catch (error) {
      console.error('Error sending track ID and access token to backend for selected song page:', error);
    }
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

      {responseData && (
        <div className="mt-4 w-full max-w-sm bg-blue-200 p-4 rounded shadow-md">
          <h2 className="text-lg font-bold mb-2">Response Data:</h2>
          <pre>{JSON.stringify(responseData, null, 2)}</pre>
        </div>
      )}
    </div>
  );
}

export default Input;