import { Scene,Math } from "phaser";
import { Enemy } from "./Enemy";

export class EnemyB extends Enemy {
  hp: number = 2; // 敌机B的生命值
  score: number = 5; //敌机B的分数
  exp: number = 1;
  constructor(scene: Scene, x: number, y: number) {
    super(scene, x, y, "enemyB");
  }
  //敌机生成
  born() {
    let x = Math.Between(30, 345);
    let y = Math.Between(-20, -40);
    this.hp = 2;
    this.enableBody(true, x, y, true, true);
    this.setVelocityY(80);
  }
  //敌机受到伤害
  takeDamage(damage: number): void {
    this.hp -= damage;
    console.log("EnemyB被攻击，剩余血量：", this.hp);
  }
  //敌机被杀死
  killed(): void {
    this.disableBody(true, true);
  }
}
