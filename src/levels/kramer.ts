
import { LevelBase } from "./base";
import { Resources } from "../resources";

export class Kramer extends LevelBase {
    backgroundImage = Resources.Scenes.Kramer;
    sceneTransitions = {
        'left':'corner',
        'right':'chand'
    }

    actorMap = {
        gertie:{
            "character":"gertie",
            "height":175.262,
            "coords":[913.106,792.968]
        },
        
        egg:{
            "character":"egg",
            "height":41.906,
            "coords":[418.116,760.462]
        },
        
        bush:{
            "character":"bush",
            "height":175.262,
            "coords":[317.522,843.278]
        }
    }
    
    textMap = {
        textbox:{
            "text":`It's the Kramer's House! 
 
They lost an egg, can you help them find it?`,
            "height":282.0,
            "width":660.575,
            "maxWidth":660.575,
            "coords":[1206.5,224.663],
            "backgroundColor":"#FFFFFF",
            "opacity":0.90588
        }
    }

}