import React, { useContext } from 'react';
import SettingContext from '../../context/settingContext';
import RecordingContext from '../../context/recordingContext';
import RecordPanel from './recordPanel';
import Preview from '../result/preview';
import { Link } from 'react-router-dom';

const RecordSetup = props =>{
    const settingContext=useContext(SettingContext);
    const recordingContext=useContext(RecordingContext);
    const changeRecordLayoutRef=(recordtype)=>{
        settingContext.setAppSettings({...settingContext.appSettings,'recordLayoutRef':recordtype})
    }
    if(settingContext.appSettings.recordingStatus)
        return <RecordPanel/>;
    else if(recordingContext.recordingList !=='')
        return <Preview/>
    else
    return (
        <div>
            <div className="container  text-center text-muted">
                <div className="row">
                    <div className="col ">
                        <div className="logo">
                            <h4 className="pull-left">Record {settingContext.appSettings.recordLayoutRef}</h4>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col screencam-selector">
                        <div onClick={()=>changeRecordLayoutRef('Camera')} className={`btn ${settingContext.appSettings.recordLayoutRef === 'Camera' ? 'active' : ''}`}>
                            <img alt="record camera" width="60" src="images/user.png"/><span  className="mt-4">Camera</span>
                        </div>
                        <div onClick={()=>changeRecordLayoutRef('Screen')} className={`btn ${settingContext.appSettings.recordLayoutRef === 'Screen' ? 'active' : ''}`}>
                            <img alt="record screen" width="60" src="images/icon-screenonly.png"/><span className="mt-4">Screen</span>
                        </div>
                    </div>
                </div>
                <div className="row justify-content-center  mt-4">
                    <div className="col-md-2">
                        <button onClick={methodDoesNotExist}>adasdasd</button>
                        <Link to="/" className="btn btn-outline-info btn-block">Cancel</Link>
                    </div>
                    <div className="col-md-2">
                        <button className="btn btn-info btn-block" onClick={()=>settingContext.setAppSettings({...settingContext.appSettings,'recordingStatus':1})}>Start Recording</button>
                    </div>
                </div>
            </div>
        </div>
    );
}
export default RecordSetup;