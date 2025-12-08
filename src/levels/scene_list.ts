
import { Corner } from "./corner"
import { Home } from "./home"
import * as ex from "excalibur"
import { Launch } from "./launch"

export const SceneList = {
    launch: {
      scene:Launch,
      transitions: {
        in: new ex.FadeInOut({duration: 500, direction: 'in', color: ex.Color.Black}),
        out: new ex.FadeInOut({duration: 500, direction: 'out', color: ex.Color.Black})
      }
    },
    home: {
      scene:Home,
      transitions: {
        in: new ex.FadeInOut({duration: 500, direction: 'in', color: ex.Color.Black}),
        out: new ex.FadeInOut({duration: 500, direction: 'out', color: ex.Color.Black})
      }
    },
    corner1: {
      scene:Corner,
      transitions: {
        in: new ex.FadeInOut({duration: 500, direction: 'in', color: ex.Color.Black}),
        out: new ex.FadeInOut({duration: 500, direction: 'out', color: ex.Color.Black})
      }
    }
} as const