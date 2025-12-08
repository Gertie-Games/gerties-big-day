import { 
    Color, Actor, ActorArgs, Vector, vec, 
    DefaultLoader, Engine, ExcaliburGraphicsContext, 
    Scene, SceneActivationContext,
    Sound,
    ImageSource
 } from "excalibur";

type SceneTransitionArgs = ActorArgs & {
    scene: string
}
class SceneTransitionActor extends Actor {
    sceneName: string
    constructor(opts:SceneTransitionArgs) {
        super(opts);
        this.sceneName = opts.scene
    }

    override onInitialize(engine: Engine): void {
        this.on('pointerdown', evt => {
            engine.goToScene(this.sceneName)
        });
    }

    static fromDir(dir:string, scene:string): SceneTransitionActor {
        let pos = vec(1500, 512);
        if (dir == "left") {
            pos = vec(0, 512)
        }
        return new SceneTransitionActor({
            scene:scene,
            pos:pos,
            width:50,
            height:100,
            color:Color.White
        })
    }
}

export class LevelBase extends Scene {
    music?: Sound;
    backgroundImage?: ImageSource;
    background?: Actor;

    override onInitialize(engine: Engine): void {
        // Scene.onInitialize is where we recommend you perform the composition for your game
        this.backgroundColor = Color.Black;
        this.background = this.getBackground();
        this.add(this.background); // Actors need to be added to a scene to be drawn
        for (const actor of this.getActors()) {
            this.add(actor); // Actors need to be added to a scene to be drawn
        }
        this.loadTransitions();
        this.loadMusic();
    }

    loadMusic() {
        if (this.music !== undefined) {
            this.music.loop = true;
            this.music.play();
        }
    }

    sceneTransitions: Record<string, string> = {};
    loadTransitions() {
        for (const dir in this.sceneTransitions) {
            let next = this.sceneTransitions[dir];
            if (next !== undefined) {
                this.add(SceneTransitionActor.fromDir(dir, next))
            }
        }
    }

    getActors(): Array<Actor> {
        return []
    }

    getBackgroundImage() {
        if (this.backgroundImage !== undefined) {
            return this.backgroundImage.toSprite();
        } else {
            return undefined;
        }
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
        if (this.backgroundImage !== undefined) {
            const background = this.getBackgroundImage();
            if (background !== undefined) {
                // let scale_x = this.engine.screen.width / background.width;
                // let scale_y = this.engine.screen.height / background.height;
                // if (scale_x < scale_y) {
                // background.destSize.width = this.engine.screen.resolution.width;
                // background.destSize.height = background.height * scale_x;
                // } else {
                //     background.destSize.width = background.width * scale_y;
                //     background.destSize.height = this.engine.screen.resolution.height;
                // }
                actor.graphics.add(background);
            }
        }

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
        this.music?.stop()
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