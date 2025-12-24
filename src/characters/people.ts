import { Character } from "./character";
import { Resources } from "../resources";

export class Dad extends Character {
    name = "Dad";
    staticSprite = Resources.Characters.Dad;
    voiceLines = {"default":Resources.VoiceLines.ImDad};
}

export class Mom extends Character {
    name = "Mom";
    staticSprite = Resources.Characters.Mom;
}

export class Tommy extends Character {
    name = "Tommy";
    staticSprite = Resources.Characters.Tommy;
}

export class Megloon extends Character {
    name = "Megloon";
    staticSprite = Resources.Characters.Megloon;
}

export class Syd extends Character {
    name = "Syd";
    staticSprite = Resources.Characters.Syd;
}

export class Meg extends Character {
    name = "Meg";
    staticSprite = Resources.Characters.Meg;
}

export class Beth extends Character {
    name = "Beth";
    staticSprite = Resources.Characters.Beth;
}

export class Ray extends Character {
    name = "Ray";
    staticSprite = Resources.Characters.Ray;
}

export class Me extends Character {
    name = "Me";
    staticSprite = Resources.Characters.Me;
}