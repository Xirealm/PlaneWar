import { Scene } from "phaser";
import { Hero } from "./Hero";

export class HeroA extends Hero {
    constructor(scene: Scene) {
        super(scene, "heroA");
        console.log(`英雄A登场,等级为: ${this.level}`);
        // this.setCollideWorldBounds(true);
    }

    upgrade(): void {
        this.level++;
        console.log(`英雄A升级了,等级为: ${this.level}`);
        // 增加英雄类型A特有的升级逻辑
    }
}
