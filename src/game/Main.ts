import { Scene, GameObjects, type Types,Physics} from "phaser";

import { HeroFactory } from "../characters/hero/HeroFactory";
import { Hero } from "../characters/hero/Hero"
import { EnemyFactory } from "../characters/enemy/EnemyFactory";
import { Enemy } from "../characters/enemy/Enemy"
import { EnemyA } from "../characters/enemy/EnemyA"
import { EnemyB } from "../characters/enemy/EnemyB"
import { BulletFactory } from "../characters/bullet/BulletFactory";
import { Bullet } from "../characters/bullet/Bullet"
import { BulletA } from "..//characters/bullet/BulletA";
import { Boom } from "../characters/boom/Boom";

// 场景元素
let hero: Hero;
let background: GameObjects.TileSprite;
let enemiesA: Physics.Arcade.Group;
let enemiesB: Physics.Arcade.Group;
let bulletsA: Physics.Arcade.Group;
let booms: GameObjects.Group;
let scoreText: GameObjects.Text;
// 场景数据
let score: number;

export class Main extends Scene {
  constructor() {
    super("Main");
  }
  create() {
    const { width, height } = this.cameras.main;
    // 背景
    background = this.add
      .tileSprite(0, 0, width, height, "gameBackground1")
      .setOrigin(0, 0);
    // 玩家
    hero = HeroFactory.createHero(this, "TypeA");
    // 子弹
    // 定义子弹A对象池
    bulletsA = this.physics.add.group({
      classType: BulletA,
      maxSize: 20, // 子弹A对象池的最大数量
      active: false,
      visible: false,
      enable: false,
      immovable: false,
    });
    // 初始化子弹A对象池
    for (let i = 0; i < 20; i++) {
      let bullet = BulletFactory.createBullet(this, "BulletA");
      bullet.setVisible(false);
      bullet.setActive(false);
      bulletsA.add(bullet);
    }
    // 定义敌机A对象池
    enemiesA = this.physics.add.group({
      classType: EnemyA,
      maxSize: 20, // 敌机A对象池的最大数量
      active: false,
      visible: false,
      enable: false,
      immovable: true,
    });
    // 初始化敌机A对象池
    for (let i = 0; i < 20; i++) {
      let enemy = EnemyFactory.createEnemy(this, "EnemyA");
      enemy.setVisible(false);
      enemy.setActive(false);
      enemiesA.add(enemy);
    }
    // 定义敌机B对象池
    enemiesB = this.physics.add.group({
      classType: EnemyB,
      maxSize: 10, // 敌机A对象池的最大数量
      active: false,
      visible: false,
      enable: false,
      immovable: true,
    });
    // 初始化敌机B对象池
    for (let i = 0; i < 10; i++) {
      let enemy = EnemyFactory.createEnemy(this, "EnemyB");
      enemy.setVisible(false);
      enemy.setActive(false);
      enemiesB.add(enemy);
    }
    // 爆炸
    booms = this.add.group({
      classType: Boom,
      frameQuantity: 30,
      key: "boom",
      active: false,
      visible: false,
    });
    // 为英雄机设置子弹
    hero.setBullets(bulletsA);

    // 分数
    score = 0;
    scoreText = this.add.text(10, 10, "0", {
      fontFamily: "Arial",
      fontSize: 20,
    });

    this.addEvent();
  }
  //注册事件
  addEvent() {
    // 定时器 每1秒生成敌人
    this.time.addEvent({
      delay: 1000,
      callback: this.spawnEnemyA,
      callbackScope: this,
      loop: true, // 循环生成
    });
    this.time.addEvent({
      delay: 3000,
      callback: this.spawnEnemyB,
      callbackScope: this,
      loop: true, // 循环生成
    });

    // 子弹和敌机A碰撞
    this.physics.add.overlap(bulletsA, enemiesA, this.hit, null, this);
    // 子弹和敌机B碰撞
    this.physics.add.overlap(bulletsA, enemiesB, this.hit, null, this);
    // 玩家和敌机A碰撞
    this.physics.add.overlap(hero, enemiesA, this.gameOver, null, this);
    // // 玩家和敌机B碰撞
    // this.physics.add.overlap(hero, enemiesA, this.gameOver, null, this);
  }
  spawnEnemyA() {
    let enemyA = enemiesA.getFirstDead(false); // 获取一个非活跃的敌机A对象
    if (enemyA) {
      enemyA.born();
      console.log("敌机A上场");
    }
  }
  spawnEnemyB() {
    let enemyB = enemiesB.getFirstDead(false); // 获取一个非活跃的敌机B对象
    if (enemyB) {
      enemyB.born();
      console.log("敌机B上场");
    }
  }
  // 子弹击中敌军
  hit(bullet, enemy) {
    console.log("子弹击中敌机,伤害为"+bullet.damage);
    bullet.disableBody(true, true);
    enemy.takeDamage(bullet.damage);
    if (enemy.hp <= 0) {
      this.killed(bullet, enemy)
    }
  }
  //子弹击杀敌军
  killed(bullet, enemy) {
    // 子弹和敌军隐藏
    enemy.disableBody(true, true);
    // bullet.disableBody(true, true);
    // 显示爆炸
    booms.getFirstDead()?.show(enemy.x, enemy.y);
    console.log("子弹击杀敌机");
    // 分数增加
    scoreText.text = String(++score);
  }
  // 游戏结束
  gameOver() {
    // 暂停当前场景，并没有销毁
    this.sys.pause();
    // 保存分数
    this.registry.set("score", score);
    // 打开结束场景
    this.game.scene.start("End");
  }
  // 每一帧的回调
  update() {
    background.tilePositionY -= 1;
  }
}
