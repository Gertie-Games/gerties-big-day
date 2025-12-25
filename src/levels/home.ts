import { LevelBase } from "./base";
// import { Gertie } from "../characters/gertie";
// import { TextLine } from "../text_line";
import { Resources } from "../resources";
// import * as ex from "excalibur";

export class Home extends LevelBase {
    backgroundImage = Resources.Scenes.House;
    sceneTransitions = {
        'right':'corner'
    }

    actorMap = {
        gus:{
            "character":"gus",
            "height":137.613,
            "coords":[1280.31,888.66]
        },
        
        dad:{
            "character":"dad",
            "height":248.059,
            "coords":[1353.89,839.426]
        },
        
        marnie:{
            "character":"marnie",
            "height":92.9735,
            "coords":[1124.28,912.069]
        },
        
        laney:{
            "character":"laney",
            "height":92.9735,
            "coords":[1205.92,938.079]
        },
        
        ralph:{
            "character":"ralph",
            "height":159.992,
            "coords":[1415.01,911.282]
        },
        
        gertie:{
            "character":"gertie",
            "height":127.157,
            "coords":[662.216,765.905]
        }
    }
    
    textMap = {
        textbox:{
            "text":`It's Grandpa and the dogs! 
 
 "Gertie, I can't remember how many leashes I need, can you help me count the dogs?"`,
            "height":291.4,
            "width":758.026,
            "maxWidth":758.026,
            "coords":[1185.61,200.801],
            "backgroundColor":"#FFFFFF",
            "opacity":0.90196
        }
    }

}