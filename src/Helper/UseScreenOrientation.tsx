import {Dimensions} from "react-native";

export const useScreenOrientation = () =>{

    const ScreenWidth: number = Dimensions.get("screen").width;
    const ScreenHeight: number = Dimensions.get("screen").height;

    const isPortrait:boolean = ScreenHeight > ScreenWidth;

    return isPortrait;
}

export const useCalculateLatAndLngDelta = () =>{
    let latDelta:number = 0; 
    let lngDelta:number = 0;
    Dimensions.addEventListener("change",()=>{
        let ScreenWidth:number = Dimensions.get("screen").width;
        let ScreenHeight:number = Dimensions.get("screen").height;
        let ASPECT_RATIO:number = ScreenWidth/ScreenHeight;
         latDelta = 0.01; 
         lngDelta = ASPECT_RATIO * latDelta;
    })
    return {latDelta,lngDelta} as {latDelta:number,lngDelta:number};
}