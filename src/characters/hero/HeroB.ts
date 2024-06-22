import { GameObjects, Physics, Scene } from "phaser";
import { Hero } from "./Hero";

export class HeroB extends Hero {
    constructor(scene: Scene) {
        super(scene, "heroB");
        console.log("英雄B登场，等级为：",this.level);
    }

    upgrade(): void {
        this.level++;
        console.log(`Hero Type B level upgraded to: ${this.level}`);
        // 增加英雄类型A特有的升级逻辑
    }
}
