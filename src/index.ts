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