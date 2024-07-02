import { Scene, Math,Physics } from "phaser";
import { Enemy } from "./Enemy";

export class EnemyBoss extends Enemy {
  hp: number = 100; // 敌机Boss的生命值
  maxHp: number = 100; //敌机最大生命值
  score: number = 50; //敌机Boss的分数
  exp: number = 10;
  bullets: Physics.Arcade.Group;
  constructor(scene: Scene, x: number, y: number) {
    super(scene, x, y, "enemyBoss");
    this.setScale(0.8);
    this.scene.time.addEvent({
       //子弹发射频率
       delay: 5000,
      callback: () => {
        if (this.active) {
             const bullet = this.bullets.getFirstDead();
             if (bullet) bullet.fire(this.x, this.y - 32);
         }
       },
       callbackScope: this,
       loop: true, // 循环生成
     });
  }
  //敌机生成
  setBullets(bullets: Physics.Arcade.Group) {
    this.bullets = bullets;
  }
  born() {
    super.born();
    this.setVelocityY(80);
    this.setScale(0.7);
    // console.log("敌机Boss生成血量为", this.hp);
  }
}
