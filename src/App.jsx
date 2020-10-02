import React, { useContext, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Home from './components/home';
import { Route,Switch,BrowserRouter } from 'react-router-dom';
import RecordSetup from './components/record/recordSetup';
import SettingContext from './context/settingContext';
import RecordingContext from './context/recordingContext';

function App() {
  const [appSettings, setAppSettings]=useState({recordingStatus:0,recordLayoutRef:'screen'});
  const [recordingList, setRecordingList]=useState('');
  const appSetting={appSettings, setAppSettings};
  const recordingAction={recordingList, setRecordingList};
  return (
    <SettingContext.Provider value={appSetting}>
      <RecordingContext.Provider value={recordingAction}>
        <BrowserRouter>
          <Switch>
            <Route path="/record" component={RecordSetup} />
            <Route path="/" component={Home} />
          </Switch>
        </BrowserRouter>
      </RecordingContext.Provider>
    </SettingContext.Provider>
  );
}

export default App;
