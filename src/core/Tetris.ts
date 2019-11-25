import { Point } from "./types";
import { SquareGroup } from "./SquareGroup";
import { getRandom } from "./utils";

export class TShape extends SquareGroup {
    constructor(_centerPoint: Point, _color: string) {
        super([{ x: -1, y: 0 }, { x: 0, y: 0 }, { x: 1, y: 0 }, { x: 0, y: -1 }],
            _centerPoint, _color)
    }
}

export class LShape extends SquareGroup {
    constructor(_centerPoint: Point, _color: string) {
        super([{ x: -2, y: 0 }, { x: -1, y: 0 }, { x: 0, y: 0 }, { x: 0, y: -1 }],
            _centerPoint, _color)
    }
}
export class LMirrorShape extends SquareGroup {
    constructor(_centerPoint: Point, _color: string) {
        super([{ x: 2, y: 0 }, { x: 1, y: 0 }, { x: 0, y: 0 }, { x: 0, y: -1 }],
            _centerPoint, _color)
    }
}
export class SShape extends SquareGroup {
    constructor(_centerPoint: Point, _color: string) {
        super([{ x: 0, y: 0 }, { x: 1, y: 0 }, { x: 0, y: 1 }, { x: -1, y: 1 }],
            _centerPoint, _color)
    }
    rotate() {
        super.rotate()
        this.isClock = !this.isClock
    }
}
export class SMirrorShape extends SquareGroup {
    constructor(_centerPoint: Point, _color: string) {
        super([{ x: 0, y: 0 }, { x: -1, y: 0 }, { x: 0, y: 1 }, { x: 1, y: 1 }],
            _centerPoint, _color)
    }
    rotate() {
        super.rotate()
        this.isClock = !this.isClock
    }
}
export class SquareShape extends SquareGroup {
    constructor(_centerPoint: Point, _color: string) {
        super([{ x: 0, y: 0 }, { x: 1, y: 0 }, { x: 0, y: 1 }, { x: 1, y: 1 }],
            _centerPoint, _color)
    }
    afterRotateShape() {
        return this.shape
    }
}
export class LineShape extends SquareGroup {
    constructor(_centerPoint: Point, _color: string) {
        super([{ x: -1, y: 0 }, { x: 0, y: 0 }, { x: 1, y: 0 }, { x: 2, y: 0 }],
            _centerPoint, _color)
    }
    rotate() {
        super.rotate()
        this.isClock = !this.isClock
    }
}

export const shapes = [
    TShape,
    LShape,
    LMirrorShape,
    SShape,
    SMirrorShape,
    SquareShape,
    LineShape
]

export const colors = [
    "red",
    "green",
    "blue",
    "orange"
]
/**
 * 随机产生一个俄罗斯方块（颜色随机，形状随机）
 * @param centerPoint 中心点
 */
export function createTetris(centerPoint: Point): SquareGroup {
    const shapeIndex = getRandom(0, shapes.length)
    const colorIndex = getRandom(0, colors.length)
    const shape = shapes[shapeIndex]
    return new shape(centerPoint, colors[colorIndex])
}