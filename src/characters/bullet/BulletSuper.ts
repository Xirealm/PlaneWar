import { Scene } from "phaser";
import { Bullet } from "./Bullet";

export class BulletSuper extends Bullet {
  baseDemage = 50;
  bulletType = "superBullet";
  damage: number = 10; // 子弹造成的伤害
  constructor(scene: Scene, x: number, y: number) {
    super(scene, x, y, "bulletSuper");
  }
}
