
import { LevelBase } from "./base";
import { Resources } from "../resources";

export class Hazel extends LevelBase {
    backgroundImage = Resources.Scenes.Hazel;
    sceneTransitions = {
        'left':'longs',
        'right':'argo'
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
            "text":`There's a fork in the road! I think I see some balloons out to the left, though!`,
            "height":178.6,
            "width":681.775,
            "maxWidth":681.775,
            "coords":[1233.56,116.112],
            "backgroundColor":"#FFFFFF"
        }
    }

}