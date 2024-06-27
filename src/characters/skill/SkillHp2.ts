import { GameObjects, Scene, Math } from "phaser";
import { Skill } from "./Skill";

export class SkillHp2 extends Skill {
  //英雄最大生命值+1
  type: string = "hp";
  name: string = "SkillHp2";
  value: number = 1;
  constructor(scene: Scene, x: number, y: number) {
    super(scene, x, y);
    scene.add.existing(this);
    scene.physics.add.existing(this);
    const cardSuperBullet = scene.add
      .sprite(0, 0, "cardHp2")
      .setScale(0.4)
      .setDepth(0.5);
    const text = scene.add.text(10, 8, `${this.value}`);
    this.add([cardSuperBullet, text]);
    this.initBtn(scene);
  }
  useSkill() {
    console.log("技能生命赞歌被使用了");
    this.scene.scene.get("Main").events.emit("skillToImproveHp", this);
  }
}
