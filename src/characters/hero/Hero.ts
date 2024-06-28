import { Physics, Scene,Time } from "phaser";
import { Bullet } from "../bullet/Bullet";
import { calcLevelAndRemainingExp,expRequiredToLevel } from "../../utils/level";

export abstract class Hero extends Physics.Arcade.Sprite {
  heroType: string; //英雄机类型
  hp: number = 5; // 英雄的生命值
  maxHp: number = 5; // 英雄的生命值上限
  level: number = 1;
  maxLevel: number = 25; //英雄机的最高等级
  exp: number = 0; // 英雄的经验值
  expToNextLevel: number = 0;
  maxPow: number = 10; // 英雄的能量值上限
  pow: number = 0; // 英雄的能量值
  bullets: Physics.Arcade.Group; //英雄的子弹组
  fireFrequency: number = 300; // 子弹的发射频率
  expRate: number = 1; //英雄的经验获取倍率
  //英雄机移动相关属性
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
        if (this.level >= 1 && this.level <= 5) {
          const bullet = this.bullets.getFirstDead();
          if (bullet) bullet.fire(this.x, this.y - 32);
        } else if (this.level >= 6 && this.level <= 15) {
          for (let i = 0; i < 2; i++) {
            const bullet = this.bullets.getFirstDead();
            if (bullet) {
              if (i === 0) {
                bullet.fire(this.x - 10, this.y - 32);
              } else if (i === 1) {
                bullet.fire(this.x + 10, this.y - 32);
              }
            }
          }
        } else if (this.level >= 16 && this.level <= 20) {
          for (let i = 0; i < 4; i++) {
            const bullet = this.bullets.getFirstDead();
            if (bullet) {
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
          }
        } else {
          for (let i = 0; i < 5; i++) {
            const bullet = this.bullets.getFirstDead();
            if (bullet) {
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
        }
      },
      callbackScope: this,
      loop: true, // 循环生成
    });
  }
  /**
   * 增长经验
   * @param value 所增长的经验值
   */
  growExp(value: number): void {
    if (this.level === this.maxLevel) return;
    this.exp += this.expRate * value;
    const { newLevel, expToNextLevel } = calcLevelAndRemainingExp(this.exp);
    this.expToNextLevel = expToNextLevel;
    if (newLevel > this.level) {
      //英雄升级
      this.upgrade(newLevel);
      //子弹升级
      if (this.level % 5 === 1) {
        //每一次阶段子弹升级
        this.bullets.getChildren().forEach((bullet) => {
          (bullet as Bullet).upgrade(Math.floor(newLevel / 5));
        });
      }
      // console.log("距离升到",newLevel + 1,"级还差",expToNextLevel,"经验值");
    }
  }
  /**
   * 英雄机升级
   * @param level 升级等级
   */
  upgrade(level: number): void {
    this.level = level;
    if (this.level % 5 === 1) {
      this.fireFrequency -= 20;
      // 移除现有的定时器
      if (this.fireEvent) {
        this.scene.time.removeEvent(this.fireEvent);
      }
      // 重新设置发射事件
      this.initFireEvent();
    }
    // 抛出升级事件
    this.scene.events.emit("heroUpgrade",this); 
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
  reduceHp(value: number): void {
    if (this.hp <= 0) return;
    // this.pow = 0;
    this.hp -= value;
  }
  /**
   * 增加能量方法
   * @param value 补给能量值
   */
  addPow(value: number): void {
    if (this.pow >= this.maxPow) {
      return;
    }
    this.pow += value;
    if (this.pow >= this.maxPow) {
      this.pow = this.maxPow;
      console.log("能量已满");
    }
  }
  getHpRatio(): number {
    return this.hp / this.maxHp;
  }
  getPowRatio(): number {
    return this.pow / this.maxPow;
  }
  getExpRatio(): number {
    const { expToNextLevel } = calcLevelAndRemainingExp(this.exp);
    return (
      (expRequiredToLevel(this.level + 1) - expToNextLevel) /
      expRequiredToLevel(this.level + 1)
    );
  }
}