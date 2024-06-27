import { Scene, Physics } from "phaser";

export abstract class Bullet extends Physics.Arcade.Sprite {
  bulletType: string;
  baseDemage: number; // 子弹基础伤害
  demageRate: number = 1; //子弹造成的伤害倍率
  size: number = 0.5; // 子弹初始大小
  velocity: number = 250; // 子弹飞机速度
  velocityRate: number = 1; // 子弹飞行速度倍率
  constructor(
    scene: Scene,
    x: number,
    y: number,
    texture: string,
    frame?: string
  ) {
    super(scene, x, y, texture, frame);
    // 初始化子弹逻辑
    scene.add.existing(this);
    scene.physics.add.existing(this);
    this.setCollideWorldBounds(true); // 子弹撞到世界边缘时销毁
    this.setScale(this.size);
  }
  /**
   * 发射子弹
   * @param x 子弹x坐标
   * @param y 子弹y坐标
   */
  fire(x: number, y: number) {
    this.enableBody(true, x, y, true, true);
    this.setVelocityY(-this.velocity * this.velocityRate);
    // this.scene.sound.play("bullet");
  }
  getDemage():number {
    return this.baseDemage * this.demageRate;
  }
  upgrade(level: number) {
    console.log("子弹升级到", level / 5,"阶段");
    this.baseDemage += 10;
  }
  // 每一帧更新回调 销毁子弹，重新置于对象池
  preUpdate(time: number, delta: number) {
    super.preUpdate(time, delta);
    // 子弹出界事件（子弹走到顶部超出屏幕）
    if (this.y <= -this.displayHeight) {
      //这个数值为子弹的高度
      this.disableBody(true, true);
    }
  }
}
