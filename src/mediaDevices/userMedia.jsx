const aquireUserMedia=async(constraints)=>{
    try{
        let mediaStream=await navigator.mediaDevices.getUserMedia(constraints);
        return mediaStream;
    }
    catch(err){
        console.log(err);
        return {'code':0,'message':err};
    }
}

export default aquireUserMedia;