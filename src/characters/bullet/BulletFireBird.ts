import { Scene } from "phaser";
import { Bullet } from "./Bullet";

export class BulletFireBird extends Bullet {
  bulletType = "bulletFireBird"
  fireVelocity: number = 300; // 子弹飞机速度
  damage: number = 50; // 子弹造成的伤害
  constructor(scene: Scene, x: number, y: number) {
    super(scene, x, y, "bulletFireBird", "fireBird01");
    this.setCollideWorldBounds(false);
    this.setScale(1.1);
  }
  fire(x: number, y: number) {
    this.enableBody(true, x, y, true, true);
    this.setVelocityY(-this.fireVelocity);
    this.play("bulletFireBird");
  }
}
