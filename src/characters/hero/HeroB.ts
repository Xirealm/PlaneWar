import { GameObjects, Physics, Scene } from "phaser";
import { Hero } from "./Hero";

export class HeroB extends Hero {
  fireFrequency: number = 500; // 子弹的发射频率
  constructor(scene: Scene) {
    super(scene, "heroB");
    console.log(`英雄B登场,等级为: ${this.level}`);
    // this.setCollideWorldBounds(true);
  }
  upgrade(level: number): void {
    super.upgrade(level);
    console.log(`英雄B升级了,等级为: ${this.level}`);
    switch (level) {
      case 2:
        console.log("二级升级配置");
        this.setTexture("heroBLevel2");
        break;
      case 3:
        console.log("三级升级配置");
        this.setTexture("heroBLevel3");
        this.setScale(0.6);
        break;
      case 4:
        console.log("四级升级配置");
        this.setTexture("heroBLevel4");
        this.setScale(0.7);
        break;
      case 5:
        console.log("五级升级配置");
        this.setTexture("heroBLevel5");
        this.setScale(0.8);
        break;
      default:
        break;
    }
    // 增加英雄类型B特有的升级逻辑
  }
}