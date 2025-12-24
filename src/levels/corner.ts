
import { LevelBase } from "./base";
import { Resources } from "../resources";

export class Corner extends LevelBase {
    backgroundImage = Resources.Scenes.Corner;
    sceneTransitions = {
        'left':'home',
        'right':'kramer'
    }

    actorMap = {
        spike:{
            "character":"spike",
            "height":92.4102,
            "coords":[138.101,849.727]
        },
        
        gertie:{
            "character":"gertie",
            "height":204.963,
            "coords":[268.103,813.593]
        }
    }
    
    textMap = {
        textbox:{
            "text":`It's Spike the cat! Let's pet Spike 
        `,
            "height":122.2,
            "width":419.762,
            "maxWidth":419.762,
            "coords":[1214.74,269.049]
        }
    }

}