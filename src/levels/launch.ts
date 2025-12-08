
import { LevelBase } from "./base";
import { Resources } from "../resources";

export class Launch extends LevelBase {
    music = Resources.Music.Nancy;
    backgroundImage = Resources.Scenes.Title;

    sceneTransitions = {
        'right':'home'
    }
}