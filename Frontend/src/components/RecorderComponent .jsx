import React from 'react';

const RecorderComponent = () => {
  return (
    <div className="app text-center pt-20">
      <select name="" id="micSelect"></select>
      <select id="visSelect">
        <option value="frequencybars">Bar</option>
        <option value="sinewave">Wave</option>
        <option value="circle">Circle</option>
      </select>
      <a id="download" download="output.wav">Download</a>
      <div className="audio-controls">
        <button id="record">Record</button>
        <button id="stop">Stop</button>
        <audio id="audio" controls></audio>
      </div>
      <div id="msg" className="text-red-600 font-bold text-lg">Recording...</div>
      <canvas className="mt-10 bg-black" width="500" height="300"></canvas>
    </div>
  );
};

export default RecorderComponent;
