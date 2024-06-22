import { Physics, Scene, Math } from "phaser";

export abstract class Supply extends Physics.Arcade.Sprite {
  supplyType: string; // 补给类型
  constructor(scene: Scene, x: number, y: number, texture: string) {
    super(scene, x, y, texture);
    scene.add.existing(this);
    scene.physics.add.existing(this);
    this.setScale(0.5);
    this.setCollideWorldBounds(true); // 让补给碰到世界边缘时停止
  }
  preUpdate(time: number, delta: number) {
    super.preUpdate(time, delta);
    let { height } = this.scene.cameras.main;
    // 补给走到头，销毁
    if (this.y >= height + 20) {
      this.disableBody(true, true);
    }
  }
  //补给生成
  born() {
    let x = Math.Between(30, 345);
    let y = Math.Between(-20, -40);
    this.enableBody(true, x, y, true, true);
    this.setVelocityY(200);
  }
  abstract takeSupply(): void;
}