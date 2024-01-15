import React from 'react'
import { MusicInfoData } from '../interfaces/ApiResponse';

interface TableDisplayProps {
    data: MusicInfoData;
}

const MusicInfoDisplay: React.FC<TableDisplayProps> = ({ data }) => {
    return (
        <div>
            <div style={{ fontSize: '24px', marginBottom: '5px' }}>
                <b>{data.title}</b>
            </div>
            <div style={{ display: 'flex', marginRight: '10px' }}>
                <div
                style={{
                    display: 'inline-block',
                    width: '200px',
                    height: '100px',
                    border: '1px solid #ccc',
                    margin: '5px',
                    position: 'relative',
                }}
                >
                <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}>
                    {(
                    <>
                        <div style={{ fontSize: '10px' }}>
                        <strong>Resolution:</strong> {data.resolution}
                        </div>
                        <div style={{ fontSize: '10px' }}>
                        <strong>Tempos:</strong> {data.tempos}
                        </div>
                        <div style={{ fontSize: '10px' }}>
                        <strong>Key Signatures:</strong> {data.key_signatures}
                        </div>
                        <div style={{ fontSize: '10px' }}>
                        <strong>Time Signatures:</strong> {data.time_signatures}
                        </div>
                    </>
                    )}
                </div>
            </div>
            <br />
                <div style={{
                    display: 'inline-block',
                    width: '200px',
                    height: '100px',
                    border: '1px solid #ccc',
                    margin: '5px',
                    position: 'relative',
                }}>
                    <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}>
                        {(
                        <>
                            <div style={{ fontSize: '10px' }}>
                            <strong>Pitch Range:</strong> {data.pitch_range}
                            </div>
                            <div style={{ fontSize: '10px' }}>
                            <strong>Number of Pitches Used:</strong> {data.n_pitches_used}
                            </div>
                            <div style={{ fontSize: '10px' }}>
                            <strong>Polyphony:</strong> {data.polyphony}
                            </div>
                            <div style={{ fontSize: '10px' }}>
                            <strong>Empty Beat Rate:</strong> {data.empty_beat_rate}
                            </div>
                            <div style={{ fontSize: '10px' }}>
                            <strong>Drum Pattern Consistency:</strong> {data.drum_pattern_consistency}
                            </div>
                        </>
                        )}
                    </div>
                </div>
            </div>
        </div>
      );
};

export default MusicInfoDisplay;