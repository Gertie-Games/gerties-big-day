import { LevelBase } from "./base";

export class WakeUp extends LevelBase {
    sceneTransitions = {
        'right':'home'
    }

    actorMap = {
        
    }
    
    textMap = {
        textbox:{
            "text":`Gertie, wake up! 
 
 You've gotta head down to Beckley 
 Park for your big day!`,
            "height":282.0,
            "width":791.273,
            "maxWidth":791.273,
            "coords":[1118.72,311.138],

        }
    }

}