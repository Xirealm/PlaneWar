import { GameObjects, Scene, Math } from "phaser";
import { Bullet } from "../bullet/Bullet";

export abstract class Skill extends GameObjects.Container {
  supplyType: string; // 补给类型
  icon?: string;
  value?: number; //技能对应数值
  level?: number; //技能对应等级
  pow?: number;//主动技能消耗能量值
  constructor(scene: Scene, x: number, y: number) {
    super(scene, x, y);
    scene.add.existing(this);
    scene.physics.add.existing(this);
    this.setVisible(false);
    this.setActive(false);
  }
  initBtn(scene: Scene) {
    const chooseBtn = scene.add
      .image(120, 0, "chooseBtn")
      .setScale(0.25)
      .setInteractive()
      .on("pointerdown", () => {
        this.getSkill();
      });
    this.add(chooseBtn);
  }
  born(y: number) {
    this.setPosition(0, y * 120);
    this.setVisible(true);
    this.setActive(true);
  }
  getSkill() {
    this.scene.events.emit("getSkill", this);
    // this.scene.scene.sleep("ChooseSkill");
    console.log("获得技能");
    // this.scene.scene.get("Main").events.emit("getSkill", this)
  }
  abstract useSkill(): void;
}
