import { GameObjects, Scene, Math } from "phaser";
import { Skill } from "./Skill";

export class SkillActive2 extends Skill {
  type: string = "active";
  icon: string = "iconBomb";
  name: string = "active2";
  pow: number = 8; //使用技能需要消耗能量
  constructor(scene: Scene, x: number, y: number) {
    super(scene, x, y);
    scene.add.existing(this);
    scene.physics.add.existing(this);
    const cardBomb = scene.add
      .sprite(0, 0, "cardBomb")
      .setScale(0.4)
      .setDepth(0.5);
    const powText = scene.add.text(-9, 2, `${this.pow}`);
    this.add([cardBomb, powText]);
    this.initBtn(scene);
  }
  useSkill() {
    console.log("技能被使用了");
    this.scene.events.emit("fireBomb", this);
  }
}
