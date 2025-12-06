import { ImageSource, Sound, Loader, Resource } from "excalibur";

export const Resources = {
  Characters: {
    Gertie: new ImageSource("./images/characters/gertie.png")
  },
  Scenes: {
    House: new ImageSource("./images/scenes/711.png")
  },
  VoiceLines: {
    NoSidewalk: new Sound("./sounds/voice_lines/no_sidewalk.m4a")
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
