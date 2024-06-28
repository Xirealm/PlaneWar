import { GameObjects, Scene, Math } from "phaser";
import { Skill } from "./Skill";

export class SkillActive4 extends Skill {
  type: string = "active";
  icon: string = "iconSuperBullet";
  name: string = "SkillActive4";
  pow: number = 3;
  constructor(scene: Scene, x: number, y: number) {
    super(scene, x, y);
    scene.add.existing(this);
    scene.physics.add.existing(this);
    const cardSuperBullet = scene.add
      .sprite(0, 0, "cardSuperBullet")
      .setScale(0.4)
      .setDepth(0.5);
    const powText = scene.add.text(68, 10, `${this.pow}`);
    this.add([cardSuperBullet, powText]);
    this.initBtn(scene);
  }
  useSkill() {
    console.log("主动技能超级子弹被使用了");
    this.scene.events.emit("changeToSuperBullet", this);
  }
}
