const aquireUserDisplayMedia=async(constraints)=>{
    try{
        let mediaStream=await navigator.mediaDevices.getDisplayMedia(constraints);
        return mediaStream;
    }
    catch(err){
        console.log(err);
        return {'code':0,'message':err};
    }
}
export default aquireUserDisplayMedia;