import { Scene, Physics } from "phaser";

export abstract class Bullet extends Physics.Arcade.Sprite {
  damage: number; // 子弹造成的伤害
  size: number = 0.5; // 子弹大小
  fireVelocity: number = 200; // 子弹飞机速度
  constructor(scene: Scene, x: number, y: number, texture: string) {
    super(scene, x, y, texture);
    scene.add.existing(this);
    scene.physics.add.existing(this);
    this.setCollideWorldBounds(true); // 子弹撞到世界边缘时销毁
    // 初始化子弹逻辑
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
  // 每一帧更新回调 销毁子弹，重新置于对象池
  preUpdate(time: number, delta: number) {
    super.preUpdate(time, delta);
    // 子弹出界事件（子弹走到顶部超出屏幕）    
    if (this.y <= -this.displayHeight) {  //这个数值为子弹的高度
      // console.log("子弹超出屏幕");
      this.disableBody(true, true);
    }
  }
}
