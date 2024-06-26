import { GameObjects, Scene, Math } from "phaser";
import { Skill } from "./Skill";

export class SkillBullet2 extends Skill {
  type: string = "bullet";
  name: string = "SkillBullet2";
  value: number = 0.4;
  constructor(scene: Scene, x: number, y: number) {
    super(scene, x, y);
    scene.add.existing(this);
    scene.physics.add.existing(this);
    const card = scene.add
      .sprite(0, 0, "cardBullet2")
      .setScale(0.4)
      .setDepth(0.5);
    const text = scene.add.text(-25, -10, `${this.value * 100}`);
    this.add([card, text]);
    this.initBtn(scene);
  }
  useSkill() {
    console.log("技能被使用了");
  }
}
