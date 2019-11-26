import { Point, Shape, MoveDirdection } from "./types";
import GameCnfig from './GameConfig'
import { SquareGroup } from "./SquareGroup";
import { Square } from "./Square";

/**
 * 判断是否是Point对象
 * @param obj 
 */
function isPoint(obj: any): obj is Point {
    if(typeof obj.x === 'undefined') {
        return false
    }
    return true
}

export class TetrisRule {
    /**
     * 判断方块能否进行移动
     * @param shape 形状
     * @param targetPoint 目标逻辑坐标
     */
    static canIMove(shape: Shape, targetPoint: Point, exitSquare: Square[]): boolean {
        // 假设中心点已经移到目标位置，算出每一个小方块的坐标
        const realTargetPoints: Point[] = shape.map(ele => {
            return {
                x: ele.x + targetPoint.x,
                y: ele.y + targetPoint.y
            }
        })
        // 边界判断
        if(realTargetPoints.some(p => {
            // 是否超出了边界
            return p.x < 0 || p.x > GameCnfig.panelSize.width - 1
                || p.y < 0 || p.y > GameCnfig.panelSize.height - 1
        })) {
            return false
        }
        return !realTargetPoints
                .some(it => exitSquare
                    .some(sq => sq.point.x === it.x && sq.point.y === it.y))
    }
    /**
     * 完成方块实例的移动
     * @param sq 方块组合实例
     * @param targetPointOrdirection 目标点，或者方向
     */
    static move(sq: SquareGroup, targetPointOrdirection: Point, exits: Square[]): boolean
    static move(sq: SquareGroup, targetPointOrdirection: MoveDirdection, exits: Square[]): boolean
    static move(sq: SquareGroup, targetPointOrdirection: Point | MoveDirdection, exits: Square[]): boolean {
        if(isPoint(targetPointOrdirection)) {
            if(this.canIMove(sq.shape, targetPointOrdirection, exits)) {
                sq.centerPoint = targetPointOrdirection
                return true
            }
            return false
        }else {
            let targetPoint: Point
            switch(targetPointOrdirection) {
                case MoveDirdection.left : 
                    targetPoint = {
                        x: sq.centerPoint.x - 1,
                        y: sq.centerPoint.y
                    }
                    break;
                case MoveDirdection.right : 
                    targetPoint = {
                        x: sq.centerPoint.x + 1,
                        y: sq.centerPoint.y
                    }
                    break;
                case MoveDirdection.down : 
                    targetPoint = {
                        x: sq.centerPoint.x,
                        y: sq.centerPoint.y + 1
                    }
                    break;
                default : targetPoint = {
                    x: sq.centerPoint.x,
                    y: sq.centerPoint.y + 1
                }
            }
            return this.move(sq, targetPoint, exits)
        }
    }
    /**
     * 一直移动，直到不能移动
     * @param sq 
     * @param direction 
     */
    static moveDirection(sq: SquareGroup, direction: MoveDirdection, exits: Square[]): void {
        while(this.move(sq, direction, exits)){}
    }
    /**
     * 判断方块是否能够旋转
     * @param tertis 方块
     */
    static rotate(tertis: SquareGroup, exits: Square[]): boolean {
        const newShape = tertis.afterRotateShape() // 得到旋转之后的形状
        if(this.canIMove(newShape, tertis.centerPoint, exits)) {
            tertis.rotate()
            return true
        }else {
            return false
        }
    }
    /**
     * 根据y坐标，得到所有y坐标为此值的方块
     * @param exits 已存在的方块数组
     * @param y y坐标
     */
    static getLineSquare(exits: Square[], y: number) {
        return exits.filter(sq => sq.point.y === y)
    }
    /**
     * 在已存在的方块中将满足条件的方块删除
     * @param exits 已存在的方块数组
     */
    static deleteSquare(exits: Square[]): number {
        // 获得y坐标数组
        const ys = exits.map(sq => sq.point.y)
        const maxY = Math.max(...ys)
        const minY = Math.min(...ys)
        let num = 0
        for(let i = minY; i < maxY + 1; i ++) {
            if(this.deleteLine(exits, i)) {
                num ++
            }
        }
        return num
    }
    /**
     * 消除满足条件的一行
     * @param exits 已经存在的方块数组
     * @param y 要消除的y坐标
     */
    private static deleteLine(exits: Square[], y: number):boolean {
        const squares = this.getLineSquare(exits, y)
        if(squares.length === GameCnfig.panelSize.width) {
            // 这一行可以消除
            squares.forEach(sq => {
                if(sq.viewer) {
                    sq.viewer.remove()
                }
                let index = exits.indexOf(sq)
                exits.splice(index, 1)
            })
            exits.filter(sq => sq.point.y < y).forEach(sq => {
                sq.point =  {
                    x: sq.point.x,
                    y: sq.point.y + 1
                }
            })
            return true
        }
        return false
    }
}