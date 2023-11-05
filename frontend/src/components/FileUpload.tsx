import React from 'react';

interface FileUploadProps {
  onFileSelect: (file: File) => void;
}
function FileUpload({ onFileSelect }: FileUploadProps) {
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files && event.target.files[0];
    if (selectedFile) {
      onFileSelect(selectedFile);
    }
  };


  return (
    <input
      type="file"
      accept=".mid"
      onChange={handleFileChange}
    />
  );
}

export default FileUpload;
