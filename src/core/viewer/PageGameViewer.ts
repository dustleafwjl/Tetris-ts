import { IGameViewer } from "../types";
import { SquareGroup } from "../SquareGroup";
import { SquarePageViewer } from "./SquarePageViewer";
import $ from 'jquery'

export class PageGameViewer implements IGameViewer {
    showNext(tetris: SquareGroup): void {
        tetris.squares.forEach(sq => {
            sq.viewer = new SquarePageViewer(sq, $("#next"))
        })
    }    
    swtich(tetris: SquareGroup): void {
        tetris.squares.forEach(sq => {
            sq.viewer!.remove()
            sq.viewer = new SquarePageViewer(sq, $("#panel"))
        })
    }

    
} 