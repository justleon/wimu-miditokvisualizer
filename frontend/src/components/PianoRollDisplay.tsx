import React from 'react';
import PianoRoll, { NoteData } from 'react-piano-roll';
import { useEffect } from 'react';

interface PianoRollDisplayProps {
  data: NoteData[];
}

const PianoRollDisplay: React.FC<PianoRollDisplayProps> = ({ data }) => {
  // data = [
  //     ["0:0:0", "C0", "3n"],
  //     ["0:0:0", "C4", "2n"],
  //     ["0:0:0", "D4", "2n"],
  //     ["0:0:0", "E4", "2n"],
  //     ["0:2:0", "B4", "4n"],
  //     ["0:3:0", "A#4", "4n"],
  //     ["0:4:0", "C#6", "4n"],
  //     ["1:1:0", "A#6", "4n"],
  //     ["1:2:0", "G#6", "4n"],
  //     ["1:3:0", "A#6", "4n"],
  //     ["1:4:0", "A6", "4n"],
  //     ["2:1:0", "F5", "4n"],
  //     ["3:1:0", "F5", "4n"],
  //     ["4:1:0", "F5", "4n"],
  // ];

  // FOR DEBUGGING
  // useEffect(() => {
  //   console.log('NoteData:', data);
  //   data.forEach((note, index) => {
  //     console.log(`Note ${index + 1}: ${note[0]} - ${note[1]} - ${note[2]}`);
  //   });
  // }, [data]);
  // -------------

  return (
    <div style={{ width: '100%', height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <div style={{ overflowX: 'auto', width: '100%' }}>
        <PianoRoll
          width={800}
          height={800}
          pianoKeyWidth={125}
          activateKeys={true}
          zoom={4}
          resolution={16}
          gridLineColor={0x424242}
          blackGridBgColor={0x1e1e1e}
          whiteGridBgColor={0x282828}
          renderer={"WebGLRenderer"}
          noteFormat={"String"}
          noteData={data}
        />
      </div>
    </div>
  );
}

export default PianoRollDisplay;