
import * as ex from "excalibur"
import { Launch } from "./launch"
import { Home } from "./home"
import { Corner } from "./corner"
import { Kramer } from "./kramer"
import { Chand } from "./chand"
import { Longs } from "./longs"
import { Hazel } from "./hazel"
import { Argo } from "./argo"
import { Ottowa } from "./ottowa"
import { BeckCorner } from "./beck_corner"
import { Beckley } from "./beckley"
import { Party } from "./party"
import { WakeUp } from "./wakeup"

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
    corner: {
      scene:Corner,
      transitions: {
        in: new ex.FadeInOut({duration: 500, direction: 'in', color: ex.Color.Black}),
        out: new ex.FadeInOut({duration: 500, direction: 'out', color: ex.Color.Black})
      }
    },
    kramer: {
      scene:Kramer,
      transitions: {
        in: new ex.FadeInOut({duration: 500, direction: 'in', color: ex.Color.Black}),
        out: new ex.FadeInOut({duration: 500, direction: 'out', color: ex.Color.Black})
      }
    },
    chand: {
      scene:Chand,
      transitions: {
        in: new ex.FadeInOut({duration: 500, direction: 'in', color: ex.Color.Black}),
        out: new ex.FadeInOut({duration: 500, direction: 'out', color: ex.Color.Black})
      }
    },
    longs: {
      scene:Longs,
      transitions: {
        in: new ex.FadeInOut({duration: 500, direction: 'in', color: ex.Color.Black}),
        out: new ex.FadeInOut({duration: 500, direction: 'out', color: ex.Color.Black})
      }
    },
    hazel: {
      scene:Hazel,
      transitions: {
        in: new ex.FadeInOut({duration: 500, direction: 'in', color: ex.Color.Black}),
        out: new ex.FadeInOut({duration: 500, direction: 'out', color: ex.Color.Black})
      }
    },
    argo: {
      scene:Argo,
      transitions: {
        in: new ex.FadeInOut({duration: 500, direction: 'in', color: ex.Color.Black}),
        out: new ex.FadeInOut({duration: 500, direction: 'out', color: ex.Color.Black})
      }
    },
    ottowa: {
      scene:Ottowa,
      transitions: {
        in: new ex.FadeInOut({duration: 500, direction: 'in', color: ex.Color.Black}),
        out: new ex.FadeInOut({duration: 500, direction: 'out', color: ex.Color.Black})
      }
    },
    beck_corner: {
      scene:BeckCorner,
      transitions: {
        in: new ex.FadeInOut({duration: 500, direction: 'in', color: ex.Color.Black}),
        out: new ex.FadeInOut({duration: 500, direction: 'out', color: ex.Color.Black})
      }
    },
    beckley: {
      scene:Beckley,
      transitions: {
        in: new ex.FadeInOut({duration: 500, direction: 'in', color: ex.Color.Black}),
        out: new ex.FadeInOut({duration: 500, direction: 'out', color: ex.Color.Black})
      }
    },
    party: {
      scene:Party,
      transitions: {
        in: new ex.FadeInOut({duration: 500, direction: 'in', color: ex.Color.Black}),
        out: new ex.FadeInOut({duration: 500, direction: 'out', color: ex.Color.Black})
      }
    },
    wakeup: {
      scene:WakeUp,
      transitions: {
        in: new ex.FadeInOut({duration: 500, direction: 'in', color: ex.Color.Black}),
        out: new ex.FadeInOut({duration: 500, direction: 'out', color: ex.Color.Black})
      }
    }
} as const