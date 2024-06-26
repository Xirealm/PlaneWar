import { GameObjects, Scene, Math } from "phaser";
import { Skill } from "./Skill";

export class SkillExp extends Skill {
  type: string = "exp";
  name: string = "exp";
  value: number = 0.2;
  constructor(scene: Scene, x: number, y: number) {
    super(scene, x, y);
    scene.add.existing(this);
    scene.physics.add.existing(this);
    const card = scene.add
      .sprite(0, 0, "cardExp")
      .setScale(0.4)
      .setDepth(0.5);
    const text = scene.add.text(-10, -8, `${this.value*100}`);
    this.add([card, text]);
    this.initBtn(scene);
  }
  useSkill() {
    console.log("技能被使用了");
  }
}
