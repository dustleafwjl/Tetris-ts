import { Square } from "./Square";
import { Shape, Point } from "./types";

export abstract class SquareGroup {
    private _squares: readonly Square[] = []
    protected isClock = true
    private setSquarePoints() {
        this._shape.forEach((ele, index) => {
            this._squares[index].point = {
                x: this._centerPoint.x + ele.x,
                y: this._centerPoint.y + ele.y
            }
        })
    }
    public get squares() {
        return this._squares
    }
    public set centerPoint(val: Point) {
        this._centerPoint = val
        this.setSquarePoints()
    }
    public get centerPoint(): Point {
        return this._centerPoint
    }
    public get shape() {
        return this._shape
    }
    /**
     * 
     * @param _shape 形状 array
     * @param _centerPoint 中心点
     * @param color 形状颜色
     */
    constructor(
        private _shape: Shape, 
        private _centerPoint: Point, 
        private color: string ) {
        // 设置小方块的数组
        let arr:Square[] = []
        this._shape.forEach(ele => {
            const sq = new Square()
            sq.color = color
            arr.push(sq)
        }) 
        this._squares = arr
        this.setSquarePoints()
    }
    /**
     * 获取旋转后的point数组 shape
     */
    afterRotateShape(): Shape {
         if(this.isClock) {
             return this._shape.map(ele => {
                 return {
                     x: -ele.y,
                     y: ele.x
                 }
             })
         }else {
             return this._shape.map(ele => {
                 return {
                     x: ele.y,
                     y: -ele.x
                 }
             })
         }
    }

    rotate() {
        const newShpae = this.afterRotateShape()
        this._shape = newShpae
        this.setSquarePoints()
    }
}