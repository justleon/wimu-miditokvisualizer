import ClipLoader from 'react-spinners/ClipLoader';

function Spinner() {
  return (
    <div style={{ width: '10px', margin: 'auto', display: 'block' }}>
      <ClipLoader color="#52bfd9" size={10}/>
    </div>
  );
};

export default Spinner;