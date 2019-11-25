import { GameStatus, MoveDirdection, IGameViewer } from "./types";
import { SquareGroup } from "./SquareGroup";
import { createTetris } from './Tetris'
import { TetrisRule } from "./TetrisRule";
import GameConfig from "./GameConfig";

export class Game {
    // 游戏状态
    private _gameStatus: GameStatus = GameStatus.init
    // 当前玩家操作的方块
    private _curTetris?: SquareGroup
    // 下一个方块
    private _nextTetris: SquareGroup = createTetris({ x: 0, y: 0 })
    // 计时器
    private _timer?: number
    // 方块掉落间隔
    private _duration: number = 1000

    constructor(private _viewer: IGameViewer) {
        this.resetCenterPoint(GameConfig.nextSize.width, this._nextTetris)
        this._viewer.showNext(this._nextTetris)
    }
    /**
     * 游戏开始
     */
    start() {
        // 游戏状态的改变
        if (this._gameStatus === GameStatus.playing) return
        this._gameStatus = GameStatus.playing
        if (!this._curTetris) {
            // 给当前玩家操作的方块赋值
            this.switchTetris()
        }
        this.autoDrop()
    }
    /**
     * 游戏暂停
     */
    pause() {
        if(this._gameStatus === GameStatus.pause) {
            this._gameStatus = GameStatus.pause
            clearInterval(this._timer)
            this._timer = undefined
        }
    }

    controlLeft() {
        if(this._curTetris && this._gameStatus === GameStatus.playing) {
            TetrisRule.move(this._curTetris, MoveDirdection.left)
        }
    }
    controlRight() {
        if(this._curTetris && this._gameStatus === GameStatus.playing) {
            TetrisRule.move(this._curTetris, MoveDirdection.right)
        }
    }
    controlDown() {
        if(this._curTetris && this._gameStatus === GameStatus.playing) {
            TetrisRule.moveDirection(this._curTetris, MoveDirdection.down)
        }
    }
    controlRotate() {
        if(this._curTetris && this._gameStatus === GameStatus.playing) {
            TetrisRule.rotate(this._curTetris)
        }
    }
    /**
     * 当前方块自由下落
     */
    private autoDrop() {
        if (this._timer || this._gameStatus !== GameStatus.playing) return
        this._timer = setInterval(() => {
            if (this._curTetris) {
                TetrisRule.move(this._curTetris, MoveDirdection.down)
            }
        }, this._duration)
    }
    /**
     * 切换方块
     */
    private switchTetris() {
        this._curTetris = this._nextTetris
        this.resetCenterPoint(GameConfig.panelSize.width, this._curTetris)
        this._nextTetris = createTetris({ x: 0, y: 0 })
        this.resetCenterPoint(GameConfig.nextSize.width, this._nextTetris)
        this._viewer.swtich(this._curTetris)
        this._viewer.showNext(this._nextTetris)
    }
    /**
     * 设置方块中心点出现在区域的中上方
     * @param width 面板宽度
     * @param tetris 方块对象
     */
    private resetCenterPoint(width: number, tetris: SquareGroup): void {
        const x = Math.ceil(width / 2) - 1
        const y = 0
        tetris.centerPoint = {x, y}
        while(tetris.squares.some(it => it.point.y < 0)) {
            tetris.centerPoint = {
                x: tetris.centerPoint.x,
                y: tetris.centerPoint.y + 1
            }
            // TetrisRule.move(tetris, MoveDirdection.down)
        }
    }
}