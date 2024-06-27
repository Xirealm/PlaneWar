import { GameObjects, Scene, Math } from "phaser";
import { Skill } from "./Skill";

export class SkillHp1 extends Skill {
  //恢复满英雄机生命值
  type: string = "hp";
  name: string = "SkillHp1";
  value: number = 3;
  constructor(scene: Scene, x: number, y: number) {
    super(scene, x, y);
    scene.add.existing(this);
    scene.physics.add.existing(this);
    const cardSuperBullet = scene.add
      .sprite(0, 0, "cardHp1")
      .setScale(0.4)
      .setDepth(0.5);
    this.add(cardSuperBullet);
    this.initBtn(scene);
  }
  useSkill() {
    console.log("技能圣光庇护被使用了");
    this.scene.scene.get("Main").events.emit("skillToRestoreHp", this);
  }
}
