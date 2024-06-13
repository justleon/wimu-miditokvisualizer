import React, { useEffect, useState } from 'react'
// @ts-ignore
import MidiPlayer from 'react-midi-player';


interface PlaybackProps {
    file: File;
}

const FilePlayback: React.FC<PlaybackProps> = ({ file }) => {
    const [content, setContent] = useState<ArrayBuffer | null>(null);
    useEffect(() => {
        file.arrayBuffer().then(setContent);
    }, [file])
    return (content ? <MidiPlayer data={content} /> : null)
};

export default FilePlayback;
