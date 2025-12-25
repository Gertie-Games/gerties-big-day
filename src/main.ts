import { Color, DisplayMode, Engine, FadeInOut } from "excalibur";
import { loader } from "./resources";
import { SceneList } from "./levels/scene_list";

// Goal is to keep main.ts small and just enough to configure the engine

const game = new Engine({
  width: 1583, // Logical width and height in game pixels
  height: 1024,
  displayMode: DisplayMode.FitScreen, // Display mode tells excalibur how to fill the window
  // pixelArt: true, // pixelArt will turn on the correct settings to render pixel art without jaggies or shimmering artifacts
  scenes: SceneList
  // physics: {
  //   solver: SolverStrategy.Realistic,
  //   substep: 5 // Sub step the physics simulation for more robust simulations
  // },
  // fixedUpdateTimestep: 16 // Turn on fixed update timestep when consistent physic simulation is important
});

const searchParams = new URLSearchParams(window.location.search);
const startScreenCheck = searchParams.get("start")
let startScreen = 'launch'
if (startScreenCheck !== null && startScreen.length > 0) {
  startScreen = startScreenCheck
}


const validScreens = ["launch", "home", "corner", "kramer", "chand", "longs", "hazel", "argo", "ottowa", "beck_corner", "beckley", "party", "wakeup"] as const
const trueStart = validScreens.find((trueScreen) => trueScreen === startScreen);
if (trueStart) {
  game.start(trueStart, { // name of the start scene 'start'
    loader, // Optional loader (but needed for loading images/sounds)
    inTransition: new FadeInOut({ // Optional in transition
      duration: 1000,
      direction: 'in',
      color: Color.Black
    })
  }).then(() => {
  });
} else {
  game.start('launch', { // name of the start scene 'start'
    loader, // Optional loader (but needed for loading images/sounds)
    inTransition: new FadeInOut({ // Optional in transition
      duration: 1000,
      direction: 'in',
      color: Color.Black
    })
  }).then(() => {
  });
}