import React, { useContext, useEffect, useRef } from 'react';
import RecordingContext from '../../context/recordingContext';
import videojs from 'video.js';

const download=(url)=>{
    console.log(url)
    var a = document.createElement("a");
    a.style = "display: none";
    document.body.appendChild(a);
    a.href = url;
    a.download = "myscreenrecording.mp4";
    a.click();
    // window.URL.revokeObjectURL(url);
}

const Preview = props =>{
    const recordingContext=useContext(RecordingContext);
    let videoRef = useRef();
    useEffect(()=>{
        let playerconfig={
            fluid: true,
            controls: true,
            sources: [{
                src: recordingContext.recordingList,
                type: 'video/mp4'
            }]
        };
        videojs(videoRef, playerconfig);
    },[recordingContext.recordingList]);

    return (
        <div className="container  text-center text-muted">
            <div className="row">
                <div className="col">
                    <div className="logo">
                        <h4>Download Video</h4>
                    </div>
                </div>
            </div>
            <div className="row justify-content-center">
                <div className="col-md-5">
                    <div data-vjs-player>
                        <video ref={node => videoRef = node} className="video-js"></video>
                    </div>
                </div>
            </div>
            <div className="row justify-content-center mt-5">
                <div className="col-md-2">
                    <button className="btn btn-outline-info btn-block" onClick={()=>recordingContext.setRecordingList('')}>Cancel</button>
                </div>
                <div className="col-md-2">
                    <button className="btn btn-info btn-block" onClick={()=>download(recordingContext.recordingList)}>Download</button>
                </div>
            </div>
        </div>
    );
}
export default Preview;