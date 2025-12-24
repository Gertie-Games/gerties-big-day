
import { LevelBase } from "./base";
import { Resources } from "../resources";

export class Hazel extends LevelBase {
    backgroundImage = Resources.Scenes.Hazel;
    sceneTransitions = {
        'left':'longs',
        'right':'argo'
    }

        actorMap = {
        brooklyn:{
            "character":"brooklyn",
            "height":151.055,
            "coords":[272.473,850.75]
        },
        
        gertie:{
            "character":"gertie",
            "height":241.413,
            "coords":[1301.77,895.929]
        }
    }
    
    textMap = {
        textbox:{
            "text":`It's Brooklyn! 
         He must have taken himself for a walk down to his friend Hazel's house 
        `,
            "height":235.0,
            "width":699.077,
            "maxWidth":699.077,
            "coords":[1200.63,178.0]
        }
    }

}