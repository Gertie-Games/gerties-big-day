
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
            "height":205.125,
            "coords":[1289.68,914.073]
        }
    }
    
    textMap = {
        textbox:{
            "text":`It's Brooklyn! 

He must have taken himself for a 
walk down to his friend Hazel's house`,
            "height":235.0,
            "width":811.75,
            "maxWidth":811.75,
            "coords":[1144.29,178.0],
            "backgroundColor":"#FFFFFF",
            "opacity":0.85098
        }
    }

}