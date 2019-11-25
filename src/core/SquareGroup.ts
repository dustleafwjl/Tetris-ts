import { Square } from "./Square";
import { Shape, Point } from "./types";

export class SquareGroup {
    private _squares: readonly Square[] = []
    public get squares() {
        return this._squares
    }
    public set centerPoint(val: Point) {
        this._centerPoint = val
        console.log(val)
        this.shape.forEach((ele, index) => {
            console.log(this._squares)
            this._squares[index].point = {
                x: this._centerPoint.x + ele.x,
                y: this._centerPoint.y + ele.y
            }
        })
    }
    public get centerPoint(): Point {
        return this._centerPoint
    }
    /**
     * 
     * @param shape 形状 array
     * @param _centerPoint 中心点
     * @param color 形状颜色
     */
    constructor(
        private shape: Shape, 
        private _centerPoint: Point, 
        private color: string ) {
            // 设置小方块的数组
            let arr:Square[] = []
            this.shape.forEach(ele => {
                const sq = new Square()
                sq.point = {
                    x: _centerPoint.x + ele.x,
                    y: _centerPoint.y + ele.y
                }
                sq.color = color
                arr.push(sq)
            }) 
            this._squares = arr    
        }
}