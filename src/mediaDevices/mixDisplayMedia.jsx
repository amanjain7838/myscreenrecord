import aquireUserMedia from './userMedia';
import aquireUserDisplayMedia from './userDisplayMedia';
import React, { useEffect, createRef } from 'react'
import Canvas from '../components/canvas'



const mixDisplayMedia=async(constraints)=>{
    const userMediaStream=createRef();
    const userDisplayMedia=createRef();
    const videoRef = createRef()
    const canvasRef = createRef(null);

    try{
        console.log(constraints)
        userMediaStream.current=await aquireUserMedia({video:true,audio:true});
        userDisplayMedia.current=await aquireUserDisplayMedia({video:true,audio:false});
        let canvasElem = document.createElement("canvas");
        var ctx = canvasElem.getContext('2d');
        ctx.drawImage(userMediaStream.current, 0, 0);

        return canvasElem.captureStream(90);
    }
    catch(err){
        console.log(err)
        return err;
    }
}
export default mixDisplayMedia;