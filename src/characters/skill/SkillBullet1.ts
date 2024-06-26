import { GameObjects, Scene, Math } from "phaser";
import { Skill } from "./Skill";

export class SkillBullet1 extends Skill {
  type: string = "bullet";
  name: string = "bullet1";
  value: number = 0.3;
  constructor(scene: Scene, x: number, y: number) {
    super(scene, x, y);
    scene.add.existing(this);
    scene.physics.add.existing(this);
    const card = scene.add
      .sprite(0, 0, "cardBullet1")
      .setScale(0.4)
      .setDepth(0.5);
    const text = scene.add.text(-40, 0, `${this.value * 100}`);
    this.add([card, text]);
    this.initBtn(scene);
  }
  useSkill() {
    console.log("技能被使用了");
  }
}
