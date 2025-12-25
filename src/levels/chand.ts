
import { LevelBase } from "./base";
import { Resources } from "../resources";

export class Chand extends LevelBase {
    backgroundImage = Resources.Scenes.Chand;
    sceneTransitions = {
        'left':'kramer',
        'right':'longs'
    }

    actorMap = {
        math_lady:{
            "character":"math_lady",
            "height":298.528,
            "coords":[465.366,606.564]
        },
        
        science_lady:{
            "character":"science_lady",
            "height":326.466,
            "coords":[743.114,661.932]
        },
        
        science_pair:{
            "character":"science_pair",
            "height":347.8,
            "coords":[946.056,685.9]
        },
        
        mushroom:{
            "character":"mushroom",
            "height":68.0228,
            "coords":[861.566,797.227]
        },
        
        notebook_lady:{
            "character":"notebook_lady",
            "height":226.832,
            "coords":[190.17,625.317]
        },
        
        mom:{
            "character":"mom",
            "height":326.466,
            "coords":[556.884,820.953]
        },
        
        clipboard_lady:{
            "character":"clipboard_lady",
            "height":253.236,
            "coords":[257.44,634.183]
        },
        
        gertie:{
            "character":"gertie",
            "height":197.299,
            "coords":[393.617,903.541]
        }
    }
    
    textMap = {
        textbox:{
            "text":`It's Grandma! "I know that Beckley is just 
 down the road here Gertie, 
 but we've gotta study this cool 
 mushroom. Can you find 
 another way around?"`,
            "height":347.8,
            "width":660.575,
            "maxWidth":660.575,
            "coords":[1213.76,236.423],
            "backgroundColor":"#FFFFFF",
            "opacity":0.90588
        }
    }

}