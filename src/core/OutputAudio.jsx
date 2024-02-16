import React from 'react';
const OutputAudio = ({outputBlob}) => {
    
    return (
        <div style={{display: 'flex', height: '200px', width:'200px', verticalAlign: "middle", padding: "10px"}}>
            <audio controls src={outputBlob} autoPlay></audio>
        </div>
    )
};

export default OutputAudio;
