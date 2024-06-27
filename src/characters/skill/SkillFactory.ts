import { Scene } from "phaser";
import { SkillActive1 } from "./SkillActive1";
import { SkillActive2 } from "./SkillActive2";
import { SkillActive3 } from "./SkillActive3";
import { SkillActive4 } from "./SkillActive4";
import { SkillPow } from "./SkillPow";
import { SkillHp1 } from "./SkillHp1";
import { SkillHp2 } from "./SkillHp2";
import { SkillExp } from "./SkillExp";
import { SkillBullet1 } from "./SkillBullet1";
import { SkillBullet2 } from "./SkillBullet2";
import { SkillBullet3 } from "./SkillBullet3";

export class SkillFactory {
    static createSkill(scene: Scene, type: string) {
        switch (type) {
          case "SkillActive1":
            return new SkillActive1(scene, 0, 0);
          case "SkillActive2":
            return new SkillActive2(scene, 0, 0);
          case "SkillActive3":
            return new SkillActive3(scene, 0, 0);
          case "SkillActive4":
            return new SkillActive4(scene, 0, 0);
          case "SkillPow":
            return new SkillPow(scene, 0, 0);
          case "SkillHp1":
            return new SkillHp1(scene, 0, 0);
          case "SkillHp2":
            return new SkillHp2(scene, 0, 0);
          case "SkillExp":
            return new SkillExp(scene, 0, 0);
          case "SkillBullet1":
            return new SkillBullet1(scene, 0, 0);
          case "SkillBullet2":
            return new SkillBullet2(scene, 0, 0);
          case "SkillBullet3":
            return new SkillBullet3(scene, 0, 0);
          default:
            throw new Error(`技能类型 ${type} 不支持`);
        }
    }
}