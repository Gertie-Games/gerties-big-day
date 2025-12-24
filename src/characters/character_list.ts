import { Character } from "./character"
import { Gertie } from "./gertie"
import { Beth, Dad, Me, Meg, Megloon, Mom, Ray, Syd, Tommy } from "./people"
import { Brooklyn, Gus, Laney, Marnie, Ralph } from "./dogs"
import { 
    Balloons1, Balloons2, Balloons3, Balloons4,
    Bush, Cake, ClipboardLady, Egg, LongBush, LongTree, MathLady, 
    MegStringSegment, Mushroom, NotebookLady, PicnicTable, ScienceLady, SciencePair, 
    Skunk, Spike 
} from "./misc"

export const CharacterList:Record<string, typeof Character> = {
    gertie: Gertie,
    dad: Dad,
    mom: Mom,
    marnie: Marnie,
    laney: Laney,
    gus: Gus,
    brooklyn: Brooklyn,
    ralph: Ralph,
    spike: Spike,
    bush: Bush,
    egg: Egg,
    mushroom:Mushroom,
    science_lady:ScienceLady,
    science_pair:SciencePair,
    math_lady:MathLady,
    clipboard_lady:ClipboardLady,
    notebook_lady:NotebookLady,
    long_bush:LongBush,
    long_tree:LongTree,
    skunk:Skunk,
    balloons1:Balloons1,
    balloons2:Balloons2,
    balloons3:Balloons3,
    balloons4:Balloons4,
    tommy:Tommy,
    meg_balloon:Megloon,
    meg_string_segment:MegStringSegment,
    syd:Syd,
    beth:Beth,
    ray:Ray,
    meg:Meg,
    me:Me,
    cake:Cake,
    picnic_table:PicnicTable
} as const