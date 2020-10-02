import React, { useContext } from 'react';
import RecordingContext from '../../context/recordingContext';
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
    return (
        <React.Fragment>
            <video src={recordingContext.recordingList}></video>
            <button onClick={()=>download(recordingContext.recordingList)}>Download</button>
        </React.Fragment>
    );
}
export default Preview;