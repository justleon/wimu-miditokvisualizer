import React from 'react';

interface FileUploadProps {
  onFileSelect: (file: File) => void;
  acceptedFormats: string;
}
const FileUpload: React.FC<FileUploadProps> = ({ onFileSelect, acceptedFormats }) => {
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files && event.target.files[0];
    if (selectedFile) {
      onFileSelect(selectedFile);
    }
  };


  return (
    <input
      type="file"
      accept={acceptedFormats}
      onChange={handleFileChange}
    />
  );
}

export default FileUpload;
