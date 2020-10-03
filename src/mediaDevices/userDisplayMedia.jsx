const aquireUserDisplayMedia=async(constraints)=>{
    try{
        let mediaStream=await navigator.mediaDevices.getDisplayMedia(constraints);
        if(mediaStream.getAudioTracks().length<1){
            let audioStream=await navigator.mediaDevices.getUserMedia({video:false,audio:{echoCancellation:!0,noiseSuppression:!0}});
            mediaStream.addTrack(audioStream.getAudioTracks()[0]);
        }
        return mediaStream;
    }
    catch(err){
        console.log(err);
        return {'code':0,'message':err};
    }
}
export default aquireUserDisplayMedia;