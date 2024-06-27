import { Scene } from "phaser";
import { Bullet } from "./Bullet";

export class BulletA extends Bullet {
  baseDemage = 10;
  bulletType = "baseBullet";
  damage: number = 10; // 子弹造成的伤害
  constructor(scene: Scene, x: number, y: number) {
    super(scene, x, y, "bulletA");
  }
}
