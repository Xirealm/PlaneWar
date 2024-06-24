import { Scene, Math } from "phaser";
import { Enemy } from "./Enemy";

export class EnemyBoss extends Enemy {
  hp: number = 50; // 敌机Boss的生命值
  maxHp: number = 50; //敌机最大生命值
  score: number = 50; //敌机B的分数
  exp: number = 100;
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
  //敌机受到伤害
  takeDamage(damage: number): void {
    this.hp -= damage;
    // console.log("EnemyBoss被攻击，剩余血量：", this.hp);
  }
}
