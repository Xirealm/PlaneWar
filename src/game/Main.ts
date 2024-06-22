import { Scene, GameObjects, type Types, Physics, Math} from "phaser";

import { HeroFactory } from "../characters/hero/HeroFactory";
import { Hero } from "../characters/hero/Hero"

import { EnemyFactory } from "../characters/enemy/EnemyFactory";
import { Enemy } from "../characters/enemy/Enemy"
import { EnemyA } from "../characters/enemy/EnemyA"
import { EnemyB } from "../characters/enemy/EnemyB"
import { EnemyFast } from "../characters/enemy/EnemyFast"

import { BulletFactory } from "../characters/bullet/BulletFactory";
import { Bullet } from "../characters/bullet/Bullet"
import { BulletA } from "../characters/bullet/BulletA";

import { SupplyFactory } from "../characters/supply/SupplyFactory";
import { Supply } from "../characters/supply/Supply"
import { SupplyExp } from "../characters/supply/SupplyExp";

import { Boom } from "../characters/boom/Boom";

// 场景元素
let hero: Hero;
let background: GameObjects.TileSprite;
let enemiesA: Physics.Arcade.Group;
let enemiesB: Physics.Arcade.Group;
let enemiesFast: Physics.Arcade.Group;
let bulletsA: Physics.Arcade.Group;
let suppliesExp: Physics.Arcade.Group;
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
      maxSize: 5, // 敌机B对象池的最大数量
      active: false,
      visible: false,
      enable: false,
      immovable: true,
    });
    // 初始化敌机B对象池
    for (let i = 0; i < 5; i++) {
      let enemy = EnemyFactory.createEnemy(this, "EnemyB");
      enemy.setVisible(false);
      enemy.setActive(false);
      enemiesB.add(enemy);
    }
    // 定义敌机Fast对象池
    enemiesFast = this.physics.add.group({
      classType: EnemyFast,
      maxSize: 5, // 敌机Fast对象池的最大数量
      active: false,
      visible: false,
      enable: false,
      immovable: true,
    });
    // 初始化敌机Fast对象池
    for (let i = 0; i < 5; i++) {
      let enemy = EnemyFactory.createEnemy(this, "EnemyFast");
      enemy.setVisible(false);
      enemy.setActive(false);
      enemiesFast.add(enemy);
    }
    // 定义经验补给对象池
    suppliesExp = this.physics.add.group({
      classType: SupplyExp,
      maxSize: 3, // 经验补给对象池的最大数量
      enable: false,
      immovable: true,
    });
    // 初始化敌机Fast对象池
    for (let i = 0; i < suppliesExp.maxSize; i++) {
      let supplyExp = SupplyFactory.createSupply(this, "SupplyExp");
      supplyExp.disableBody(true, true);
      suppliesExp.add(supplyExp);
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
    this.time.addEvent({
      delay: 2000, // 定时器 每2秒生成敌人
      callback: () => {
        this.spawnEnemy("enemyA");
      },
      callbackScope: this,
      loop: true, // 循环生成
    });
    this.time.addEvent({
      delay: Math.Between(3000, 8000), // 定时器 每3-8秒生成1个敌机B
      callback: () => {
        this.spawnEnemy("enemyB")
      },
      callbackScope: this,
      loop: true, // 循环生成
    }); 
    this.time.addEvent({
      delay: Math.Between(500, 10000), // 定时器 每5-10秒生成1个Fast敌机
      callback: () => {
        this.spawnEnemy("enemyFast");
      },
      callbackScope: this,
      loop: true, // 循环生成
    }); 
    //掉落经验补给
    this.time.addEvent({
      delay: Math.Between(10000, 20000), // 定时器 每10-20秒生成1个升级补给
      callback: () => {
        this.spawnSupply("supplyExp")
      },
      callbackScope: this,
      loop: true, // 循环生成
    }); 
    // 子弹A和敌机A碰撞
    this.physics.add.overlap(bulletsA, enemiesA, this.hit, null, this);
    // 子弹A和敌机B碰撞
    this.physics.add.overlap(bulletsA, enemiesB, this.hit, null, this);
    // 子弹A和敌机Fast碰撞
    this.physics.add.overlap(bulletsA, enemiesFast, this.hit, null, this);
    // 玩家和敌机A碰撞
    this.physics.add.overlap(hero, enemiesA, this.gameOver, null, this);
    // 玩家和敌机B碰撞
    this.physics.add.overlap(hero, enemiesB, this.gameOver, null, this);
    // 玩家和敌机Fast碰撞
    this.physics.add.overlap(hero, enemiesFast, this.gameOver, null, this);
    // 玩家和经验补给碰撞
    this.physics.add.overlap(hero, suppliesExp , this.getSupply, null, this);
  }
  spawnEnemy(type: string) {
    let enemy:Enemy;
    switch (type) {
      case "enemyA":
        enemy = enemiesA.getFirstDead(false); // 获取一个非活跃的敌机A对象
        console.log("敌机A上场");
        break;
      case "enemyB":
        enemy = enemiesB.getFirstDead(false); // 获取一个非活跃的敌机B对象
        console.log("敌机B上场");
        break;
      case "enemyFast":
        enemy = enemiesFast.getFirstDead(false); // 获取一个非活跃的敌机C对象
        console.log("敌机Fast上场");
        break;
      default:
        console.log("没有这个类型");
        return  
    }
    if (enemy) {
      enemy.born();
    }
  }
  spawnSupply(type: string) {
    let supply:Supply;
    switch (type) {
      case "supplyExp":
        supply = suppliesExp.getFirstDead(false); // 获取一个非活跃的敌机A对象
        console.log("经验补给出现");
        break;
      default:
        new Error("没有这个补给类型");
        return  
    }
    if (supply) {
      supply.born();
    }
  }
  // 子弹击中敌军
  hit(bullet, enemy) {
    console.log("子弹击中敌机,伤害为"+bullet.damage);
    bullet.disableBody(true, true); //销毁子弹
    enemy.takeDamage(bullet.damage); //对敌机减血
    if (enemy.hp <= 0) {
      this.kill(bullet, enemy)
    }
  }
  // 子弹击杀敌军
  kill(bullet: Bullet, enemy: Enemy) {
    enemy.killed();
    // 显示爆炸
    booms.getFirstDead()?.show(enemy.x, enemy.y);
    console.log("子弹击杀敌机");
    // 分数增长
    scoreText.text = String(score += enemy.score);
    hero.growExp(enemy.exp);
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
  // 补给
  getSupply(hero, supply) {
    console.log("吃到了补给" + supply.supplyType);
    hero.growExp(supply.takeSupply())
    console.log("英雄当前经验值为：", hero.exp);
  }
  
  // 每一帧的回调
  update() {
    background.tilePositionY -= 1;
  }
}