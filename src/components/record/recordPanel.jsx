import React, { useContext, useRef, useEffect } from 'react';
import SettingContext from '../../context/settingContext';
import RecordingContext from '../../context/recordingContext';
import aquireUserMedia from '../../mediaDevices/userMedia';
import aquireUserDisplayMedia from '../../mediaDevices/userDisplayMedia';
import aquireMixDisplayMedia from '../../mediaDevices/mixDisplayMedia';
import videojs from 'video.js';


const RecordPanel = props =>{
    const settingContext=useContext(SettingContext);
    const recordingContext=useContext(RecordingContext);
    let videoRef,videoPlayerRef;
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
        if(userScreenMediaStream.code==0){
            settingContext.setAppSettings({...settingContext.appSettings,'recordingStatus':0});
            recordingContext.showtoast({'type':'error','message':String(userScreenMediaStream.message),'option':{
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
            }});
            return false;
        }
        let finalRecordStream=userScreenMediaStream;
        finalMediaStream.current=finalRecordStream;
        let playerconfig={
            autoplay: true,
            controls: false,
            muted:true,
            width:250,
            height:250,
            liveui:true,
            liveTracker:false
        };
        videoPlayerRef=videojs(videoRef, playerconfig);
        videoRef.srcObject=finalRecordStream;
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
    const handleCanPlay=()=>videoPlayerRef.play()
    const stopRecording=()=>{
        mediaRecorder.current.stop();
        finalMediaStream.current.getTracks().forEach(function(track) {track.stop()});
        settingContext.setAppSettings({...settingContext.appSettings,'recordingStatus':0});
        mediaRecorder.current.ondataavailable = handleDataAvailable;
        videoPlayerRef.dispose();
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
            <div data-vjs-player>
                <video ref={node => videoRef = node} onCanPlay={handleCanPlay} className="video-js" />
            </div>
            {settingContext.appSettings.recordingStatus === 1 && <button onClick={()=>stopRecording()}>Stop Recording</button>}
        </div>

    );
}
export default RecordPanel;