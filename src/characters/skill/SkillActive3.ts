import { GameObjects, Scene, Math } from "phaser";
import { Skill } from "./Skill";

export class SkillActive3 extends Skill {
  type: string = "active";
  icon: string = "iconLaser";
  name: string = "SkillActive3";
  pow: number = 5;
  constructor(scene: Scene, x: number, y: number) {
    super(scene, x, y);
    scene.add.existing(this);
    scene.physics.add.existing(this);
    const cardLaser = scene.add
      .sprite(0, 0, "cardLaser")
      .setScale(0.4)
      .setDepth(0.5);
    const powText = scene.add.text(40, 3, `${this.pow}`);
    this.add([cardLaser, powText]);
    this.initBtn(scene);
  }
  useSkill() {
    console.log("主动技能激光射线被使用了");
    this.scene.events.emit("fireLaser", this);
  }
}
