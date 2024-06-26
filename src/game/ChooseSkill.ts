import { Scene, GameObjects } from "phaser";
import { SkillFactory } from "../characters/skill/SkillFactory";
import { Skill } from "../characters/skill/Skill";
import { SkillActive1 } from "../characters/skill/SkillActive1";


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
    // console.log(skillGroup);
    //随机抽取3个技能
    this.getSkillContainer();
    this.events.on("getSkill", this.onGetSkill, this);
  }
  getSkillContainer() {
    this.sys.pause();
    console.log(skillGroup.getChildren());
    let allElements = skillGroup.getChildren();
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
    if (skill.type === "active") {
        skillGroup.remove(skill)
        console.log(skillGroup.getChildren());
    }
  }
}