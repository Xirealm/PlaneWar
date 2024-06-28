import { Physics, Scene ,Math} from "phaser";

export abstract class Enemy extends Physics.Arcade.Sprite {
  //敌机属性
  hp: number; // 敌机的生命值
  maxHp: number; //敌机最大生命值
  score: number; //敌机的分数值
  exp: number; //敌机的经验值
  //游戏元素
  hpBar: Phaser.GameObjects.Container;
  hpBarFill: Phaser.GameObjects.Rectangle;
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
    const hpBarBg = this.scene.add
      .rectangle(0, 0, 50, 3, 0x000000)
      .setOrigin(0)
      .setAlpha(0.5);
    this.hpBar.add(hpBarBg);
    // 创建血条填充色
    this.hpBarFill = this.scene.add
      .rectangle(0, 0, 50, 3, 0xff0000)
      .setOrigin(0, 0)
      .setDepth(0.5)
      .setAlpha(0.7);
    this.hpBar.add(this.hpBarFill);
  }
  upgrade(level: number) {
    this.maxHp = this.maxHp * 1.2;
    this.exp = this.exp *= 1.5;
  }
  born() {
    let x = Math.Between(this.width - 10, 345);
    let y = Math.Between(-this.height, -this.height * 10);
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
  takeDamage(damage: number): void {
    this.hp -= damage;
    let demage = this.scene.add.text(this.x, this.y, `${damage}`, {
      font: "18px bold",
      color: "orange",
    });
    setTimeout(() => {
      demage.destroy();
    }, 500);
  }
  preUpdate(time: number, delta: number) {
    super.preUpdate(time, delta);
    let { height } = this.scene.cameras.main;
    // 敌军走到头，销毁
    if (this.y >= height + 20) {
      this.disableBody(true, true);
    }
    this.hpBar.setPosition(this.x - 50 / 2, this.y + this.height / 3);
    this.hpBarFill.width = 50 * (this.hp / this.maxHp);
  }
}