import { Point, Shape, MoveDirdection } from "./types";
import GameCnfig from './GameConfig'
import { SquareGroup } from "./SquareGroup";

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
    static canIMove(shape: Shape, targetPoint: Point): boolean {
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
        return true
    }
    /**
     * 完成方块实例的移动
     * @param sq 方块组合实例
     * @param targetPointOrdirection 目标点，或者方向
     */
    static move(sq: SquareGroup, targetPointOrdirection: Point): boolean
    static move(sq: SquareGroup, targetPointOrdirection: MoveDirdection): boolean
    static move(sq: SquareGroup, targetPointOrdirection: Point | MoveDirdection): boolean {
        if(isPoint(targetPointOrdirection)) {
            if(this.canIMove(sq.shape, targetPointOrdirection)) {
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
            return this.move(sq, targetPoint)
        }
    }
    /**
     * 一直移动，直到不能移动
     * @param sq 
     * @param direction 
     */
    static moveDirection(sq: SquareGroup, direction: MoveDirdection): void {
        while(this.move(sq, direction)){}
    }
    /**
     * 判断方块是否能够旋转
     * @param tertis 方块
     */
    static rotate(tertis: SquareGroup): boolean {
        const newShape = tertis.afterRotateShape() // 得到旋转之后的形状
        if(this.canIMove(newShape, tertis.centerPoint)) {
            tertis.rotate()
            return true
        }else {
            return false
        }
    }
}