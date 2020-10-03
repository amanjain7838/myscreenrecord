import React, { useState } from 'react';
// import 'bootstrap/dist/css/bootstrap.min.css';
import Home from './components/home';
import { Route,Switch,BrowserRouter } from 'react-router-dom';
import RecordSetup from './components/record/recordSetup';
import SettingContext from './context/settingContext';
import RecordingContext from './context/recordingContext';
import 'video.js/dist/video-js.css';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';
import './App.css';

function App() {
  const [appSettings, setAppSettings]=useState({recordingStatus:0,recordLayoutRef:'Screen'});
  const [recordingList, setRecordingList]=useState('');
  const appSetting={appSettings, setAppSettings};
  const showtoast=(options)=>{
    let alert;
    switch(options.type){
      case 'error':
        alert=toast.error;
        break;
      case 'info':
        alert=toast.info;
        break;
      case 'success':
        alert=toast.success;
        break;
      case 'warn':
        alert=toast.warn;
        break;
      default:
        alert=toast;
        break;
    }
      alert(options.message,options.option)
  }
  const recordingAction={recordingList, setRecordingList,showtoast};
  return (
    <SettingContext.Provider value={appSetting}>
      <RecordingContext.Provider value={recordingAction}>
          <BrowserRouter>
            <Switch>
              <Route path="/record" component={RecordSetup} />
              <Route path="/" component={Home} />
            </Switch>
          </BrowserRouter>
          <ToastContainer />
      </RecordingContext.Provider>
    </SettingContext.Provider>
  );
}

export default App;
