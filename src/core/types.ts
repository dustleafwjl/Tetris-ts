import { SquareGroup } from "./SquareGroup";
import { Game } from "./Game";

// 坐标
export interface Point {
    readonly x: number
    readonly y: number
}

export interface IGameViewer {
    /**
     * 
     * @param tetris 下一个方块对象
     */
    showNext(tetris: SquareGroup): void
    /**
     * 
     * @param tetris 切换的方块对象
     */
    swtich(tetris: SquareGroup): void
    /**
     * 游戏界面的初始化
     * @param g 游戏对象
     */
    init(g: Game): void
    showScore(score: number): void
    onGamePause(): void
    onGameStart(): void
    onGameOver(): void
}

// 方块的显示
export interface IViewer {
    show(): void
    remove(): void
}
/**
 * 用坐标数组来抽象一个形状，如[0, 0], [-1, 0], [0, 1], [1, 0]
 */
export type Shape = Point[]

export enum MoveDirdection {
    left,
    right,
    down
}

// 表示游戏的状态

export enum GameStatus {
    init, // 未开始
    playing, // 进行中
    pause, // 暂停
    over // 游戏结束
}