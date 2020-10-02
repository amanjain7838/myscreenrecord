import React, { useContext, useRef, useState, useEffect } from 'react';
import SettingContext from '../../context/settingContext';
import RecordingContext from '../../context/recordingContext';
import aquireUserMedia from '../../mediaDevices/userMedia';
import aquireUserDisplayMedia from '../../mediaDevices/userDisplayMedia';
import aquireMixDisplayMedia from '../../mediaDevices/mixDisplayMedia';



const RecordPanel = props =>{
    const settingContext=useContext(SettingContext);
    const recordingContext=useContext(RecordingContext);
    const videoRef = useRef();
    const mediaRecorder=useRef({});
    const finalMediaStream=useRef(null);
    
    const startRecording=async()=>{
        const recordLayoutRef=settingContext.appSettings.recordLayoutRef;
        let userScreenMediaStream;
        switch(recordLayoutRef){
            case 'camera':
                userScreenMediaStream=await aquireUserMedia({video:true,audio:true});
                break;
            case 'duo':
                userScreenMediaStream=await aquireMixDisplayMedia({video:true,audio:true});
                break;
            default:
                userScreenMediaStream=await aquireUserDisplayMedia({video:true,audio:true});
        }

        let finalRecordStream=userScreenMediaStream;
        finalMediaStream.current=videoRef.current.srcObject=finalRecordStream;
        let options = {mimeType: 'video/mp4;codecs=vp8,opus'};
        if (!MediaRecorder.isTypeSupported(options.mimeType)) {
            options = {mimeType: 'video/mp4;codecs=vp8,opus'};
            if (!MediaRecorder.isTypeSupported(options.mimeType)) {
              options = {mimeType: 'video/mp4'};
              if (!MediaRecorder.isTypeSupported(options.mimeType)) {
                options = {mimeType: ''};
              }
            }
        }
        const tmediaRecorder = new MediaRecorder(finalRecordStream, options);
        mediaRecorder.current=tmediaRecorder;
        tmediaRecorder.start();
        finalRecordStream.getVideoTracks()[0].addEventListener('ended',stopRecording);
    }
    useEffect(()=>{
        startRecording();
    },[]);
    const handleCanPlay=()=>videoRef.current.play()
    const stopRecording=()=>{
        mediaRecorder.current.stop();
        finalMediaStream.current.getTracks().forEach(function(track) {track.stop()});
        settingContext.setAppSettings({...settingContext.appSettings,'recordingStatus':0});
        mediaRecorder.current.ondataavailable = handleDataAvailable;
    }
    const handleDataAvailable=(event)=>{
        let recordedChunks=[];
        if (event.data.size > 0) {
          recordedChunks.push(event.data);
          prepareblob(recordedChunks)
        } else {
         console.log("recording chunks empty")   
        }
    }
    const prepareblob=(recordedChunks)=>{
        var blob = new Blob(recordedChunks, {
            type: "video/mp4"
        });
        var url = URL.createObjectURL(blob);
        recordingContext.setRecordingList(url);
        // download(url);
    }
    return (
        <div className="preview">
            <video ref={videoRef} onCanPlay={handleCanPlay} autoPlay playsInline muted />
            {settingContext.appSettings.recordingStatus === 1 && <button onClick={()=>stopRecording()}>Stop Recording</button>}
        </div>

    );
}
export default RecordPanel;