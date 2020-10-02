import React, { useContext, useRef, useState } from 'react';
import SettingContext from '../../context/settingContext';
import RecordingContext from '../../context/recordingContext';
import RecordPanel from './recordPanel';
import Preview from '../result/preview';

const RecordSetup = props =>{
    const settingContext=useContext(SettingContext);
    const recordingContext=useContext(RecordingContext);
    const recordLayoutRef=useRef();
    const changeRecordLayoutRef=()=>{
        settingContext.setAppSettings({...settingContext.appSettings,'recordLayoutRef':recordLayoutRef.current.value})
    }
    if(settingContext.appSettings.recordingStatus)
        return <RecordPanel/>;
    else
    return (
        <div>
            <select ref={recordLayoutRef} onChange={()=>changeRecordLayoutRef()} defaultValue={settingContext.appSettings.recordLayoutRef}>
                {/* <option value="duo">Camera+Screen</option> */}
                <option value="camera">Camera</option>
                <option value="screen">Screen</option>
            </select>
            <button className="btn btn-light" onClick={()=>settingContext.setAppSettings({...settingContext.appSettings,'recordingStatus':1})}>Start Recording</button>
            {recordingContext.recordingList !=='' && <Preview/>}
        </div>
    );
}
export default RecordSetup;