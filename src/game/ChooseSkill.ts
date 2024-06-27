import { Scene, GameObjects } from "phaser";
import { SkillFactory } from "../characters/skill/SkillFactory";
import { Skill } from "../characters/skill/Skill";
import { SkillActive1 } from "../characters/skill/SkillActive1";

let skillGroup: GameObjects.Group; //技能组
let selectedSkillGroup: GameObjects.Group; //技能组
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
    // this.scene.pause();
    skillContainer = this.add.container(width / 2, 200).setVisible(false);
    skillGroup = this.add.group();
    selectedSkillGroup = this.add.group();
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
    this.events.on("getSkill", this.onGetSkill, this);
    this.events.on("wake", () => {
      this.getSkillContainer();
    });
  }

  // }
  getSkillContainer() {
    // this.sys.pause();
    // this.game.scene.stop("ChooseSkill");
    let allElements = skillGroup.getChildren();
    console.log(allElements.length);
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
    console.log(selectedElements);
    skillContainer.setVisible(true);
  }
  //获得技能
  onGetSkill(skill: Skill) {
    //找了很久才找到的bug
    skillContainer.getAll().forEach((skill) => {
      skill.destroy()
    });
    if (skill.type === "active") {
      skillGroup.remove(skill);
      console.log("获得了主动技能");
      console.log(skillGroup.getChildren());
    }
    if (skill.level === 5) {
      skillGroup.remove(skill);
    }
    selectedSkillGroup.add(skill);
    console.log("目前获得的技能");
    console.log(selectedSkillGroup.getChildren());
    // this.registry.set("selectedSkill","")
  }
}