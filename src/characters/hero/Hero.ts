import { Physics, Scene,Time } from "phaser";
import { Bullet } from "../bullet/Bullet";
import { calcLevelAndRemainingExp } from "../../utils/level";

export abstract class Hero extends Physics.Arcade.Sprite {
  hp: number = 3; // 英雄的生命值
  maxHp: number = 5; // 英雄的生命值上限
  level: number = 1;
  exp: number = 0; // 英雄的经验值
  expToNextLevel: number = 0;
  maxPow: number = 10; // 英雄的能量值上限
  pow: number = 0; // 英雄的能量值
  bullets: Physics.Arcade.Group; //英雄的子弹组
  fireFrequency: number = 400; // 子弹的发射频率
  isDown: boolean = false;
  downX: number;
  downY: number;
  fireEvent: Time.TimerEvent;

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
    this.initMoveEvent();
    this.initFireEvent();
  }
  initMoveEvent() {
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
  }
  initFireEvent() {
    // 定时器 每1秒发射子弹
    this.fireEvent = this.scene.time.addEvent({
      //子弹发射频率
      delay: this.fireFrequency,
      callback: () => {
        if (this.level === 1) {
          const bullet = this.bullets.getFirstDead();
          bullet.fire(this.x, this.y - 32);
        } else if (this.level === 2) {
          for (let i = 0; i < 2; i++) {
            const bullet = this.bullets.getFirstDead();
            if (i === 0) {
              bullet.fire(this.x - 10, this.y - 32);
            } else if (i === 1) {
              bullet.fire(this.x + 10, this.y - 32);
            }
          }
        } else if (this.level >= 3 && this.level <= 4) {
          for (let i = 0; i < 4; i++) {
            const bullet = this.bullets.getFirstDead();
            if (i === 0) {
              bullet.fire(this.x - 25, this.y - 15);
            } else if (i === 1) {
              bullet.fire(this.x - 10, this.y - 32);
            } else if (i === 2) {
              bullet.fire(this.x + 10, this.y - 32);
            } else if (i === 3) {
              bullet.fire(this.x + 25, this.y - 15);
            }
          }
        } else {
          for (let i = 0; i < 5; i++) {
            const bullet = this.bullets.getFirstDead();
            if (i === 0) {
              bullet.fire(this.x - 25, this.y - 15);
            } else if (i === 1) {
              bullet.fire(this.x - 10, this.y - 30);
            } else if (i === 2) {
              bullet.fire(this.x, this.y - 45);
            } else if (i === 3) {
              bullet.fire(this.x + 10, this.y - 30);
            } else if (i === 4) {
              bullet.fire(this.x + 25, this.y - 15);
            }
          }
        }
      },
      callbackScope: this,
      loop: true, // 循环生成
    });
  }
  growExp(value: number) {
    if (this.level === 5) return;
    this.exp += value;
    const { newLevel, expToNextLevel } = calcLevelAndRemainingExp(this.exp);
    this.expToNextLevel = expToNextLevel;
    if (newLevel > this.level) {
      //英雄升级
      this.upgrade(newLevel);
      //子弹升级
      this.bullets.getChildren().forEach((bullet) => {
        (bullet as Bullet).upgrade(newLevel);
      });
      // console.log("距离升到",newLevel + 1,"级还差",expToNextLevel,"经验值");
    }
  }
  /**
   * 补给生命方法
   * @param value 补给生命值
   */
  supplyHp(value: number): void {
    if (this.hp === this.maxHp) return;
    this.hp += value;
  }
  /**
   * 减少生命方法
   * @param value 补给生命值
   * @returns boolean 英雄是否死亡
   */
  reduceHp(value: number): void{
    if (this.hp <= 0) return;
    this.pow = 0;
    this.hp -= value;
  }
  /**
   * 增加能量方法
   * @param value 补给能量值
   */
  addPow(value: number): void{
    if (this.pow >= this.maxPow) {
      return
    }
    this.pow += value;
    if (this.pow >= this.maxPow) {
      this.pow = this.maxPow;
      console.log("能量已满");
    }
  }
  //升级方法
  upgrade(level: number): void {
    this.level = level;
    // 抛出升级事件
    this.scene.events.emit("heroUpgrade", this);
    this.fireFrequency = this.fireFrequency * 0.8;
    // 移除现有的定时器
    if (this.fireEvent) {
      this.scene.time.removeEvent(this.fireEvent);
    }
    // 重新设置发射事件
    this.initFireEvent();
  }
}
