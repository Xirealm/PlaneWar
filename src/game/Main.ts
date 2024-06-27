import { Scene, GameObjects, type Types, Physics } from "phaser";

import { ChooseSkill } from "./ChooseSkill";

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
import { BulletA } from "../characters/bullet/BulletA";
import { BulletFireBird } from "../characters/bullet/BulletFireBird";

import { SupplyFactory } from "../characters/supply/SupplyFactory";
import { Supply } from "../characters/supply/Supply"
import { SupplyExp } from "../characters/supply/SupplyExp";
import { SupplyHp } from "../characters/supply/SupplyHp";
import { SupplyPow } from "../characters/supply/SupplyPow";

import { SkillFactory } from "../characters/skill/SkillFactory";
import { Skill } from "../characters/skill/Skill";
import { SkillActive1 } from "../characters/skill/SkillActive1";

import { Boom } from "../characters/boom/Boom";

// 场景元素
let hero: Hero;
let background: GameObjects.TileSprite;
let enemiesA: Physics.Arcade.Group;
let enemiesB: Physics.Arcade.Group;
let enemiesFast: Physics.Arcade.Group;
let enemiesBoss: Physics.Arcade.Group;
let bulletsA: Physics.Arcade.Group;
let bulletFireBird: BulletFireBird;
let suppliesExp: Physics.Arcade.Group;
let suppliesHp: Physics.Arcade.Group;
let suppliesPow: Physics.Arcade.Group;
let booms: GameObjects.Group;

let hpRatio: GameObjects.Image;
let powRatio: GameObjects.Image;
let expRatio: GameObjects.Image;
let levelText: GameObjects.Text;
let scoreGroup: GameObjects.Group;
let chooseSkillScene: Scene;
let skillContainer: GameObjects.Container; //技能选择容器
let activeSkillContainer: GameObjects.Container; //主动技能容器
let skillGroup: GameObjects.Group; //技能组
let selectedSkillGroup: GameObjects.Group; //已选择的技能组
// 场景数据
let score: number;

export class Main extends Scene {
  width: number;
  height: number;
  constructor() {
    super("Main");
  }
  create() {
    const { width, height } = this.cameras.main;
    this.width = width;
    this.height = height;
    const backgroundKey = this.registry.get("gameBackground")
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
      hero = HeroFactory.createHero(this, "TypeA");
    } else if (this.registry.get("hero") === "heroB") {
      hero = HeroFactory.createHero(this, "TypeB");
    }
    // 子弹
    // 定义子弹A对象池
    bulletsA = this.physics.add.group({
      classType: BulletA,
      maxSize: 500, // 子弹A对象池的最大数量
      enable: false,
      immovable: false,
    });
    // 初始化子弹A对象池
    for (let i = 0; i < 500; i++) {
      let bullet = BulletFactory.createBullet(this, "BulletA");
      bullet.disableBody(true, true);
      bulletsA.add(bullet);
    }
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
    hero.setBullets(bulletsA);
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
    hpRatio.displayWidth = hero.getHpRatio() * hpRatio.width;
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
    powRatio.displayWidth = hero.getPowRatio() * powRatio.width;
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
    expRatio.displayWidth = hero.getExpRatio() * expRatio.width;
    // chooseSkillScene = this.scene.add("chooseSkill", new ChooseSkill(), true);
    // skillGroup = this.add.group();
    selectedSkillGroup = this.add.group();
    // 技能选择容器
    // skillContainer = this.add.container(this.width / 2, 200).setVisible(false);
    // const skillActive1 = SkillFactory.createSkill(this, "SkillActive1");
    // const skillActive2 = SkillFactory.createSkill(this, "SkillActive2");
    // const skillActive3 = SkillFactory.createSkill(this, "SkillActive3");
    // const skillActive4 = SkillFactory.createSkill(this, "SkillActive4");
    // skillGroup.add(skillActive1);
    // skillGroup.add(skillActive2);
    // skillGroup.add(skillActive3);
    // skillGroup.add(skillActive4);
    //随机抽取3个技能
    // setTimeout(() => {
    //   this.getSkillContainer();
    // }, 1000);
    // 主动技能按钮容器
    activeSkillContainer = this.add.container(0, 500);
    // const activeSkill1 = this.add
    //   .image(35, 0, "iconFirebird")
    //   .setOrigin(0.5)
    //   .setVisible(false)
    //   .setDisplaySize(40, 40)
    //   .setInteractive()
    //   .on("pointerdown", () => {
    //     console.log("主动技能1");
    //     const skill = selectedSkillGroup.getMatching("type", "active")[0];
    //     console.log(skill);
    //     skill.useSkill();
    //   });
    // const activeSkill2 = this.add
    //   .image(35, 50, "iconFirebird")
    //   .setOrigin(0.5)
    //   .setVisible(false)
    //   .setDisplaySize(40, 40);
    // const activeSkill3 = this.add
    //   .image(35, 100, "iconFirebird")
    //   .setOrigin(0.5)
    //   .setVisible(false)
    //   .setDisplaySize(40, 40);
    // const activeSkill4 = this.add
    //   .image(35, 150, "iconFirebird")
    //   .setOrigin(0.5)
    //   .setVisible(false)
    //   .setDisplaySize(40, 40);
    // activeSkillContainer.add([
    //   activeSkill1,
    //   // activeSkill2,
    //   // activeSkill3,
    //   // activeSkill4,
    // ]);
    // 调用注册事件
    this.addEvent();
  }
  //注册事件
  addEvent() {
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
      delay: Phaser.Math.Between(5000, 10000), // 定时器 每5-10秒掉落1个生命补给
      callback: () => {
        this.spawnSupply("supplyPow");
      },
      callbackScope: this,
      loop: true, // 循环生成
    });
    // 监听英雄升级事件
    this.events.on("heroUpgrade", this.onHeroUpgrade, this);
    // 监听英雄升级事件
    this.events.on("getSkill", this.onGetSkill, this);
    this.events.on("fireBulletFirdBird", this.fireBulletFirdBird, this);
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
    // 子弹A和敌机A碰撞
    this.physics.add.overlap(bulletsA, enemiesA, this.hit, null, this);
    // 子弹A和敌机B碰撞
    this.physics.add.overlap(bulletsA, enemiesB, this.hit, null, this);
    // 子弹A和敌机Fast碰撞
    this.physics.add.overlap(bulletsA, enemiesFast, this.hit, null, this);
    // 子弹A和敌机Boss碰撞
    this.physics.add.overlap(bulletsA, enemiesBoss, this.hit, null, this);
    // 子弹火鸟和敌机碰撞
    this.physics.add.overlap(bulletFireBird, enemiesA, this.hit, null, this);
    this.physics.add.overlap(bulletFireBird, enemiesB, this.hit, null, this);
    this.physics.add.overlap(bulletFireBird, enemiesFast, this.hit, null, this);
    this.physics.add.overlap(bulletFireBird, enemiesBoss, this.hit, null, this);
    // 玩家和敌机A碰撞
    this.physics.add.overlap(hero, enemiesA, this.injured, null, this);
    // 玩家和敌机B碰撞
    this.physics.add.overlap(hero, enemiesB, this.injured, null, this);
    // 玩家和敌机Fast碰撞
    this.physics.add.overlap(hero, enemiesFast, this.injured, null, this);
    // 玩家和敌机Boss碰撞
    this.physics.add.overlap(hero, enemiesBoss, this.injured, null, this);
    // 玩家拾取经验补给（碰撞）
    this.physics.add.overlap(hero, suppliesExp, this.getSupply, null, this);
    // 玩家拾取生命补给（碰撞）
    this.physics.add.overlap(hero, suppliesHp, this.getSupply, null, this);
    // 玩家拾取能量补给（碰撞）
    this.physics.add.overlap(hero, suppliesPow, this.getSupply, null, this);
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
  onHeroUpgrade(hero) {
    console.log("英雄升级！！！！！！！！！", hero);
    levelText.setText(`${hero.level}`);
    // 处理英雄升级后的逻辑
    this.scene.pause();
    if (hero.level == 2) {
      this.game.scene.start("ChooseSkill");
    } else {
      this.game.scene.wake("ChooseSkill");
    }
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
    // bulletFireBird.fire(hero.x, hero.y - 32);
    for (let i = 0; i < 3; i++) {
      this.spawnEnemy("enemyA");
    }
    for (let i = 0; i < 2; i++) {
      this.spawnEnemy("enemyB");
    }
    for (let i = 0; i < 2; i++) {
      this.spawnEnemy("enemyFast");
    }
    if (hero.level) {
      this.spawnEnemy("enemyBoss");
    }
    // 例如，更新UI、播放音效、增加分数等
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
    hero.growExp(enemy.exp);
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
    hero.reduceHp(1);
    hpRatio.displayWidth = hero.getHpRatio() * hpRatio.width;
    powRatio.displayWidth = hero.getPowRatio() * powRatio.width;
    if (hero.hp <= 0) {
      // 显示爆炸
      booms.getFirstDead()?.show(enemy.x, enemy.y);
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
    if (skill.type === "active") {
      //在主场景新建技能
      skill = SkillFactory.createSkill(this, skill.name);
      selectedSkillGroup.add(skill);
      const activeSkill = this.add
        .image(35, 50 * activeSkillContainer.length, skill.icon)
        .setOrigin(0.5)
        .setVisible(true)
        .setInteractive()
        .setDisplaySize(40, 40)
        .on("pointerdown", () => {
          const skill = selectedSkillGroup.getMatching("type", "active")[
            activeSkillContainer.length - 1
          ];
          skill.useSkill();
        });
      activeSkillContainer.add(activeSkill);
      return;
    } else {
      skill.useSkill();
    }
  }
  fireBulletFirdBird(skill: Skill) {
    // if (hero.pow < skill.pow) {
    //   console.log("能量值不足",skill.pow,"点");
    //   return
    // }
    // hero.pow -= skill.pow;
    bulletFireBird.fire(hero.x, hero.y - 32);
  }
  skillToImproveVelocity(skill: Skill) {
    bulletsA.getChildren().forEach((bullet) => {
      //子弹速度提高
      (bullet as Bullet).velocityRate = 1 + skill.value;
      hero.fireFrequency = hero.fireFrequency - (hero.fireFrequency / 2) * skill.value
    });
  }
  skillToImproveDemageRate(skill: Skill) {
    bulletsA.getChildren().forEach((bullet) => {
      console.log("子弹伤害倍率提升");
      (bullet as Bullet).demageRate += skill.value;
    });
  }
  skillToImproveBaseDemage(skill: Skill) {
    bulletsA.getChildren().forEach((bullet) => {
      console.log("子弹基础伤害提升");
      (bullet as Bullet).baseDemage += skill.value;
    });
  }
  skillToRestoreHp(skill: Skill) {
    console.log("英雄机生命值回满");
    hero.hp = hero.maxHp;
    hpRatio.displayWidth = hero.getHpRatio() * hpRatio.width;
  }
  skillToImproveHp(skill: Skill) {
    console.log("英雄机最大生命值+1");
    hero.maxHp += 1;
  }
  skillToImproveExpRate(skill: Skill) {
    console.log("英雄机获取经验值倍率增加");
    hero.expRate += skill.value;
  }
  skillToRestorePow(skill: Skill) {
    console.log("英雄机能量值恢复3点");
    hero.addPow(skill.value);
  }
  // getSkillContainer() {
  //   this.sys.pause();
  //   this.events.on("pointerdown", () => {
  //     console.log("555");

  //   }, this);
  //   // this.scene.resume()
  //   let allElements = skillGroup.getChildren();
  //   let selectedElements = [];
  //   for (let i = allElements.length - 1; i > 0; i--) {
  //     // 随机选择一个从开始到当前索引的元素
  //     let j = Math.floor(Math.random() * (i + 1));
  //     // 交换元素
  //     [allElements[i], allElements[j]] = [allElements[j], allElements[i]];
  //   }
  //   // 现在 allElements 数组的前三个元素是随机的，且不重复
  //   selectedElements = allElements.slice(0, 3);
  //   selectedElements.forEach((skill, index) => {
  //     skill.born(index);
  //     skillContainer.add(skill);
  //   });
  //   skillContainer.setVisible(true);
  // }
  // 每一帧的回调
  update() {
    background.tilePositionY -= 1;
    this.updateDisplayScore();
    expRatio.displayWidth =
      (hero.level < 25 ? hero.getExpRatio() : 1) * expRatio.width;
  }
}