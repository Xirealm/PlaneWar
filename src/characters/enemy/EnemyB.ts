import { Scene,Math } from "phaser";
import { Enemy } from "./Enemy";

export class EnemyB extends Enemy {
  hp: number = 3; // 敌人的生命值
  constructor(scene: Scene, x: number, y: number) {
    super(scene, x, y, "enemyB");
  }
  //生成敌军
  born() {
    let x = Math.Between(30, 345);
    let y = Math.Between(-20, -40);
    this.hp = 3
    this.enableBody(true, x, y, true, true);
    this.setVelocityY(80);
  }
  takeDamage(damage: number): void {
    this.hp -= damage;
    console.log("EnemyB被攻击，剩余血量：", this.hp);
    // if (this.hp <= 0) {
    //   this.disableBody(true, true);
    // }
  }
}
