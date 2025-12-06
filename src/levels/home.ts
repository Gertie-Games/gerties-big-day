import { LevelBase } from "./base";
import { Gertie } from "../characters/gertie";
import { TextLine } from "../text_line";
import { Resources } from "../resources";
import * as ex from "excalibur";

export class Home extends LevelBase {
    getActors() {
        const gertie = new Gertie();
        gertie.setPosition(250, 500);
        
        const dadText = new TextLine(
            {
                text:Resources.Text.DadAndDogs.data,
                color: ex.Color.White,
                font: new ex.Font({ size: 30 })
            }
            // Resources.VoiceLines.NoSidewalk
        )

        dadText.setPosition(250, 400);

        return [gertie, dadText]
    }
    
    getBackgroundImage() {
        return Resources.Scenes.House.toSprite();
    }

}