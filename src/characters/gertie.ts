import { Character } from "./character";
import { Resources, SpriteSheetLoader } from "../resources";

export class Gertie extends Character {
    name = "Gertie";
    spriteSheetLoader = SpriteSheetLoader.Gertie;
    voiceLines = {
        "default": Resources.VoiceLines.NoSidewalk
    }
    animationIndices = {
        "default": {
            "indices":[0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
            "rate":50,
            "strategy":"reverse"
        }
    }
}
