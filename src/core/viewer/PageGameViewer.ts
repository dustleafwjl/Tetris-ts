import { IGameViewer, GameStatus } from "../types";
import { SquareGroup } from "../SquareGroup";
import { SquarePageViewer } from "./SquarePageViewer";
import $ from 'jquery'
import { Game } from "../Game";
import GameConfig from "../GameConfig";
import PageConfig from "./PageConfig";

export class PageGameViewer implements IGameViewer {
    onGamePause(): void {
        this.msgDom.css({
            display: "flex"
        })
        this.msgDom.find("p").html("游戏暂停")
    }
    onGameStart(): void {
        this.msgDom.hide()
    }
    onGameOver(): void {
        this.msgDom.css({
            display: "flex"
        })
        this.msgDom.find("p").html("游戏结束")
    }
    private nextDom = $("#next")
    private panelDom = $("#panel")
    private scoreDom = $("#score")
    private msgDom = $("#msg")

    init(g: Game): void {
        // 设置面板宽高
        this.panelDom.css({
            width: GameConfig.panelSize.width * PageConfig.SquareSize.width,
            height: GameConfig.panelSize.height * PageConfig.SquareSize.height
        })
        this.nextDom.css({
            width: GameConfig.nextSize.width * PageConfig.SquareSize.width,
            height: GameConfig.nextSize.height * PageConfig.SquareSize.height
        })
        // 注册键盘事件
        $(document).keydown(function(e) {
            if(e.keyCode === 37) {
                g.controlLeft()
            }else if(e.keyCode === 38) {
                g.controlRotate()
            }else if(e.keyCode === 39) {
                g.controlRight()
            }else if(e.keyCode === 40) {
                g.controlDown()
            }else if(e.keyCode === 32) {
                if(g.gameStatus === GameStatus.playing) {
                    g.pause()
                }else {
                    g.start()
                }
            }
        })
    }
    showNext(tetris: SquareGroup): void {
        tetris.squares.forEach(sq => {
            sq.viewer = new SquarePageViewer(sq, this.nextDom)
        })
    }    
    swtich(tetris: SquareGroup): void {
        tetris.squares.forEach(sq => {
            sq.viewer!.remove()
            sq.viewer = new SquarePageViewer(sq, this.panelDom)
        })
    }

    showScore(score: number): void {
        this.scoreDom.html(score.toString())
    }
    
} 