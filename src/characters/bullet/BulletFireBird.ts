import { Scene } from "phaser";
import { Bullet } from "./Bullet";

export class BulletFireBird extends Bullet {
  bulletType = "bulletFireBird"
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
    console.log("火鸟6666666666666666666子弹发射");
  }
}
