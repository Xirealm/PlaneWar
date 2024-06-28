import { Scene } from "phaser";
import { BulletA } from "./BulletA";
import { BulletFireBird } from "./BulletFireBird";
import { BulletBomb } from "./BulletBomb";

export class BulletFactory {
  static createBullet(scene: Scene, type: string) {
    switch (type) {
      case "BulletA":
        return new BulletA(scene, 0, 0);
      case "BulletFireBird":
        return new BulletFireBird(scene, 0, 0);
      case "BulletBomb":
        return new BulletBomb(scene, 0, 0);
      default:
        throw new Error(`子弹类型 ${type} 不存在`);
    }
  }
}
