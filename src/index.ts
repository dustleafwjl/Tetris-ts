import $ from 'jquery'
import { Square } from './core/Square'
import { SquarePageViewer } from './core/viewer/SquarePageViewer'
import { SquareGroup } from './core/SquareGroup'
import { createTetris } from './core/Tetris'
import { TetrisRule } from './core/TetrisRule'
import { MoveDirdection } from './core/types'
import { Game } from './core/Game'
import { PageGameViewer } from './core/viewer/PageGameViewer'

const g: Game = new Game(new PageGameViewer())

g.start()
// const squareGroup: SquareGroup = createTetris({x: 3, y: 3})
// squareGroup.squares.forEach(ele => {
//     ele.viewer = new SquarePageViewer(ele, $("#panel"))
// })

// setInterval(() => {
//     TetrisRule.rotate(squareGroup)
// }, 1000)


// setTimeout(() => {
//     TetrisRule.moveDirection(squareGroup, MoveDirdection.down)
// }, 2000)