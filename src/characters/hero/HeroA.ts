import { Scene } from "phaser";
import { Hero } from "./Hero";

export class HeroA extends Hero {
    fireFrequency: number = 500; // 子弹的发射频率
    constructor(scene: Scene) {
        super(scene, "heroA");
        console.log(`英雄A登场,等级为: ${this.level}`);
        // this.setCollideWorldBounds(true);
    }
    upgrade(level: number): void {
        super.upgrade(level);
        console.log(`英雄A升级了,等级为: ${this.level}`);
        switch (level) {
            case 6:
                console.log("二级升级配置");
                this.setTexture("heroALevel2");
                break;
            case 11: 
                console.log("三级升级配置");
                this.setTexture("heroALevel3");
                this.setScale(0.6);
                break;
            case 16: 
                console.log("四级升级配置");
                this.setTexture("heroALevel4");
                this.setScale(0.7);
                break;
            case 21: 
                console.log("五级升级配置");
                this.setTexture("heroALevel5");
                this.setScale(0.8);
                break;
            default:
                break;
        }
        // 增加英雄类型A特有的升级逻辑
    }
}