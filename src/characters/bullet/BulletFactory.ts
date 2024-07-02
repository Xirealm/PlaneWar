import { Scene } from "phaser";
import { BulletA } from "./BulletA";
import { BulletB } from "./BulletB";
import { BulletFireBird } from "./BulletFireBird";
import { BulletBomb } from "./BulletBomb";
import { BulletLaser } from "./BulletLaser";
import { BulletSuper } from "./BulletSuper";
import { BulletBoss } from "./BulletBoss";

export class BulletFactory {
  static createBullet(scene: Scene, type: string) {
    switch (type) {
      case "BulletA":
        return new BulletA(scene, 0, 0);
      case "BulletB":
        return new BulletB(scene, 0, 0);
      case "BulletFireBird":
        return new BulletFireBird(scene, 0, 0);
      case "BulletBomb":
        return new BulletBomb(scene, 0, 0);
      case "BulletLaser":
        return new BulletLaser(scene, 0, 0);
      case "BulletSuper":
        return new BulletSuper(scene, 0, 0);
      case "BulletBoss":
        return new BulletBoss(scene, 0, 0);
      default:
        throw new Error(`子弹类型 ${type} 不存在`);
    }
  }
}
