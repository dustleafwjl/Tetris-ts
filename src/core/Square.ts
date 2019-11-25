import { Point, IViewer } from "./types";

/** 
 * 小方块
 */
export class Square {
    // 属性： 显示着
    private _viewer?: IViewer
    private _point: Point = {
        x: 0,
        y: 0
    }
    private _color: string = 'red'
    public set point(val) {
        this._point = val
        if(this._viewer) {
            this._viewer.show()
        }
    }
    public get point() {
        return this._point
    }
    public set viewer(val) {
        this._viewer = val
        if(this._viewer) {
            this._viewer.show()
        }
    }
    public get viewer() {
        return this._viewer
    }
    public set color(val) {
        this._color = val
    }
    public get color() {
        return this._color
    }
}