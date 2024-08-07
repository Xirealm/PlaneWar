import { Scene, GameObjects } from "phaser";
import { SkillFactory } from "../characters/skill/SkillFactory";
import { Skill } from "../characters/skill/Skill";
import { EventBus } from "@/utils/EventBus";

let skillGroup: GameObjects.Group; //技能组
let skillContainer: GameObjects.Container; //技能选择容器

export class ChooseSkill extends Scene {
  constructor() {
    super("ChooseSkill");
  }
  create() {
    let { width, height } = this.cameras.main;
    this.add
      .rectangle(0, 0, width, height, 0x000000)
      .setOrigin(0, 0)
      .setAlpha(0.5);
    skillContainer = this.add.container(width / 2, 200).setVisible(false);
    skillGroup = this.add.group();
    const skillActive1 = SkillFactory.createSkill(this, "SkillActive1");
    const skillActive2 = SkillFactory.createSkill(this, "SkillActive2");
    const skillActive3 = SkillFactory.createSkill(this, "SkillActive3");
    const skillActive4 = SkillFactory.createSkill(this, "SkillActive4");
    const skillPow = SkillFactory.createSkill(this, "SkillPow");
    const skillHp1 = SkillFactory.createSkill(this, "SkillHp1");
    const skillHp2 = SkillFactory.createSkill(this, "SkillHp2");
    const skillExp = SkillFactory.createSkill(this, "SkillExp");
    const skillBullet1 = SkillFactory.createSkill(this, "SkillBullet1");
    const skillBullet2 = SkillFactory.createSkill(this, "SkillBullet2");
    const skillBullet3 = SkillFactory.createSkill(this, "SkillBullet3");
    skillGroup.add(skillActive1);
    skillGroup.add(skillActive2);
    skillGroup.add(skillActive3);
    skillGroup.add(skillActive4);
    skillGroup.add(skillPow);
    skillGroup.add(skillHp1);
    skillGroup.add(skillHp2);
    skillGroup.add(skillExp);
    skillGroup.add(skillBullet1);
    skillGroup.add(skillBullet2);
    skillGroup.add(skillBullet3);
    //随机抽取3个技能
    this.getSkillContainer();
    EventBus.off("GetSkillInChooseSkill");
    EventBus.on("GetSkillInChooseSkill", this.onGetSkill, this);
    this.events.on("wake", () => {
      this.getSkillContainer();
    });
  }

  // }
  getSkillContainer() {
    let allElements = skillGroup.getChildren();
    // console.log("技能库技能数：",allElements.length);
    let selectedElements = [];
    for (let i = allElements.length - 1; i > 0; i--) {
      // 随机选择一个从开始到当前索引的元素
      let j = Math.floor(Math.random() * (i + 1));
      // 交换元素
      [allElements[i], allElements[j]] = [allElements[j], allElements[i]];
    }
    // 现在 allElements 数组的前三个元素是随机的，且不重复
    selectedElements = allElements.slice(0, 3);
    selectedElements.forEach((skill, index) => {
      skill.born(index);
      skillContainer.add(skill);
    });
    skillContainer.setVisible(true);
  }
  //获得技能
  onGetSkill(skill: Skill) {
    this.scene.sleep()
    //找了很久才找到的bug
    skillContainer.getAll().forEach((skill) => {
      (skill as GameObjects.Container).setActive(false);
      (skill as GameObjects.Container).setVisible(false);
    });
    skillContainer.removeAll()
    if (skill.type === "active") {
      skillGroup.remove(skill);
      // console.log("获得了主动技能");
    }
    if (skill.level === 5) {
      skillGroup.remove(skill);
    }
    this.scene.resume("Main"); 
    EventBus.emit("getSkill",skill);
  }
}