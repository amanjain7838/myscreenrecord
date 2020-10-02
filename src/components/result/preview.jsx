import React, { useContext, useEffect, useRef } from 'react';
import RecordingContext from '../../context/recordingContext';
import videojs from 'video.js';

const download=(url)=>{
    console.log(url)
    var a = document.createElement("a");
    a.style = "display: none";
    document.body.appendChild(a);
    a.href = url;
    a.download = "test.mp4";
    a.click();
    // window.URL.revokeObjectURL(url);
}

const Preview = props =>{
    const recordingContext=useContext(RecordingContext);
    let videoRef = useRef();
    useEffect(()=>{
        let playerconfig={
            autoplay: true,
            width:500,
            height:500,
            controls: true,
            sources: [{
                src: recordingContext.recordingList,
                type: 'video/mp4'
            }]
        };
        videojs(videoRef, playerconfig);
    },[recordingContext.recordingList]);

    return (
        <React.Fragment>
            <div data-vjs-player>
                <video ref={node => videoRef = node} className="video-js"></video>
            </div>
            <button onClick={()=>download(recordingContext.recordingList)}>Download</button>
        </React.Fragment>
    );
}
export default Preview;