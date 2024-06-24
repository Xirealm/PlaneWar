import { Scene,Math } from "phaser";
import { Enemy } from "./Enemy";

export class EnemyB extends Enemy {
  hp: number = 10; // 敌机B的生命值
  maxHp: number = 10; //敌机最大生命值
  score: number = 5; //敌机B的分数
  exp: number = 3;
  constructor(scene: Scene, x: number, y: number) {
    super(scene, x, y, "enemyB");
  }
  //敌机生成
  born() {
    super.born();
    this.setVelocityY(100);
    // console.log("敌机B生成血量为", this.hp);
  }
  //敌机受到伤害
  takeDamage(damage: number): void {
    this.hp -= damage;
    // console.log("EnemyB被攻击，剩余血量：", this.hp);
  }
}
