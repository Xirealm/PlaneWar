import { GameObjects, Scene, Math } from "phaser";
import { Skill } from "./Skill";

export class SkillPow extends Skill {
  //能量值恢复3点
  type: string = "pow";
  name: string = "SkillPow";
  value: number = 3;
  constructor(scene: Scene, x: number, y: number) {
    super(scene, x, y);
    scene.add.existing(this);
    scene.physics.add.existing(this);
    const card = scene.add.sprite(0, 0, "cardPow").setScale(0.4).setDepth(0.5);
    const text = scene.add.text(20, 0, `${this.value}`);
    this.add([card, text]);
    this.initBtn(scene);
  }
  useSkill() {
    console.log("技能光辉复燃被使用了");
    this.scene.scene.get("Main").events.emit("skillToRestorePow", this);
  }
}
