import { Physics, Scene ,Math} from "phaser";

export abstract class Enemy extends Physics.Arcade.Sprite {
  hp: number; // 敌机的生命值
  score: number; //敌机的分数值
  exp: number; //敌机的经验值
  constructor(scene: Scene, x: number, y: number, texture: string) {
    super(scene, x, y, texture);
    scene.add.existing(this);
    scene.physics.add.existing(this);
    this.setScale(0.6);
    this.setCollideWorldBounds(true); // 让敌人碰到世界边缘时停止
  }
  preUpdate(time: number, delta: number) {
    super.preUpdate(time, delta);
    let { height } = this.scene.cameras.main;
    // 敌军走到头，销毁
    if (this.y >= height + 20) {
      this.disableBody(true, true);
    }
  }
  abstract born():void
  abstract takeDamage(damage: number): void;
  abstract killed(): void;
}