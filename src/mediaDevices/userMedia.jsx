const aquireUserMedia=async(constraints)=>{
    try{
        let mediaStream=await navigator.mediaDevices.getUserMedia(constraints);
        return mediaStream;
    }
    catch(err){
        console.log(err);
        return err;
    }
}

export default aquireUserMedia;