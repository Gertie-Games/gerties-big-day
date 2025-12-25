
import { LevelBase } from "./base";
import { Resources } from "../resources";

export class Argo extends LevelBase {
    backgroundImage = Resources.Scenes.Argo;
    sceneTransitions = {
        'left':'hazel',
        'right':'ottowa'
    }

    actorMap = {
        balloons1:{
            "character":"balloons1",
            "height":50.0255,
            "coords":[9.47687,471.668]
        },
        
        gertie:{
            "character":"gertie",
            "height":150.834,
            "coords":[232.205,912.956]
        }
    }
    
    textMap = {

    textbox:{
            "text":`There's a fork in the road! 
 
I think I see some balloons out 
to the left, though!`,
            "height":282.0,
            "width":731.733,
            "maxWidth":731.733,
            "coords":[1208.58,167.812],
            "backgroundColor":"#FFFFFF",
            "opacity":0.90588
        }
    }
}