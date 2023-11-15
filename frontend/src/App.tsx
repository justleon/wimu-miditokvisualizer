import React, { useState } from 'react';
// import logo from './logo.svg';
import './App.css';
import FileUpload from './components/FileUpload';
import RangeSlider from './components/RangeSlider';
import SingleValueSlider from './components/SingleValueSlider';


function App() {
  const [uploadResponse, setUploadResponse] = useState<string>('');
  const [selectedTokenizer, setSelectedTokenizer] = useState<string>('REMI');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [selectedPitchRange, setSelectedPitchRange] = useState<number[]>([21, 109]);
  const [selectedVelocityBins, setSelectedVelocityBins] = useState<number>(32);
  const [useChords, setUseChords] = useState<boolean>(true);
  const [useRests, setUseRests] = useState<boolean>(false);
  const [useTempos, setUseTempos] = useState<boolean>(true);
  const [useTimeSignatures, setUseTimeSignatures] = useState<boolean>(false);
  const [useSustainPedals, setUseSustainPedals] = useState<boolean>(false);
  const [usePitchBends, setUsePitchBends] = useState<boolean>(false);
  const [usePrograms, setUsePrograms] = useState<boolean>(false);
  const [selectedNbTempos, setSelectedNbTempos] = useState<number>(32);
  const [selectedTempoRange, setSelectedTempoRange] = useState<number[]>([40, 250]);

  const handleFileChange = (file: File) => {
    setSelectedFile(file);
  };

  const handleTokenizerChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedTokenizer(event.target.value);
  };

  const handlePitchRangeChange = (newValues: number[]) => {
    setSelectedPitchRange(newValues);
  };

  const handleVelocityBinsChange = (newValue: number) => {
    setSelectedVelocityBins(newValue);
  };

  const handleUseChordsChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUseChords(event.target.checked);
  };

  const handleUseRestsChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUseRests(event.target.checked);
  };

  const handleUseTemposChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUseTempos(event.target.checked);
  };

  const handleUseTimeSignaturesChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUseTimeSignatures(event.target.checked);
  };

  const handleUseSustainPedalsChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUseSustainPedals(event.target.checked);
  };

  const handleUsePitchBendsChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUsePitchBends(event.target.checked);
  };

  const handleUseProgramsChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUsePrograms(event.target.checked);
  };

  const handleNbTemposChange = (newValue: number) => {
    setSelectedNbTempos(newValue);
  };

  const handleTempoRangeChange = (newValues: number[]) => {
    setSelectedTempoRange(newValues);
  };

  const handleUpload = (event: React.FormEvent) => {
    event.preventDefault();
    if (selectedFile) {
      const formData = new FormData();
      formData.append('file', selectedFile);
      formData.append('tokenizer', selectedTokenizer);
      formData.append('pitch_range', JSON.stringify(selectedPitchRange));
      formData.append('velocity_bins', JSON.stringify(selectedVelocityBins));
      formData.append('use_chords', JSON.stringify(useChords));
      formData.append('use_rests', JSON.stringify(useRests));
      formData.append('use_tempos', JSON.stringify(useTempos));
      formData.append('use_time_signatures', JSON.stringify(useTimeSignatures));
      formData.append('use_sustain_pedals', JSON.stringify(useSustainPedals));
      formData.append('use_pitch_bends', JSON.stringify(usePitchBends));
      formData.append('use_programs', JSON.stringify(usePrograms));
      formData.append('nb_tempos', JSON.stringify(selectedNbTempos));
      formData.append('tempo_range', JSON.stringify(selectedTempoRange));

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

          {/* TODO: Select beat_res */}

          <div className="form-row">
            <div className="label-container">
              <label htmlFor="velocityBins">Number of velocity bins: </label>
            </div>
            <div className="select-container">
              <SingleValueSlider onValueChange={handleVelocityBinsChange}/>
            </div>
          </div>

          {/* TODO: Special tokens*/}

          <div className="form-row">
            <label>
              <input type="checkbox" checked={useChords} onChange={handleUseChordsChange} />
              Use Chords
            </label>
          </div>

          <div className="form-row">
            <label>
              <input type="checkbox" checked={useRests} onChange={handleUseRestsChange} />
              Use Rests
            </label>
          </div>

          {/* TODO: Select beat_res_rests */}

          <div className="form-row">
            <label>
              <input type="checkbox" checked={useTempos} onChange={handleUseTemposChange} />
              Use Tempos
            </label>
          </div>

          <div className="form-row">
            <label>
              <input type="checkbox" checked={useTimeSignatures} onChange={handleUseTimeSignaturesChange} />
              Use Time Signatures
            </label>
          </div>

          <div className="form-row">
            <label>
              <input type="checkbox" checked={useSustainPedals} onChange={handleUseSustainPedalsChange} />
              Use Sustain Pedals
            </label>
          </div>

          <div className="form-row">
            <label>
              <input type="checkbox" checked={usePitchBends} onChange={handleUsePitchBendsChange} />
              Use Pitch Bends
            </label>
          </div>

          <div className="form-row">
            <label>
              <input type="checkbox" checked={usePrograms} onChange={handleUseProgramsChange} />
              Use Programs
            </label>
          </div>

          <div className="form-row">
            <div className="label-container">
              <label htmlFor="nbTempos">Number of tempos bins: </label>
            </div>
            <div className="select-container">
              <SingleValueSlider onValueChange={handleNbTemposChange}/>
            </div>
          </div>

          <div className="form-row">
            <div className="label-container">
              <label htmlFor="tempoRange">Select Tempo Range: </label>
            </div>
            <div className="select-container">
              <RangeSlider onRangeChange={handleTempoRangeChange}/>
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
