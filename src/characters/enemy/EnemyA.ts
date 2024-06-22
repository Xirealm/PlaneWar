import { Scene, Math } from "phaser";
import { Enemy } from "./Enemy";

export class EnemyA extends Enemy {
    hp: number = 1; // 敌机A的生命值
    score:number = 1; //敌机A的分数
    exp:number = 1;
    constructor(scene: Scene, x: number, y: number) {
        super(scene, x, y, "enemyA");
    }
    //生成敌军
  born() {
    let x = Math.Between(30, 345);
    let y = Math.Between(-20, -40);
    this.hp = 1;
    this.enableBody(true, x, y, true, true);
    this.setVelocityY(Math.Between(100, 150));
  }
    takeDamage(damage: number): void {
        this.hp -= damage;
        console.log("EnemyA被攻击，剩余血量：", this.hp);
    }
    killed():void{
        this.disableBody(true, true);
    }
}
