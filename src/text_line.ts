import { Actor, vec, Text, Sound } from "excalibur";
import { Resources } from "./resources";
import * as ex from "excalibur"

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

export type TextLineOptions = ex.ActorArgs & {
    text: Text
    voiceLine?: Sound,
    padding?: number[],
    backgroundColor?: ex.Color,
}

export class TextLine extends Actor {
    text: Text;
    voiceLine?: Sound;
    padding?: number[];
    constructor(textOpts: TextLineOptions) {
        super({
            name: 'Text',
            pos: vec(0, 0),
            ...textOpts
        });
        this.padding = textOpts.padding??[15, 15];
        this.text = textOpts.text;
        this.graphics.use(
            new ex.GraphicsGroup({
                members: [
                    {
                        graphic: new ex.Rectangle({
                            height: this.height,
                            width: this.width,
                            color: this.color,
                            opacity: textOpts.opacity
                        }), 
                        offset: ex.vec(0, 0)
                    },
                    { graphic: this.text, offset: ex.vec(this.padding[0], this.padding[1]) }
                ]
            })
        )
        // this.graphics.onPreDraw = (ctx) => {
        //     ctx.save(); // Save current state
        //     // console.log(ctx);
        //     // ctx.fillStyle = this.color; // Set fill color (e.g., Yellow)
        //     // ctx.fillRect(0, 0, ctx.canvasWidth, ctx.canvasHeight); // Fill actor's bounds
        //     ctx.restore(); // Restore state
        // }
        this.voiceLine = textOpts.voiceLine;
    }

  setPosition(x:number, y:number) {
    this.pos = vec(x, y);
  }

  defaultClickedAction() {
    if (typeof this.voiceLine !== "undefined") {
        this.voiceLine.play()
    }
  }

  setInteractions() {
    // Sometimes you want to click on an actor!
    this.on('pointerdown', evt => {
      // Pointer events tunnel in z order from the screen down, you can cancel them!
      // if (true) {
      //   evt.cancel();
      // }
      this.defaultClickedAction();
    });
  }

  override onInitialize() {
    // Generally recommended to stick logic in the "On initialize"
    // This runs before the first update
    // Useful when
    // 1. You need things to be loaded like Images for graphics
    // 2. You need excalibur to be initialized & started 
    // 3. Deferring logic to run time instead of constructor time
    // 4. Lazy instantiation

    this.setInteractions();
  }

}

export const TextList:Record<string, ex.Resource<string>> = {
  "dad_and_dogs": Resources.Text.DadAndDogs
}