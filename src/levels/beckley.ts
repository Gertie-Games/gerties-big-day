
import { LevelBase } from "./base";
import { Resources } from "../resources";

export class Beckley extends LevelBase {
    backgroundImage = Resources.Scenes.Beckley;
    sceneTransitions = {
        'left':'beck_corner',
        'right':'party'
    }

    actorMap = {
        balloons1:{
            "character":"balloons1",
            "height":63.4589,
            "coords":[1472.05,410.184]
        },
        
        balloons2:{
            "character":"balloons2",
            "height":78.7566,
            "coords":[1502.87,403.27]
        },
        
        balloons4:{
            "character":"balloons4",
            "height":66.0448,
            "coords":[1536.68,410.184]
        },
        
        balloons3:{
            "character":"balloons3",
            "height":79.323,
            "coords":[1560.4,402.987]
        }
    }
    
    textMap = {
        textbox:{
            "text":`There are definitely balloons there! Let's go!`,
            "height":122.2,
            "width":559.896,
            "maxWidth":559.896,
            "coords":[368.224,122.94],

        }
    }

}