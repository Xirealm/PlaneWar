import { Scene, Math } from "phaser";
import { Enemy } from "./Enemy";

export class EnemyBoss extends Enemy {
  hp: number = 100; // 敌机Boss的生命值
  maxHp: number = 100; //敌机最大生命值
  score: number = 50; //敌机Boss的分数
  exp: number = 10;
  constructor(scene: Scene, x: number, y: number) {
    super(scene, x, y, "enemyBoss");
    this.setScale(0.8);
  }
  //敌机生成
  born() {
    super.born();
    this.setVelocityY(80);
    // console.log("敌机Boss生成血量为", this.hp);
  }
}
