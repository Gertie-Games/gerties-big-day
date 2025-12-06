import { Color, Actor, Text, Vector, DefaultLoader, Engine, ExcaliburGraphicsContext, Scene, SceneActivationContext } from "excalibur";
import { Resources } from "../resources"

export class LevelBase extends Scene {
    override onInitialize(engine: Engine): void {
        // Scene.onInitialize is where we recommend you perform the composition for your game
        this.backgroundColor = Color.Black;
        const background = this.getBackground();
        this.add(background); // Actors need to be added to a scene to be drawn
        for (const actor of this.getActors()) {
            this.add(actor); // Actors need to be added to a scene to be drawn
        }
    }

    getActors(): Array<Actor> {
        return []
    }

    getBackgroundImage() {
        return Resources.Scenes.House.toSprite();
    }

    getBackground(): Actor {
        const actor = new Actor({
            x: 0,
            y: 0,
            width: this.engine.screen.resolution.width,
            height: this.engine.screen.resolution.height
        });
        actor.z = -99;
        actor.graphics.anchor = Vector.Zero;
        const background = this.getBackgroundImage();
        background.destSize.width = this.engine.screen.resolution.width;
        background.destSize.height = this.engine.screen.resolution.height;
        actor.graphics.add(background);

        return actor
    }

    override onPreLoad(loader: DefaultLoader): void {
        // Add any scene specific resources to load
    }

    override onActivate(context: SceneActivationContext<unknown>): void {
        // Called when Excalibur transitions to this scene
        // Only 1 scene is active at a time
    }

    override onDeactivate(context: SceneActivationContext): void {
        // Called when Excalibur transitions away from this scene
        // Only 1 scene is active at a time
    }

    override onPreUpdate(engine: Engine, elapsedMs: number): void {
        // Called before anything updates in the scene
    }

    override onPostUpdate(engine: Engine, elapsedMs: number): void {
        // Called after everything updates in the scene
    }

    override onPreDraw(ctx: ExcaliburGraphicsContext, elapsedMs: number): void {
        // Called before Excalibur draws to the screen
    }

    override onPostDraw(ctx: ExcaliburGraphicsContext, elapsedMs: number): void {
        // Called after Excalibur draws to the screen
    }
}