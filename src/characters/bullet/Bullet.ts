import { Scene, Physics } from "phaser";

export abstract class Bullet extends Physics.Arcade.Sprite {
  bulletType: string;
  damage: number; // 子弹造成的伤害
  size: number = 0.5; // 子弹初始大小
  fireVelocity: number = 300; // 子弹飞机速度
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
    this.setVelocityY(-this.fireVelocity);
    // this.scene.sound.play("bullet");
  }
  upgrade(level: number) {
    this.damage = this.damage * level * 1.5;
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
