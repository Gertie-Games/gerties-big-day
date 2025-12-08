
import { LevelBase } from "./base";
import { Resources } from "../resources";

export class Corner extends LevelBase {
    backgroundImage = Resources.Scenes.Corner;
    sceneTransitions = {
        'left':'home'
    }

    getActors() {
        return []
    }

}