import { Scene, Math } from "phaser";
import { Enemy } from "./Enemy";

export class EnemyFast extends Enemy {
  hp: number = 1; // 敌机Fast的生命值
  score: number = 3; //敌机B的分数
  exp: number = 2;
  constructor(scene: Scene, x: number, y: number) {
    super(scene, x, y, "enemyFast");
    this.setScale(0.3);
  }
  //敌机生成
  born() {
    let x = Math.Between(30, 345);
    let y = Math.Between(-20, -40);
    this.hp = 1;
    this.enableBody(true, x, y, true, true);
    this.setVelocityY(400);
  }
  //敌机受到伤害
  takeDamage(damage: number): void {
    this.hp -= damage;
    console.log("EnemyFast被攻击，剩余血量：", this.hp);
  }
  //敌机Fast被击杀
  killed(): void {
    this.disableBody(true, true);
    console.log("EnemyFast被击杀");
  }
}
