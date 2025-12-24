
import { LevelBase } from "./base";
import { Resources } from "../resources";

export class BeckCorner extends LevelBase {
    backgroundImage = Resources.Scenes.BeckCorner;
    sceneTransitions = {
        'left':'ottowa',
        'right':'beckley'
    }

    actorMap = {
        mom:{
            "character":"mom",
            "height":218.839,
            "coords":[621.329,450.616]
        },
        
        gus:{
            "character":"gus",
            "height":137.613,
            "coords":[566.904,486.399]
        },
        
        dad:{
            "character":"dad",
            "height":248.059,
            "coords":[705.524,440.931]
        },
        
        marnie:{
            "character":"marnie",
            "height":92.9735,
            "coords":[357.741,509.219]
        },
        
        laney:{
            "character":"laney",
            "height":92.9735,
            "coords":[379.938,578.284]
        },
        
        ralph:{
            "character":"ralph",
            "height":159.992,
            "coords":[768.269,509.521]
        }
    }
    
    textMap = {
        textbox:{
            "text":`It's Grandma and Grandpa with the dogs! I guess they're done studying the mushroom 
        `,
            "height":235.0,
            "width":559.896,
            "maxWidth":559.896,
            "coords":[1259.01,254.775]
        }
    }

}