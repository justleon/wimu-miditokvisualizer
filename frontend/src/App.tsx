import React, { useState } from 'react';
// import logo from './logo.svg';
import './App.css';
import FileUpload from './components/FileUpload';
import RangeSlider from './components/RangeSlider';


function App() {
  const [uploadResponse, setUploadResponse] = useState<string>('');
  const [selectedTokenizer, setSelectedTokenizer] = useState<string>('REMI'); // Default to REMI
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [selectedPitchRange, setSelectedPitchRange] = useState<number[]>([21, 109]); // Example initial pitch range

  const handleFileChange = (file: File) => {
    setSelectedFile(file);
  };

  const handleTokenizerChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedTokenizer(event.target.value);
  };

  const handlePitchRangeChange = (newValues: number[]) => {
    setSelectedPitchRange(newValues);
  };

  const handleUpload = (event: React.FormEvent) => {
    event.preventDefault();
    if (selectedFile) {
      const formData = new FormData();
      formData.append('file', selectedFile);
      formData.append('tokenizer', selectedTokenizer);
      formData.append('pitchRange', JSON.stringify(selectedPitchRange));

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
        {/* <img src={logo} className="App-logo" alt="logo" /> */}
        <form onSubmit={handleUpload}>
          <div className="form-row">
            <label htmlFor="tokenizerSelect">Select Tokenizer Type: </label>
            <div>
              <select id="tokenizerSelect" value={selectedTokenizer} onChange={handleTokenizerChange}>
                <option value="REMI">REMI</option>
                <option value="REMIPlus">REMIPlus</option>
                <option value="MIDI-like">MIDI-like</option>
                <option value="TSD">TSD</option>
                <option value="Structured">Structured</option>
                <option value="CPWord">CPWord</option>
                <option value="Octuple">Octuple</option>
                <option value="MuMIDI">MuMIDI</option>
                <option value="MMM">MMM</option>
              </select>
            </div>
          </div>

          <div className="form-row">
            <div className="label-container">
              <label htmlFor="pitchRange">Select Pitch Range: </label>
            </div>
            <div className="select-container">
              <RangeSlider onRangeChange={handlePitchRangeChange}/>
            </div>
          </div>

          <div className="form-row">
            <FileUpload onFileSelect={handleFileChange} />
            <button type="submit">Upload</button>
          </div>
        </form>
        <p>
          {uploadResponse ? (<pre>{JSON.stringify(uploadResponse, null, 2)}</pre>) : null}
        </p>
      </header>
    </div>
  );
}

export default App;
