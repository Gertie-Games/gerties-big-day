import { LevelBase } from "./base";
import { Gertie } from "../characters/gertie";
import { TextLine } from "../text_line";
import { Resources } from "../resources";
import * as ex from "excalibur";

export class Home extends LevelBase {
    backgroundImage = Resources.Scenes.House;
    sceneTransitions = {
        'right':'corner1'
    }

    getActors() {
        const gertie = new Gertie({
            height:200,
            width:200,
            pos:ex.vec(630, 710)
        });
        
        const dadText = new TextLine({
            text: new ex.Text({
                text: Resources.Text.DadAndDogs.data,
                color: ex.Color.Black,
                font: new ex.Font({ size: 30 })
            }),
            pos: ex.vec(900, 250),
            color: ex.Color.White,
            width:400,
            height:100
        })

        return [gertie, dadText]
    }


}