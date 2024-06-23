import { Scene } from "phaser";
import { SupplyExp } from "./SupplyExp";
import { SupplyHp } from "./SupplyHp";
import { SupplyPow } from "./SupplyPow";

export class SupplyFactory {
  static createSupply(scene: Scene, type: string) {
    switch (type) {
      case "SupplyExp":
        return new SupplyExp(scene, 0, 0);
      case "SupplyHp":
        return new SupplyHp(scene, 0, 0);
      case "SupplyPow":
        return new SupplyPow(scene, 0, 0);
      default:
        throw new Error(`补给类型 ${type} 不支持`);
    }
  }
}