<<<<<<< HEAD
import React, { useEffect, useState } from 'react';

const App = () => {
  const [stream, setStream] = useState(null);
  const [recorder, setRecorder] = useState(null);
  const [audioChunks, setAudioChunks] = useState([]);
  const [micDevices, setMicDevices] = useState([]);
  const [recording, setRecording] = useState(false);

  useEffect(() => {
    const enumerateDevices = async () => {
      try {
        const devices = await navigator.mediaDevices.enumerateDevices();
        const mics = devices.filter(device => device.kind === 'audioinput');
        setMicDevices(mics);
      } catch (error) {
        console.error('Error enumerating devices:', error);
      }
    };

    enumerateDevices();
  }, []);

  const handleMicChange = async event => {
    try {
      const constraints = { audio: { deviceId: { exact: event.target.value } } };
      const newStream = await navigator.mediaDevices.getUserMedia(constraints);
      setStream(newStream);
    } catch (error) {
      console.error('Error selecting microphone:', error);
    }
  };

  const startRecording = () => {
    if (stream) {
      const newRecorder = new MediaRecorder(stream);
      newRecorder.addEventListener('dataavailable', event => {
        setAudioChunks(prevChunks => [...prevChunks, event.data]);
      });
      newRecorder.start();
      setRecorder(newRecorder);
      setRecording(true);
    }
  };

  const stopRecording = () => {
    if (recorder) {
      recorder.stop();
      setRecording(false);
    }
  };

  const saveRecording = () => {
    const audioBlob = new Blob(audioChunks, { type: 'audio/wav' });
    const audioUrl = URL.createObjectURL(audioBlob);
    const link = document.createElement('a');
    link.href = audioUrl;
    link.download = 'output.wav';
    document.body.appendChild(link);
    link.click();
    URL.revokeObjectURL(audioUrl);
    setAudioChunks([]);
  };

  return (
    <div className="app">
      <select name="" id="micSelect" onChange={handleMicChange}>
        {micDevices.map(device => (
          <option key={device.deviceId} value={device.deviceId}>
            {device.label || `Microphone ${micDevices.indexOf(device) + 1}`}
          </option>
        ))}
      </select>
=======
import { BrowserRouter, Route, Routes } from "react-router-dom"
import DashboardPage from "./pages/DashboardPage"
import LoginPage from "./pages/LoginPage"


function App() {

  return (
   <>
   <BrowserRouter>
   <Routes>
      <Route path="/" element={<LoginPage/>}/>
      <Route path="/dashboard" element={<DashboardPage/>}/>
    </Routes>
   </BrowserRouter>
   </>
  )
}
>>>>>>> 62bdf8ad0562bc20f04fc4990e9ef40940a627aa

      <button onClick={startRecording} disabled={recording}>
        Grabar
      </button>
      <button onClick={stopRecording} disabled={!recording}>
        Detener
      </button>
      <button onClick={saveRecording} disabled={audioChunks.length === 0}>
        Guardar
      </button>

      <div id="msg" style={{ visibility: recording ? 'visible' : 'hidden' }}>
        Grabando...
      </div>

      <audio id="audio" controls src={audioChunks.length > 0 ? URL.createObjectURL(new Blob(audioChunks)) : ''}></audio>
    </div>
  );
};

export default App;
