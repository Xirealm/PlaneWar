import { Scene } from "phaser";
import { Bullet } from "./Bullet";

export class BulletBoss extends Bullet {
  baseDemage = 1;
  bulletType = "BossBullet";
  damage: number = 10; // 子弹造成的伤害
  constructor(scene: Scene, x: number, y: number) {
    super(scene, x, y, "bulletBoss");
  }
  fire(x: number, y: number) {
    this.enableBody(true, x, y, true, true);
    this.setVelocityY(this.velocity * this.velocityRate);
    // this.scene.sound.play("bullet");
  }
}
