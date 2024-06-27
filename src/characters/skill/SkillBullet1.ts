import { GameObjects, Scene, Math } from "phaser";
import { Skill } from "./Skill";

export class SkillBullet1 extends Skill {
  type: string = "bullet";
  name: string = "SkillBullet1";
  value: number = 0.2;
  level = 0
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
    console.log("技能急速射击被使用了");
    this.level++
    this.scene.scene.get("Main").events.emit("skillToImproveVelocity", this);
  }
}
