import React from 'react'
import { BeatLoader } from 'react-spinners'
function Loader() {
  return (
    <div>
      <BeatLoader style={{display:"flex",
        justifyContent:"center",
        alignItems:"center",
        height:"50vh"
      }} />
    </div>
  );
}

export default Loader
