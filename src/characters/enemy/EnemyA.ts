import { Scene, Math } from "phaser";
import { Enemy } from "./Enemy";

export class EnemyA extends Enemy {
  hp: number = 3; // 敌机A的生命值
  maxHp: number = 3; //敌机最大生命值
  score: number = 1; //敌机A的分数
  exp: number = 1;
  constructor(scene: Scene, x: number, y: number) {
    super(scene, x, y, "enemyA");
  }
  //生成敌军
  born() {
    super.born();
    this.setVelocityY(125);
    // console.log("敌机A生成血量为",this.hp);
  }
  takeDamage(damage: number): void {
    this.hp -= damage;
    let demage = this.scene.add.text(this.x, this.y, `${damage}`, { fontSize: "20px" })
    setTimeout(() => {
      demage.destroy();
    },500);
    // console.log("EnemyA被攻击，剩余血量：", this.hp);
  }
}
