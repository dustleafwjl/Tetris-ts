// 坐标
export interface Point {
    readonly x: number
    readonly y: number
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