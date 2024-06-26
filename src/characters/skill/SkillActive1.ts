import { GameObjects, Scene, Math } from "phaser";
import { Skill } from "./Skill";

export class SkillActive1 extends Skill {
    type: string = "active"
    icon:string = "iconFirebird"
    name:string = "SkillActive1"
    pow: number = 5;//使用技能需要消耗能量
  constructor(scene: Scene, x: number, y: number) {
    super(scene, x, y);
    scene.add.existing(this);
    scene.physics.add.existing(this);
    const cardFirebird = scene.add.sprite(0, 0, "cardFirebird").setScale(0.4).setDepth(0.5)
    const powText = scene.add.text(58, 0, `${this.pow}`);
    this.add([cardFirebird, powText]);
    this.initBtn(scene)
  }
  useSkill(){
    console.log("技能被使用了");
    this.scene.events.emit("fireBulletFirdBird", this);
  }
}
