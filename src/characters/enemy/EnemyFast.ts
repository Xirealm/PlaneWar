import { Scene, Math } from "phaser";
import { Enemy } from "./Enemy";

export class EnemyFast extends Enemy {
  hp: number = 10; // 敌机Fast的生命值
  maxHp: number = 10; //敌机最大生命值
  score: number = 3; //敌机B的分数
  exp: number = 2;
  constructor(scene: Scene, x: number, y: number) {
    super(scene, x, y, "enemyFast");
    this.setScale(0.3);
  }
  //敌机生成
  born() {
    super.born();
    this.setVelocityY(500);
    // console.log("敌机Fast生成血量为", this.hp);
  }
}
