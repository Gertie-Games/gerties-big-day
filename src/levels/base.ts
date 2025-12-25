import { 
    Color, Actor, ActorArgs, Vector, vec, 
    DefaultLoader, Engine, ExcaliburGraphicsContext, 
    Scene, SceneActivationContext,
    Sound, TextOptions, Font, Text,
    ImageSource,
    Sprite, Keys
 } from "excalibur";
 import * as ex from "excalibur"

import { CharacterList } from "../characters/character_list";
import { TextLine, TextLineOptions, TextList } from "../text_line";

type ActorData = ActorArgs & {
    character: string,
    coords: number[]
}

type TextData = ActorArgs & TextOptions & {
    coords: number[],
    color?: Color|string,
    backgroundColor?: Color|string,
    padding?: number[]
}

type SceneTransitionArgs = ActorArgs & {
    scene: string,
    bindings?: Keys[],
    dir?: string
}
class SceneTransitionActor extends Actor {
    sceneName: string
    keyBindings: Keys[] | undefined
    dragDir?: string
    engine?: Engine
    _dragEv: ex.PointerEvent | null
    _eventMap: Record<string, (ev: ex.PointerEvent)=>null >
    constructor(opts:SceneTransitionArgs) {
        let {
            scene: scene, bindings:bindings, dir:dir,
            ...subopts 
        } = opts;
        if (subopts.width === undefined) {
            subopts.width = 50
        }
        if (subopts.height === undefined) {
            subopts.height = 100
        }
        if (subopts.name === undefined) {
            if (scene !== undefined) {
                if (dir !== undefined) {
                    subopts.name = scene + "-" + dir
                } else {
                    subopts.name = scene
                }
            }
        }
        super(subopts);
        this.sceneName = scene;
        this.keyBindings = bindings;
        this.dragDir = dir
        this.setGraphics(dir)
        this._dragEv = null
        this._eventMap = {}
    }

    setGraphics(dir?:string) {
        if (dir !== undefined) {
            if (dir === "right") {
                this.graphics.use(
                    new ex.Text({
                        text: "»",
                        color: Color.Gray,
                        font: new Font({ 
                            size: 108,
                            family: "Helvetica",
                            baseAlign: ex.BaseAlign.Middle,
                            textAlign: ex.TextAlign.End,
                            unit: ex.FontUnit.Px
                        }),
                    })
                )                
            } else if (dir === "left") {
                this.graphics.use(
                    new ex.Text({
                        text: "«",
                        color: Color.Gray,
                        font: new Font({ 
                            size: 108,
                            family: "Helvetica",
                            baseAlign: ex.BaseAlign.Middle,
                            textAlign: ex.TextAlign.Left,
                            unit: ex.FontUnit.Px
                        }),
                    })
                )

            }
        }
    }

    override onRemove(engine: Engine): void {
        let downEvent = this._eventMap["down"];
        if (downEvent !== undefined) {
            engine.input.pointers.at(0).off('down', downEvent);
        }
        let upEvent = this._eventMap["up"];
        if (upEvent !== undefined) {
            engine.input.pointers.at(0).off('up', upEvent);
        }
    }

    activate(engine: Engine) {
        if (this.dragDir !== undefined) {
            engine.input.pointers.at(0).on('down', this._dragStart());
            engine.input.pointers.at(0).on('up', this._dragEnd(engine));
        }
    }

    override onInitialize(engine: Engine): void {
        this.on('pointerdown', evt => {
            this.applyTransition(engine)
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
        
        if (this.dragDir !== undefined) {
            engine.input.pointers.at(0).on('down', this._dragStart());
            engine.input.pointers.at(0).on('up', this._dragEnd(engine));
        }
    }

    _dragStart() {
        const actor = this;
        return function (ev:ex.PointerEvent) {
            actor._dragEv = ev;
        }
    }

    _dragEnd(engine:Engine) {
        const actor = this;
        return function (ev:ex.PointerEvent) {
            let oldEv = actor._dragEv;
            actor._dragEv = null;
            if (actor.dragDir !== undefined) {
                let applyTransition = false
                const oldPos = oldEv?.screenPos
                if (oldPos !== undefined) {
                    const newPos = ev.screenPos;
                    const xDiff = newPos.x - oldPos.x;
                    const yDiff = Math.abs(newPos.y - oldPos.y);
                    const absX = Math.abs(xDiff)
                    if (absX > 20) { // allow for future dispatching
                        if (absX > yDiff / 2) {
                            if (xDiff < 0) {
                                applyTransition = actor.dragDir == "right"
                            } else {
                                applyTransition = actor.dragDir == "left"
                            }
                        }
                    }
                }
                if (applyTransition) {
                    actor.applyTransition(engine)
                }
            }
        }
    }

    applyTransition(engine:Engine) {
        let downEvent = this._eventMap["down"];
        if (downEvent !== undefined) {
            engine.input.pointers.at(0).off('down', downEvent);
        }
        let upEvent = this._eventMap["up"];
        if (upEvent !== undefined) {
            engine.input.pointers.at(0).off('up', upEvent);
        }
        engine.goToScene(this.sceneName)
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
                    this.applyTransition(engine)
                }

            }
        }
    }

    static fromDir(dir:string, scene:string): SceneTransitionActor {
        let pos = vec(1610, 512);
        let bindings = [Keys.Right];
        if (dir == "left") {
            pos = vec(25, 512)
            bindings = [Keys.Left];
        }
        return new SceneTransitionActor({
            scene:scene,
            pos:pos,
            bindings:bindings,
            dir:dir
        })
    }
}

export class LevelBase extends Scene {
    music?: Sound;
    backgroundImage?: ImageSource;
    background?: Actor
    transitionActors:Record<string, SceneTransitionActor>

    constructor() {
        super()
        this.transitionActors = {}
    }

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
        this.transitionActors = this.loadTransitions();
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
        let transitionActors:Record<string, SceneTransitionActor> = {}
        for (const dir in this.sceneTransitions) {
            let next = this.sceneTransitions[dir];
            if (next !== undefined) {
                transitionActors[dir] = SceneTransitionActor.fromDir(dir, next)
                this.add(transitionActors[dir])
            }
        }
        return transitionActors
    }
    activateTransitions(engine:Engine) {
        for (const dir in this.transitionActors) {
            let next = this.transitionActors[dir];
            next.activate(engine)
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
            font: new Font({ 
                size: 46,
                family: "Helvetica",
                baseAlign: ex.BaseAlign.Top,
                textAlign: ex.TextAlign.Start,
                unit: ex.FontUnit.Px
            }),
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
            let pad = textData.padding;
            if (pad === undefined) {
                pad = [15, 15]
                textData.padding = pad
            }
            mw = mw - pad[0];
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
        // let w = textData.width;
        // if (w !== undefined) {
        //     let pos = textOpts.pos;
        //     if (pos !== undefined) {
        //         textOpts = {
        //             pos:vec(pos.x+w/2, pos.y),
        //             ...textOpts
        //         }
        //     }
        // }
        // let h = textData.height;
        // if (h !== undefined) {
        //     let pos = textOpts.pos;
        //     if (pos !== undefined) {
        //         textOpts = {
        //             pos:vec(pos.x, pos.y+h/2),
        //             ...textOpts
        //         }
        //     }
        // }
        let {
            backgroundColor: bg, coords: _, text: _1, font: _2, maxWidth: _3, 
            ...subopts 
        } = textData;
        textOpts = {
            text:textOpts.text,
            pos:textOpts.pos,
            opacity:textData.opacity,
            ...subopts
        };
        textOpts.color = Color.White;
        if (bg !== undefined) {
            if (typeof bg === "string") {
                textOpts.color = Color.fromHex(bg)
            } else {
                textOpts.color = bg as Color
            }
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
        context.engine.input.pointers.at(0).events.clear()
        this.activateTransitions(context.engine)
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