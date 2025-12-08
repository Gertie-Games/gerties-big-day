import { SpriteSheet, ImageSource, Sound, Loader, Resource } from "excalibur";

export const Resources = {
  Characters: {
    Gertie: new ImageSource("./images/characters/gertie.png"),
    GertieSheet: new ImageSource("./images/characters/gertie_sheet_small.png"),
    GertieSheetBig: new ImageSource("./images/characters/gertie_sheet.png")
  },
  Scenes: {
    Title: new ImageSource("./images/scenes/title.png"),
    House: new ImageSource("./images/scenes/711.png"),
    Corner: new ImageSource("./images/scenes/corner1.png"),
  },
  Music: {
    Nancy: new Sound("./sounds/music/nancy.mp3")
  },
  VoiceLines: {
    NoSidewalk: new Sound("./sounds/voice_lines/no_sidewalk.mp3")
  },
  Text: {
    DadAndDogs: new Resource<string>('./text/dad_and_dogs.txt', 'text')
  },
} as const; // the 'as const' is a neat typescript trick to get strong typing on your resources. 
// So when you type Resources.Sword -> ImageSource

// We build a loader and add all of our resources to the boot loader
// You can build your own loader by extending DefaultLoader
export const loader = new Loader();
for (const resList of Object.values(Resources)) {
  for (const res of Object.values(resList)) {
    loader.addResource(res);
  }
}

export const SpriteSheetLoader: Record<string, () => SpriteSheet> = {
  Gertie: () => SpriteSheet.fromImageSource({
    image: Resources.Characters.GertieSheet,
    grid: {
      rows: 1,
      columns: 10,
      spriteWidth: 120,
      spriteHeight: 120,
    }
  }),
  GertieBig: () => SpriteSheet.fromImageSource({
    image: Resources.Characters.GertieSheetBig,
    grid: {
      rows: 1,
      columns: 10,
      spriteWidth: 990,
      spriteHeight: 990,
    }
  })
}