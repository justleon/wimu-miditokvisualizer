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
            <div style={{ fontSize: '16px', marginBottom: '5px' }}>
                <strong>Resolution: {data.resolution}</strong>
            </div>
            <div style={{ display: 'flex'}}>
                <div style={{ display: 'flex', marginRight: '10px' }}>
                    <div style={{
                        display: 'inline-block',
                        width: '200px',
                        height: '100px',
                        border: '1px solid #ccc',
                        margin: '5px',
                        position: 'relative',
                        backgroundColor: '#4e4e4e'
                    }}
                    >
                    <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}>
                        {(
                        <>
                            <div style={{ fontSize: '10px' }}>
                                <strong>Tempos:</strong>
                                {data.tempos.map(( item ) => {
                                    return (<>
                                        <div><strong>Time:</strong> {item[0]} <strong>Value:</strong> {item[1].toFixed(0)}</div>
                                    </>)
                                })}
                            </div>
                        </>
                        )}
                    </div>
                </div>
            </div>
            <div style={{ display: 'flex', marginRight: '10px' }}>
                <div style={{
                        display: 'inline-block',
                        width: '200px',
                        height: '100px',
                        border: '1px solid #ccc',
                        margin: '5px',
                        position: 'relative',
                        backgroundColor: '#4e4e4e'
                    }}
                    >
                    <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}>
                    {(
                    <>
                        <div style={{ fontSize: '10px' }}>
                        <strong>Key Signatures:</strong>
                            {data.key_signatures.map(( item ) => {
                            return (<>
                                <div><strong>Time:</strong> {item[0]} <strong>Root:</strong> {item[1]} <strong>Mode:</strong> {item[2]}</div>
                            </>)
                        })}
                        </div>
                    </>
                    )}
                    </div>
                </div>
            </div>
            <div style={{ display: 'flex', marginRight: '10px' }}>
                <div style={{
                        display: 'inline-block',
                        width: '200px',
                        height: '100px',
                        border: '1px solid #ccc',
                        margin: '5px',
                        position: 'relative',
                        backgroundColor: '#4e4e4e'
                    }}
                    >
                    <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}>
                    {(
                    <>
                        <div style={{ fontSize: '10px' }}>
                        <strong>Time Signatures:</strong>
                            {data.time_signatures.map(( item ) => {
                            return (<>
                                <div><strong>Time:</strong> {item[0]} <strong>Signature:</strong> {item[1]}/{item[2]}</div>
                            </>)
                        })}
                        </div>
                    </>
                    )}
                    </div>
                </div>
            </div>
            <div style={{
                display: 'inline-block',
                width: '200px',
                height: '100px',
                border: '1px solid #ccc',
                margin: '5px',
                position: 'relative',
                backgroundColor: '#4e4e4e'
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
                            <strong>Polyphony:</strong> {data.polyphony.toPrecision(3)}
                        </div>
                        <div style={{ fontSize: '10px' }}>
                            <strong>Empty Beat Rate:</strong> {data.empty_beat_rate.toPrecision(3)}
                        </div>
                        <div style={{ fontSize: '10px' }}>
                            <strong>Drum Pattern Consistency:</strong> {data.drum_pattern_consistency.toPrecision(3)}
                        </div>
                    </>
                    )}
                </div>
            </div>
        </div>
    </div>);
};

export default MusicInfoDisplay;