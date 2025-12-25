
import { LevelBase } from "./base";
import { Resources } from "../resources";

export class Ottowa extends LevelBase {
    backgroundImage = Resources.Scenes.Ottowa;
    sceneTransitions = {
        'left':'argo',
        'right':'beck_corner'
    }

    actorMap = {
        meg_balloon:{
            "character":"meg_balloon",
            "height":447.959,
            "coords":[243.664,403.629]
        },
        
        tommy:{
            "character":"tommy",
            "height":239.191,
            "coords":[211.452,620.232]
        },
        
        meg_string_segment:{
            "character":"meg_string_segment",
            "height":95.4719,
            "coords":[243.664,608.606]
        },
        
        gertie:{
            "character":"gertie",
            "height":150.834,
            "coords":[1384.61,864.805]
        }
    }
    
    textMap = {
        textbox:{
            "text":`Aunt Marge is blowing up like a balloon! 
 
 Oh wait, that's just a balloon of Aunt 
 Marge and Uncle Tommy is carrying it 
 down to the park!`,
            "height":394.8,
            "width":844.867,
            "maxWidth":844.867,
            "coords":[1127.72,231.349],
            "backgroundColor":"#FFFFFF",
            "opacity":0.90196
        }
    }

}