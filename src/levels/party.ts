import { LevelBase } from "./base";
import { Resources } from "../resources";

export class Party extends LevelBase {
    backgroundImage = Resources.Scenes.Party;
    actorMap = {
        meg_balloon:{
            "character":"meg_balloon",
            "height":341.333,
            "coords":[218.385,345.466]
        },
        
        me:{
            "character":"me",
            "height":171.903,
            "coords":[446.279,515.255]
        },
        
        balloons3:{
            "character":"balloons3",
            "height":123.928,
            "coords":[481.024,563.668]
        },
        
        syd:{
            "character":"syd",
            "height":140.104,
            "coords":[399.613,522.914]
        },
        
        laney:{
            "character":"laney",
            "height":63.8909,
            "coords":[367.985,562.447]
        },
        
        marnie:{
            "character":"marnie",
            "height":63.8909,
            "coords":[318.834,555.728]
        },
        
        picnic_table:{
            "character":"picnic_table",
            "height":145.93,
            "coords":[548.451,688.674]
        },
        
        cake:{
            "character":"cake",
            "height":72.8849,
            "coords":[548.999,612.558]
        },
        
        mom:{
            "character":"mom",
            "height":157.355,
            "coords":[978.503,604.26]
        },
        
        dad:{
            "character":"dad",
            "height":178.365,
            "coords":[1064.32,598.679]
        },
        
        meg:{
            "character":"meg",
            "height":167.784,
            "coords":[125.029,568.414]
        },
        
        tommy:{
            "character":"tommy",
            "height":191.0,
            "coords":[193.926,552.43]
        },
        
        gus:{
            "character":"gus",
            "height":98.9503,
            "coords":[172.692,600.702]
        },
        
        balloons2:{
            "character":"balloons2",
            "height":122.183,
            "coords":[674.38,582.175]
        },
        
        beth:{
            "character":"beth",
            "height":182.632,
            "coords":[750.879,663.939]
        },
        
        ray:{
            "character":"ray",
            "height":211.095,
            "coords":[802.598,637.257]
        },
        
        gertie:{
            "character":"gertie",
            "height":112.027,
            "coords":[1070.0,654.841]
        },
        
        meg_string_segment:{
            "character":"meg_string_segment",
            "height":72.7483,
            "coords":[218.385,543.877]
        },
        
        balloons4:{
            "character":"balloons4",
            "height":130.91,
            "coords":[419.749,584.36]
        },
        
        balloons1:{
            "character":"balloons1",
            "height":136.147,
            "coords":[619.772,603.294]
        }
    }
    
    textMap = {
        textbox:{
            "text":`We made it and everyone is here! 
         Happy Birthday Gertie! 
        `,
            "height":235.0,
            "width":559.896,
            "maxWidth":559.896,
            "coords":[1289.82,140.773]
        }
    }
}