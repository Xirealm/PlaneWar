import { Scene } from "phaser";
import { Enemy } from "./Enemy";

export class EnemyA extends Enemy {
    constructor(scene: Scene, x: number, y: number) {
        super(scene,x,y,"enemyA");
    }
    takeDamage(damage: number): void {
        this.hp -= damage;
        console.log("EnemyA被攻击，剩余血量：", this.hp);
        
        // if (this.hp <= 0) {
        //     this.disableBody(true, true);
        // }
    }
}
