import { SpriteSheet, ImageSource, Sound, Loader, Resource } from "excalibur";

export const Resources = {
  // Declarative maps defined in other locations, keep these in sync when in use
  Characters: {
    Gertie: new ImageSource("./images/characters/gertie.png"),
    Dad: new ImageSource("./images/characters/dad_new.png"),
    Mom: new ImageSource("./images/characters/mom_samp.png"),
    Megloon: new ImageSource("./images/characters/meg_balloon_more_string.png"),
    MegStringSegment: new ImageSource("./images/characters/meg_string_seg.png"),
    Tommy: new ImageSource("./images/characters/tommy_2.png"),
    GertieSheet: new ImageSource("./images/characters/gertie_sheet_small.png"),
    GertieSheetBig: new ImageSource("./images/characters/gertie_sheet.png"),
    Marnie: new ImageSource("./images/characters/marnie_cartoon.png"),
    Laney: new ImageSource("./images/characters/laney.png"),
    Gus: new ImageSource("./images/characters/gus_cartoon.png"),
    Ralph: new ImageSource("./images/characters/ralph.png"),
    Brooklyn: new ImageSource("./images/characters/brookyln_cutout.png"),
    Spike: new ImageSource("./images/characters/spike.png"),
    Bush: new ImageSource("./images/characters/bush.png"),
    Egg: new ImageSource("./images/characters/egg_rot.png"),
    Mushroom: new ImageSource("./images/characters/mushroom.png"),
    SciencePair: new ImageSource("./images/characters/science_pair.png"),
    ScienceLady: new ImageSource("./images/characters/science_lady.png"),
    MathLady: new ImageSource("./images/characters/math_lady.png"),
    ClipboardLady: new ImageSource("./images/characters/clipboard_lady.png"),
    NotebookLady: new ImageSource("./images/characters/notebook_lady.png"),
    LongBush: new ImageSource("./images/characters/long_bush.png"),
    LongTree: new ImageSource("./images/characters/long_tree.png"),
    Skunk: new ImageSource("./images/characters/skunk.png"),
    Balloons1: new ImageSource("./images/characters/balloons1.png"),
    Balloons2: new ImageSource("./images/characters/balloons2.png"),
    Balloons3: new ImageSource("./images/characters/balloons3.png"),
    Balloons4: new ImageSource("./images/characters/balloons4.png"),
    Meg: new ImageSource("./images/characters/meg.png"),
    Beth: new ImageSource("./images/characters/beth_opt.png"),
    Ray: new ImageSource("./images/characters/ray_samp.png"),
    Syd: new ImageSource("./images/characters/syd_opt.png"),
    Me: new ImageSource("./images/characters/me_opt.png"),
    Cake: new ImageSource("./images/characters/cake.png"),
    PicnicTable: new ImageSource("./images/characters/picnic_table.png")
  },
  Scenes: {
    Title: new ImageSource("./images/scenes/title.png"),
    House: new ImageSource("./images/scenes/home.png"),
    Corner: new ImageSource("./images/scenes/corner1.png"),
    Chand: new ImageSource("./images/scenes/corner2.png"),
    Kramer: new ImageSource("./images/scenes/kramer.png"),
    Longs: new ImageSource("./images/scenes/longs.png"),
    Hazel: new ImageSource("./images/scenes/hazel.png"),
    Argo: new ImageSource("./images/scenes/argo.png"),
    Ottowa: new ImageSource("./images/scenes/ottowa.png"),
    BeckCorner: new ImageSource("./images/scenes/beck_corner.png"),
    Beckley: new ImageSource("./images/scenes/beckley.png"),
    Party: new ImageSource("./images/scenes/party.png")
  },
  Music: {
    Nancy: new Sound("./sounds/music/nancy.mp3")
  },
  VoiceLines: {
    NoSidewalk: new Sound("./sounds/voice_lines/no_sidewalk.mp3"),
    ImDad: new Sound("./sounds/voice_lines/im_dad.mp3"),
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