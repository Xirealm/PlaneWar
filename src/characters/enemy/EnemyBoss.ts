import { Scene, Math } from "phaser";
import { Enemy } from "./Enemy";

export class EnemyBoss extends Enemy {
  hp: number = 10; // 敌机Boss的生命值
  score: number = 20; //敌机B的分数
  exp: number = 5;
  constructor(scene: Scene, x: number, y: number) {
    super(scene, x, y, "enemyBoss");
    this.setScale(0.5);
  }
  //敌机生成
  born() {
    let x = Math.Between(30, 345);
    let y = Math.Between(-20, -40);
    this.hp = 10;
    this.enableBody(true, x, y, true, true);
    this.setVelocityY(70);
  }
  //敌机受到伤害
  takeDamage(damage: number): void {
    this.hp -= damage;
    console.log("EnemyBoss被攻击，剩余血量：", this.hp);
  }
  //敌机Fast被击杀
  killed(): void {
    this.disableBody(true, true);
    console.log("EnemyBoss被击杀");
  }
}
