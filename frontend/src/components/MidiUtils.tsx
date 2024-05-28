import { Midi, Track } from '@tonejs/midi';
import { NoteData } from 'react-piano-roll';

export const convertToPianoRollFormat = (selectedFile: File, callback: (data: NoteData[][]) => void) => {
    const reader = new FileReader();
    const allTracksData: NoteData[][] = [];

    reader.onload = (e) => {
        const arrayBuffer = e.target?.result as ArrayBuffer;
        const midi = new Midi(arrayBuffer);

        midi.tracks.forEach((track: Track) => {
            const trackData: NoteData[] = [];

            track.notes.forEach((note: any) => {
                const time = note.time;
                const duration = note.duration;
                
                const bars = Math.floor(time / 4);
                const quarters = Math.floor((time % 4) / 1);
                const sixteenths = Math.floor(((time % 4) % 1) * 16 / 4);

                const timeString: string = `${bars}:${quarters}:${sixteenths}`;

                let durationString: string;
                if (duration >= 4 / 3) {
                    durationString = '3n'; // Half note triplet 
                } else if (duration >= 1) {
                    durationString = `${Math.round(duration)}n`; // Whole note or longer
                } else if (duration >= 2 / 3) {
                    durationString = '6n'; // Quarter note triplet
                } else if (duration >= 0.5) {
                    durationString = '2n'; // Half note
                } else if (duration >= 1 / 3) {
                    durationString = '12n'; // Eighth note triplet
                } else if (duration >= 0.25) {
                    durationString = '4n';
                } else if (duration >= 0.125) {
                    durationString = '8n'; // Eighth note
                } else {
                    durationString = '16n'; // Sixteenth note
                }
                
                trackData.push([timeString, note.name, durationString]);
                console.log(`Note: ${note.name}, Time: ${note.time}, Duration: ${note.duration}, Velocity: ${note.velocity}`);
                console.log(`   ${timeString} - ${note.name} - ${durationString}`);
            });

            allTracksData.push(trackData);
        });

        callback(allTracksData);
    };

    reader.readAsArrayBuffer(selectedFile);
};