declare module 'react-piano-roll' {
    // Typedefs from the pixi-piano-roll library
    export type TransportTime = string;
    export type Note = string | number;
    export type NoteDuration = string | number;
    export type NoteData = [TransportTime, Note, NoteDuration];
    
    // Definition of playback API structure
    interface PlaybackAPI {
        toggle(time?: TransportTime): void;
        play(time?: TransportTime): void;
        pause(): void;
        seek(time: TransportTime): void;
    }

    // Definition of piano roll API structure
    interface PianoRollAPI {
        playback: PlaybackAPI;
        bpm: number;
        zoom: number;
        resolution: number;
        noteData: NoteData;
        playing: boolean;
        view: HTMLElement;
    }

    export interface PianoRollProps {
        width: number;
        height: number;
        zoom: number;
        resolution: number;
        gridLineColor: number;
        blackGridBgColor?: number;
        whiteGridBgColor?: number;
        noteData: NoteData[];
    }

    const PianoRoll: React.ComponentType<PianoRollProps>;
    export default PianoRoll;
}