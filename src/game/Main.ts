import { Scene, GameObjects, type Types, Physics } from "phaser";
import { EventBus } from "@/utils/EventBus";

import { HeroFactory } from "../characters/hero/HeroFactory";
import { Hero } from "../characters/hero/Hero"

import { EnemyFactory } from "../characters/enemy/EnemyFactory";
import { Enemy } from "../characters/enemy/Enemy"
import { EnemyA } from "../characters/enemy/EnemyA"
import { EnemyB } from "../characters/enemy/EnemyB"
import { EnemyFast } from "../characters/enemy/EnemyFast"
import { EnemyBoss } from "../characters/enemy/EnemyBoss"

import { BulletFactory } from "../characters/bullet/BulletFactory";
import { Bullet } from "../characters/bullet/Bullet"
import { BulletSuper } from "../characters/bullet/BulletSuper";
import { BulletBomb } from "../characters/bullet/BulletBomb";
import { BulletFireBird } from "../characters/bullet/BulletFireBird";
import { BulletLaser } from "../characters/bullet/BulletLaser";
import { BulletBoss} from "../characters/bullet/BulletBoss"

import { SupplyFactory } from "../characters/supply/SupplyFactory";
import { Supply } from "../characters/supply/Supply"
import { SupplyExp } from "../characters/supply/SupplyExp";
import { SupplyHp } from "../characters/supply/SupplyHp";
import { SupplyPow } from "../characters/supply/SupplyPow";

import { SkillFactory } from "../characters/skill/SkillFactory";
import { Skill } from "../characters/skill/Skill";

import { Boom } from "../characters/boom/Boom";

// 场景元素
// let hero: Hero;
let background: GameObjects.TileSprite;
let enemiesA: Physics.Arcade.Group;
let enemiesB: Physics.Arcade.Group;
let enemiesFast: Physics.Arcade.Group;
let enemiesBoss: Physics.Arcade.Group;
let bullets: Physics.Arcade.Group;
let bulletsBoss: Physics.Arcade.Group;
let bulletsSuper: Physics.Arcade.Group;
let bulletsBomb: Physics.Arcade.Group;
let bulletFireBird: BulletFireBird;
let bulletLaser: BulletLaser;
let suppliesExp: Physics.Arcade.Group;
let suppliesHp: Physics.Arcade.Group;
let suppliesPow: Physics.Arcade.Group;
let booms: GameObjects.Group;

let hpRatio: GameObjects.Image;
let powRatio: GameObjects.Image;
let expRatio: GameObjects.Image;
let levelText: GameObjects.Text;
let scoreGroup: GameObjects.Group;
let activeSkillContainer: GameObjects.Container; //主动技能容器
// 场景数据
let score: number;

export class Main extends Scene {
  width: number;
  height: number;
  hero: Hero;
  constructor() {
    super("Main");
  }
  create() {
    const { width, height } = this.cameras.main;
    this.width = width;
    this.height = height;
    // this.scene.add("ChooseSkill", ChooseSkill);
    const backgroundKey = this.registry.get("gameBackground");
    // 背景
    background = this.add
      .tileSprite(0, 0, width, height, backgroundKey)
      .setOrigin(0);
    // 暂停按钮
    const pauseBtn = this.add
      .image(width, 8, "pause")
      .setOrigin(1, 0)
      .setDepth(1)
      .setInteractive()
      .on("pointerdown", () => {
        this.scene.pause();
        this.game.scene.start("Pause");
      });
    // 为玩家装配英雄机
    if (this.registry.get("hero") === "heroA") {
      this.hero = HeroFactory.createHero(this, "TypeA");
    } else if (this.registry.get("hero") === "heroB") {
      this.hero = HeroFactory.createHero(this, "TypeB");
    }
    // 子弹
    // 定义子弹A对象池
    bullets = this.physics.add.group({
      classType: Bullet,
      maxSize: 500, // 子弹A对象池的最大数量
      enable: false,
      immovable: false,
    });
    // 初始化子弹A对象池
    for (let i = 0; i < 500; i++) {
      let bullet: Bullet;
      if (this.hero.heroType === "heroA") {
        bullet = BulletFactory.createBullet(this, "BulletA");
      } else if (this.hero.heroType === "heroB") {
        bullet = BulletFactory.createBullet(this, "BulletB");
      }
      bullet.disableBody(true, true);
      bullets.add(bullet);
    }
    bulletsBoss = this.physics.add.group({
      classType: BulletBoss,
      maxSize: 30, // 子弹A对象池的最大数量
      enable: false,
      immovable: false,
    });
    for (let i = 0; i < 50; i++) {
      let bullet: Bullet;
      bullet = BulletFactory.createBullet(this, "BulletBoss");
      bullet.disableBody(true, true);
      bulletsBoss.add(bullet);
    }
    bulletsSuper = this.physics.add.group({
      classType: BulletSuper,
      maxSize: 500, // 子弹Super对象池的最大数量
      enable: false,
      immovable: false,
    });
    // 定义子弹炸弹对象池
    bulletsBomb = this.physics.add.group({
      classType: BulletBomb,
      maxSize: 100, // 子弹A对象池的最大数量
      enable: false,
      immovable: false,
    });
    bulletFireBird = BulletFactory.createBullet(this, "BulletFireBird");
    bulletFireBird.disableBody(true, true);
    // 定义敌机A对象池
    enemiesA = this.physics.add.group({
      classType: EnemyA,
      maxSize: 50, // 敌机A对象池的最大数量
      enable: false,
      immovable: true,
    });
    // 初始化敌机A对象池
    for (let i = 0; i < 50; i++) {
      let enemy = EnemyFactory.createEnemy(this, "EnemyA");
      enemy.disableBody(true, true);
      enemiesA.add(enemy);
    }
    // 定义敌机B对象池
    enemiesB = this.physics.add.group({
      classType: EnemyB,
      maxSize: 50, // 敌机B对象池的最大数量
      enable: false,
      immovable: true,
    });
    // 初始化敌机B对象池
    for (let i = 0; i < 50; i++) {
      let enemy = EnemyFactory.createEnemy(this, "EnemyB");
      enemy.disableBody(true, true);
      enemiesB.add(enemy);
    }
    // 定义敌机Fast对象池
    enemiesFast = this.physics.add.group({
      classType: EnemyFast,
      maxSize: 50, // 敌机Fast对象池的最大数量
      enable: false,
      immovable: true,
    });
    // 初始化敌机Fast对象池
    for (let i = 0; i < 50; i++) {
      let enemy = EnemyFactory.createEnemy(this, "EnemyFast");
      enemy.disableBody(true, true);
      enemiesFast.add(enemy);
    }
    // 定义敌机Boss对象池
    enemiesBoss = this.physics.add.group({
      classType: EnemyBoss,
      maxSize: 5, // 敌机Boss对象池的最大数量
      enable: false,
      immovable: true,
    });
    // 初始化敌机Boss对象池
    for (let i = 0; i < enemiesBoss.maxSize; i++) {
      let enemy = EnemyFactory.createEnemy(this, "EnemyBoss");
      enemy.disableBody(true, true);
      enemiesBoss.add(enemy);
    }
      enemiesBoss.getChildren().forEach((enemy: any) => {
        enemy.setBullets(bulletsBoss);
      });
    // 定义经验补给对象池
    suppliesExp = this.physics.add.group({
      classType: SupplyExp,
      maxSize: 3, // 经验补给对象池的最大数量
      enable: false,
      immovable: true,
    });
    // 初始化经验补给对象池
    for (let i = 0; i < suppliesExp.maxSize; i++) {
      let supplyExp = SupplyFactory.createSupply(this, "SupplyExp");
      supplyExp.disableBody(true, true);
      suppliesExp.add(supplyExp);
    }
    // 定义生命补给对象池
    suppliesHp = this.physics.add.group({
      classType: SupplyHp,
      maxSize: 3, // 生命补给对象池的最大数量
      enable: false,
      immovable: true,
    });
    // 初始化生命补给对象池
    for (let i = 0; i < suppliesHp.maxSize; i++) {
      let supplyHp = SupplyFactory.createSupply(this, "SupplyHp");
      supplyHp.disableBody(true, true);
      suppliesHp.add(supplyHp);
    }
    // 定义能力补给对象池
    suppliesPow = this.physics.add.group({
      classType: SupplyPow,
      maxSize: 3, // 生命补给对象池的最大数量
      enable: false,
      immovable: true,
    });
    // 初始化能量补给对象池
    for (let i = 0; i < suppliesPow.maxSize; i++) {
      let supplyPow = SupplyFactory.createSupply(this, "SupplyPow");
      supplyPow.disableBody(true, true);
      suppliesPow.add(supplyPow);
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
    this.hero.setBullets(bullets);
    //初始化分数;
    score = 0;
    scoreGroup = this.add.group(); // 创建一个Group来存放所有得分数字
    // 血量条
    const hpLabel = this.add.image(0, 5, "hpLabel").setOrigin(0).setScale(0.5);
    this.add
      .image(
        hpLabel.displayWidth,
        hpLabel.y + hpLabel.displayHeight / 3,
        "progressBarBgRed"
      )
      .setInteractive()
      .setDisplaySize(100, 10)
      .setAlpha(0.8)
      .setOrigin(0, 0);
    hpRatio = this.add
      .image(
        hpLabel.displayWidth + 1,
        hpLabel.y + hpLabel.displayHeight / 3 + 1,
        "progressBarContentRed"
      )
      .setInteractive()
      .setSize(98, 13)
      .setDisplaySize(98, 8)
      .setAlpha(0.8)
      .setOrigin(0, 0);
    hpRatio.displayWidth = this.hero.getHpRatio() * hpRatio.width;
    // 能量进度条
    const powLabel = this.add
      .image(0, 30, "powLabel")
      .setOrigin(0)
      .setScale(0.5);
    this.add
      .image(
        powLabel.displayWidth,
        powLabel.y + powLabel.displayHeight / 3,
        "progressBarBgYellow"
      )
      .setInteractive()
      .setDisplaySize(100, 10)
      .setAlpha(0.8)
      .setOrigin(0);
    powRatio = this.add
      .image(
        powLabel.displayWidth + 1,
        powLabel.y + powLabel.displayHeight / 3 + 1,
        "progressBarContentYellow"
      )
      .setInteractive()
      .setSize(98, 13)
      .setDisplaySize(98, 8)
      .setAlpha(0.8)
      .setOrigin(0);
    powRatio.displayWidth = this.hero.getPowRatio() * powRatio.width;
    // 经验进度条
    levelText = this.add
      .text(width / 2, 85, "1", {
        font: "25px bold Arial",
        color: "#8abbe3",
        strokeThickness: 4,
        stroke: "#2663b9",
        fontStyle: "strong",
      })
      .setOrigin(0.5)
      .setDepth(1);
    const expBg = this.add
      .image(width / 2, 80, "progressBarBgBlue")
      .setInteractive()
      .setDisplaySize(250, 8)
      .setAlpha(0.8)
      .setOrigin(0.5, 0);
    expRatio = this.add
      .image(expBg.x - expBg.displayWidth / 2, 80, "progressBarContentBlue")
      .setInteractive()
      .setSize(250, 8)
      .setDisplaySize(0, 8)
      .setAlpha(0.8)
      .setOrigin(0);
    expRatio.displayWidth = this.hero.getExpRatio() * expRatio.width;
    // 主动技能按钮容器
    activeSkillContainer = this.add.container(0, 500);
    // 在主场景中添加监听
    EventBus.off("getSkill")
    EventBus.on("getSkill", this.onGetSkill, this);
    // 调用注册事件
    this.addEvent();
  }
  //注册事件
  addEvent() {
    this.events.removeListener("getSkillEvent");
    this.time.addEvent({
      delay: 3000, // 定时器 每3秒生成2个敌机
      callback: () => {
        for (let i = 0; i < 2; i++) {
          this.spawnEnemy("enemyA");
        }
      },
      callbackScope: this,
      loop: true, // 循环生成
    });
    this.time.addEvent({
      delay: Phaser.Math.Between(3000, 4000), // 定时器 每3-4秒生成1个敌机B
      callback: () => {
        this.spawnEnemy("enemyB");
      },
      callbackScope: this,
      loop: true, // 循环生成
    });
    this.time.addEvent({
      delay: Phaser.Math.Between(4000, 8000), // 定时器 每4-8秒生成1个Fast敌机
      callback: () => {
        this.spawnEnemy("enemyFast");
      },
      callbackScope: this,
      loop: true, // 循环生成
    });
    //掉落经验补给
    this.time.addEvent({
      delay: Phaser.Math.Between(10000, 20000), // 定时器 每10-20秒生成1个升级补给
      callback: () => {
        this.spawnSupply("supplyExp");
      },
      callbackScope: this,
      loop: true, // 循环生成
    });
    //掉落生命补给
    this.time.addEvent({
      delay: Phaser.Math.Between(10000, 20000), // 定时器 每10-20秒掉落1个生命补给
      callback: () => {
        this.spawnSupply("supplyHp");
      },
      callbackScope: this,
      loop: true, // 循环生成
    });
    //掉落能量补给
    this.time.addEvent({
      delay: Phaser.Math.Between(3000, 5000), // 定时器 每5-10秒掉落1个生命补给
      callback: () => {
        this.spawnSupply("supplyPow");
      },
      callbackScope: this,
      loop: true, // 循环生成
    });
    // 监听英雄升级事件
    this.events.on("heroUpgrade", this.onHeroUpgrade, this);
    // 监听英雄主动技能释放
    this.events.on("fireBulletFirdBird", this.fireBulletFirdBird, this);
    this.events.on("fireBomb", this.fireBomb, this);
    this.events.on("fireLaser", this.fireLaser, this);
    this.events.on("changeToSuperBullet", this.changeToSuperBullet, this);
    this.events.on("skillToImproveVelocity", this.skillToImproveVelocity, this);
    this.events.on(
      "skillToImproveDemageRate",
      this.skillToImproveDemageRate,
      this
    );
    this.events.on(
      "skillToImproveBaseDemage",
      this.skillToImproveBaseDemage,
      this
    );
    this.events.on("skillToRestoreHp", this.skillToRestoreHp, this);
    this.events.on("skillToImproveHp", this.skillToImproveHp, this);
    this.events.on("skillToImproveExpRate", this.skillToImproveExpRate, this);
    this.events.on("skillToRestorePow", this.skillToRestorePow, this);
    this.physics.add.overlap(bullets, enemiesA, this.hit, null, this);
    this.physics.add.overlap(bullets, enemiesB, this.hit, null, this);
    this.physics.add.overlap(bullets, enemiesFast, this.hit, null, this);
    this.physics.add.overlap(bullets, enemiesBoss, this.hit, null, this);
    // 子弹火鸟和敌机碰撞
    this.physics.add.overlap(bulletFireBird, enemiesA, this.hit, null, this);
    this.physics.add.overlap(bulletFireBird, enemiesB, this.hit, null, this);
    this.physics.add.overlap(bulletFireBird, enemiesFast, this.hit, null, this);
    this.physics.add.overlap(bulletFireBird, enemiesBoss, this.hit, null, this);
    // 子弹爆炸和敌机碰撞
    this.physics.add.overlap(bulletsBomb, enemiesA, this.hit, null, this);
    this.physics.add.overlap(bulletsBomb, enemiesB, this.hit, null, this);
    this.physics.add.overlap(bulletsBomb, enemiesFast, this.hit, null, this);
    this.physics.add.overlap(bulletsBomb, enemiesBoss, this.hit, null, this);
    // 玩家和敌机A碰撞
    this.physics.add.overlap(this.hero, enemiesA, this.injured, null, this);
    // 玩家和敌机B碰撞
    this.physics.add.overlap(this.hero, enemiesB, this.injured, null, this);
    // 玩家和敌机Fast碰撞
    this.physics.add.overlap(this.hero, enemiesFast, this.injured, null, this);
    // 玩家和敌机Boss碰撞
    this.physics.add.overlap(this.hero, enemiesBoss, this.injured, null, this);
    //玩家与敌机子弹碰撞
    this.physics.add.overlap(this.hero, bulletsBoss, this.injuredB, null, this);
    // 玩家拾取经验补给（碰撞）
    this.physics.add.overlap(
      this.hero,
      suppliesExp,
      this.getSupply,
      null,
      this
    );
    // 玩家拾取生命补给（碰撞）
    this.physics.add.overlap(this.hero, suppliesHp, this.getSupply, null, this);
    // 玩家拾取能量补给（碰撞）
    this.physics.add.overlap(
      this.hero,
      suppliesPow,
      this.getSupply,
      null,
      this
    );
  }
  spawnEnemy(type: string) {
    let enemy: Enemy;
    switch (type) {
      case "enemyA":
        enemy = enemiesA.getFirstDead(false); // 获取一个非活跃的敌机A对象
        // console.log("敌机A上场");
        break;
      case "enemyB":
        enemy = enemiesB.getFirstDead(false); // 获取一个非活跃的敌机B对象
        // console.log("敌机B上场");
        break;
      case "enemyFast":
        enemy = enemiesFast.getFirstDead(false); // 获取一个非活跃的敌机C对象
        // console.log("敌机Fast上场");
        break;
      case "enemyBoss":
        enemy = enemiesBoss.getFirstDead(false); // 获取一个非活跃的敌机C对象
        // console.log("敌机Fast上场");
        break;
      default:
        console.log("没有这个类型");
        return;
    }
    if (enemy) {
      enemy.born();
    }
  }
  spawnSupply(type: string) {
    let supply: Supply;
    switch (type) {
      case "supplyExp":
        supply = suppliesExp.getFirstDead(false); // 获取一个非活跃的敌机A对象
        break;
      case "supplyHp":
        supply = suppliesHp.getFirstDead(false); // 获取一个非活跃的敌机A对象
        break;
      case "supplyPow":
        supply = suppliesPow.getFirstDead(false); // 获取一个非活跃的敌机A对象
        break;
      default:
        new Error("没有这个补给类型");
        return;
    }
    if (supply) {
      supply.born();
    }
  }
  onHeroUpgrade(hero:Hero) {
    // console.log("英雄升级！！！！！！！！！");
    levelText.setText(`${hero.level}`);
    //所有敌机升级
    enemiesA.getChildren().forEach((enemy) => {
      (enemy as Enemy).upgrade(hero.level);
    });
    enemiesB.getChildren().forEach((enemy) => {
      (enemy as Enemy).upgrade(hero.level);
    });
    enemiesFast.getChildren().forEach((enemy) => {
      (enemy as Enemy).upgrade(hero.level);
    });
    enemiesBoss.getChildren().forEach((enemy) => {
      (enemy as Enemy).upgrade(hero.level);
    });
    for (let i = 0; i < 3; i++) {
      this.spawnEnemy("enemyA");
    }
    for (let i = 0; i < 2; i++) {
      this.spawnEnemy("enemyB");
    }
    for (let i = 0; i < 2; i++) {
      this.spawnEnemy("enemyFast");
    }
    this.spawnEnemy("enemyBoss");
    if (hero.level == 2) {
      this.scene.pause("Main");
      this.game.scene.start("ChooseSkill");
    }
    else if (hero.level % 5 !== 1) {
      this.scene.pause("Main");
      this.scene.wake("ChooseSkill");
    }
  }
  // 子弹击中敌军
  hit(bullet, enemy) {
    // console.log("子弹击中敌机,伤害为" + bullet.damage);
    if (bullet.bulletType === "baseBullet") {
      bullet.disableBody(true, true); //销毁子弹
    }
    enemy.takeDamage(bullet.getDemage()); //对敌机减血
    if (enemy.hp <= 0) {
      this.kill(bullet, enemy);
    }
  }
  // 子弹击杀敌军
  kill(bullet: Bullet, enemy: Enemy) {
    enemy.killed(); //敌机死亡
    booms.getFirstDead()?.show(enemy.x, enemy.y); //爆炸
    // 分数更新
    score += enemy.score;
    this.hero.growExp(enemy.exp * this.hero.expRate);
  }
  updateDisplayScore() {
    // 清除原有的数字
    scoreGroup.getChildren().forEach((item) => {
      item.destroy();
    });
    const position = { x: this.width - 40, y: 10 };
    let scoreStr = score.toString();
    for (let i = scoreStr.length - 1; i >= 0; i--) {
      const digit = parseInt(scoreStr[i]);
      const sprite = this.add
        .sprite(position.x, position.y, "number", digit)
        .setScale(0.3)
        .setOrigin(1, 0); // 右上角对齐
      scoreGroup.add(sprite); // 将显示数字添加到Group中
      position.x -= 20;
    }
  }
  /**
   * 英雄受到伤害
   * @param hero 玩家
   */
  injured(hero, enemy) {
    // 将敌机销毁
    enemy.killed();
    hpRatio.displayWidth = hero.getHpRatio() * hpRatio.width;
    powRatio.displayWidth = hero.getPowRatio() * powRatio.width;
    if (hero.hp <= 0) {
      // 显示爆炸
      booms.getFirstDead()?.show(enemy.x, enemy.y);
      hero.disableBody(true, true);
      this.gameOver();
    }
  }
  injuredB(hero, bullet
  ) {
    // 将子弹销毁
    bullet.disableBody(true, true);
    // hero.reduceHp(1);
    hpRatio.displayWidth = hero.getHpRatio() * hpRatio.width;
    powRatio.displayWidth = hero.getPowRatio() * powRatio.width;
    if (hero.hp <= 0) {
      // 显示爆炸
      booms.getFirstDead()?.show(hero.x, hero.y);
      hero.disableBody(true, true);
      this.gameOver();
    }
  }
  // 游戏结束
  gameOver() {
    // 暂停当前场景
    this.sys.pause();
    // 保存分数
    this.registry.set("score", score);
    // 打开结束场景
    this.game.scene.start("End");
  }
  // 补给
  getSupply(hero, supply) {
    switch (supply.supplyType) {
      case "Exp":
        hero.growExp(supply.takeSupply());
        break;
      case "Hp":
        hero.supplyHp(supply.takeSupply());
        hpRatio.displayWidth = hero.getHpRatio() * hpRatio.width;
        break;
      case "Pow":
        hero.addPow(supply.takeSupply());
        powRatio.displayWidth = hero.getPowRatio() * powRatio.width;
        break;
    }
  }
  //获得技能
  onGetSkill(skill: Skill) {
    console.log("我在主场景");
    if (skill.type === "active") {
      //在主场景新建技能     
      skill = SkillFactory.createSkill(this, skill.name);
      const activeSkill = this.add
        .image(35, 50 * activeSkillContainer.length, skill.icon)
        .setOrigin(0.5)
        .setVisible(true)
        .setInteractive()
        .setDisplaySize(40, 40)
        .on("pointerdown", () => {
          skill.useSkill();
        });
      activeSkillContainer.add(activeSkill);
      if (skill.name === "SkillActive2") {
        // 初始化子弹炸弹对象池
        for (let i = 0; i < 100; i++) {
          let bullet = BulletFactory.createBullet(this, "BulletBomb");
          bullet.disableBody(true, true);
          bulletsBomb.add(bullet);
        }
      }
      if (skill.name === "SkillActive3") {
        bulletLaser = BulletFactory.createBullet(this, "BulletLaser");
        bulletLaser.disableBody(true, true);
        //注册子弹激光和敌机碰撞
        this.physics.add.overlap(bulletLaser, enemiesA, this.hit, null, this);
        this.physics.add.overlap(bulletLaser, enemiesB, this.hit, null, this);
        this.physics.add.overlap(bulletLaser,enemiesFast, this.hit, null, this);
        this.physics.add.overlap(bulletLaser, enemiesBoss, this.hit, null, this);
      }
      if (skill.name === "SkillActive4") {   
        // 初始化子弹Super对象池
        for (let i = 0; i < bulletsSuper.maxSize; i++) {
          let bullet = BulletFactory.createBullet(this, "BulletSuper");
          bullet.disableBody(true, true);
          bulletsSuper.add(bullet);
        }
        //注册子弹Super和敌机碰撞
        this.physics.add.overlap(bulletsSuper, enemiesA, this.hit, null, this);
        this.physics.add.overlap(bulletsSuper, enemiesB, this.hit, null, this);
        this.physics.add.overlap(bulletsSuper, enemiesFast, this.hit, null, this);
        this.physics.add.overlap(bulletsSuper, enemiesBoss, this.hit, null, this);
      }
      return;
    } else {
      skill.useSkill();
    }
  }
  fireBulletFirdBird(skill: Skill) {
    if (this.hero.pow < skill.pow) {
      console.log("能量值不足",skill.pow,"点");
      return
    }
    this.hero.pow -= skill.pow;
    bulletFireBird.fire(this.hero.x, this.hero.y - 32);
  }
  fireBomb(skill: Skill) {
    if (this.hero.pow < skill.pow) {
      console.log("能量值不足",skill.pow,"点");
      return
    }
    this.hero.pow -= skill.pow;
    enemiesA.getChildren().forEach((enemy) => {
      if (enemy.active) {
        bulletsBomb.getFirstDead().fire((enemy as Enemy).x, (enemy as Enemy).y);
      }
    });
    enemiesB.getChildren().forEach((enemy) => {
      if (enemy.active) {
        bulletsBomb.getFirstDead().fire((enemy as Enemy).x, (enemy as Enemy).y);
      }
    });
    enemiesFast.getChildren().forEach((enemy) => {
      if (enemy.active) {
        bulletsBomb.getFirstDead().fire((enemy as Enemy).x, (enemy as Enemy).y);
      }
    });
    enemiesBoss.getChildren().forEach((enemy) => {
      if (enemy.active) {
        bulletsBomb.getFirstDead().fire((enemy as Enemy).x, (enemy as Enemy).y);
      }
    });
  }
  fireLaser(skill: Skill) {
    if (this.hero.pow < skill.pow) {
      console.log("能量值不足",skill.pow,"点");
      return
    }
    this.hero.pow -= skill.pow;
    bulletLaser.fire(this.hero.x, this.hero.y - 32);
  }
  changeToSuperBullet(skill: Skill) {
    if (this.hero.pow < skill.pow) {
      console.log("能量值不足",skill.pow,"点");
      return
    }
    this.hero.pow -= skill.pow;
    this.hero.setBullets(bulletsSuper)
    setTimeout(() => {
      this.hero.setBullets(bullets);
    },5000)
  }
  skillToImproveVelocity(skill: Skill) {
    bullets.getChildren().forEach((bullet) => {
      //子弹速度提高
      (bullet as Bullet).velocityRate = 1 + skill.value;
    });
    this.hero.fireFrequency = this.hero.fireFrequency - (this.hero.fireFrequency / 2) * skill.value;
  }
  skillToImproveDemageRate(skill: Skill) {
    console.log("子弹伤害倍率提升");
    bullets.getChildren().forEach((bullet) => {
      (bullet as Bullet).demageRate += skill.value;
    });
  }
  skillToImproveBaseDemage(skill: Skill) {
    console.log("子弹基础伤害提升");
    bullets.getChildren().forEach((bullet) => {
      (bullet as Bullet).baseDemage += skill.value;
    });
  }
  skillToRestoreHp(skill: Skill) {
    console.log("英雄机生命值回满");
    this.hero.hp = this.hero.maxHp;
    hpRatio.displayWidth = this.hero.getHpRatio() * hpRatio.width;
  }
  skillToImproveHp(skill: Skill) {
    console.log("英雄机最大生命值+1");
    this.hero.maxHp += 1;
  }
  skillToImproveExpRate(skill: Skill) {
    console.log("英雄机获取经验值倍率增加");
    this.hero.expRate += skill.value;
  }
  skillToRestorePow(skill: Skill) {
    console.log("英雄机能量值恢复3点");
    this.hero.addPow(skill.value);
    powRatio.displayWidth = this.hero.getPowRatio() * powRatio.width;
  }
  // 每一帧的回调
  update() {
    background.tilePositionY -= 1;
    this.updateDisplayScore();
    expRatio.displayWidth =
      (this.hero.level < 25 ? this.hero.getExpRatio() : 1) * expRatio.width;
  }
}