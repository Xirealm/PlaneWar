import { Scene } from "phaser";
import { Bullet } from "./Bullet";

export class BulletA extends Bullet {
  bulletType = "baseBullet";
  damage: number = 10; // 子弹造成的伤害
  constructor(scene: Scene, x: number, y: number) {
    super(scene, x, y, "bulletA");
  }
}
