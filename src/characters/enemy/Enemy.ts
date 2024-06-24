import { Physics, Scene ,Math} from "phaser";

export abstract class Enemy extends Physics.Arcade.Sprite {
  hp: number; // 敌机的生命值
  maxHp: number; //敌机最大生命值
  hpBar: Phaser.GameObjects.Container;
  hpBarFill: Phaser.GameObjects.Rectangle;
  score: number; //敌机的分数值
  exp: number; //敌机的经验值
  constructor(scene: Scene, x: number, y: number, texture: string) {
    super(scene, x, y, texture);
    scene.add.existing(this);
    scene.physics.add.existing(this);
    this.setScale(0.6);
    this.setCollideWorldBounds(true); // 让敌人碰到世界边缘时停止
    // 创建血条容器
    this.hpBar = this.scene.add.container(this.x, this.y - 32);
    this.hpBar.setVisible(false);
    this.hpBar.setActive(false);
    const hpBarBg = this.scene.add.rectangle(0, 0, 50, 3, 0x000000).setOrigin(0).setAlpha(0.5);
    this.hpBar.add(hpBarBg);
    // 创建血条填充色
    this.hpBarFill = this.scene.add
      .rectangle(0, 0, 50, 3, 0xff0000).setOrigin(0, 0).setDepth(0.5).setAlpha(0.7);
    this.hpBar.add(this.hpBarFill);
  }
  upgrade(level: number) {
    this.maxHp = this.maxHp * level * 2;
    this.score = this.score * 2;
    console.log("敌人升级!!!!!!!!!!!!!!!!!!");
  }
  preUpdate(time: number, delta: number) {
    super.preUpdate(time, delta);
    let { height } = this.scene.cameras.main;
    // 敌军走到头，销毁
    if (this.y >= height + 20) {
      this.disableBody(true, true);
    }
    this.hpBar.setPosition(this.x - (50/2), this.y + this.height / 3);
    this.hpBarFill.width = 50 * (this.hp / this.maxHp) 
  }
  born() {
    let x = Math.Between(this.width - 10, 345);
    let y = Math.Between(-this.height, -this.height * 5);
    this.hp = this.maxHp;
    this.enableBody(true, x, y, true, true);
    this.hpBar.setVisible(true);
    this.hpBar.setActive(true);
  }
  killed(): void {
    this.disableBody(true, true);
    this.hpBar.setVisible(false);
    this.hpBar.setActive(false);
  }
  abstract takeDamage(damage: number): void;
}