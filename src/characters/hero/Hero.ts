import { Physics, Scene } from "phaser";
import { calcLevelAndRemainingExp } from "../../utils/level"

export abstract class Hero extends Physics.Arcade.Sprite {
  level: number = 1;
  hp: number = 3; // 英雄的生命值
  hpMax: number = 3; // 英雄的生命值上限
  exp: number = 0; // 英雄的经验值
  energy: number = 100; // 英雄的能量值
  bullets: Physics.Arcade.Group; //英雄的子弹组
  fireFrequency: number = 500; // 子弹的发射频率
  isDown: boolean = false;
  downX: number;
  downY: number;

  constructor(scene: Scene, texture: string) {
    // 创建对象
    const { width, height } = scene.cameras.main;
    super(scene, width / 2, height - 80, texture);
    scene.add.existing(this);
    scene.physics.add.existing(this);
    //设置属性
    this.setInteractive();
    this.setScale(0.5);
    this.setCollideWorldBounds(true);
    // 注册事件
    this.addEvent();
  }
  setBullets(bullets: Physics.Arcade.Group) {
    this.bullets = bullets;
  }
  //注册事件
  addEvent() {
    // 手指按下我方飞机
    this.on("pointerdown", () => {
      this.isDown = true;
      this.downX = this.x;
      this.downY = this.y;
    });
    // 手指抬起
    this.scene.input.on("pointerup", () => {
      this.isDown = false;
    });
    // 手指移动
    this.scene.input.on("pointermove", (pointer: Phaser.Input.Pointer) => {
      if (this.isDown) {
        this.x = this.downX + pointer.x - pointer.downX;
        this.y = this.downY + pointer.y - pointer.downY;
      }
    });
    // 定时器 每1秒生成子弹
    this.scene.time.addEvent({
      //子弹发射频率
      delay: this.fireFrequency,
      callback: () => {
        //对子弹属性进行配置
        const bullet = this.bullets.getFirstDead();
        bullet.setScale(bullet.size);
        // 发射子弹
        bullet.fire(this.x, this.y - 32);
      },
      callbackScope: this,
      loop: true, // 循环生成
    });
  }
  growExp(value: number) {
    this.exp += value;
    if (this.level < 6) {
      const { newLevel, expToNextLevel } = calcLevelAndRemainingExp(this.exp);
      if (newLevel > this.level) {
        this.upgrade(newLevel);
      } else {
        console.log(
          "距离升到",
          newLevel + 1,
          "级还差",
          expToNextLevel,
          "经验值"
        );
      }
    }
  }
  //抽象方法升级
  abstract upgrade(level: number): void;
}