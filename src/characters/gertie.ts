import { Character } from "./character";
import { Resources, SpriteSheetLoader } from "../resources";

// Actors are the main unit of composition you'll likely use, anything that you want to draw and move around the screen
// is likely built with an actor

// They contain a bunch of useful components that you might use
// actor.transform
// actor.motion
// actor.graphics
// actor.body
// actor.collider
// actor.actions
// actor.pointer


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
