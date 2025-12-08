import { Actor, Collider, Animation, CollisionContact, Engine, Side, vec } from "excalibur";
import * as ex from "excalibur";

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

// export type CharacterArgs = ex.ActorArgs & {
//     voiceLines: Record<string, ex.Sound> | null = null,
//     spriteSheetLoader: (() => ex.SpriteSheet) | null = null,
//     spriteSheet: ex.SpriteSheet | null = null,
//     animations: Record<string, ex.Animation> | null = null,
//     animationIndices: Record<string, [Array<number>, number]> | null = null,
// }

type AnimData = {
    indices: Array<number>,
    rate: number,
    strategy: string
}

export class Character extends Actor {
    voiceLines: Record<string, ex.Sound> | null = null;
    spriteSheetLoader: (() => ex.SpriteSheet) | null = null;
    spriteSheet: ex.SpriteSheet | null = null;
    animations: Record<string, ex.Animation> | null = null;
    animationIndices: Record<string, AnimData> | null = null;

    setPosition(x: number, y: number) {
        this.pos = vec(x, y);
    }

    loadVoiceLines() {
        
    }

    setAnimation(name: string): boolean {
        if (this.animations !== null) {
            let anim = this.animations[name];
            if (anim !== undefined) {
                this.graphics.use(anim)
                if (this.width !== undefined) {
                    anim.scale = ex.vec(this.width / anim.width, this.height / anim.height)
                }
                return true;
            } else {
                console.log('no animation', name);
                return false;
            }
        } else {
            console.log('animations uninitialized');
            return false;
        }
    }

    resolveAnimationStrategy(straName: string): ex.AnimationStrategy {
        return ex.AnimationStrategy.PingPong
    }

    loadAnimationsByIndices(): Record<string, ex.Animation> {
        let anims: Record<string, ex.Animation> = {};
        if (this.spriteSheet !== null && this.animationIndices !== null) {
            for (const animName in this.animationIndices) {
                let animData = this.animationIndices[animName];
                console.log("loading", animName, "from", animData)
                anims[animName] = Animation.fromSpriteSheet(
                    this.spriteSheet,
                    animData.indices,
                    animData.rate,
                    this.resolveAnimationStrategy(animData.strategy)
                )
            }
        }
        return anims;
    }

    loadAnimations(): Record<string, ex.Animation> {
        return this.loadAnimationsByIndices();
    }

    loadGraphics() {
        if (this.spriteSheet === null && this.spriteSheetLoader !== null) {
            this.spriteSheet = this.spriteSheetLoader()
        }
    }

    loadActions() {
        // Actions are useful for scripting common behavior, for example patrolling enemies
        // this.actions.delay(2000);
        // this.actions.repeatForever(ctx => {
        //   ctx.moveBy({offset: vec(100, 0), duration: 1000});
        //   ctx.moveBy({offset: vec(0, 100), duration: 1000});
        //   ctx.moveBy({offset: vec(-100, 0), duration: 1000});
        //   ctx.moveBy({offset: vec(0, -100), duration: 1000});
        // });
    }

    playVoiceLine(name: string): boolean {
        if (this.voiceLines !== null) {
            console.log(this.voiceLines);
            let defaultVoiceLine = this.voiceLines[name];
            if (defaultVoiceLine !== undefined) {
                defaultVoiceLine.play()
                return true;
            } else {
                console.log('no voice line', name);
                return false
            }
        } else {
            console.log('voice lines uninitialized');
            return false;
        }
    }

    defaultClickedAction() {
        this.playVoiceLine('default');
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

    setDefaultGraphic() {
        if (!this.setAnimation('default')) {
            let sprite = this.spriteSheet?.getSprite(0, 0);
            if (sprite !== undefined) {
                this.graphics.use(sprite);
                if (this.width !== undefined) {
                    sprite.scale = ex.vec(this.width / sprite.width, this.height / sprite.height)
                }
            } else {
                console.log("no default sprite available");
            }
        }
    }

    override onInitialize() {
        // Generally recommended to stick logic in the "On initialize"
        // This runs before the first update
        // Useful when
        // 1. You need things to be loaded like Images for graphics
        // 2. You need excalibur to be initialized & started 
        // 3. Deferring logic to run time instead of constructor time
        // 4. Lazy instantiation

        this.loadGraphics();
        this.animations = this.loadAnimations();
        this.setDefaultGraphic();
        this.loadActions();
        this.loadVoiceLines();
        this.setInteractions();

    }

    override onPreUpdate(engine: Engine, elapsedMs: number): void {
        // Put any update logic here runs every frame before Actor builtins
    }

    override onPostUpdate(engine: Engine, elapsedMs: number): void {
        // Put any update logic here runs every frame after Actor builtins
    }

    override onPreCollisionResolve(self: Collider, other: Collider, side: Side, contact: CollisionContact): void {
        // Called before a collision is resolved, if you want to opt out of this specific collision call contact.cancel()
    }

    override onPostCollisionResolve(self: Collider, other: Collider, side: Side, contact: CollisionContact): void {
        // Called every time a collision is resolved and overlap is solved
    }

    override onCollisionStart(self: Collider, other: Collider, side: Side, contact: CollisionContact): void {
        // Called when a pair of objects are in contact
    }

    override onCollisionEnd(self: Collider, other: Collider, side: Side, lastContact: CollisionContact): void {
        // Called when a pair of objects separates
    }
}
