import { GameStatus, MoveDirdection, IGameViewer } from "./types";
import { SquareGroup } from "./SquareGroup";
import { createTetris } from './Tetris'
import { TetrisRule } from "./TetrisRule";
import GameConfig from "./GameConfig";
import { Square } from "./Square";

export class Game {
    // 游戏状态
    private _gameStatus: GameStatus = GameStatus.init
    // 当前玩家操作的方块
    private _curTetris?: SquareGroup
    // 下一个方块
    private _nextTetris: SquareGroup
    // 计时器
    private _timer?: number
    // 方块掉落间隔
    private _duration: number
    // 当前游戏中，以存在的方块
    private _exitSquare: Square[] = []
    private _score = 0
    public get score() {
        return this._score
    }
    public set score(val) {
        this._score = val
        this._viewer.showScore(val)
        const level = GameConfig.levels.filter(it => it.score <= val).pop()!
        if(level.duration = this._duration) return
        if(this._timer) {
            clearInterval(this._timer)
            this._timer = undefined
            this._duration = level.duration
            this.autoDrop()
        }
    }
    public get gameStatus() {
        return this._gameStatus
    }
    constructor(private _viewer: IGameViewer) {
        this._duration = GameConfig.levels[0].duration
        this._nextTetris = createTetris({ x: 0, y: 0 }) // 没有实际含义，只是为了不报错
        this.createNext()
        this._viewer.showScore(this.score)
        this._viewer.init(this)
    }
    private createNext() {
        this._nextTetris.squares.forEach(sq => {
            if(sq.viewer) sq.viewer.remove()
        })
        this._nextTetris = createTetris({ x: 0, y: 0 })
        this.resetCenterPoint(GameConfig.nextSize.width, this._nextTetris)
        this._viewer.showNext(this._nextTetris)
    }
    private init() {
        this._gameStatus = GameStatus.init
        this._exitSquare.forEach(sq => {
            if (sq.viewer) {
                sq.viewer.remove()
            }
        })
        this._exitSquare = []
        this.createNext()
        this._curTetris = undefined
        this.score = 0
    }
    /**
     * 游戏开始
     */
    start() {
        // 游戏状态的改变
        if (this._gameStatus === GameStatus.playing) return
        // 从游戏结束到开始
        if (this._gameStatus === GameStatus.over) {
            this.init()
        }
        this._gameStatus = GameStatus.playing
        if (!this._curTetris) {
            // 给当前玩家操作的方块赋值
            this.switchTetris()
        }
        this.autoDrop()
        this._viewer.onGameStart()
    }
    /**
     * 游戏暂停
    */
    pause() {
        if (this._gameStatus === GameStatus.playing) {
            this._gameStatus = GameStatus.pause
            clearInterval(this._timer)
            this._timer = undefined
            this._viewer.onGamePause()
        }
    }

    controlLeft() {
        if (this._curTetris && this._gameStatus === GameStatus.playing) {
            TetrisRule.move(this._curTetris, MoveDirdection.left, this._exitSquare)
        }
    }
    controlRight() {
        if (this._curTetris && this._gameStatus === GameStatus.playing) {
            TetrisRule.move(this._curTetris, MoveDirdection.right, this._exitSquare)
        }
    }
    controlDown() {
        if (this._curTetris && this._gameStatus === GameStatus.playing) {
            TetrisRule.moveDirection(this._curTetris, MoveDirdection.down, this._exitSquare)
            this.hitBottom()
        }
    }
    controlRotate() {
        if (this._curTetris && this._gameStatus === GameStatus.playing) {
            TetrisRule.rotate(this._curTetris, this._exitSquare)
        }
    }
    /**
     * 当前方块自由下落
     */
    private autoDrop() {
        if (this._timer || this._gameStatus !== GameStatus.playing) return
        this._timer = setInterval(() => {
            if (this._curTetris) {
                TetrisRule.move(this._curTetris, MoveDirdection.down, this._exitSquare) || this.hitBottom()
            }
        }, this._duration)
    }
    /**
     * 切换方块
     */
    private switchTetris() {
        this._curTetris = this._nextTetris
        this.resetCenterPoint(GameConfig.panelSize.width, this._curTetris)
        // 有可能出现问题： 当方块一出现时，就已经和之前的方块重叠了
        if (!TetrisRule.canIMove(this._curTetris.shape, this._curTetris.centerPoint, this._exitSquare)) {
            // 游戏结束
            this._gameStatus = GameStatus.over
            clearInterval(this._timer)
            this._timer = undefined
            this._viewer.onGameOver()
            return
        }
        this.createNext()
        this._viewer.swtich(this._curTetris)
    }
    /**
     * 设置方块中心点出现在区域的中上方
     * @param width 面板宽度
     * @param tetris 方块对象
     */
    private resetCenterPoint(width: number, tetris: SquareGroup): void {
        const x = Math.ceil(width / 2) - 1
        const y = 0
        tetris.centerPoint = { x, y }
        while (tetris.squares.some(it => it.point.y < 0)) {
            tetris.centerPoint = {
                x: tetris.centerPoint.x,
                y: tetris.centerPoint.y + 1
            }
            // TetrisRule.move(tetris, MoveDirdection.down)
        }
    }
    /**
     * 触底处理事件
     */
    private hitBottom() {
        // 将当前俄罗斯包含的小方块，加入到已存在的方块数组中
        this._exitSquare.push(...this._curTetris!.squares)
        this.addScore(TetrisRule.deleteSquare(this._exitSquare))
        this.switchTetris()
    }

    private addScore(lineNum: number) {
        if (lineNum === 0) {
            return
        } else if (lineNum === 1) {
            this.score += 10
        } else if (lineNum === 2) {
            this.score += 25
        } else if (lineNum === 3) {
            this.score += 50
        } else {
            this.score += 100
        }
    }
}