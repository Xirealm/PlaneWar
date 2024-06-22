import { Physics, Scene ,Math} from "phaser";

export abstract class Enemy extends Physics.Arcade.Sprite {
  hp: number = 1; // 敌人的生命值
  constructor(scene: Scene, x: number, y: number, texture: string) {
    super(scene, x, y, texture);
    scene.add.existing(this);
    scene.physics.add.existing(this);
    this.setScale(0.5);
    this.setCollideWorldBounds(true); // 让敌人碰到世界边缘时停止
  }
  //生成敌军
  born() {
    let x = Math.Between(30, 345);
    let y = Math.Between(-20, -40);
    this.hp = 1;
    this.enableBody(true, x, y, true, true);
    this.setVelocityY(Math.Between(100, 150));
  }

  preUpdate(time: number, delta: number) {
    super.preUpdate(time, delta);
    let { height } = this.scene.cameras.main;
    // 敌军走到头，销毁
    if (this.y >= height + 20) {
      this.disableBody(true, true);
    }
  }
  abstract takeDamage(damage: number): void;
}