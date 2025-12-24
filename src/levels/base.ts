import { 
    Color, Actor, ActorArgs, Vector, vec, 
    DefaultLoader, Engine, ExcaliburGraphicsContext, 
    Scene, SceneActivationContext,
    Sound, TextOptions, Font, Text,
    ImageSource,
    Sprite, Keys
 } from "excalibur";

import { CharacterList } from "../characters/character_list";
import { TextLine, TextLineOptions, TextList } from "../text_line";

type ActorData = ActorArgs & {
    character: string,
    coords: number[]
}

type TextData = ActorArgs & TextOptions & {
    coords: number[],
    backgroundColor?: Color
}

type SceneTransitionArgs = ActorArgs & {
    scene: string,
    bindings?: Keys[]
}
class SceneTransitionActor extends Actor {
    sceneName: string
    keyBindings: Keys[] | undefined;
    constructor(opts:SceneTransitionArgs) {
        super(opts);
        this.sceneName = opts.scene;
        this.keyBindings = opts.bindings;
    }

    override onInitialize(engine: Engine): void {
        this.on('pointerdown', evt => {
            engine.goToScene(this.sceneName)
        });

        const canvas = engine.canvas
        if (canvas) {
            this.on('pointerenter', () => {
                canvas.style.cursor = 'pointer';
            });

            this.on('pointerleave', () => {
                canvas.style.cursor = 'default';
            });
        }
    }

    public update(engine:Engine, delta:number) {
        super.update(engine, delta)
        // if (
        //     engine.input.keyboard.isHeld(Keys.W) ||
        //     engine.input.keyboard.isHeld(Keys.Up)
        // ) {
        //     player._moveForward()
        // }
        if (this.keyBindings?.length) {
            for (const key of this.keyBindings) {
                if (engine.input.keyboard.wasPressed(key)) {
                    engine.goToScene(this.sceneName)
                }

            }
        }
    }

    static fromDir(dir:string, scene:string): SceneTransitionActor {
        let pos = vec(1583, 512);
        let bindings = [Keys.Right];
        if (dir == "left") {
            pos = vec(0, 512)
            bindings = [Keys.Left];
        }
        return new SceneTransitionActor({
            scene:scene,
            pos:pos,
            width:50,
            height:100,
            color:Color.White,
            bindings:bindings
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
        let bg = this.getBackground();
        if (bg !== null) {
            this.background = bg;
            this.add(this.background); // Actors need to be added to a scene to be drawn
        }
        let actors = this.getActors();
        for (const name in actors) {
            this.add(actors[name]); // Actors need to be added to a scene to be drawn
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

    _getHeightWidth(width:number|undefined, height:number|undefined, sprite:Sprite|undefined) {
        if (sprite !== undefined) {
            let wundefined = width === undefined;
            let hundefined = height === undefined;
            if (wundefined) {
                width = sprite.width;
                if (height !== undefined) {
                    width = height / sprite.height * width;
                }
            }
            if (hundefined) {
                height = sprite.height;
                if (!wundefined && width !== undefined) {
                    height = width / sprite.width * height;
                }
            }
        }
        return [width, height]
    }

    _createActor(actorData:ActorData): Actor {
        let actorType = CharacterList[actorData['character']];
        let pos = actorData['coords'];
        if (pos !== undefined) {
            actorData = {
                pos:vec(pos[0], pos[1]),
                ...actorData
            }
        }
        let width = actorData.width;
        let height = actorData.height;
        let actor = new actorType(actorData);
        if (width === undefined || height === undefined) {
            if (actor.staticSprite !== undefined && actor.staticSprite !== null) {
                let sprite = actor.staticSprite?.toSprite();
                [width, height] = this._getHeightWidth(width, height, sprite);
            } else if (actor.spriteSheet !== undefined && actor.spriteSheet !== null) {
                let sprite = actor.spriteSheet?.getSprite(0, 0);
                [width, height] = this._getHeightWidth(width, height, sprite);
            } else if (actor.spriteSheetLoader !== undefined && actor.spriteSheetLoader !== null) {
                let spriteSheet = actor.spriteSheetLoader();
                let sprite = spriteSheet?.getSprite(0, 0);
                [width, height] = this._getHeightWidth(width, height, sprite);
            }

            actorData.height = height;
            actorData.width = width;
            actor = new actorType(actorData);
        }

        return actor;
    }
    actorMap: Record<string, ActorData> = {};
    loadActors(): Record<string, Actor> {
        let actors: Record<string, Actor> = {}
        for (const name in this.actorMap) {
            let actorData = this.actorMap[name];
            if (actorData !== undefined && CharacterList[actorData.character] !== undefined) {
                actors[name] = this._createActor(actorData);
            }
        }

        return actors;
    }

    
    _createText(textData:TextData): TextLine {
        let text = textData['text'];
        let testText = TextList[text];
        if (testText !== undefined) {
            text = testText.data;
        }
        let textArgs:TextOptions = {
            text: text,
            color: Color.Black,
            font: new Font({ size: 36 }),
        }
        let val = textData.color;
        if (val !== undefined) {
            textArgs.color = val;
        }
        let mw = textData.maxWidth;
        if (mw === undefined) {
            let w = textData.width;
            if (w !== undefined) {
                mw = w
            }
        }
        if (mw !== undefined) {
            textArgs.maxWidth = mw;
        }
        let textOpts:TextLineOptions = {
            text: new Text(textArgs)
        }
        let pos = textData['coords'];
        if (pos !== undefined) {
            textOpts = {
                pos:vec(pos[0], pos[1]),
                ...textOpts
            }
        }
        let {
            backgroundColor: bg, coords: _, text: _1, font: _2, maxWidth: _3, 
            ...subopts 
        } = textData;
        textOpts = {
            text:textOpts.text,
            pos:textOpts.pos,
            ...subopts
        };
        textOpts.color = Color.White;
        if (bg !== undefined) {
            textOpts.color = bg
        }
        return new TextLine(textOpts)
    }
    textMap: Record<string, TextData> = {};
    loadText(): Record<string, Actor> {
        let actors: Record<string, Actor> = {}
        for (const name in this.textMap) {
            let textData = this.textMap[name];
            if (textData !== undefined) {
                actors[name] = this._createText(textData);
            }
        }

        return actors;
    }
    // actorMap: Record<string, ActorData> = {};
    // loadActors(): Record<string, Actor> {
    //     let actors: Record<string, Actor> = {}
    //     for (const name in this.actorMap) {
    //         let actorData = this.actorMap[name];
    //         if (actorData !== undefined) {
    //             actors[name] = this._createActor(actorData);
    //         }
    //     }

    //     return actors;
    // }

    getActors(): Record<string, Actor> {
        let texts = this.loadText();
        let actors = this.loadActors();
        return {
            ...actors,
            ...texts
        }
    }

    getBackgroundImage() {
        if (this.backgroundImage !== undefined) {
            return this.backgroundImage.toSprite();
        } else {
            return undefined;
        }
    }

    getBackground(): Actor|null {
        if (this.backgroundImage !== undefined) {
            const actor = new Actor({
                x: 0,
                y: 0,
                width: this.engine.screen.resolution.width,
                height: this.engine.screen.resolution.height
            });
            actor.z = -99;
            actor.graphics.anchor = Vector.Zero;
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
            return actor
        } else {
            return null
        }

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