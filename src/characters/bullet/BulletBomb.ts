import { Scene } from "phaser";
import { Bullet } from "./Bullet";

export class BulletBomb extends Bullet {
  bulletType = "bomb";
  velocity: number = 0; // 子弹飞机速度
  baseDemage: number = 1000; // 子弹造成的伤害
  constructor(scene: Scene, x: number, y: number) {
    super(scene, x, y, "bulletBomb");
    this.setCollideWorldBounds(false);
    this.setScale(0.8);
  }
  //将炸弹投掷于敌机
  fire(x: number, y: number) {
    this.enableBody(true, x, y, true, true);
    setTimeout(() => {
        this.disableBody(true, true)
    }, 100);
  }
}
