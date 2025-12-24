
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
            "height":204.963,
            "coords":[923.006,778.118]
        },
        
        egg:{
            "character":"egg",
            "height":41.906,
            "coords":[418.116,760.462]
        },
        
        bush:{
            "character":"bush",
            "height":175.262,
            "coords":[321.534,844.883]
        }
    }
    
    textMap = {
        textbox:{
            "text":`It's the Kramer's House! 
         They lost an egg, can you help them find it? 
        `,
            "height":178.6,
            "width":660.575,
            "maxWidth":660.575,
            "coords":[1206.5,232.7]
        }
    }

}