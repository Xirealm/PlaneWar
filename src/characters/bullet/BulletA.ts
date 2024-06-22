import { Scene } from "phaser";
import { Bullet } from "./Bullet";

export class BulletA extends Bullet {
  damage: number = 1; // 子弹造成的伤害
  constructor(scene: Scene, x: number, y: number) {
    super(scene, x, y, "bulletA");
  }
}
