import { Scene } from "phaser";
import { Main } from "../../game/Main"
import { Bullet } from "./Bullet";

export class BulletLaser extends Bullet {
    bulletType = "laser";
    velocity: number = 0; // 子弹飞机速度
    baseDemage: number = 1000; // 造成的伤害
    constructor(scene: Scene, x: number, y: number) {
        super(scene, x, y, "bulletLaser");
        this.setCollideWorldBounds(false);
        this.setSize(50, 600);
        this.setDisplaySize(50, 600);
        this.setOrigin(0.5, 1);
        this.setInteractive()
    }
   fire(x: number, y: number) {
        this.enableBody(true, x, y, true, true);
        setTimeout(() => {
        this.disableBody(true, true);
        }, 3000);
    }
    preUpdate(time: number, delta: number): void {
        const hero = (this.scene as Main).hero;
        this.setPosition(hero.x, hero.y - 32)
    }
}
