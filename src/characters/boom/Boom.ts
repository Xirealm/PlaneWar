import { GameObjects, Scene } from "phaser";
 
export class Boom extends GameObjects.Sprite {
    constructor(scene: Scene, x: number, y: number, texture: string) {
        super(scene, x, y, texture);
        // 爆炸动画播放结束事件
        this.on("animationcomplete-boom", this.hide, this);
    }
    // 显示爆炸
    show(x: number, y: number) {
        this.x = x;
        this.y = y;
        this.setActive(true);
        this.setVisible(true);
        this.play("boom");
        // this.scene.sound.play("boom");
    }
    // 隐藏爆炸
    hide() {
        this.setActive(false);
        this.setVisible(false);
    }
}