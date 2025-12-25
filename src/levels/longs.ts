
import { LevelBase } from "./base";
import { Resources } from "../resources";

export class Longs extends LevelBase {
    backgroundImage = Resources.Scenes.Longs;
    sceneTransitions = {
        'left':'chand',
        'right':'hazel'
    }

    actorMap = {
        gertie:{
            "character":"gertie",
            "height":201.288,
            "coords":[386.922,872.656]
        },
        
        long_bush:{
            "character":"long_bush",
            "height":302.885,
            "coords":[686.207,548.905]
        },
        
        skunk:{
            "character":"skunk",
            "height":123.197,
            "coords":[1038.14,560.151]
        },
        
        long_tree:{
            "character":"long_tree",
            "height":771.201,
            "coords":[983.39,386.412]
        }
    }
    
    textMap = {
        textbox:{
            "text":`I think I see a skunk in the bushes! 
 
Let's watch out for that`,
            "height":225.6,
            "width":766.314,
            "maxWidth":766.314,
            "coords":[1158.91,188.761],
            "backgroundColor":"#FFFFFF",
            "opacity":0.84706
        }
    }

}