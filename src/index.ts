import $ from 'jquery'
import { Square } from './core/Square'
import { SquarePageViewer } from './core/viewer/SquarePageViewer'
import { SquareGroup } from './core/SquareGroup'
import { creatShape } from './core/Teris'

const squareGroup: SquareGroup = creatShape({x: 3, y: 3})
squareGroup.squares.forEach(ele => {
    ele.viewer = new SquarePageViewer(ele, $("#root"))
})

console.log(squareGroup)