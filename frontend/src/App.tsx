import React, { useState, useRef } from 'react';
import logo from './logo.svg';
import './App.css';

function App() {
  const [data, setData] = useState(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;

    if (files && files[0]) {
      setSelectedFile(files[0]);
    }
  };

  const handleUpload = (event: React.FormEvent) => {
    event.preventDefault();
    if (selectedFile) {
      const formData = new FormData();
      formData.append('file', selectedFile);

      fetch(`${process.env.REACT_APP_API_BASE_URL}/process`, {
        method: 'POST',
        body: formData,
      })
        .then((response) => response.json())
        .then((data) => setData(data))
        .catch((error) => {
          console.error('Error uploading file:', error);
        });
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          {data ? (<pre>{JSON.stringify(data, null, 2)}</pre>) : null}
        </p>
        <form onSubmit={handleUpload}>
          <input
            type="file"
            accept=".mid"
            ref={fileInputRef}
            onChange={handleFileChange}
          />
          <button type="submit">Upload</button>
        </form>
      </header>
    </div>
  );
}

export default App;
