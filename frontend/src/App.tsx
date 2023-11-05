import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';
import FileUpload from './components/FileUpload';


function App() {
  const [uploadResponse, setUploadResponse] = useState<string>('');
  const [selectedFile, setSelectedFile] = useState<File | null>(null)

  const handleFileChange = (file: File) => {
    setSelectedFile(file);
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
        .then((data) => setUploadResponse(data))
        .catch((error) => {
          console.error('Error uploading file:', error);
        });
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <form onSubmit={handleUpload}>
          <FileUpload onFileSelect={handleFileChange} />
          <button type="submit">Upload</button>
        </form>
        <p>
          {uploadResponse ? (<pre>{JSON.stringify(uploadResponse, null, 2)}</pre>) : null}
        </p>
      </header>
    </div>
  );
}

export default App;
