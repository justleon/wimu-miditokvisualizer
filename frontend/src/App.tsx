import React, { useState } from 'react';
// import logo from './logo.svg';
import './App.css';
import FileUpload from './components/FileUpload';
import Spinner from './components/Spinner';
import DataDisplay from './components/DataDisplay';
import RangeSlider from './components/RangeSlider';
import SingleValueSlider from './components/SingleValueSlider';
import { ApiResponse } from './interfaces/ApiResponse';
import ErrorBoundary from './components/ErrorBoundary';

function App() {
  const [responseData, setResponseData] = useState<ApiResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [selectedTokenizer, setSelectedTokenizer] = useState<string>('REMI');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [selectedPitchRange, setSelectedPitchRange] = useState<number[]>([21, 109]);
  const [selectedVelocityBins, setSelectedVelocityBins] = useState<number>(32);
  const [specialTokens, setSpecialTokens] = useState<string>("PAD, BOS, EOS, MASK");
  const [useChords, setUseChords] = useState<boolean>(true);
  const [useRests, setUseRests] = useState<boolean>(false);
  const [useTempos, setUseTempos] = useState<boolean>(true);
  const [useTimeSignatures, setUseTimeSignatures] = useState<boolean>(false);
  const [useSustainPedals, setUseSustainPedals] = useState<boolean>(false);
  const [usePitchBends, setUsePitchBends] = useState<boolean>(false);
  const [usePrograms, setUsePrograms] = useState<boolean>(false);
  const [selectedPrograms, setSelectedPrograms] = useState<number[]>([-1, 128]);
  const [oneTokenStreamForPrograms, setOneTokenStreamForPrograms] = useState<boolean>(true);
  const [programChanges, setProgramChanges] = useState<boolean>(false);
  const [selectedNbTempos, setSelectedNbTempos] = useState<number>(32);
  const [selectedTempoRange, setSelectedTempoRange] = useState<number[]>([40, 250]);
  const [logTempos, setLogTempos] = useState<boolean>(false);
  const [deleteEqualSuccessiveTempoChanges, setDeleteEqualSuccessiveTempoChanges] = useState<boolean>(false);
  const [sustainPedalDuration, setSustainPedalDuration] = useState<boolean>(false);
  const [pitchBendRange, setPitchBendRange] = useState<number[]>([-8192, 8191]);
  const [pitchBendRangeNumber, setPitchBendRangeNumber] = useState<number>(32);
  const [deleteEqualSuccessiveTimeSigChanges, setDeleteEqualSuccessiveTimeSigChanges] = useState<boolean>(false);
  const [showTokenizerConfig, setShowTokenizerConfig] = useState<boolean>(false);

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

  const handleSpecialTokensChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSpecialTokens(event.target.value);
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

  const handleProgramsChange = (newValues: number[]) => {
    setSelectedPrograms(newValues);
  };
  
  const handleOneTokenStreamForProgramsChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setOneTokenStreamForPrograms(event.target.checked);
  };
  
  const handleProgramChangesChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setProgramChanges(event.target.checked);
  };

  const handleNbTemposChange = (newValue: number) => {
    setSelectedNbTempos(newValue);
  };

  const handleTempoRangeChange = (newValues: number[]) => {
    setSelectedTempoRange(newValues);
  };

  const handleLogTemposChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setLogTempos(event.target.checked);
  };
  
  const handleDeleteEqualSuccessiveTempoChangesChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDeleteEqualSuccessiveTempoChanges(event.target.checked);
  };

  const handleSustainPedalDurationChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSustainPedalDuration(event.target.checked);
  };
  
  const handlePitchBendRangeChange = (newValues: number[]) => {
    setPitchBendRange(newValues);
  };

  const handlePitchBendRangeNumberChange = (newValue: number) => {
    setPitchBendRangeNumber(newValue);
  };
  
  const handleDeleteEqualSuccessiveTimeSigChangesChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDeleteEqualSuccessiveTimeSigChanges(event.target.checked);
  };

  const toggleTokenizerConfig = () => {
    setShowTokenizerConfig(!showTokenizerConfig);
  };

  const handleUpload = (event: React.FormEvent) => {
    event.preventDefault();
    if (selectedFile) {
      const formData = new FormData();
      const configData = {
        tokenizer: selectedTokenizer,
        pitch_range: selectedPitchRange,
        nb_velocities: selectedVelocityBins,
        special_tokens: specialTokens.split(",").map((token) => token.trim()),
        use_chords: useChords,
        use_rests: useRests,
        use_tempos: useTempos,
        use_time_signatures: useTimeSignatures,
        use_sustain_pedals: useSustainPedals,
        use_pitch_bends: usePitchBends,
        use_programs: usePrograms,
        nb_tempos: selectedNbTempos,
        tempo_range: selectedTempoRange,
        log_tempos: logTempos,
        delete_equal_successive_tempo_changes: deleteEqualSuccessiveTempoChanges,
        delete_equal_successive_time_sig_changes: deleteEqualSuccessiveTimeSigChanges,
        sustain_pedal_duration: sustainPedalDuration,
        pitch_bend_range: [...pitchBendRange, pitchBendRangeNumber],
        programs: usePrograms ? selectedPrograms : null,
        one_token_stream_for_programs: usePrograms ? oneTokenStreamForPrograms : null,
        program_changes: usePrograms ? programChanges : null
      };

      formData.append('file', selectedFile);
      formData.append('config', JSON.stringify(configData));

      setLoading(true);

      fetch(`${process.env.REACT_APP_API_BASE_URL}/process`, {
        method: 'POST',
        body: formData,
      })
        .then((response) => {
          // if (!response.ok) {
          //   throw new Error(`${response.status} ${response.statusText}`);
          // }
          return response.json();
        })
        .then((data: ApiResponse) => setResponseData(data))
        .catch((error) => {
          console.log(error);
        })
        .finally(() => {
          setLoading(false);
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
                <option value="MIDILike">MIDI-like</option>
                <option value="TSD">TSD</option>
                <option value="Structured">Structured</option>
                <option value="CPWord">CPWord</option>
                <option value="Octuple">Octuple</option>
                <option value="MMM">MMM</option>
              </select>
            </div>
          </div>

          <button type="button" className="tokenizerConfigButton" onClick={toggleTokenizerConfig}>
            {showTokenizerConfig ? 'Hide Tokenizer Config' : 'Show Tokenizer Config'}
          </button>

          {showTokenizerConfig && (
            <>
          <div className="tokenizerConfig">
          <div className="form-row">
            <div className="label-container">
              <label htmlFor="pitchRange">Select Pitch Range: </label>
            </div>
            <div className="select-container">
              <RangeSlider onRangeChange={handlePitchRangeChange} initialValues={selectedPitchRange} limits={[0, 127]}/>
            </div>
          </div>

          <div className="form-row">
            <div className="label-container">
              <label htmlFor="velocityBins">Number of velocity bins: </label>
            </div>
            <div className="select-container">
              <SingleValueSlider onValueChange={handleVelocityBinsChange} initialValue={selectedVelocityBins} limits={[0, 127]}/>
            </div>
          </div>

          <div className="form-row">
            <label htmlFor="specialTokens">Special Tokens (comma-separated): </label>
            <input
              type="text"
              id="specialTokens"
              value={specialTokens}
              onChange={handleSpecialTokensChange}
            />
          </div>

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

          {usePrograms && (
            <>
              <div className="form-row">
                <div className="label-container">
                  <label htmlFor="programsSlider">MIDI programs: </label>
                </div>
                <div className="select-container">
                  <RangeSlider onRangeChange={handleProgramsChange} initialValues={selectedPrograms} limits={[-1, 128]} />
                </div>
              </div>

              <div className="form-row">
                <label>
                  <input type="checkbox" checked={oneTokenStreamForPrograms} onChange={handleOneTokenStreamForProgramsChange} />
                  One Token Stream for Programs
                </label>
              </div>

              <div className="form-row">
                <label>
                  <input type="checkbox" checked={programChanges} onChange={handleProgramChangesChange} />
                  Program Changes
                </label>
              </div>
            </>
          )}

          <div className="form-row">
            <div className="label-container">
              <label htmlFor="nbTempos">Number of tempos bins: </label>
            </div>
            <div className="select-container">
              <SingleValueSlider onValueChange={handleNbTemposChange} initialValue={selectedNbTempos} limits={[0, 100]}/>
            </div>
          </div>

          <div className="form-row">
            <div className="label-container">
              <label htmlFor="tempoRange">Select Tempo Range: </label>
            </div>
            <div className="select-container">
              <RangeSlider onRangeChange={handleTempoRangeChange} initialValues={selectedTempoRange} limits={[0, 350]}/>
            </div>
          </div>

          <div className="form-row">
            <label>
              <input type="checkbox" checked={logTempos} onChange={handleLogTemposChange} />
              Log Scaled Tempo Values
            </label>
          </div>

          <div className="form-row">
            <label>
              <input type="checkbox" checked={deleteEqualSuccessiveTempoChanges} onChange={handleDeleteEqualSuccessiveTempoChangesChange} />
              Delete Equal Successive Tempo Changes
            </label>
          </div>

          <div className="form-row">
            <label>
              <input type="checkbox" checked={sustainPedalDuration} onChange={handleSustainPedalDurationChange} />
              Sustain Pedal Duration
            </label>
          </div>

          <div className="form-row">
            <div className="label-container">
              <label htmlFor="pitchBendRange">Select Pitch Bend Range: </label>
            </div>
            <div className="select-container">
              <RangeSlider onRangeChange={handlePitchBendRangeChange} initialValues={pitchBendRange} limits={[-8192, 8191]} />
            </div>
          </div>

          <div className="form-row">
            <div className="label-container">
              <label htmlFor="pitchBendRangeNumber">Select Pitch Bend Range: </label>
            </div>
            <div className="select-container">
              <SingleValueSlider onValueChange={handlePitchBendRangeNumberChange} initialValue={pitchBendRangeNumber} limits={[0, 100]} />
            </div>
          </div>

          <div className="form-row">
            <label>
              <input type="checkbox" checked={deleteEqualSuccessiveTimeSigChanges} onChange={handleDeleteEqualSuccessiveTimeSigChangesChange} />
              Delete Equal Successive Time Signature Changes
            </label>
          </div>
          </div>
          </>
    
          )}

          <div className="form-row">
            <FileUpload onFileSelect={handleFileChange} acceptedFormats={".mid"}/>
            <button type="submit" disabled={loading}>
              {loading ? <Spinner /> : 'Upload'}
            </button>
          </div>

        </form>
        <div style={{ overflowX: 'auto', whiteSpace: 'nowrap', maxWidth: '70%' }}>
          <ErrorBoundary fallback={<p>Something went wrong</p>}>
            {responseData?.data ? <DataDisplay data={responseData.data.tokens} sample={10} /> : responseData?.error}
          </ErrorBoundary>
        </div>
      </header>
    </div>
  );
}

export default App;
