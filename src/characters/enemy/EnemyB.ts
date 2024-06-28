import { Scene,Math } from "phaser";
import { Enemy } from "./Enemy";

export class EnemyB extends Enemy {
  hp: number = 100; // 敌机B的生命值
  maxHp: number = 100; //敌机最大生命值
  score: number = 5; //敌机B的分数
  exp: number = 5;
  constructor(scene: Scene, x: number, y: number) {
    super(scene, x, y, "enemyB");
  }
  //敌机生成
  born() {
    super.born();
    this.setVelocityY(100);
    // console.log("敌机B生成血量为", this.hp);
  }
}
